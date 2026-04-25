'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CreateBinderDialog from './CreateBinderDialog';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomCharacter(): string {
  const index = Math.floor(Math.random() * CHAR_POOL.length);
  return CHAR_POOL[index];
}

export default function Header() {
  const [randomChar, setRandomChar] = useState<string>('');
  const pathname = usePathname();
  const [showCreate, setShowCreate] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    setRandomChar(getRandomCharacter());
  }, []);

  const handleCreated = () => {
    window.dispatchEvent(new Event('bindersUpdated'));
  };

  return (
    <header className='w-full bg-[var(--poke-dark-lighter)] border-b border-[var(--poke-dark-surface)]'>
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <h1
            className='text-lg sm:text-2xl md:text-3xl tracking-wide text-[var(--poke-red)] drop-shadow-[0_0_10px_var(--poke-red)]'
            style={{ fontFamily: 'var(--font-pokemon-classic)' }}
          >
            poké-binder
          </h1>
          <span
            className='text-lg sm:text-xl md:text-2xl text-[var(--poke-white)] select-none'
            style={{ fontFamily: 'var(--font-pokemon-pixels)' }}
            aria-hidden='true'
            title='Random decorative character'
          >
            {randomChar}
          </span>

          <span
            className={`ml-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
              isOnline
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOnline ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {pathname === '/' && (
          <button
            onClick={() => (isOnline ? setShowCreate(true) : undefined)}
            disabled={!isOnline}
            className={`min-h-[44px] rounded-lg px-3 py-2 sm:px-4 text-sm font-semibold transition-all active:scale-95 ${
              isOnline
                ? 'bg-poke-red text-white shadow-md shadow-poke-red/25 hover:bg-poke-red-hover hover:shadow-lg hover:shadow-poke-red/30'
                : 'bg-poke-dark-surface text-poke-slate/50 cursor-not-allowed'
            }`}
            title={isOnline ? 'Create a new binder' : 'Unavailable offline'}
          >
            + New Binder
          </button>
        )}
      </div>

      <CreateBinderDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={handleCreated}
      />
    </header>
  );
}
