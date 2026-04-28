## Context

The card detail modal (`CardDetailModal.tsx`) currently shows a single point-in-time price fetched from the PokéTCG API (TCGPlayer USD or Cardmarket EUR). Users have no visibility into whether a card's value is trending up or down. The TCGdex API provides free, keyless access to Cardmarket pricing data that includes current averages plus 1-day, 7-day, and 30-day moving averages — enough to show meaningful trend direction without historical time-series data.

TCGdex uses the same card IDs as the PokéTCG API (e.g., `base1-4`, `swsh7-215`), so no ID mapping is needed. TCGdex only provides Cardmarket (EUR) pricing — TCGPlayer data is consistently null in their responses. This means the trend section will show EUR data alongside the existing USD spot price from the PokéTCG API.

## Goals / Non-Goals

**Goals:**
- Show price trend indicators (1-day, 7-day, 30-day averages) in the card detail modal using free TCGdex data
- Display trend direction with up/down arrows and color coding (green for up, red for down)
- Cache TCGdex pricing data in a dedicated database table with a 7-day TTL
- Show both normal and holo variant pricing when available from Cardmarket
- Keep the existing PokéTCG API spot price (USD) as the primary price display

**Non-Goals:**
- Daily time-series line chart (would require a paid API)
- USD pricing for trends (TCGdex only has Cardmarket EUR)
- Offline support for trend data
- Replacing the existing PokéTCG API pricing with TCGdex
- User-configurable timeframes

## Decisions

### 1. Data source: TCGdex API (free, keyless)

**Choice**: Use TCGdex (`GET https://api.tcgdex.net/v2/en/cards/<id>`) for price trend data.

**Rationale**: TCGdex is the only free API that provides multi-timeframe averages (1/7/30-day) without requiring authentication. It uses the same card IDs as PokéTCG, so integration is trivial. Alternatives considered:
- **Scrydex**: Full daily history but starts at $29/mo — too expensive for a hobby project
- **PokemonPriceTracker**: $9.99/mo for 6 months of history; free tier only has 3 days
- **TCGFast**: $14.99/mo for 90-day history

Trade-off: TCGdex only has Cardmarket (EUR) data, not TCGPlayer (USD). The trend section will be clearly labeled as Cardmarket EUR.

### 2. Display approach: Trend indicators, not a line chart

**Choice**: Show a compact price trend section with current average, trend price, and 1/7/30-day averages with directional arrows — no charting library.

**Rationale**: With only 3 data points (1/7/30-day averages) plus current, a line chart would be misleading and visually sparse. Trend indicators (arrows + color + percentage change) convey the same directional information more clearly and require zero additional dependencies. This keeps the bundle size unchanged.

### 3. Database model: `PriceTrend` table

**Choice**: New `PriceTrend` table storing the pricing JSON per card, with a `fetchedAt` timestamp for TTL checks.

Schema:
```
PriceTrend {
  id          String   @id @default(cuid())
  externalId  String   @unique  // PokéTCG card ID (e.g. "base1-4")
  data        String             // JSON blob of TCGdex pricing object
  fetchedAt   DateTime @default(now())
}
```

**Rationale**: Unlike the Scrydex approach (per-variant caching), TCGdex returns all variant pricing (normal + holo) in a single response, so one cache row per card is sufficient. No `variant` column needed. The JSON blob contains the full `pricing.cardmarket` object. Alternatives considered:
- **Normalized columns per field**: More columns but no real query benefit since we always read/write the whole object
- **Reuse CatalogCard table**: Already has `priceTcgplayer`/`priceCardmarket` with a 24hr TTL for spot prices — mixing trend data would conflate two different caching concerns

### 4. API route: `GET /api/catalog/card/[id]/price-trend`

**Choice**: Dedicated endpoint separate from the existing card detail route.

**Rationale**: The card detail endpoint already handles PokéTCG API data. Adding TCGdex calls to it would slow down the primary card load. A separate endpoint lets the modal render card details immediately while trend data loads asynchronously.

### 5. Cache TTL: 7 days

**Choice**: Check `fetchedAt` against a 7-day window. If stale, re-fetch from TCGdex and upsert.

**Rationale**: Cardmarket averages (especially avg7 and avg30) change slowly. A weekly refresh is sufficient and respects TCGdex's free service. This also aligns with the user's original "once per week" requirement.

### 6. Trend calculation

**Choice**: Compare `avg1` vs `avg7` and `avg7` vs `avg30` to determine short-term and medium-term trend direction. Display as percentage change with colored arrows.

Example display:
```
Cardmarket (EUR)
€0.08 avg  •  €0.10 trend
1d: €0.03 ↓  |  7d: €0.08 →  |  30d: €0.08 →
```

Arrow logic:
- If avg1 > avg7 by >5%: green up arrow
- If avg1 < avg7 by >5%: red down arrow
- Otherwise: gray horizontal arrow (stable)

## Risks / Trade-offs

- **[EUR only]** → The trend section shows Cardmarket EUR prices while the existing spot price may be TCGPlayer USD. Mitigation: clearly label the section as "Cardmarket (EUR)" to avoid confusion.
- **[TCGdex reliability]** → TCGdex is a free community-run API. If it goes down, the trend section gracefully hides. Mitigation: Cache means most users see data from the DB, not live API.
- **[Missing data]** → Some cards may not have Cardmarket pricing in TCGdex (tcgplayer field is null for all cards). Mitigation: Show "Trend data unavailable" when pricing is null.
- **[TCGdex rate limits]** → Not formally documented, but the 7-day cache ensures minimal API hits. First-time views of many different cards could spike requests. Mitigation: Acceptable for a hobby project; cache prevents repeat hits.
- **[No holo distinction in slot variant]** → The app's `VARIANT_MAP` uses TCGPlayer keys (`normal`, `holofoil`, `reverseHolofoil`), while TCGdex Cardmarket uses `avg` (normal) and `avg-holo` / `trend-holo` etc. We'll map between them.
