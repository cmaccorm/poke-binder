## Why

The card detail modal currently only shows TCGPlayer market pricing, which is unavailable for many cards (especially older or non-English sets). When pricing is missing, users see "N/A" with no alternative. Additionally, the modal displays card type and artist fields that add clutter without providing value users care about. Finally, every modal open triggers a live PokéTCG API call (or uses a volatile 1-hour in-memory cache), wasting API quota and adding latency for pricing data that rarely changes within a day.

## What Changes

- **Cardmarket pricing fallback**: When TCGPlayer pricing is unavailable for a card, display Cardmarket pricing instead (averageSellPrice or trendPrice). Show a label indicating the pricing source.
- **Remove type and artist fields**: Remove the "Types" and "Artist" rows from the card detail modal info section.
- **24-hour pricing cache in database**: Store fetched pricing data (both TCGPlayer and Cardmarket) in the CatalogCard database table with a timestamp. On modal open, serve cached pricing if it is less than 24 hours old; otherwise fetch fresh data from the PokéTCG API and update the cache.

## Capabilities

### New Capabilities
- `pricing-cache`: Database-backed 24-hour cache for card pricing data (TCGPlayer and Cardmarket), with staleness check and refresh logic.

### Modified Capabilities
- `display-card-metadata`: Remove type and artist fields from the card detail modal. Add Cardmarket pricing as a fallback when TCGPlayer pricing is unavailable. Display pricing source label.

## Impact

- **Database schema**: New pricing columns on `CatalogCard` table (tcgplayer price, cardmarket price, pricing source metadata, price cached timestamp). Requires a Prisma migration.
- **API layer**: The `/api/catalog/card/[id]` route needs to check the database cache before calling the PokéTCG API, and write back fresh pricing after a fetch.
- **Frontend**: `CardDetailModal.tsx` updated to remove type/artist fields and handle the cardmarket fallback display.
- **Data access**: `catalog.ts` needs new functions for reading/writing cached pricing.
- **No breaking changes**: No API contract changes for external consumers. The card detail modal simply shows different/better information.
