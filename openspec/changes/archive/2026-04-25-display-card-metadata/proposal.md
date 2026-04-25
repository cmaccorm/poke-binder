## Why

When viewing a binder, users want quick access to card details without leaving the app. Currently, clicking a card shows nothing - users can't see important metadata like card price, set, rarity, or types. This limits the utility of the binder for tracking collection value or understanding card details at a glance. Adding a card detail view on click would make the binder more useful for collectors.

## What Changes

- Add tap/click interaction on binder slot cards to open a detail modal/popover
- Fetch and display card metadata from the PokéTCG API (price, rarity, set, types, artist)
- Display TCGPlayer price data when available
- Show card image in the detail view

## Capabilities

### New Capabilities

- `card-detail-view`: Modal or popover that displays detailed metadata for any card in the binder when clicked. Shows price (TCGPlayer), rarity, set info, types, and artist. Uses existing card data from PokéTCG API with fallback for missing fields.

## Impact

- Frontend: New CardDetailModal component in binder viewer
- Backend: No new API endpoints needed - uses existing `/api/catalog/search` data already cached
- UI/UX: Adds click/tap interaction on slot cards