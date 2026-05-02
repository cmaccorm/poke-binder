## Context

PokeBinder's offline mode (from `offline-binder-viewing`) caches binder data (JSON) in IndexedDB and relies on the service worker to cache card images opportunistically via the Cache API. The SW intercepts `images.pokemontcg.io` fetches and stores responses cache-first. However, images are only cached when the browser actually renders them — meaning only the current page's images enter the cache. Pages the user hasn't scrolled to, and all images from the custom variant host `images.production.sportscardinvestor.com`, are never cached.

The existing `cacheBinderPagesIfNeeded()` in `BinderViewer.tsx` already prefetches all binder page JSON into IndexedDB. This gives us a reliable source of every image URL in the binder, but no mechanism currently forces those image URLs through the service worker.

## Goals / Non-Goals

**Goals:**
- Every card image in a binder is cached by the time the user goes offline
- Images from both `images.pokemontcg.io` and `images.production.sportscardinvestor.com` are cached
- The user sees a non-intrusive progress indicator showing caching progress
- The warmup process does not degrade the browsing experience (throttled, background)

**Non-Goals:**
- Caching images for binders the user hasn't opened (only the active binder is warmed)
- Pre-caching the entire PokéTCG image catalog
- Offline card search images
- Replacing the existing cache-on-render behavior (warmup supplements it)

## Decisions

### 1. Image warmup: Client-driven fetch loop, not SW-initiated

The client collects all unique image URLs from IndexedDB-cached binder pages and issues `fetch()` calls in small batches. Because the SW already intercepts `images.pokemontcg.io` (and will intercept `images.production.sportscardinvestor.com` after this change), these fetches automatically populate the SW cache.

**Rationale:** The client already has all image URLs in IndexedDB page data. Driving fetches from the client means the SW's existing cache-on-fetch logic handles storage with zero new SW complexity. The client also naturally tracks progress (completed / total).

**Alternative considered:** SW `postMessage` + SW-initiated fetch loop. More complex, harder to track progress from the UI, and the SW doesn't inherently know which images belong to a binder.

### 2. SW cache query: Use `caches.match()` from the client to skip already-cached images

Before starting the warmup, the client opens the `poke-binder-images-v1` cache directly via `caches.open()` and checks which image URLs are already present. Only missing URLs are fetched. This avoids redundant network traffic on repeat visits.

**Rationale:** The Cache API is accessible from both the SW and the main thread. Querying it directly is simpler and faster than round-tripping through `postMessage`.

**Alternative considered:** Always re-fetch all images (relying on HTTP 304s). Wasteful on metered connections and slower.

### 3. Batch size and throttling: 4 concurrent fetches with 50ms inter-batch delay

Image warmup fetches are dispatched in batches of 4 with a short delay between batches. This prevents flooding the network and competing with user-initiated requests (page navigation, card interactions).

**Rationale:** Card images are typically 50-150KB each. 4 concurrent fetches saturate a typical mobile connection without starving other requests. The 50ms delay yields to the event loop and keeps the UI responsive.

**Alternative considered:** `requestIdleCallback`-based scheduling. Too unpredictable — on busy pages it might never run. A simple throttled loop is more reliable.

### 4. Progress indicator: Thin progress bar below the binder viewer header

A 2-3px tall progress bar rendered just below the binder header, using the existing `poke-gold` color. It fills from 0% to 100% as images are cached, then fades out. No text overlay by default — the bar alone communicates progress. An accessible `aria-label` provides the numeric progress for screen readers.

**Rationale:** A bar is the least intrusive visual element that still communicates "something is loading." It doesn't obscure card images or interfere with binder navigation. It matches the existing UI aesthetic.

**Alternative considered:** A pill/badge like "Caching 42/318". More informative but more visually noisy for something that runs in the background. Could be added later if users want more detail.

### 5. Extend SW hostname check to include custom image host

The SW's fetch handler currently checks `url.hostname === 'images.pokemontcg.io'`. This will be extended to also match `images.production.sportscardinvestor.com`, using the same `IMAGE_CACHE` and same cache-first strategy.

**Rationale:** Custom variant images are served from this host. Without caching them, Reverse Holo and other variant cards show as broken images offline.

**Alternative considered:** A separate cache for each host. Unnecessary complexity — the images serve the same purpose and share the same lifecycle.

### 6. Warmup trigger: After `cacheBinderPagesIfNeeded()` completes

The warmup runs after the existing page-data prefetch completes, since it needs all page data in IndexedDB to know which image URLs exist. It runs once per binder open (when online), gated by the same staleness check that gates page caching.

**Rationale:** Piggybacking on the existing cache-freshness check avoids adding a separate timer or staleness mechanism. The page data must be cached first anyway.

### 7. Warmup state management: A simple hook (`useImageWarmup`)

A custom hook encapsulates the warmup lifecycle: `{ progress, total, isWarming }`. `BinderViewer` calls it after page caching completes. The hook manages the fetch loop internally and exposes reactive state for the progress bar.

**Rationale:** Keeps `BinderViewer` clean — it just consumes progress state. The hook is testable in isolation.

## Risks / Trade-offs

**[Mobile data usage]** → Warming all images proactively uses network bandwidth. Mitigated by: (a) only warming the active binder, (b) skipping already-cached images, (c) typical binder is 10-30 pages × 4-12 cards × ~100KB = 4-36MB, which is reasonable for a one-time cache fill. A future enhancement could add a "Cache for offline" explicit button instead of auto-warming, but auto-warm is simpler and matches user expectation.

**[Race condition with page navigation]** → User might navigate pages while warmup is running. Mitigated by: warmup fetches are fire-and-forget background requests that don't mutate UI state. The progress bar reads from a counter, not from page data.

**[Cache eviction by browser]** → Browsers may evict Cache API entries under storage pressure. Mitigated by: this is an existing risk for all SW-cached images, not new. The warmup re-runs on each binder open if the staleness check passes.

**[Large binders]** → A binder with 100 pages × 12 cards = 1200 images could take a while. At 4 concurrent fetches × ~200ms each, that's ~60 seconds. The progress bar makes this visible and acceptable. Most binders are much smaller.
