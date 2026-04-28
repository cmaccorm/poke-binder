## Why

Users currently see only a single point-in-time price when viewing a card's details. There is no way to understand whether a card's value is rising or falling. Adding a price trend section to the card detail modal fills this gap — showing current market price plus 1-day, 7-day, and 30-day average trends from Cardmarket via the free TCGdex API. This gives collectors directional insight at zero cost.

## What Changes

- Add a **price trend section** to the `CardDetailModal` showing Cardmarket pricing: current average, trend price, and 1/7/30-day moving averages with directional indicators (up/down arrows, color-coded)
- Integrate the **TCGdex API** (`GET https://api.tcgdex.net/v2/en/cards/<id>`) as the data source — free, no API key required, pricing data embedded in card responses
- Add a new **`PriceTrend` database table** to cache TCGdex pricing data with a 7-day TTL, so each card's trend data is fetched from the external API at most once per week
- Add a new **API route** (`GET /api/catalog/card/[id]/price-trend`) to serve cached trend data to the client
- Show both **normal and holo variant** pricing when available (Cardmarket provides separate averages for each)

## Capabilities

### New Capabilities
- `price-trend-display`: Displays a price trend section in the card detail modal showing Cardmarket 1/7/30-day averages and trend indicators, backed by the free TCGdex API with weekly-cached data in a new database table

### Modified Capabilities
- `display-card-metadata`: The card detail modal gains a new section below existing details for the price trend display

## Impact

- **Database**: New `PriceTrend` model in Prisma schema (new migration)
- **API**: New route for price trend data; new TCGdex API integration in a new `src/lib/price-trends.ts` module
- **Dependencies**: None — no charting library needed. Trend indicators are pure CSS/Tailwind
- **Environment**: No new env vars required (TCGdex is free and keyless)
- **Components**: `CardDetailModal` updated with trend section; new `PriceTrendDisplay` component
- **Limitation**: TCGdex only provides Cardmarket (EUR) pricing, not TCGPlayer (USD). The existing spot price from PokéTCG API (USD) remains the primary price shown; the new trend section supplements it with EUR trend data from Cardmarket
