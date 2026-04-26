## 1. Fix Set Name Query Matching

- [x] 1.1 Update `buildCatalogQuery` in `src/lib/catalog.ts` to wrap set name terms with wildcards on both sides (`*term*`) instead of suffix-only (`term*`)
- [x] 1.2 Add tests for `buildCatalogQuery` with mid-string set name terms (e.g., "delta species" matching "EX Delta Species")

## 2. Add Variant Field to Data Model

- [x] 2.1 Add nullable `variant` column to the `Slot` model in `prisma/schema.prisma`
- [x] 2.2 Create and apply the Prisma migration for the new column
- [x] 2.3 Add `variant: string | null` to the `CardReference` interface in `src/lib/types.ts`

## 3. Implement Variant Expansion in Search

- [x] 3.1 Create a variant expansion function in `src/lib/catalog.ts` that takes a `PokemonTcgCard` and returns an array of `{ card, variant }` entries based on `tcgplayer.prices` keys (normal → "Normal", holofoil → "Holo", reverseHolofoil → "Reverse Holo", 1stEditionHolofoil → "1st Edition Holo")
- [x] 3.2 Integrate variant expansion into `searchCatalog` so each card is expanded into N results (one per variant)
- [x] 3.3 Update the Prisma upsert and return logic to include `variant` on each `CardReference` result
- [x] 3.4 Add tests for variant expansion: card with multiple variants, card with single variant, card with no pricing data

## 4. Update Slot Assignment to Store Variant

- [x] 4.1 Update `assignCardToSlot` in `src/lib/binders.ts` to accept and persist the `variant` parameter
- [x] 4.2 Update the `PUT /api/binders/[id]/slots/[slotId]` route to accept `variant` in the request body and pass it through

## 5. Update Search UI to Display Variants

- [x] 5.1 Update `CardSearch.tsx` to display a variant badge on each search result when variant is present
- [x] 5.2 Update `CardSearch.tsx` to pass the selected variant through the `onSelect` callback
- [x] 5.3 Update the slot assignment call site (in the binder editor) to include variant when calling the slot assignment API

## 6. Verification

- [x] 6.1 Run `npx vitest run` and verify all existing and new tests pass
- [x] 6.2 Run `npm run build` and verify no type errors
- [x] 6.3 Manual test: search "beedrill delta species" and confirm multiple variant results appear
