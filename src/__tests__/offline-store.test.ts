import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { BinderPage } from '@/lib/types';

vi.mock('@/lib/offline-store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/offline-store')>();
  return {
    cacheBinders: actual.cacheBinders,
    getCachedBinders: actual.getCachedBinders,
    cachePage: actual.cachePage,
    getCachedPage: actual.getCachedPage,
    getCachedPagesForBinder: vi.fn<(binderId: string) => Promise<BinderPage[]>>(),
    getCacheTimestamp: actual.getCacheTimestamp,
    getAllImageUrls: actual.getAllImageUrls,
    clearOfflineCache: actual.clearOfflineCache,
    areAllPagesCached: actual.areAllPagesCached,
  };
});

describe('offline store logic', () => {
  beforeEach(() => {
    vi.stubGlobal('indexedDB', {
      open: vi.fn(() => Promise.resolve({})),
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
      open: vi.fn(() => Promise.reject(new Error('DB error'))),
    });
    const { getCachedBinders } = await import('@/lib/offline-store');
    const result = await getCachedBinders();
    expect(result).toBeNull();
  });

  it('getAllImageUrls returns empty array when no pages cached', async () => {
    const { getAllImageUrls } = await import('@/lib/offline-store');
    const { getCachedPagesForBinder } = await import('@/lib/offline-store');
    vi.mocked(getCachedPagesForBinder).mockResolvedValue([]);
    const urls = await getAllImageUrls('binder-3');
    expect(urls).toHaveLength(0);
  });
});
