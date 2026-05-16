import { useState, useEffect, useRef } from 'react';
import { getAllImageUrls } from '@/lib/offline-store';

const IMAGE_CACHE_NAME = 'poke-binder-images-v1';
const BATCH_SIZE = 4;
const BATCH_DELAY_MS = 50;

export function useImageWarmup({
  binderId,
  pageCount,
  enabled,
}: {
  binderId: string;
  pageCount: number;
  enabled: boolean;
}): {
  completed: number;
  total: number;
  isWarming: boolean;
} {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [isWarming, setIsWarming] = useState(false);
  const warmupStartedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (warmupStartedRef.current) return;
    warmupStartedRef.current = true;

    let cancelled = false;

    async function getMissingUrls(urls: string[]): Promise<string[]> {
      if (typeof caches === 'undefined') return urls;
      try {
        const cache = await caches.open(IMAGE_CACHE_NAME);
        const results: (string | null)[] = [];
        for (const url of urls) {
          const match = await cache.match(url);
          results.push(match ? null : url);
        }
        return results.filter((u): u is string => u !== null);
      } catch {
        return urls;
      }
    }

    async function runWarmup() {
      const urls = await getAllImageUrls(binderId);
      if (cancelled || urls.length === 0) {
        if (!cancelled) setIsWarming(false);
        return;
      }

      const missingUrls = await getMissingUrls(urls);

      if (cancelled) return;

      if (missingUrls.length === 0) {
        setCompleted(urls.length);
        setTotal(urls.length);
        setIsWarming(false);
        return;
      }

      setTotal(missingUrls.length);
      setIsWarming(true);
      setCompleted(0);

      let completedCount = 0;

      while (completedCount < missingUrls.length && !cancelled) {
        const batch = missingUrls.slice(
          completedCount,
          completedCount + BATCH_SIZE
        );
        const batchResults = await Promise.allSettled(
          batch.map((url) => fetch(url))
        );
        completedCount += batchResults.length;
        setCompleted(completedCount);

        if (completedCount < missingUrls.length) {
          await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
        }
      }

      if (!cancelled) {
        setIsWarming(false);
      }
    }

    runWarmup().catch(() => {
      if (!cancelled) setIsWarming(false);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, binderId, pageCount]);

  return { completed, total, isWarming };
}