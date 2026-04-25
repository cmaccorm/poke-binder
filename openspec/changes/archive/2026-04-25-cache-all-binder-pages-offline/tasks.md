## 1. Add IndexedDB helpers for full-binder caching

- [x] 1.1 Add `getCachedPagesForBinder(binderId: string): Promise<BinderPage[]>` to `src/lib/offline-store.ts` — retrieves all cached pages for a given binder ID from the `pages` store
- [x] 1.2 Add `areAllPagesCached(binderId: string, pageCount: number): Promise<boolean>` to `src/lib/offline-store.ts` — checks whether all N pages of a binder exist in the `pages` store

## 2. Persist SSR initial page to IndexedDB in BinderViewer

- [x] 2.1 In `src/components/BinderViewer.tsx` mount `useEffect`, add `await cachePage(binder.id, initialPage, initialPageData)` after `pageCache.current.set` (line 102), so the SSR-provided page is immediately persisted to IndexedDB

## 3. Add `isCaching` state to BinderViewer

- [x] 3.1 Add `const [isCaching, setIsCaching] = useState(false)` and `const isCachingRef = useRef(false)` to `src/components/BinderViewer.tsx` — state drives the UI indicator, ref prevents duplicate cache passes

## 4. Implement full-page background cache pass

- [x] 4.1 In the mount `useEffect` in `src/components/BinderViewer.tsx`, after prefetching adjacent pages, iterate from `0` to `binder.pageCount - 1` and call `fetchPage(index)` for any page not already in `pageCache.current`
- [x] 4.2 Wrap the full-page iteration in a check: only run if `!isCachingRef.current` (set it to `true` before starting, `false` after completing)
- [x] 4.3 Use `await Promise.allSettled(promises)` so partial failures don't reject the whole pass

## 5. Add caching-in-progress indicator UI

- [x] 5.1 In `src/components/BinderViewer.tsx`, add a small inline indicator (e.g., below the binder header or as a toast) that renders when `isCaching` is `true` and shows text such as \"Caching for offline...\"
- [x] 5.2 The indicator must not block or interfere with page navigation or any user interaction

## 6. Verify and test

- [x] 6.1 Run `npm run lint` and fix any errors
- [x] 6.2 Run `npx vitest run` to ensure existing tests pass
- [x] 6.3 Manually verify offline behavior: open a binder online (all pages), switch to airplane mode, open the same binder — all pages should be navigable without the \"not available offline\" message