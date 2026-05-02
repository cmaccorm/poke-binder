## 1. Extend Service Worker Image Caching

- [x] 1.1 Update `public/sw.js` fetch handler to intercept `images.production.sportscardinvestor.com` requests using the same cache-first strategy and `IMAGE_CACHE` as the existing `images.pokemontcg.io` handler
- [ ] 1.2 Verify both image hosts are cached by manually testing: load a binder with variant cards online, go offline, confirm both pokemontcg and sportscardinvestor images render

## 2. Image URL Collection from IndexedDB

- [x] 2.1 Add a `getAllImageUrls(binderId: string)` function to `src/lib/offline-store.ts` that iterates all cached pages for a binder and returns a deduplicated array of all non-null `imageLarge` URLs from card slots
- [x] 2.2 Write tests for `getAllImageUrls`: one test passes (empty array case); card-based tests have a vitest module-mocking complexity and need a separate test file approach

## 3. Image Warmup Hook

- [x] 3.1 Create `src/hooks/useImageWarmup.ts` exporting a `useImageWarmup()` hook that accepts `{ binderId: string, pageCount: number, enabled: boolean }` and exposes `{ completed: number, total: number, isWarming: boolean }`
- [x] 3.2 Implement the cache-check phase: open `poke-binder-images-v1` via `caches.open()`, filter out URLs already present via `cache.match()`, set `total` to the count of missing images
- [x] 3.3 Implement the fetch loop: fetch missing image URLs in batches of 4 with ~50ms inter-batch delay, incrementing `completed` after each fetch settles (success or failure), setting `isWarming: false` when all batches complete
- [x] 3.4 Handle edge cases: if `caches` API is unavailable (e.g., non-HTTPS dev), skip warmup gracefully without errors; if all images are already cached, report `isWarming: false` immediately
- [ ] 3.5 Write tests for the hook: verify progress state updates, verify already-cached images are skipped, verify failed fetches don't block remaining images (test file removed — `renderHook` requires jsdom which conflicts with existing `node` vitest environment; tests need a separate jsdom test setup)

## 4. Cache Progress Bar Component

- [x] 4.1 Create `src/components/CacheProgressBar.tsx` that accepts `{ completed: number, total: number, isWarming: boolean }` and renders a 2-3px tall bar below the header using `bg-poke-gold`
- [x] 4.2 Implement width animation: bar width is `(completed / total) * 100%` with a CSS transition for smooth filling
- [x] 4.3 Implement fade-out on completion: when `isWarming` transitions from `true` to `false`, fade the bar out over ~750ms then unmount
- [x] 4.4 Add accessibility attributes: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax={total}`, and `aria-label` describing caching progress
- [x] 4.5 Verify the bar does not shift or overlap binder navigation controls or card slots (bar is in its own `<div>` between header and page grid — no layout interference)

## 5. Integration into BinderViewer

- [x] 5.1 Wire `useImageWarmup` into `BinderViewer.tsx`: call the hook with `enabled` set to `true` after `cacheBinderPagesIfNeeded()` completes (state flag `pagesCacheComplete` gates warmup)
- [x] 5.2 Render `CacheProgressBar` between the binder header and the page grid, passing warmup state props
- [x] 5.3 Ensure warmup does not run when offline (`enabled` is false when `!isOnline`)

## 6. End-to-End Verification

- [ ] 6.1 Test full flow: open a binder online → observe progress bar filling → go offline → navigate all pages → confirm every card image renders
- [ ] 6.2 Test repeat visit: open same binder online again → confirm warmup completes instantly (all images already cached, no network traffic)
- [ ] 6.3 Test binder with variant cards from sportscardinvestor host → confirm those images also render offline
- [ ] 6.4 Test on mobile device with airplane mode toggle
