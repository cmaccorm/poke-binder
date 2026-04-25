## 1. Online Status Hook

- [x] 1.1 Create `src/hooks/useOnlineStatus.ts` hook using `navigator.onLine` + `online`/`offline` event listeners
- [x] 1.2 Write tests for the hook (initial state, event transitions)

## 2. IndexedDB Offline Store

- [x] 2.1 Add `idb` dependency to `package.json`
- [x] 2.2 Create `src/lib/offline-store.ts` with IndexedDB schema (`pokebinder-offline` database, `binders` and `pages` object stores)
- [x] 2.3 Implement `cacheBinders(binders: BinderIdentity[])` and `getCachedBinders(): Promise<BinderIdentity[] | null>`
- [x] 2.4 Implement `cachePage(binderId: string, pageIndex: number, page: BinderPage)` and `getCachedPage(binderId: string, pageIndex: number): Promise<BinderPage | null>`
- [x] 2.5 Add graceful fallback when IndexedDB is unavailable (catch errors, return null)
- [x] 2.6 Write tests for the offline store (cache round-trip, missing data returns null, IDB unavailable fallback)

## 3. Service Worker

- [x] 3.1 Evaluate `@serwist/next` compatibility with Next.js 16; if incompatible, set up a manual service worker
- [x] 3.2 Create the service worker that precaches the app shell (HTML, JS, CSS, fonts)
- [x] 3.3 Add cache-first image interception for `images.pokemontcg.io` requests in the service worker
- [x] 3.4 Configure `skipWaiting` and `clientsClaim` for prompt SW updates
- [x] 3.5 Register the service worker from the app layout
- [x] 3.6 Test SW caching: verify app shell loads offline, verify card images load offline

## 4. Offline-Aware Shelf

- [x] 4.1 Update `Shelf.tsx` to cache fetched binder list to IndexedDB after successful API response
- [x] 4.2 Update `Shelf.tsx` to load binder list from IndexedDB when offline (network-first strategy)
- [x] 4.3 Disable '+ New Binder' button in `Header.tsx` when offline using the `useOnlineStatus` hook

## 5. Offline-Aware Binder Viewer

- [x] 5.1 Update `BinderViewer.tsx` `fetchPage` to cache each page response to IndexedDB
- [x] 5.2 Update `BinderViewer.tsx` `fetchPage` to fall back to IndexedDB when network request fails
- [x] 5.3 Show 'binder not available offline' message when offline and no cached data exists
- [x] 5.4 Disable edit mode toggle when offline
- [x] 5.5 Disable card detail modal when offline — show 'Card details unavailable offline' notification on card tap
- [x] 5.6 Suppress `lastViewedPage` persistence when offline (the fire-and-forget fetch will fail silently, verify this)

## 6. Online/Offline Header Indicator

- [x] 6.1 Add an online/offline status indicator to `Header.tsx` (small pill/dot with label)
- [x] 6.2 Wire the indicator to the `useOnlineStatus` hook for real-time updates

## 7. Integration Testing

- [ ] 7.1 Test full offline flow: load shelf online → open binder → go offline → reload → verify shelf and binder render from cache
- [ ] 7.2 Test on a real mobile device with airplane mode
- [ ] 7.3 Verify no errors when IndexedDB is unavailable (e.g., incognito mode)
