## Context

The app has a working offline mode: an `isOnline` flag from `useOnlineStatus`, IndexedDB caching of binder lists and page data via `offline-store.ts`, and a hand-written service worker (`public/sw.js`) that precaches the `/` and `/binder` app shell plus card images. However, navigating from the shelf to a binder while offline fails because `router.push('/binder/[id]')` triggers a Next.js RSC payload fetch to the server, which the service worker cannot serve from cache.

The binder detail page (`src/app/binder/[binderId]/page.tsx`) is a server component that runs Prisma queries — it fundamentally cannot render without server access. Meanwhile, `BinderViewer` (the client component it renders) already handles offline gracefully once mounted: it falls back to IndexedDB for page data, disables editing, and suppresses network writes.

## Goals / Non-Goals

**Goals:**
- Clicking a binder while offline opens the binder viewer using cached IndexedDB data, with no server roundtrip
- Refreshing a `/binder/*` URL while offline lands on a functional page (the shelf) rather than the browser's native offline error
- Online behavior remains completely unchanged
- The solution uses existing infrastructure (IndexedDB store, `useOnlineStatus` hook, `BinderViewer` component)

**Non-Goals:**
- Full PWA installability (manifest, install prompt) — out of scope
- Offline editing or write-back queue — existing offline mode is read-only and stays that way
- Caching RSC payloads in the service worker — too fragile and tightly coupled to Next.js internals
- Pre-caching all binder pages — only previously-viewed pages are available offline

## Decisions

### 1. Inline rendering in Shelf vs. client-side `/binder` route

**Decision**: Render `BinderViewer` inline within `Shelf.tsx` when offline.

**Alternatives considered**:
- *Offline HTML fallback page* (`/offline.html` with its own JS to read IndexedDB): Would duplicate UI outside Next.js, require maintaining a separate rendering path, and couldn't reuse existing React components.
- *Convert binder page to a client component*: Would sacrifice the server-side data fetching benefits for the online path, and would be a larger architectural change.
- *Cache RSC payloads in SW*: Next.js RSC payload format is internal and versioned — caching it is fragile across deployments.

**Rationale**: Inline rendering is the smallest change. `Shelf.tsx` already has `isOnline` and access to `getCachedPage`. `BinderViewer` already works offline once mounted. We just need to skip the navigation step and mount it directly.

**Trade-off**: The URL stays on `/` when viewing a binder offline. This is acceptable because offline mode is a degraded experience by nature, and avoids all complexity around RSC payload handling.

### 2. `onBack` callback prop on BinderViewer

**Decision**: Add an optional `onBack?: () => void` prop to `BinderViewer`. When provided, the back/home button calls `onBack()` instead of `router.push('/')`.

**Rationale**: `BinderViewer` currently navigates back via `router.push('/')`. When rendered inline on the shelf, we need to unmount it by clearing parent state, not by navigating. An optional callback is the minimal interface change — the server-rendered online path simply doesn't pass the prop and behavior is unchanged.

### 3. Service worker navigation fallback

**Decision**: For `mode === 'navigate'` requests to same-origin URLs matching `/binder/*`, use network-first with a fallback to the cached `/` HTML response.

**Rationale**: This handles the edge case of a direct URL load or browser refresh on `/binder/[id]` while offline. Serving the cached `/` shell means the user lands on the shelf (which loads cached binders from IndexedDB) rather than the browser's error page. This is a graceful degradation — the user can then tap the binder to open it inline.

**Implementation detail**: The SW fetch handler currently uses cache-first for `/binder*` paths. The change is to detect `mode === 'navigate'` requests separately and use network-first-then-cache-fallback for those, while keeping cache-first for static asset subrequests (`/_next/static/*`).

## Risks / Trade-offs

- **[Stale offline data]** → Accepted. IndexedDB data is only as fresh as the last online visit. This is already the case for the shelf; extending it to binder pages is consistent.
- **[URL doesn't reflect binder route offline]** → Accepted trade-off for simplicity. Users in offline mode are in a degraded experience; correct URL routing is low priority vs. functional binder viewing.
- **[SW fallback serves shelf for binder URLs]** → The user sees their binder list and can re-open the binder. This is better than a browser error page. If the page data isn't cached, `BinderViewer` already shows an "offline unavailable" state.
- **[Race condition: go offline mid-navigation]** → If `isOnline` flips during the click handler, `router.push` may still fire. The SW navigation fallback catches this case by serving the cached shell.
