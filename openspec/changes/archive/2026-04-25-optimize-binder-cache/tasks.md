## 1. Update offline-store.ts

- [x] 1.1 Add `cachedAt` timestamp to the `OfflineDBSchema.binders` value type
- [x] 1.2 Modify `cacheBinders` to include current timestamp when storing binder data
- [x] 1.3 Add `getCachedTimestamp(binderId)` function to retrieve the cachedAt timestamp
- [x] 1.4 Modify `getCachedBinders` to return timestamp alongside binder data

## 2. Add time-bounded cache check to BinderViewer

- [x] 2.1 Add `shouldCacheBinderPages(binderId)` helper that checks if cache is expired (>1 hour)
- [x] 2.2 Add `cacheBinderPagesIfNeeded()` function that skips caching when timestamp is fresh
- [x] 2.3 Replace the existing aggressive cache-on-mount logic with the new time-bounded approach

## 3. Remove caching indicator

- [x] 3.1 Remove `isCaching` state variable from BinderViewer
- [x] 3.2 Remove `isCachingRef` ref from BinderViewer
- [x] 3.3 Remove the `isCaching` indicator UI block (lines 354-359 in original file)
- [x] 3.4 Remove `setIsCaching(true)` and `setIsCaching(false)` calls

## 4. Modify fetchPage to support selective caching

- [x] 4.1 Add `shouldCache` parameter to `fetchPage` function (default: true)
- [x] 4.2 Only call `cachePage` when `shouldCache` is true
- [x] 4.3 Update prefetch calls (adjacent page prefetch in `loadPage`) to pass `shouldCache: false`

## 5. Add explicit cache on card operations

- [x] 5.1 In `handleCardSelected`, add `cachePage` call after successful card assignment
- [x] 5.2 In `handleConfirmRemove`, add `cachePage` call after successful card removal

## 6. Test and verify

- [ ] 6.1 Open binder twice within an hour — verify no network caching requests on second open
- [ ] 6.2 Assign a card — verify page is cached immediately after
- [ ] 6.3 Remove a card — verify page is cached immediately after
- [ ] 6.4 Open binder offline after caching — verify pages are available
- [ ] 6.5 Verify no caching indicator appears during normal operation