## Why

When browsing a binder, there's no way to see card prices without opening the detail modal. Collectors want a quick glance at values while scanning their pages — a hover overlay showing the price gives instant feedback without disrupting the browsing flow.

## What Changes

- Add a hover overlay to filled card slots in the binder grid that dims the card image and displays the market price on top
- Extend the slot data model (`CardReference`) to include cached price fields so prices are available without an extra fetch
- Ensure `getBinderPage()` returns price data for cards that have cached prices
- Use the already-cached `priceTcgplayer` / `priceCardmarket` values from `CatalogCard`; no new API calls on hover

## Capabilities

### New Capabilities
- `card-price-overlay`: Hover interaction on binder card slots that dims the card and displays the cached market price

### Modified Capabilities

_(none — no existing spec-level requirements are changing)_

## Impact

- **Components**: `BinderViewer.tsx` — slot rendering gains hover state + overlay
- **Types**: `CardReference` in `src/lib/types.ts` — adds optional price fields
- **Data layer**: `getBinderPage()` in `src/lib/binders.ts` — includes price columns in the Prisma select
- **No new dependencies or API calls** — uses prices already stored on `CatalogCard`
