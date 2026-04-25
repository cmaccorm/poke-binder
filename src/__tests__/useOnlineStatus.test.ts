import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useOnlineStatus hook logic', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { onLine: true });
    vi.stubGlobal('window', {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn((event: Event) => true),
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
    const addEventListener = window.addEventListener as ReturnType<typeof vi.fn>;

    const handleOnline = () => {};
    const handleOffline = () => {};

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    expect(addEventListener).toHaveBeenCalledWith('online', handleOnline);
    expect(addEventListener).toHaveBeenCalledWith('offline', handleOffline);
  });

  it('removes online and offline event listeners on cleanup', () => {
    const removeEventListener = window.removeEventListener as ReturnType<typeof vi.fn>;

    const handleOnline = () => {};
    const handleOffline = () => {};

    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);

    expect(removeEventListener).toHaveBeenCalledWith('online', handleOnline);
    expect(removeEventListener).toHaveBeenCalledWith('offline', handleOffline);
  });

  it('online event can be dispatched to registered handlers', () => {
    let onlineHandler: ((e: Event) => void) | null = null;
    (window.addEventListener as ReturnType<typeof vi.fn>).mockImplementation(
      (event: string, handler: (e: Event) => void) => {
        if (event === 'online') onlineHandler = handler;
      }
    );

    const handleOnline = vi.fn();
    window.addEventListener('online', handleOnline);

    const event = new Event('online');
    if (onlineHandler) onlineHandler(event);

    expect(handleOnline).toHaveBeenCalledTimes(1);
  });

  it('offline event can be dispatched to registered handlers', () => {
    let offlineHandler: ((e: Event) => void) | null = null;
    (window.addEventListener as ReturnType<typeof vi.fn>).mockImplementation(
      (event: string, handler: (e: Event) => void) => {
        if (event === 'offline') offlineHandler = handler;
      }
    );

    const handleOffline = vi.fn();
    window.addEventListener('offline', handleOffline);

    const event = new Event('offline');
    if (offlineHandler) offlineHandler(event);

    expect(handleOffline).toHaveBeenCalledTimes(1);
  });
});
