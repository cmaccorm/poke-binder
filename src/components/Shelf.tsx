'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { BinderIdentity, BinderPage } from '@/lib/types';
import BinderCard from './BinderCard';
import BinderViewer from './BinderViewer';
import { cacheBinders, getCachedBinders, getCachedPage } from '@/lib/offline-store';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export default function Shelf() {
  const router = useRouter();
  const [binders, setBinders] = useState<BinderIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOfflineBinder, setActiveOfflineBinder] = useState<{ binder: BinderIdentity; pageData: BinderPage | null } | null>(null);
  const isOnline = useOnlineStatus();

  const fetchBinders = useCallback(async () => {
    setLoading(true);

    if (isOnline) {
      try {
        const res = await fetch('/api/binders');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: BinderIdentity[] = await res.json();
        setBinders(data);
        await cacheBinders(data);
      } catch {
        const cached = await getCachedBinders();
        if (cached !== null) {
          setBinders(cached);
        } else {
          setBinders([]);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    const cached = await getCachedBinders();
    if (cached !== null) {
      setBinders(cached);
    } else {
      setBinders([]);
    }
    setLoading(false);
  }, [isOnline]);

  useEffect(() => {
    const initTimer = globalThis.setTimeout(() => {
      fetchBinders().catch(() => {});
    }, 0);

    const handleUpdate = () => { fetchBinders().catch(() => {}); };
    globalThis.addEventListener('bindersUpdated', handleUpdate);
    return () => {
      globalThis.clearTimeout(initTimer);
      globalThis.removeEventListener('bindersUpdated', handleUpdate);
    };
  }, [fetchBinders]);

  const handleOpen = async (binder: BinderIdentity) => {
    if (!isOnline) {
      const pageData = await getCachedPage(binder.id, binder.lastViewedPage);
      setActiveOfflineBinder({ binder, pageData });
      return;
    }
    router.push(`/binder/${binder.id}?page=${binder.lastViewedPage}`);
  };

  if (activeOfflineBinder) {
    return (
      <div className='pokeball-bg min-h-screen bg-poke-dark'>
        <BinderViewer
          binder={activeOfflineBinder.binder}
          initialPage={activeOfflineBinder.binder.lastViewedPage}
          initialPageData={activeOfflineBinder.pageData}
          onBack={() => setActiveOfflineBinder(null)}
        />
      </div>
    );
  }

  let content: React.ReactNode;
  if (loading) {
    content = (
      <div className='flex items-center justify-center py-20'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-poke-gold border-t-transparent' />
      </div>
    );
  } else if (binders.length === 0) {
    content = (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='mb-6 h-16 w-16 rounded-full border-4 border-poke-slate/30 bg-poke-dark-surface' />
        <p className='mb-4 text-lg text-poke-slate'>No binders yet</p>
        <p className='text-sm text-poke-slate/70'>
          Click <strong className='text-poke-white'>+ New Binder</strong> in the header to get started
        </p>
      </div>
    );
  } else {
    content = (
      <div className='recessed-shelf'>
        {binders.map((binder) => (
          <BinderCard
            key={binder.id}
            binder={binder}
            onClick={() => handleOpen(binder)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='pokeball-bg min-h-screen bg-poke-dark p-4 sm:p-8'>
      <div className='mx-auto max-w-5xl mt-2 sm:mt-4'>
        {content}
      </div>
    </div>
  );
}
