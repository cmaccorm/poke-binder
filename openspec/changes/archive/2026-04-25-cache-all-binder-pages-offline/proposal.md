## Why

When a user opens a binder while online, the application should cache all pages so the binder is fully usable offline later. Currently, only pages fetched via the client-side `fetchPage` network path are persisted to IndexedDB — but the initial page loaded server-side is never written to IndexedDB, and only adjacent pages (±1) are prefetched. This means even after opening a binder online, most pages are unavailable offline.

## What Changes

- **Fix SSR page persistence**: The initial page data provided by the server component will now be written to IndexedDB on mount, making it available offline immediately.
- **Full-page background caching**: When a binder is opened online, all pages will be fetched and persisted to IndexedDB in the background (not just the current and adjacent pages).
- **Progressive caching UX**: A subtle indicator will show while pages are being cached in the background, so the user knows offline preparation is in progress.
- **Bulk IndexedDB operations**: The `cachePage` call will be extended to support batch operations for efficiency.

## Capabilities

### New Capabilities

- `offline-page-cache`: When a binder is opened online, all its pages are fetched and written to IndexedDB so the full binder is available offline without additional network requests.

### Modified Capabilities

- `digital-pokemon-binder`: Add requirement that opening a binder online MUST make all its pages available offline (no existing spec-level requirement for full offline coverage; this extends the existing catalog caching behavior).

## Impact

- `src/components/BinderViewer.tsx` — Add IndexedDB persistence of SSR initial page data; replace adjacent-page prefetch with full-binder-page background fetch; add caching-in-progress indicator state.
- `src/lib/offline-store.ts` — Add a batch cache helper and a function to check whether all pages of a binder are cached.
- `src/app/api/binders/[binderId]/pages/[pageIndex]/route.ts` — No changes needed; the existing GET endpoint already returns page data correctly.
- No changes to `public/sw.js` (handles app shell and images only, not API data).
- No schema changes or migrations required.