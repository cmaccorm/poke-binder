## Why

The app is unusable in low-connectivity environments like card shows, tournaments, and conventions — the exact places where users most need to check their collection. Every page load, navigation, and card image requires a server round-trip through PostgreSQL and the PokéTCG CDN. With bad cell service, the app shows infinite spinners.

## What Changes

- Add a service worker that caches the app shell (HTML, JS, CSS, fonts) for instant offline loading
- Cache card images via the Service Worker Cache API as they are fetched from `images.pokemontcg.io`
- Add an IndexedDB data layer that auto-caches binder data (binder list, pages, slots, card references) as users browse
- Components fall back to cached data from IndexedDB when the network is unavailable
- Add an online/offline status indicator to the UI header
- Disable the card detail modal when offline (it requires a live API call for price/metadata)
- Disable binder creation and editing when offline (requires server round-trip)

## Capabilities

### New Capabilities
- `service-worker`: Service worker registration, app shell caching, and image caching via Cache API
- `offline-data-store`: IndexedDB-based data layer for caching binder list, pages, and card references with auto-cache-on-load and network-first retrieval strategy
- `offline-ui-indicators`: Online/offline status indicator in the header, disabled states for features that require network (card detail modal, binder creation/editing)

### Modified Capabilities
- `digital-pokemon-binder`: Shelf and BinderViewer components gain offline-aware data fetching — check IndexedDB first when offline, cache API responses when online

## Impact

- **New files**: `public/sw.js` (or equivalent), `src/lib/offline-store.ts`, offline UI indicator component
- **Modified components**: `Header.tsx` (status indicator), `Shelf.tsx` (offline-aware fetching), `BinderViewer.tsx` (offline-aware fetching, disable card detail modal offline), `CardDetailModal.tsx` (disabled state when offline)
- **Server component change**: `src/app/binder/[binderId]/page.tsx` needs a client-side offline wrapper since server components can't run without network
- **New dependency**: Possibly `idb` (~3KB gzipped) for ergonomic IndexedDB access, or `@serwist/next` for service worker integration with Next.js App Router
- **No database changes**: No schema migrations needed
- **No API changes**: Existing API routes remain unchanged
