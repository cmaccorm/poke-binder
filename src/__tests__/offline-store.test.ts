import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { BinderPage } from '@/lib/types';

vi.mock('@/lib/offline-store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/offline-store')>();
  return {
    ...actual,
    getCachedPagesForBinder: vi.fn<(binderId: string) => Promise<BinderPage[]>>(),
  };
});

describe('offline store logic', () => {
  beforeEach(() => {
    vi.stubGlobal('indexedDB', {
      open: vi.fn(() => ({
        then: (cb: (db: unknown) => void) => cb({}),
        catch: () => ({ then: (cb: () => void) => cb() }),
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
        then: () => ({ catch: () => ({ then: (cb: () => void) => cb() }) }),
      })),
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
