## Context

The binder viewer displays cards in a slot grid. Currently, clicking a card in view mode does nothing — the `handleSlotClick` function (line 120-128 in BinderViewer.tsx) returns early if not in editMode. Cards in the binder have a CardReference stored which contains `imageSmall`, `name`, and `id` (catalogCardId).

The PokéTCG API already returns price data in search results (TCGPlayer pricing). The catalog.ts module caches these results. We'll need a way to get full card details on demand.

## Goals / Non-Goals

**Goals:**
- Add click interaction on cards in view mode to open a detail modal
- Display key metadata: price (TCGPlayer), rarity, set, types, artist
- Use existing catalog search/cache to avoid redundant API calls
- Keep UI consistent with the PokéTheme design

**Non-Goals:**
- Real-time price updates (prices update periodically from PokéTCG API)
- Comparison with other listings (just shows current TCGPlayer price)
- Adding/removing cards from the detail view (that's edit mode)

## Decisions

1. **Modal vs Popover**: Use a modal overlay — easier to implement, works well on all screen sizes, feels more substantial for detailed information.

2. **Data Fetching Strategy**: 
   - Option A: New API endpoint for single card details
   - Option B: Reuse search with exact card ID
   - Decision: Create new `/api/catalog/card/[id]` endpoint that fetches single card and caches the result. More efficient than search for a known ID.

3. **Click vs Double-Click**: Single click in view mode to open detail. Keep edit mode for adding/removing cards.

4. **Price Display**: Show TCGPlayer price when available. Handle missing price gracefully with "~" or "N/A".

## Risks / Trade-offs

- **Risk**: PokéTCG API returns different data shapes for older cards (missing prices, etc.) → Mitigation: Show fallback UI for missing fields
- **Risk**: Extra API call per card click could be slow → Mitigation: Cache responses in catalog.ts
- **Risk**: Click conflict in edit mode (now click opens remove confirmation, not detail) → Mitigation: Only show detail in view mode; edit mode shows remove prompt

## Migration Plan

1. Add new `/api/catalog/card/[id]` endpoint for single card details
2. Create CardDetailModal component in components/
3. Update BinderViewer to open modal on card click in view mode
4. Deploy and test

## Open Questions

- Should keyboard shortcut open card detail? (e.g., Enter on focused slot)
- Want to add close button or just click outside to close?