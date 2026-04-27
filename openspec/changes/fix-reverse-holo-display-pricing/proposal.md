## Why

The CardDetailModal currently ignores the variant stored on each slot. When a user clicks a card they assigned as "Reverse Holo", the modal shows a generic price (using a fallback chain that prioritises the normal price) and displays no indication of which variant is slotted. This makes the variant selection during search effectively invisible after assignment, and the displayed price is misleading.

## What Changes

- **Pass the slot's `variant` through to CardDetailModal** so it knows which variant the user assigned.
- **Display the variant label** (e.g. "Reverse Holo") as a gold badge in the card detail view, matching the style already used in search results.
- **Select the correct price tier** based on the slot's variant instead of falling back to the first available price. A "Reverse Holo" slot shows the `reverseHolofoil` market price; a "Holo" slot shows the `holofoil` market price; and so on.
- **Fall back gracefully** — if the variant-specific price is unavailable, display "N/A" rather than silently showing a different variant's price.

## Capabilities

### New Capabilities

- `variant-aware-detail`: Display the slot's variant label and variant-correct price in the card detail modal.

### Modified Capabilities

- `display-card-metadata`: The card detail modal's price display and header now depend on the slot's variant context, changing what information is shown to the user.

## Impact

- **Components**: `CardDetailModal` (new props, price logic, badge), `BinderViewer` (pass variant when opening modal).
- **Types**: `CardDetailModalProps` gains a `variant` prop.
- **No database, API, or dependency changes** — variant is already stored on `Slot` and returned in page data.
