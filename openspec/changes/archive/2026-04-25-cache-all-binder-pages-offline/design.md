## Context

The `BinderViewer` component maintains a two-tier page cache: an ephemeral in-memory `Map` and a persistent IndexedDB store via `src/lib/offline-store.ts`. When a binder is opened online, `fetchPage()` writes successful responses to both tiers. However, there are two gaps:

**Gap 1 — SSR data not persisted:** The server component at `src/app/binder/[binderId]/page.tsx` fetches the initial page data and passes it as a prop to `BinderViewer`. The `useEffect` on mount seeds this into the in-memory Map with `pageCache.current.set(initialPage, initialPageData)` but never calls `cachePage()`, so the initial page is never written to IndexedDB. It is lost on refresh or unavailable offline.

**Gap 2 — Only adjacent pages prefetched:** The mount effect prefetches only `initialPage ± 1`. A multi-page binder (e.g., 10 pages) opened online would only have pages 1 and 2 cached to IndexedDB — the other 8 pages remain unavailable offline.

The service worker (`public/sw.js`) handles app-shell and card-image caching only; it does not intercept API calls, so all page data persistence relies on the IndexedDB layer.

## Goals / Non-Goals

**Goals:**
- Persist the SSR-provided initial page to IndexedDB on mount so it is immediately available offline.
- When a binder is opened online, trigger background fetches for all remaining pages so the entire binder is available offline after a short period.
- Show a non-blocking visual indicator while background caching is in progress.

**Non-Goals:**
- Change how card images are cached (service worker handles this already).
- Change the API surface or add new endpoints.
- Add offline queueing for card edits (card mutations require online connectivity).
- Pre-cache binders before the user opens them (no background sync job).

## Decisions

### D1: Trigger full-page background fetch after mount effect

After `initialPageData` is seeded into the Map and IndexedDB, the component will iterate over all page indices (`0` through `binder.pageCount - 1`) and call `fetchPage(index)` for any pages not already in the in-memory Map. Each successful response is written to IndexedDB via `cachePage()`. Failed pages are silently skipped — the already-cached pages remain available offline.

**Rationale:** Alternative approaches considered:
- *Eager cache-all on shelf hover*: Too speculative — user might not open the binder.
- *Cache-only visited + adjacent on each visit*: Would require many visits to fully cache a large binder.
- *Background sync via service worker*: Would require significant SW restructuring and is not available in all browsers.

The post-mount parallel fetch is the simplest mechanism that satisfies the requirement without changing the API or architecture significantly.

### D2: Reuse `fetchPage` for all page fetches

The existing `fetchPage` function already handles online/offline detection, in-memory Map lookup, IndexedDB fallback, and IndexedDB writes. It will be called directly for all page indices (not wrapped in new abstractions).

**Rationale:** Avoids duplicating the fetch/ cache-write logic. The function already correctly updates the in-memory Map on success, so in-session navigation after the background fetch will be instant for all pages.

### D3: Track `isCaching` state with a simple boolean ref + state

A `useRef<boolean>` tracks whether a background cache pass is active. A corresponding `useState` boolean drives the UI indicator. The ref is checked before triggering background fetch to prevent duplicate passes.

**Rationale:** No need for a progress percentage or per-page tracking. The indicator simply says / hides the caching-in-progress message without complexity.

### D4: Skip already-cached pages using the in-memory Map

Before firing background fetches, the component checks `pageCache.current.has(index)` for each page index. Pages already in the Map (from prefetch or prior visits) are skipped, reducing redundant network requests.

**Rationale:** On subsequent re-visits to the same binder within the same session, the background fetch will be nearly instant since all pages will already be in the Map. This also handles partial failure — if the background fetch failed for some pages, re-opening the binder online will retry only the missing pages.

## Risks / Trade-offs

**[Risk] Large binders trigger many simultaneous API requests** → **Mitigation**: The fetch is fire-and-forget (not awaited). The browser's connection pool limits concurrency naturally. The indicator signals to the user that network activity is happening. For very large binders (50+ pages), the user experience may be degraded on slow connections; this is acceptable given the offline use case is best-effort.

**[Risk] IndexedDB write failures silently discard page data** → **Mitigation**: `cachePage` is awaited but errors are caught and logged (via `console.error`). The in-memory Map still holds the data for the current session. On next online visit, the page will be re-fetched and re-attempted.

**[Risk] Stale data if user edits a page while another is being background-cached** → **Mitigation**: Card assignment/removal already invalidates the in-memory Map entry for the affected page (`pageCache.current.delete(currentPageIndex)`) and re-fetches. The background cache pass does not override this — it only adds missing entries, never overwrites existing ones.

**[Trade-off] Caching indicator may be confusing** → The indicator is intentionally minimal: just a small non-blocking notice. Users who don't care about offline mode won't be bothered. Users who do care get feedback that the binder is being prepared.