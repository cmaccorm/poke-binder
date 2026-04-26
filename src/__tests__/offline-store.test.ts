import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { BinderIdentity, BinderPage, BinderSlot } from '@/lib/types';

const mockSlots: BinderSlot[] = [
  {
    id: 'slot-1',
    row: 0,
    col: 0,
    card: {
      id: 'card-1',
      externalId: 'base1-4',
      name: 'Charizard',
      number: '4',
      setName: 'Base Set',
      setId: 'base1',
      imageSmall: 'https://images.pokemontcg.io/base1/4.png',
      imageLarge: 'https://images.pokemontcg.io/base1/4_hires.png',
      rarity: 'Rare Holo',
      variant: null,
    },
  },
];

const mockPage: BinderPage = {
  id: 'page-1',
  pageIndex: 0,
  slots: mockSlots,
};

describe('offline store logic', () => {
  beforeEach(() => {
    vi.stubGlobal('indexedDB', {
      open: vi.fn(() => ({
        then: (cb: (db: unknown) => void) => cb({}),
        catch: (_: unknown) => ({ then: (cb: () => void) => cb() }),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getCachedBinders returns null when IndexedDB is undefined', async () => {
    Object.defineProperty(globalThis, 'indexedDB', { value: undefined, writable: true });
    const { getCachedBinders } = await import('@/lib/offline-store');
    const result = await getCachedBinders();
    expect(result).toBeNull();
  });

  it('getCachedBinders returns null on error', async () => {
    vi.stubGlobal('indexedDB', {
      open: vi.fn(() => ({
        then: (_: unknown) => ({ catch: (_: unknown) => ({ then: (cb: () => void) => cb() }) }),
      })),
    });
    const { getCachedBinders } = await import('@/lib/offline-store');
    const result = await getCachedBinders();
    expect(result).toBeNull();
  });
});
