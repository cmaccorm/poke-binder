## 1. Database & Schema

- [x] 1.1 Add `PriceTrend` model to `prisma/schema.prisma` with fields: `id` (cuid), `externalId` (String, @unique), `data` (String — JSON blob), `fetchedAt` (DateTime, @default(now()))
- [x] 1.2 Run `npx prisma migrate dev` to generate and apply the migration (used `db push` — existing migrations use SQLite types incompatible with PostgreSQL)
- [x] 1.3 Run `npx prisma generate` to regenerate the Prisma client

## 2. TCGdex API Integration

- [x] 2.1 Create `src/lib/price-trends.ts` with a `fetchTcgdexCard(externalId)` function that calls `GET https://api.tcgdex.net/v2/en/cards/<id>` and extracts the `pricing.cardmarket` object
- [x] 2.2 Add `getCachedPriceTrend(externalId)` function that checks the `PriceTrend` table for a fresh entry (fetchedAt within 7 days)
- [x] 2.3 Add `upsertPriceTrend(externalId, data)` function that creates or updates the cache row
- [x] 2.4 Add `getPriceTrendForCard(externalId)` orchestrator that checks cache first, fetches from TCGdex if stale/missing, handles errors gracefully (returns stale data or null)

## 3. API Route

- [x] 3.1 Create `src/app/api/catalog/card/[id]/price-trend/route.ts` with a GET handler
- [x] 3.2 Call `getPriceTrendForCard(externalId)` and return the pricing data as JSON
- [x] 3.3 Return `{ pricing: null }` with 200 status when data is unavailable (no 500 errors)

## 4. Price Trend Display Component

- [x] 4.1 Create `src/components/PriceTrendDisplay.tsx` — a client component that accepts Cardmarket pricing data and renders trend indicators
- [x] 4.2 Display current average (`avg`), trend price (`trend`), and 1d/7d/30d averages (`avg1`/`avg7`/`avg30`) formatted as EUR
- [x] 4.3 Implement directional arrow logic: compare avg1 vs avg7 (>5% diff = up/down arrow, otherwise stable)
- [x] 4.4 Show holo-specific pricing (`avg-holo`, `trend-holo`, etc.) when the card's variant maps to holo
- [x] 4.5 Add variant mapping from app's variant labels ("Normal", "Holo", "Reverse Holo") to TCGdex Cardmarket field prefixes (normal fields vs `-holo` suffixed fields)
- [x] 4.6 Add loading skeleton state
- [x] 4.7 Style with Tailwind to match the poke theme (dark background, gold accents, consistent with existing modal styling)
- [x] 4.8 Label section as "Cardmarket Trends (EUR)" to distinguish from existing USD spot price

## 5. Integrate into CardDetailModal

- [x] 5.1 Add a `useEffect` in `CardDetailModal` to fetch from `/api/catalog/card/{externalId}/price-trend` when the modal opens
- [x] 5.2 Render `PriceTrendDisplay` below the existing card details section (after Set/Rarity), passing the pricing data and current variant
- [x] 5.3 Hide the trend section entirely when pricing data is null (no "unavailable" message)
- [x] 5.4 Ensure the modal scrolls properly when the trend section adds height (especially on mobile)

## 6. Testing & Verification

- [x] 6.1 Verify the build passes (`npm run build`) with no type errors
- [x] 6.2 Verify lint passes (`npm run lint`)
- [x] 6.3 Manually test: open a card modal → trend section loads with Cardmarket pricing data
- [x] 6.4 Manually test: open a card with no Cardmarket data → trend section is hidden
- [x] 6.5 Manually test: open the same card again → verify cached data is returned (no second API call within 7 days)
