## 1. Move SQLite to Native Linux Filesystem

- [x] 1.1 Create `~/poke-binder-data/` directory and copy `prisma/dev.db` to it
- [x] 1.2 Update `.env` to set `DATABASE_URL` to the native Linux path with an explanatory comment
- [x] 1.3 Verify the app connects to the database at the new path and existing data is intact

## 2. Server-Side Initial Page Load

- [x] 2.1 In `src/app/binder/[binderId]/page.tsx`, call `getBinderPage(binderId, initialPage)` server-side and pass the result as `initialPageData` prop to `BinderViewer`
- [x] 2.2 Update `BinderViewer` to accept `initialPageData: BinderPage | null` prop, initialize `page` state with it, set `loading` to `false` when data is present, and seed the `pageCache` ref
- [x] 2.3 Skip the initial `loadPage()` call in the `useEffect` when `initialPageData` is already provided
- [x] 2.4 Handle fallback: if server-side page fetch returns null (invalid page), fall back to page 0

## 3. Parallelize and Debounce lastViewedPage

- [x] 3.1 In `src/app/api/binders/[binderId]/pages/[pageIndex]/route.ts`, replace sequential `await getBinderPage` then `await updateLastViewedPage` with `Promise.all` so both run concurrently
- [x] 3.2 In `BinderViewer`, add a debounced `lastViewedPage` update — use a `setTimeout`/`clearTimeout` pattern (~500ms) that fires a lightweight request to persist the current page after the user stops navigating
- [x] 3.3 Verify rapid page flipping (arrow keys held down) only triggers one lastViewedPage write after settling

## 4. Batch Catalog Upserts

- [x] 4.1 In `src/lib/catalog.ts`, replace the sequential `for` loop of `upsertCatalogCard()` calls with a single `prisma.$transaction()` containing all upsert operations
- [x] 4.2 Ensure the function still returns the mapped `CardReference[]` array from the transaction results
- [x] 4.3 Verify catalog search still works correctly — search for a card, confirm results appear and are cached

## 5. Verification

- [x] 5.1 Open a binder and confirm the first page renders without a loading spinner (server-side data)
- [x] 5.2 Flip pages rapidly and confirm smooth navigation with no perceptible lag
- [x] 5.3 Run the existing test suite (`npm test`) and confirm no regressions
