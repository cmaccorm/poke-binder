'use client';

import { useEffect, useState, useCallback } from 'react';
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

    if (!isOnline) {
      const cached = await getCachedBinders();
      if (cached !== null) {
        setBinders(cached);
        setLoading(false);
        return;
      }
      setBinders([]);
      setLoading(false);
      return;
    }

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
  }, [isOnline]);

  useEffect(() => {
    fetchBinders();

    const handleUpdate = () => fetchBinders();
    window.addEventListener('bindersUpdated', handleUpdate);
    return () => window.removeEventListener('bindersUpdated', handleUpdate);
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

  return (
    <div className='pokeball-bg min-h-screen bg-poke-dark p-4 sm:p-8'>
      <div className='mx-auto max-w-5xl mt-2 sm:mt-4'>
        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-poke-gold border-t-transparent' />
          </div>
        ) : binders.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='mb-6 h-16 w-16 rounded-full border-4 border-poke-slate/30 bg-poke-dark-surface' />
            <p className='mb-4 text-lg text-poke-slate'>No binders yet</p>
            <p className='text-sm text-poke-slate/70'>
              Click <strong className='text-poke-white'>+ New Binder</strong> in the header to get started
            </p>
          </div>
        ) : (
          <div className='recessed-shelf'>
            {binders.map((binder) => (
              <BinderCard
                key={binder.id}
                binder={binder}
                onClick={() => handleOpen(binder)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
