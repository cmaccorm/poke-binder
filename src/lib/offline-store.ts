import { openDB, type IDBPDatabase } from 'idb';
import type { BinderIdentity, BinderPage } from '@/lib/types';

const DB_NAME = 'pokebinder-offline';
const DB_VERSION = 1;

type OfflineDBSchema = {
  binders: {
    key: string;
    value: BinderIdentity[];
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
    await db.put('binders', binders, 'shelf');
  } catch {
    // Silently fail — offline cache is non-critical
  }
}

export async function getCachedBinders(): Promise<BinderIdentity[] | null> {
  try {
    const db = await getDB();
    if (!db) return null;
    const result = await db.get('binders', 'shelf');
    return result ?? null;
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
