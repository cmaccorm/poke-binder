## 1. Data Layer

- [x] 1.1 Add `priceTcgplayer` and `priceCardmarket` optional fields to `CardReference` in `src/lib/types.ts`
- [x] 1.2 Update the Prisma `select` in `getBinderPage()` in `src/lib/binders.ts` to include `priceTcgplayer` and `priceCardmarket` from the related `CatalogCard`
- [x] 1.3 Map the new price fields into the `CardReference` objects returned by `getBinderPage()`

## 2. UI Overlay

- [x] 2.1 Add hover state to filled card slots in `BinderViewer.tsx` — dim the card image with a semi-transparent overlay using Tailwind `group-hover` / `opacity`
- [x] 2.2 Display the resolved price (TCGPlayer preferred, Cardmarket fallback) as centered USD text over the dimmed card
- [x] 2.3 Ensure no overlay or dim effect is shown when the card has no cached price or the slot is empty

## 3. Verification

- [x] 3.1 Verify the binder page API response includes price fields for cards that have cached prices
- [x] 3.2 Verify hover overlay appears correctly on cards with prices and does not appear on cards without prices or empty slots
- [x] 3.3 Run `npm run build` and `npm run lint` to confirm no regressions
