## Why

Card images are the most important visual element of a binder, yet the current offline mode only caches images that the browser happened to render while online. Users who navigate a few pages then go offline find most card images missing — especially on pages they haven't scrolled to and for cards with custom variant images hosted on `images.production.sportscardinvestor.com`. This defeats the purpose of offline viewing at card shows and tournaments.

## What Changes

- Add a proactive image warmup pass that prefetches every card image URL across all cached binder pages when the user is online, ensuring the Service Worker Cache API holds a complete set of images before the user goes offline
- Extend the service worker to cache images from `images.production.sportscardinvestor.com` in addition to the existing `images.pokemontcg.io` host
- Add a non-intrusive progress indicator (thin bar or subtle pill) in the binder viewer that shows image caching progress so the user knows when their binder is fully available offline
- Communicate via `postMessage` between the client and service worker so the client can track which images are already cached vs. still pending

## Capabilities

### New Capabilities
- `image-warmup`: Background image prefetch system that collects all unique image URLs from cached binder pages and proactively fetches them through the service worker, with progress tracking via SW `postMessage` communication
- `cache-progress-indicator`: Non-intrusive UI element in the binder viewer that displays image caching progress (e.g. thin progress bar or small pill showing "Caching images 42/318") and disappears when caching is complete

### Modified Capabilities
- `service-worker`: Extend image caching to cover `images.production.sportscardinvestor.com` alongside the existing `images.pokemontcg.io` host; add `postMessage` handler for cache status queries from the client

## Impact

- **Modified files**: `public/sw.js` (add second image host, add postMessage handler), `src/components/BinderViewer.tsx` (trigger warmup, render progress indicator), `src/lib/offline-store.ts` (add helper to collect all image URLs from cached pages)
- **New files**: `src/lib/image-warmup.ts` (warmup orchestration + SW communication), `src/components/CacheProgressBar.tsx` (progress indicator component)
- **No database changes**: No schema migrations needed
- **No API changes**: Existing API routes remain unchanged
- **No new dependencies**: Uses existing Service Worker Cache API and `postMessage`
