# Tasks

## Data Model and Catalog Plumbing
- [x] Define the canonical binder, page, slot, and card-reference types for fixed 2x2, 3x3, and 4x3 layouts.
- [x] Add layout helpers that map slots to pages without relying on mirror-mode rendering state.
- [x] Introduce catalog lookup plumbing for card name, card number, thumbnail, and image metadata.
- [x] Expose a binder load shape that includes identity, current page, edit mode, and referenced catalog entries.

## Binder Shelf and Viewer
- [x] Render binder shelf cards with nickname and color from binder identity data.
- [x] Wire shelf selection to open the last viewed page and mode for the chosen binder.
- [x] Implement the binder viewer page model for fixed layouts with stable page flipping.
- [x] Keep edit mode active while turning pages and switching between mirrored and canonical presentation.

## Edit-Mode Add and Remove Interactions
- [x] Open inline catalog search when an empty slot is clicked in edit mode.
- [x] Support searching by card name and card number with thumbnail results scoped to the active binder slot.
- [x] Apply the selected catalog card directly to the clicked slot and refresh the visible page state.
- [x] Prompt for confirmation before clearing an occupied slot and remove the card only after confirmation.

## Cache and Performance
- [x] Cache recently used card images and metadata locally so revisits can render immediately.
- [x] Revalidate cached catalog data in the background without blocking binder viewing.
- [x] Prefetch adjacent binder pages and nearby card assets to keep page turns responsive.
- [x] Preserve current binder state across rerenders so search, edit mode, and page position do not reset.

## Verification and Testing
- [x] Add unit coverage for fixed layout mapping, mirror-mode stability, and page-flip behavior.
- [x] Add integration coverage for shelf entry, inline add flow, and remove confirmation flow.
- [x] Add cache-focused tests for immediate reuse of stored card data and background refresh behavior.
- [x] Verify the change against the binder requirements before starting any PDF export work.

## Debugging and Fixes (post-implementation)
- [x] Fix DATABASE_URL: changed from relative `file:./dev.db` to absolute path for reliable Prisma engine resolution at runtime.
- [x] Fix Prisma client import: changed from `@/generated/prisma` to `@/generated/prisma/client` (v6 generator outputs .ts files without index).
- [x] Install missing dependencies: prisma, @prisma/client, dotenv were not in package.json after scaffold.
- [x] Fix CardSearch useRef type: added explicit `undefined` initializer to satisfy strict TypeScript.
- [x] Verified all API routes return correct responses (GET/POST binders, GET page, PUT/DELETE slot, GET catalog search).
