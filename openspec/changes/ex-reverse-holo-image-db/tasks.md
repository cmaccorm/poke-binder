## 1. Database Schema

- [x] 1.1 Add `CustomCardImage` model to `prisma/schema.prisma` with fields: `id`, `externalId`, `variant`, `imageSmall`, `imageLarge`, `createdAt`, and a `@@unique([externalId, variant])` constraint
- [x] 1.2 Run `npx prisma migrate dev` to generate and apply the migration
- [x] 1.3 Run `npx prisma generate` to regenerate the Prisma client

## 2. Image Resolution Logic

- [x] 2.1 Create `resolveCardImages` function in `src/lib/catalog.ts` that accepts an array of `{ externalId, variant }` pairs and batch-queries `CustomCardImage` to return a map of `(externalId, variant) → { imageSmall, imageLarge }`
- [x] 2.2 Add a helper that merges custom image overrides into `CardReference` arrays, replacing `imageSmall`/`imageLarge` when an override exists and skipping lookup when variant is null

## 3. Integrate with Search Results

- [x] 3.1 Update `searchCatalog` in `src/lib/catalog.ts` to call `resolveCardImages` on expanded variant results before returning, so each `CardReference` carries the correct image URLs
- [x] 3.2 Verify the `/api/catalog/search` route returns custom images for reverse holo variants that have overrides
- [x] 4.1 Update the page-loading query in `src/lib/binders.ts` to call `resolveCardImages` for all slots on the loaded page, overriding image URLs where custom images exist
- [x] 4.2 Verify the `/api/binders/[id]/pages/[pageIndex]` route returns custom images for slots with matching overrides
- [x] 5.1 Update `CardDetailModal.tsx` to pass variant context when fetching card details, so the modal displays the custom image when one exists (rather than always fetching from the PokémonTCG API)

## 6. Next.js Image Configuration

- [x] 6.1 Add the custom image host domain to `next.config.ts` `images.remotePatterns` (placeholder domain to be replaced when image hosting is decided)
- [x] 7.1 Create a seed script (`prisma/seed-custom-images.ts` or similar) that can bulk-insert `CustomCardImage` rows from a JSON/CSV mapping file of externalId + variant + image URLs
- [x] 7.2 Add unit tests for `resolveCardImages` — test batch lookup, fallback behavior, and null-variant skip
- [x] 7.3 Manually verify end-to-end: search for an ex-era reverse holo card with a seeded override and confirm the custom image appears in search results, binder slot, and card detail modal
