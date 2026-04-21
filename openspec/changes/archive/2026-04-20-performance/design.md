## Context

The poke-binder app uses Next.js (App Router) with Prisma + SQLite, running in WSL. The database file lives on the Windows NTFS filesystem at `/mnt/c/poke-binder/prisma/dev.db`, which suffers from high I/O latency due to the WSL cross-filesystem bridge. The binder viewer uses a server component that fetches binder identity, then a client component that makes a separate API call for page data after hydration. Every page navigation triggers both a database read (page + slots + cards) and a blocking write (lastViewedPage). Catalog searches upsert results one at a time in a sequential loop.

## Goals / Non-Goals

**Goals:**
- Eliminate the most impactful performance bottlenecks with minimal code changes
- Make binder opening and page navigation feel instant for typical use
- Reduce database round trips during catalog search
- Maintain all existing behavior — these are invisible backend optimizations

**Non-Goals:**
- Image optimization (deferred to UI redesign change — will use `next/image` then)
- Client-side caching strategy changes beyond what exists (prefetch cache is already solid)
- Database schema changes or migrations
- API response format changes

## Decisions

### Decision 1: Move SQLite to native Linux filesystem

**Choice:** Move `dev.db` to `~/poke-binder-data/dev.db` and update `.env`.

**Rationale:** WSL's `/mnt/c/` filesystem access goes through a 9P protocol bridge to Windows NTFS, adding significant latency to every I/O operation. SQLite is particularly sensitive to this because it relies on filesystem locks and frequent small reads/writes. Moving to a native ext4 path under `$HOME` eliminates this overhead entirely.

**Alternatives considered:**
- *Use WAL mode on SQLite:* Would help with concurrent reads but doesn't fix the fundamental cross-filesystem latency.
- *Switch to a client-server database (PostgreSQL):* Overkill for a single-user app. SQLite on native Linux is more than fast enough.

### Decision 2: Server-side initial page fetch

**Choice:** Call `getBinderPage()` in the server component (`src/app/binder/[binderId]/page.tsx`) alongside `getBinder()`, pass the result as `initialPageData` prop to `BinderViewer`.

**Rationale:** Currently the loading flow is: server renders shell → client hydrates → client fetches page data → renders page. This creates a visible waterfall where the user sees a loading spinner while the client makes a request for data the server could have included. By fetching server-side, the first page renders immediately with no spinner.

**Changes to BinderViewer:**
- Accept `initialPageData: BinderPage | null` prop
- Initialize `page` state with `initialPageData` and `loading` with `!initialPageData`
- Seed `pageCache` with initial data on mount
- Skip the initial `loadPage()` call when data is already present

**Alternatives considered:**
- *React Server Components streaming:* The page component already is a server component; the issue is that BinderViewer is a client component that re-fetches. Passing data as props is the simplest fix.
- *Route-level data fetching with `generateMetadata`:* Unnecessary complexity for this use case.

### Decision 3: Parallel read/write + client-side debounce for lastViewedPage

**Choice:** Two-part approach:
1. In the API route, run `getBinderPage()` and `updateLastViewedPage()` in parallel with `Promise.all` so the write never blocks the response.
2. In `BinderViewer`, debounce the page-tracking API call. Rather than fetching the page API endpoint (which triggers the write) on every navigation, introduce a separate lightweight fire-and-forget call to update `lastViewedPage` only after the user settles on a page for ~500ms.

**Rationale:** The current code `await`s the write before responding, adding latency to every page turn. Parallelizing ensures the write never blocks the read. Client-side debouncing ensures rapid page flipping (arrow key held down) doesn't generate a write per page.

**Implementation detail:** The debounced tracking can be a simple `setTimeout`/`clearTimeout` pattern in the `loadPage` callback that calls a dedicated endpoint or the existing page endpoint. Since the existing page endpoint already triggers the write, the debounce on the client means fewer total API calls during rapid navigation, which also reduces the read load.

**Alternatives considered:**
- *Fire-and-forget only (no await, no debounce):* Risks unhandled promise rejections and still writes on every navigation.
- *Debounce only:* Good but doesn't fix the blocking write for non-debounced navigations (e.g., direct page loads).
- *Separate dedicated endpoint for lastViewedPage:* Cleaner separation but more surface area. The combined approach works well enough.

### Decision 4: Batched catalog upserts via $transaction

**Choice:** Replace the sequential `for` loop of individual `prisma.catalogCard.upsert()` calls with a single `prisma.$transaction()` containing all upserts.

**Rationale:** SQLite serializes writes, so each individual upsert opens a transaction, writes, and commits. With 20 results, that's 20 transaction cycles. A single `$transaction` wraps all 20 in one commit, which is dramatically faster on SQLite (often 10-20x for batch operations).

**Alternatives considered:**
- *`createMany` with `skipDuplicates`:* Prisma's `createMany` doesn't support upsert semantics, so it can't update existing records.
- *Raw SQL `INSERT OR REPLACE`:* Would work but bypasses Prisma's type safety and the existing `toCatalogCardReference` mapping.

## Risks / Trade-offs

- **[DB path is environment-specific]** → The new path (`~/poke-binder-data/`) only exists on the dev machine. This is acceptable since it's a solo project. Document the path choice in `.env` comments.
- **[Server-side page fetch adds to TTFB]** → The server now does two DB queries before sending HTML instead of one. However, these are fast SQLite queries on native Linux, and eliminating the client waterfall more than compensates. Net effect is significantly faster perceived load.
- **[Debounce means lastViewedPage might not persist on abrupt exit]** → If the user closes the tab within the 500ms debounce window, the last page won't be saved. This is a minor UX trade-off; the page they navigated away from (500ms ago) is close enough.
- **[Transaction batching could fail atomically]** → If one upsert in the batch fails, all fail. This is actually preferable to the current behavior where partial results could be cached.
