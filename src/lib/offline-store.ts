import { openDB, type IDBPDatabase } from 'idb';
import type { BinderIdentity, BinderPage } from '@/lib/types';

const DB_NAME = 'pokebinder-offline';
const DB_VERSION = 1;

type BinderCacheEntry = {
  binders: BinderIdentity[];
  cachedAt: number;
};

type OfflineDBSchema = {
  binders: {
    key: string;
    value: BinderCacheEntry;
  };
  pages: {
    key: string;
    value: {
      binderId: string;
      pageIndex: number;
      page: BinderPage;
    };
  };
};

let dbPromise: Promise<IDBPDatabase<OfflineDBSchema>> | null = null;

function getDB(): Promise<IDBPDatabase<OfflineDBSchema>> | null {
  if (typeof indexedDB === 'undefined') return null;
  if (!dbPromise) {
    dbPromise = openDB<OfflineDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('binders')) {
          db.createObjectStore('binders');
        }
        if (!db.objectStoreNames.contains('pages')) {
          db.createObjectStore('pages');
        }
      },
    }).catch(() => null as unknown as IDBPDatabase<OfflineDBSchema>);
  }
  return dbPromise;
}

export async function cacheBinders(binders: BinderIdentity[]): Promise<void> {
  try {
    const db = await getDB();
    if (!db) return;
    await db.put('binders', { binders, cachedAt: Date.now() }, 'shelf');
  } catch {
    // Silently fail — offline cache is non-critical
  }
}

export async function getCachedBinders(): Promise<BinderIdentity[] | null> {
  try {
    const db = await getDB();
    if (!db) return null;
    const result = await db.get('binders', 'shelf');
    return result?.binders ?? null;
  } catch {
    return null;
  }
}

export async function getCacheTimestamp(): Promise<number | null> {
  try {
    const db = await getDB();
    if (!db) return null;
    const result = await db.get('binders', 'shelf');
    return result?.cachedAt ?? null;
  } catch {
    return null;
  }
}

export async function cachePage(
  binderId: string,
  pageIndex: number,
  page: BinderPage
): Promise<void> {
  try {
    const db = await getDB();
    if (!db) return;
    const key = `${binderId}:${pageIndex}`;
    await db.put('pages', { binderId, pageIndex, page }, key);
  } catch {
    // Silently fail — offline cache is non-critical
  }
}

export async function getCachedPage(
  binderId: string,
  pageIndex: number
): Promise<BinderPage | null> {
  try {
    const db = await getDB();
    if (!db) return null;
    const key = `${binderId}:${pageIndex}`;
    const result = await db.get('pages', key);
    return result?.page ?? null;
  } catch {
    return null;
  }
}

export async function getCachedPagesForBinder(binderId: string): Promise<BinderPage[]> {
  try {
    const db = await getDB();
    if (!db) return [];
    const pages: BinderPage[] = [];
    const cursor = await db.transaction('pages').store.openCursor();
    let current = cursor;
    while (current) {
      const val = current.value;
      if (val.binderId === binderId) {
        pages.push(val.page);
      }
      current = await current.continue();
    }
    return pages;
  } catch {
    return [];
  }
}

export async function areAllPagesCached(binderId: string, pageCount: number): Promise<boolean> {
  try {
    const db = await getDB();
    if (!db) return false;
    let cachedCount = 0;
    const tx = db.transaction('pages');
    const cursor = await tx.store.openCursor();
    let current = cursor;
    while (current) {
      const val = current.value;
      if (val.binderId === binderId) {
        cachedCount++;
      }
      current = await current.continue();
    }
    return cachedCount >= pageCount;
  } catch {
    return false;
  }
}

export async function clearOfflineCache(): Promise<void> {
  try {
    const db = await getDB();
    if (!db) return;
    await db.clear('binders');
    await db.clear('pages');
  } catch {
    // Silently fail
  }
}
