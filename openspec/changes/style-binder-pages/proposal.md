## Why

The current binder page UI is functional but visually flat - it displays cards in a simple grid without the premium feel of high-quality binders like VaultX. Users want binder pages to have that sleek, tactile aesthetic with black felt-textured backgrounds and black peaked card pockets that cards slide into.

## What Changes

- Add black felt-textured page background (dark premium look)
- Add black peaked/pillar card pockets with cutout design (cards appear to slide in from top)
- Add subtle gold/orange accent striping on page edges (VaultX signature)
- Add shadow/depth for tactile feel
- Increase contrast with brighter card images against dark background
- Retain existing functionality (assigning/removing cards works the same)

## Capabilities

### New Capabilities

- `binder-page-styling`: Enhanced visual styling for binder pages mimicking premium VaultX-style binders with black felt pages and peaked card pockets

### Modified Capabilities

- `digital-pokemon-binder`: The existing binder system will be visually enhanced but maintains all existing behavior and APIs

## Impact

- Frontend changes to `BinderViewer` component and related card/slot components
- CSS updates for new visual elements (Tailwind v4 + custom CSS)
- No database changes required
- No API changes required
- Backward compatible - all existing functionality preserved