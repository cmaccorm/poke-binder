## 1. Database Schema

- [x] 1.1 Add `priceTcgplayer` (Float?), `priceCardmarket` (Float?), and `priceUpdatedAt` (DateTime?) columns to the CatalogCard model in `prisma/schema.prisma`
- [x] 1.2 Generate and apply the Prisma migration (`npx prisma migrate dev`)
- [x] 1.3 Regenerate the Prisma client (`npx prisma generate`)

## 2. Extend PokemonTcgCard Interface

- [x] 2.1 Add `averageSellPrice` and `trendPrice` fields to the `cardmarket.prices` type in the `PokemonTcgCard` interface in `src/lib/catalog.ts`

## 3. Pricing Cache Logic

- [x] 3.1 Create a `getCachedPricing` function in `src/lib/catalog.ts` that reads `priceTcgplayer`, `priceCardmarket`, and `priceUpdatedAt` from the CatalogCard table and returns them if `priceUpdatedAt` is less than 24 hours old
- [x] 3.2 Create a `updateCachedPricing` function in `src/lib/catalog.ts` that resolves the TCGPlayer market price (using existing variant/fallback logic), resolves the Cardmarket price (averageSellPrice then trendPrice), and writes both prices plus the current timestamp to the CatalogCard row
- [x] 3.3 Update the `/api/catalog/card/[id]` route to check the pricing cache first; if fresh, attach cached prices to the response; if stale or missing, fetch from PokéTCG API, update cache, then return

## 4. API Response Shape

- [x] 4.1 Extend the API response from `/api/catalog/card/[id]` to include `priceTcgplayer`, `priceCardmarket`, and `priceSource` ("tcgplayer" | "cardmarket" | null) fields alongside the existing card data

## 5. Frontend — Card Detail Modal

- [x] 5.1 Remove the "Types" row from `CardDetailModal.tsx` (lines 152-165)
- [x] 5.2 Remove the "Artist" row from `CardDetailModal.tsx` (lines 168-169)
- [x] 5.3 Update the price display logic in `CardDetailModal.tsx` to use the API response's `priceTcgplayer` / `priceCardmarket` / `priceSource` fields instead of parsing `card.tcgplayer.prices` directly
- [x] 5.4 Display the pricing source label ("TCGPlayer Market" or "Cardmarket") based on the `priceSource` field; show "N/A" when both are null

## 6. Verification

- [x] 6.1 Run `npm run build` and fix any type errors
- [x] 6.2 Run `npm run lint` and fix any lint issues
- [ ] 6.3 Manual verification: open a card with TCGPlayer pricing — confirm TCGPlayer price shown with correct label
- [ ] 6.4 Manual verification: open a card without TCGPlayer pricing — confirm Cardmarket fallback shown with correct label
- [ ] 6.5 Manual verification: confirm types and artist fields are no longer displayed
- [ ] 6.6 Manual verification: open same card again within 24 hours — confirm no new API call is made (check server logs)
