## Why

The app feels unacceptably slow during normal use — opening a binder, flipping pages, and searching cards all have noticeable lag. Multiple performance bottlenecks are stacking: the SQLite database sits on a slow WSL-to-NTFS cross-filesystem path, the initial binder page load creates a client-side waterfall, every page navigation blocks on a redundant database write, and catalog search results are upserted one-by-one instead of batched.

## What Changes

- Move the SQLite database file from `/mnt/c/` (NTFS via WSL) to a native Linux filesystem path for dramatically faster I/O
- Fetch the initial binder page server-side and pass it as a prop, eliminating the client-side fetch waterfall on first load
- Parallelize the `lastViewedPage` database write with the page read in the API route, and debounce the write on the client so rapid page flipping only triggers one update
- Batch catalog card upserts into a single Prisma transaction instead of 20 sequential individual writes

## Capabilities

### New Capabilities

- `server-side-page-load`: Server-side fetching of the initial binder page data, passed to the client as a prop to eliminate the hydration-then-fetch waterfall
- `debounced-page-tracking`: Client-side debouncing of lastViewedPage updates so rapid page navigation doesn't trigger a database write per flip, combined with parallelized read/write in the API route
- `batched-catalog-upserts`: Transactional batching of catalog card cache upserts to reduce per-search database round trips from N to 1

### Modified Capabilities

- `digital-pokemon-binder`: The "Catalog data is cached locally" requirement's implementation changes — caching now uses batched transactions for better performance, but the external behavior (cached data used immediately) is unchanged.

## Impact

- **Database**: `dev.db` file moves from project directory on `/mnt/c/` to a native Linux path. `.env` and potentially `.gitignore` updated.
- **Server component**: `src/app/binder/[binderId]/page.tsx` gains a `getBinderPage()` call and passes data as prop
- **Client component**: `src/components/BinderViewer.tsx` accepts initial page data as prop, adds debounced lastViewedPage tracking
- **API route**: `src/app/api/binders/[binderId]/pages/[pageIndex]/route.ts` parallelizes read and write operations
- **Catalog library**: `src/lib/catalog.ts` switches from sequential upserts to a batched `$transaction`
- **No breaking changes** — all external behavior remains identical, only internal performance characteristics change
