## Why

Clicking a binder while offline triggers `router.push('/binder/[id]')`, which requires a server roundtrip for the React Server Component payload. When the network is unavailable, this fetch fails silently and the browser displays its native "you are not connected" error page — even though the app has a working offline indicator and cached binder data in IndexedDB.

## What Changes

- When offline, binder navigation bypasses `router.push()` entirely. Instead, `BinderViewer` renders inline within the Shelf page using binder metadata and page data from IndexedDB.
- `BinderViewer` gains an optional `onBack` callback prop so the inline offline viewer can unmount without triggering a server-dependent navigation.
- The service worker adds a network-first fallback for direct navigations to `/binder/*` routes, serving the cached `/` shell HTML on failure so that a browser refresh while offline lands on the shelf (which already handles offline data loading) instead of the browser's error page.

## Capabilities

### New Capabilities
- `offline-binder-viewing`: Client-side inline binder rendering when offline, including service worker navigation fallback for `/binder/*` routes.

### Modified Capabilities

_(none — the existing offline-mode feature covers the indicator and IndexedDB caching; this change addresses a gap in navigation, not a requirement change to existing specs)_

## Impact

- **Components**: `Shelf.tsx` (adds inline BinderViewer state), `BinderViewer.tsx` (adds optional `onBack` prop and uses it for the back button)
- **Service worker**: `public/sw.js` (new navigation fallback logic)
- **No new dependencies**: Uses existing `offline-store.ts` functions (`getCachedPage`) and `useOnlineStatus` hook
- **No API changes**: All API routes remain unchanged
- **No breaking changes**: Online behavior is entirely unaffected
