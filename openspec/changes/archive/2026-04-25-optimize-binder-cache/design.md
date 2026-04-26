## Context

The `BinderViewer` component (src/components/BinderViewer.tsx) currently caches binder page data on every binder open. The caching behavior includes:

1. **On mount** (lines 103-144): If `initialPageData` exists, triggers a full cache of all binder pages with a batched async loop and a 100ms delay between batches
2. **On page navigation** (lines 97-98 in `loadPage`): Calls `fetchPage` for adjacent pages, which caches them
3. **UI indicator** (lines 354-359): Shows a pulsing yellow dot with text during caching

This aggressive caching was intended to ensure offline availability but creates unnecessary network traffic on repeat visits. The timestamp approach already exists in `offline-store.ts` via IndexedDB but is not being utilized.

## Goals / Non-Goals

**Goals:**
- Cache binder pages at most once per hour per binder (not on every open)
- Still cache pages when the user assigns or removes cards (meaningful data changes)
- Remove the persistent caching indicator that shows on every binder open
- Eliminate unnecessary network requests for recently-cached data

**Non-Goals:**
- Do not remove offline caching functionality — it should still work
- Do not cache every page on every navigation
- Do not add complex cache invalidation logic beyond the hourly check

## Decisions

### 1. Store cache timestamp per binder

**Decision:** Add a `cachedAt` timestamp to the IndexedDB binders store, checked on binder open.

**Rationale:** The existing `offline-store.ts` already stores binder data in IndexedDB. Adding a timestamp allows a simple per-binder time check without external state management. When a binder is opened, we check if `cachedAt` is within the last hour — if so, skip full cache. If not, or if data is missing, cache.

**Alternatives considered:**
- Use a global cache timestamp: Would cause all binders to re-cache when any one binder's cache expires, which is less efficient
- Store in localStorage: Duplicates IndexedDB data; IndexedDB is already the source of truth for offline data

### 2. Remove isCaching state and UI indicator

**Decision:** Remove the `isCaching` state variable, `isCachingRef`, `setIsCaching(true/false)` calls, and the associated UI (lines 36, 41, 111-134, 354-359 in BinderViewer.tsx).

**Rationale:** The caching now happens less frequently and only when triggered by user actions (opening a cold binder, assigning a card). A transient indicator is unnecessary since caching is background and non-blocking.

### 3. Stop prefetch-on-navigation caching

**Decision:** Modify `fetchPage` to NOT call `cachePage` when returning a prefetched page (only cache when explicitly loading for display or user action).

**Rationale:** The current `loadPage` triggers prefetch for adjacent pages (lines 97-98), which causes every navigation to cache pages. Prefetch should fetch data into memory only (pageCache), not persist to IndexedDB.

**Implementation:** Add a parameter to `fetchPage` to control whether caching occurs. Default behavior (user-initiated page load) caches; prefetch behavior does not.

### 4. Cache on card operations

**Decision:** When a card is assigned to a slot or removed from a slot, cache the updated page data immediately.

**Rationale:** This ensures the offline view remains current for data the user just modified. The page data has clearly changed, so a fresh cache is warranted.

**Implementation:** After `handleCardSelected` (PUT) and `handleConfirmRemove` (DELETE), call `cachePage` explicitly for the current page.

## Risks / Trade-offs

- **[Risk]** User opens binder offline after cache expired → may see stale data or empty pages
  - **Mitigation:** `areAllPagesCached` already exists; if cache is expired and offline, user gets the offline unavailable message. Acceptable trade-off for reduced network traffic.
- **[Risk]** Hour-long cache window could show stale data after card operations on another device
  - **Mitigation:** Card operations trigger immediate cache refresh, so changes made by the user on this device are preserved. Cross-device sync is out of scope.
- **[Trade-off]** Prefetch still happens for performance, but without persistence. Users navigating quickly may re-fetch on return visits after cache expired.
  - **Mitigation:** Acceptable — prefetch is for speed, not offline guarantees.

## Migration Plan

1. Modify `offline-store.ts` to store `cachedAt` timestamp alongside binder data
2. Update `cacheBinders` to include timestamp; read it in `getCachedBinders`
3. Add `shouldCacheBinder` helper to check if binder needs recaching
4. Modify `BinderViewer`:
   - Remove `isCaching` and `isCachingRef` state
   - Remove caching indicator UI
   - Add `cachePagesIfNeeded` function that respects hourly window
   - Add `cachePage` calls after card operations
   - Change `fetchPage` to accept `shouldCache` parameter (default true)
5. Test: Open binder twice within an hour — second open should not trigger full cache
6. Test: Assign a card — page should cache immediately
7. Test: Remove indicator — no more pulsing yellow text on open

## Open Questions

1. Should the hourly window be configurable? (User might want more frequent caching for some binders) — **Decision: No, keep it simple. 1 hour is reasonable default.**
2. Should we cache on binder rename or delete? — **Decision: No, these don't change page data. Cache persists until expired or explicit card operation.**