## Context

Cards in the binder grid currently render as images only. Price data (`priceTcgplayer`, `priceCardmarket`) already exists on `CatalogCard` in the database but is only populated lazily when the detail modal is opened. The `CardReference` type used by `getBinderPage()` omits price fields entirely, so slot rendering has no access to prices.

The goal is to surface cached prices on hover without adding new API calls or blocking the page load.

## Goals / Non-Goals

**Goals:**
- Show a price overlay when hovering over a filled card slot in the binder grid
- Dim the card image during hover to make the price text readable
- Use already-cached price data from `CatalogCard` — no new external API calls on hover
- Graceful handling when price data is not yet cached (no price shown, no error)

**Non-Goals:**
- Fetching prices on hover (prices are only available if previously cached via the detail modal)
- Showing full price breakdowns (holofoil vs normal tiers) — just one representative market price
- Price refresh or staleness indicators
- Touch/mobile long-press support (hover is pointer-only; mobile users use the detail modal)

## Decisions

### 1. Extend `CardReference` with optional price fields

Add `priceTcgplayer?: number | null` and `priceCardmarket?: number | null` to `CardReference`. This keeps the type backward-compatible (existing consumers ignore the new fields) and avoids a separate fetch.

**Alternative considered**: Fetch prices on hover via a new API endpoint. Rejected because it adds latency, network chatter, and complexity for data that's already in the DB row being queried.

### 2. Prefer TCGPlayer price, fall back to Cardmarket

Display `priceTcgplayer` if available, otherwise `priceCardmarket`. If neither exists, show no overlay on hover. This matches the existing priority in `CardDetailModal`.

### 3. CSS hover overlay, not a tooltip library

Use a simple CSS `opacity` + absolutely-positioned text overlay triggered by `:hover` / `group-hover` in Tailwind. No tooltip library needed — the overlay sits directly on the card.

**Alternative considered**: Using a tooltip component (e.g., Radix Tooltip). Rejected because the design calls for a full-card dim effect, not a floating tooltip, and the CSS approach is zero-dependency.

### 4. Include price fields in existing `getBinderPage()` query

Add `priceTcgplayer` and `priceCardmarket` to the Prisma `select` in `getBinderPage()`. The columns are on the already-joined `CatalogCard` row, so this adds negligible query cost.

## Risks / Trade-offs

- **Many cards won't have cached prices** → Users see no price on hover until they've opened the detail modal at least once. This is acceptable — the overlay is a bonus, not a primary feature. A future enhancement could populate prices more eagerly.
- **Price staleness** → Cached prices may be outdated. Acceptable for a quick-glance feature; the detail modal already shows fresh data and trends.
- **Hover not available on touch devices** → Mobile users won't see the overlay. This is fine — they already use the detail modal tap flow.
