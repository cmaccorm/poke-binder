## 1. BinderViewer onBack Prop

- [x] 1.1 Add optional `onBack?: () => void` prop to the `BinderViewerProps` interface in `src/components/BinderViewer.tsx`
- [x] 1.2 Update the back/home button click handler in `BinderViewer` to call `onBack()` when provided, otherwise fall back to `router.push('/')`

## 2. Inline Offline Binder Rendering in Shelf

- [x] 2.1 Add `activeOfflineBinder` state to `Shelf.tsx` holding `{ binder: BinderIdentity, pageData: BinderPage | null } | null`
- [x] 2.2 Update `handleOpen` in `Shelf.tsx`: when `!isOnline`, load page data from IndexedDB via `getCachedPage(binder.id, binder.lastViewedPage)` and set `activeOfflineBinder` state instead of calling `router.push()`
- [x] 2.3 When `activeOfflineBinder` is set, render `<BinderViewer>` with the cached binder data and an `onBack` callback that clears `activeOfflineBinder` back to `null`
- [x] 2.4 Verify that the shelf binder list is hidden when `activeOfflineBinder` is set and re-shown when `onBack` is called

## 3. Service Worker Navigation Fallback

- [x] 3.1 Refactor the fetch handler in `public/sw.js` to detect `event.request.mode === 'navigate'` requests to `/binder/*` paths
- [x] 3.2 For matching navigation requests, use network-first strategy: try `fetch(event.request)`, on failure fall back to `caches.match('/')` (the cached app shell)
- [x] 3.3 Keep existing cache-first behavior for non-navigation requests (`/_next/static/*`, non-navigate `/binder*` subrequests)

## 4. Verification

- [x] 4.1 Test online flow: clicking a binder still navigates to `/binder/[id]` via `router.push()` with no regressions
- [x] 4.2 Test offline flow: clicking a binder renders `BinderViewer` inline with cached data, back button returns to shelf
- [x] 4.3 Test SW fallback: refreshing a `/binder/[id]` URL while offline lands on the shelf instead of browser error page
- [x] 4.4 Run `npm run build` and `npm run lint` to confirm no build or lint errors
