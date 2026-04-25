## Context

PokeBinder is a Next.js 16 App Router application. All data flows through server-side Prisma queries to PostgreSQL. Card images are served from `images.pokemontcg.io`. The binder viewer page (`/binder/[binderId]`) uses a server component for initial data load, then a client-side `BinderViewer` with an in-memory page cache (`Map`). The shelf page fetches binder list via `/api/binders`.

The app has no offline capability today. Every interaction requires network access to the Next.js server.

## Goals / Non-Goals

**Goals:**
- App shell loads instantly even with no network
- Previously-viewed binders are browsable offline (all pages + card images)
- User can clearly see whether they are online or offline
- Features that require network are visibly disabled when offline
- Cached data stays fresh via network-first strategy (always prefer live data, fall back to cache)

**Non-Goals:**
- Offline binder creation or editing (requires server)
- Offline card search (requires PokéTCG API)
- Background sync or offline write queues
- Full local-first architecture with conflict resolution
- JSON export/import of binders

## Decisions

### 1. Service Worker tooling: `@serwist/next` over `next-pwa`

`next-pwa` is poorly maintained and has compatibility issues with App Router. `@serwist/next` is the actively maintained successor with first-class App Router support. If `@serwist/next` proves problematic with Next.js 16, fall back to a manual service worker registered from `src/app/layout.tsx`.

**Alternative considered:** Manual SW with no library. Viable but requires more boilerplate for precaching the app shell build artifacts.

### 2. Image caching: Service Worker Cache API over IndexedDB blobs

Card images from `images.pokemontcg.io` will be cached by the service worker using the Cache API with a cache-first strategy. The SW intercepts fetch requests for image URLs and serves from cache when available.

This is simpler than storing blobs in IndexedDB because:
- No need to convert image URLs to blob URLs in components
- `<img src="...">` tags work unchanged — the SW transparently intercepts
- Cache API is purpose-built for HTTP response caching

**Alternative considered:** Storing images as blobs in IndexedDB and rewriting `src` attributes to `URL.createObjectURL()`. More complex, no real benefit for read-only use.

### 3. Data caching: IndexedDB with `idb` wrapper

Binder data (binder list, pages with slots and card references) will be stored in IndexedDB using the `idb` library (~3KB gzipped) for ergonomic async/await access.

**Schema:**
```
Database: pokebinder-offline
  Store: "binders"    → key: "shelf"         → BinderIdentity[]
  Store: "pages"      → key: "{binderId}:{pageIndex}" → BinderPage
```

**Strategy:** Network-first for data. When online, fetch from API and update the cache. When offline, read from IndexedDB. This ensures cached data is always as fresh as the last successful fetch.

**Alternative considered:** `localStorage`. Too small (5MB limit), synchronous API blocks rendering, no structured data support.

### 4. Server component offline fallback: Client-side wrapper

The binder page entry point (`src/app/binder/[binderId]/page.tsx`) is a server component that fetches data via Prisma. When offline, the server is unreachable, so this component can't render.

**Approach:** The service worker caches the app shell. When offline, the SW serves a cached HTML shell. `BinderViewer` detects offline status on mount and loads data from IndexedDB instead of relying on server-provided props. If no cached data exists for the requested binder, show a "this binder isn't available offline" message.

Similarly, `Shelf` will check IndexedDB for the cached binder list when offline.

### 5. Online/offline detection: `navigator.onLine` + event listeners

Use `navigator.onLine` for initial state, plus `online`/`offline` window events for live updates. Expose via a shared React hook (`useOnlineStatus`). This is simple and sufficient — no need for heartbeat pings or server health checks.

### 6. Card detail modal: Disabled when offline

`CardDetailModal` fetches full card metadata (price, artist, types) from the PokéTCG API at click time. Rather than caching this additional data, simply disable the modal when offline. The user still sees card images in the binder grid — they just can't tap for the detail overlay.

Show a brief toast or tooltip: "Card details unavailable offline."

## Risks / Trade-offs

**[Stale cache]** → Users see data from their last online session. Mitigated by network-first strategy — cache is always updated when online. Could show "Last synced: X ago" in the offline indicator if staleness becomes confusing.

**[Service worker update lifecycle]** → SW updates are notoriously tricky. Stale SW versions can serve outdated app shells. Mitigated by using `@serwist/next`'s built-in update handling with `skipWaiting` + `clientsClaim`. Test thoroughly on real devices.

**[IndexedDB in private browsing]** → Some browsers limit or disable IndexedDB in private/incognito mode. Mitigated by graceful fallback — if IDB is unavailable, the app works normally when online, just without offline support. No crash, no error.

**[Storage quota]** → IndexedDB + Cache API share a storage quota (varies by browser, typically 50%+ of free disk space). For our use case (a few MB of JSON + tens of MB of images), this is not a practical concern.

**[Server component hydration mismatch]** → When serving cached HTML offline, the server-rendered props won't match client-loaded IDB data. Need to handle this carefully — either use a loading state during IDB read, or structure the offline path to avoid hydration of server-provided data entirely.
