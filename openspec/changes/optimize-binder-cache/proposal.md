## Why

The binder caching in `BinderViewer` runs on every binder open, attempting to cache all pages regardless of whether they were recently cached. This creates unnecessary network traffic and shows a distracting indicator. Users don't need aggressive caching on every visit — they need offline access after intentional caching and updates.

## What Changes

- **Modify caching triggers**: Cache binder pages only once per hour (time-based) and when page data changes (card assign/remove operations)
- **Remove caching indicator**: Delete the `isCaching` state and the associated UI indicator that shows during background caching
- **Stop aggressive prefetch**: Remove the automatic prefetch+cache on every page navigation that causes constant background caching

## Capabilities

### New Capabilities

- `time-bounded-binder-cache`: Time-based cache invalidation for binder page data, ensuring pages are cached at most once per hour rather than on every visit

### Modified Capabilities

- `offline-page-cache`: The existing offline-page-cache capability needs updated requirements to reflect time-bounded caching instead of aggressive on-every-visit caching. A delta spec will document the changed behavior.

## Impact

- `src/components/BinderViewer.tsx` — Remove aggressive caching on mount, add timestamp tracking, remove `isCaching` UI
- `src/lib/offline-store.ts` — May need timestamp storage for time-bounded cache validation