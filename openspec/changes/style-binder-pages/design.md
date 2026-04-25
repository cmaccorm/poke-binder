## Context

The current `BinderViewer` component displays cards in a simple CSS grid with a dark background. Card slots are clickable areas that open a search modal. The visual design is minimal - just functional.

The target is to make binder pages look like premium VaultX binders - black felt texture background, black peaked card pockets with that signature cutout look where cards slide in from the top, gold/orange accent stripes.

## Goals / Non-Goals

**Goals:**
- Make binder pages look like premium VaultX binder with black felt texture
- Style card slots as "peaked/pillar" pockets with top cutout (cards slide in from top)
- Add gold/orange accent stripe on page edges (VaultX signature)
- Ensure high contrast for card images against black background
- Maintain all existing functionality

**Non-Goals:**
- No changes to database schema or Prisma models
- No changes to API endpoints
- No new external dependencies
- Not adding animations (keep it static)
- Not adding drag-and-drop

## Decisions

1. **CSS-only approach vs component changes**
   - Pure CSS + Tailwind - no new dependencies
   - Custom CSS via Tailwind's `@theme` block in global CSS for binder-specific styles

2. **Page background design**
   - Black background with subtle noise/felt texture using CSS gradient
   - Slight inner shadow for depth

3. **Peaked card pocket design**
   - Three-sided black pocket (left, right, bottom sides) with open top
   - Cards appear to slide in from the top
   - Slight gradient/shadow on pocket edges for depth

4. **Page edge accent**
   - Subtle gold/orange stripe on one edge ( VaultX signature)
   - Could use page number or section indicator

5. **Card visibility**
   - Cards may need adjusted brightness/saturation against dark background
   - Consider CSS filter or let users appreciate natural contrast

## Risks / Trade-offs

- **Risk**: Black background may make some dark card art hard to see
  - **Mitigation**: Use subtle inner glow on pockets to create separation

- **Risk**: Card images might get lost in black
  - **Mitigation**: Add subtle highlight border around cards in pockets

## Migration Plan

1. Update global CSS with VaultX theme variables
2. Update BinderViewer with page container wrapper
3. Update CardSlot with peaked pocket styling
4. Deploy - no rollback needed

## Open Questions

- Should cards have a subtle glow when selected/hovered?
- Should the accent stripe be on left or right edge?
- Should there be a subtle "velvet" texture effect?