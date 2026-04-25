## Why

When a user opens a binder, `BinderViewer` fires `Promise.allSettled(missingPages.map(fetchPage))` — fetching **every** page in parallel to populate the offline cache. For a binder with 20 pages, this sends 18+ concurrent API requests simultaneously (minus the initial page and its neighbors). Each request spins up a separate Vercel serverless instance that opens its own connection to PgBouncer. Supabase's free-tier PgBouncer pool (~20 connections) is immediately exhausted, causing `P2024` connection timeout errors that cascade — making the entire app unusable even for a single user.

## What Changes

- Replace the parallel `Promise.allSettled(missingPages.map(fetchPage))` bulk-caching strategy with a **throttled sequential approach** that fetches at most 2 pages concurrently
- Prioritize adjacent pages first (current ± 1, current ± 2, ...) so the user sees useful pages cached before distant ones
- Add a small delay between batches to give PgBouncer time to recycle connections
- Keep the existing "Caching for offline..." UI indicator and the `isCachingRef` guard against duplicate runs

## Capabilities

### New Capabilities

- `throttled-prefetch`: Concurrency-limited page prefetching that stays within database connection pool limits

### Modified Capabilities

_None — the offline caching behavior is new enough that no existing spec covers it._

## Impact

- **Code**: `src/components/BinderViewer.tsx` — the `useEffect` that triggers bulk caching
- **Behavior**: Offline caching still completes, but takes longer (sequential vs parallel). Users on fast connections may notice a slower "Caching for offline..." phase, but the app remains functional throughout.
- **No API changes**: The same `/api/binders/[id]/pages/[n]` endpoints are called, just less aggressively.
- **No new dependencies**: Pure logic change using async/await sequencing.
