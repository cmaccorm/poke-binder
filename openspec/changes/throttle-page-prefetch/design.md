## Context

`BinderViewer` has an offline caching feature that, on mount, fetches every page in the binder to populate IndexedDB. The current implementation fires all fetches simultaneously via `Promise.allSettled(missingPages.map(fetchPage))`. For a 20-page binder, this sends ~18 parallel requests to `/api/binders/[id]/pages/[n]`.

On Vercel, each request maps to a serverless function instance that opens a connection to Supabase's PgBouncer pool. Supabase free tier provides ~20 pooled connections. The parallel burst exhausts this pool, causing `P2024` timeout errors that cascade — subsequent requests (including the user's active page navigation) queue behind the saturated pool and also fail.

The existing adjacent-page prefetch in `loadPage` (current ± 1) is fine — it's only 2 requests. The problem is exclusively the bulk offline-caching `useEffect`.

## Goals / Non-Goals

**Goals:**
- Limit concurrent API requests during offline caching to at most 2 at a time
- Prioritize pages closest to the user's current position (outward spiral)
- Keep the app fully functional during background caching (no blocking of user navigation)
- Preserve existing offline caching completeness — all pages still get cached eventually

**Non-Goals:**
- Changing the API layer or adding a batch endpoint (too large a change for this fix)
- Modifying PgBouncer or Supabase configuration
- Adding retry logic for failed page fetches during caching
- Changing the adjacent-page prefetch in `loadPage` (that's only 2 requests and is fine)

## Decisions

### 1. Concurrency limit of 2

**Choice**: Fetch at most 2 pages concurrently during background caching.

**Rationale**: With `connection_limit=5` in the DATABASE_URL and ~20 PgBouncer connections on free tier, 2 concurrent background fetches leaves headroom for the user's active navigation requests and the `lastViewedPage` debounced update. The math: 2 background + 1 active navigation + 1 lastViewedPage = 4 concurrent requests max, well within limits.

**Alternative considered**: Fully sequential (1 at a time). Rejected because it would make caching very slow for large binders (20 pages × ~200ms each = 4 seconds vs 2 seconds with concurrency 2).

### 2. Proximity-ordered fetch queue

**Choice**: Sort missing pages by distance from `initialPage`, ascending. Pages closer to the user's current position are fetched first.

**Rationale**: If the user navigates while caching is in progress, adjacent pages are more likely to be needed. Fetching page 5 before page 19 (when user is on page 4) makes the cache useful sooner.

### 3. Inter-batch delay of 100ms

**Choice**: Add a 100ms `setTimeout` between each batch of 2 fetches.

**Rationale**: Gives PgBouncer time to release connections from the previous batch back to the pool. Without this, even sequential batches can overlap at the TCP level. 100ms is imperceptible to the user but meaningful for connection recycling.

### 4. Implement inline — no utility extraction

**Choice**: Implement the throttled loop directly in the `useEffect` in `BinderViewer.tsx`.

**Rationale**: This is a single-use pattern specific to offline caching. Extracting a generic `throttledMap` utility would be premature abstraction. If we need throttling elsewhere later, we can extract then.

## Risks / Trade-offs

- **[Trade-off] Slower offline caching** → A 20-page binder takes ~2-3 seconds instead of <1 second. Acceptable because the app stays functional throughout, and the "Caching for offline..." indicator already sets user expectations.

- **[Risk] User navigates during caching, causing additional requests** → The `loadPage` function fires its own adjacent-page prefetches. These could overlap with background caching fetches. Mitigation: The `fetchPage` function already returns from `pageCache` if the page is cached, so overlapping fetches for the same page are deduplicated at the cache layer.

- **[Risk] Component unmounts during caching loop** → The async loop could continue fetching after the user navigates away. Mitigation: Use an AbortController or a `cancelled` ref flag to stop the loop on unmount.
