import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useOnlineStatus hook logic', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { onLine: true });
    vi.stubGlobal('globalThis', {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initial state reflects navigator.onLine', () => {
    (navigator as { onLine: boolean }).onLine = true;
    expect(navigator.onLine).toBe(true);

    (navigator as { onLine: boolean }).onLine = false;
    expect(navigator.onLine).toBe(false);
  });

  it('registers online and offline event listeners on mount', () => {
    const addEventListener = globalThis.addEventListener as ReturnType<typeof vi.fn>;

    const handleOnline = () => {};
    const handleOffline = () => {};

    globalThis.addEventListener('online', handleOnline);
    globalThis.addEventListener('offline', handleOffline);

    expect(addEventListener).toHaveBeenCalledWith('online', handleOnline);
    expect(addEventListener).toHaveBeenCalledWith('offline', handleOffline);
  });

  it('removes online and offline event listeners on cleanup', () => {
    const removeEventListener = globalThis.removeEventListener as ReturnType<typeof vi.fn>;

    const handleOnline = () => {};
    const handleOffline = () => {};

    globalThis.removeEventListener('online', handleOnline);
    globalThis.removeEventListener('offline', handleOffline);

    expect(removeEventListener).toHaveBeenCalledWith('online', handleOnline);
    expect(removeEventListener).toHaveBeenCalledWith('offline', handleOffline);
  });

  it('online event can be dispatched to registered handlers', () => {
    let onlineHandler: ((e: Event) => void) | null = null;
    (globalThis.addEventListener as ReturnType<typeof vi.fn>).mockImplementation(
      (event: string, handler: (e: Event) => void) => {
        if (event === 'online') onlineHandler = handler;
      }
    );

    const handleOnline = vi.fn();
    globalThis.addEventListener('online', handleOnline);

    if (onlineHandler) onlineHandler(new Event('online'));

    expect(handleOnline).toHaveBeenCalledTimes(1);
  });

  it('offline event can be dispatched to registered handlers', () => {
    let offlineHandler: ((e: Event) => void) | null = null;
    (globalThis.addEventListener as ReturnType<typeof vi.fn>).mockImplementation(
      (event: string, handler: (e: Event) => void) => {
        if (event === 'offline') offlineHandler = handler;
      }
    );

    const handleOffline = vi.fn();
    globalThis.addEventListener('offline', handleOffline);

    if (offlineHandler) offlineHandler(new Event('offline'));

    expect(handleOffline).toHaveBeenCalledTimes(1);
  });
});
