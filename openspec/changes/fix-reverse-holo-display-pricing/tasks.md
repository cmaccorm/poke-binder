## 1. Export variant mapping

- [x] 1.1 Export `VARIANT_MAP` from `src/lib/catalog.ts` so it can be imported by the modal

## 2. Update CardDetailModal props and price logic

- [x] 2.1 Add `variant: string | null` to `CardDetailModalProps` in `src/components/CardDetailModal.tsx`
- [x] 2.2 Build a reverse lookup from variant label to TCGPlayer price key (e.g. "Reverse Holo" → "reverseHolofoil") using the exported `VARIANT_MAP`
- [x] 2.3 Replace the fallback price chain with variant-aware price selection: use variant-specific price when variant is provided, fall back to existing chain only when variant is null
- [x] 3.1 Add a variant badge to the CardDetailModal UI (gold text on `bg-poke-gold/15`, matching the search result badge style) shown when variant is non-null

## 4. Wire variant through from BinderViewer

- [x] 4.1 Update the `selectedCardDetail` state in `BinderViewer` to include the slot's `variant` alongside `externalId`
- [x] 4.2 Pass `variant` prop to `CardDetailModal` when rendering it

## 5. Verification

- [x] 5.1 Run `npm run build` and confirm no type errors
- [x] 5.2 Run `npx vitest run` and confirm existing tests pass
