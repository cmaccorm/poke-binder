## Context

The current homepage displays binders using a flex grid layout without much environmental context. The goal is to create a visual bookshelf metaphor where binders sit on black/charcoal wooden shelf planks, providing depth and immersion without losing responsiveness.

## Goals / Non-Goals

**Goals:**
- Implement a responsive CSS-based black/charcoal bookshelf layout.
- Give the illusion of depth using shadows, gradients, and overlapping elements.
- Keep the `BinderCard` hover and click interactions intact.
- Handle varying numbers of binders dynamically (e.g., wrapping to new shelves seamlessly).

**Non-Goals:**
- No changes to how binders are created or deleted.
- No changes to the underlying database or data fetching logic.
- We will not use complex 3D libraries (e.g., Three.js); pure CSS is preferred for performance and simplicity.

## Decisions

1. **CSS Grid/Flex with Row Wrappers vs. Pure CSS Backgrounds:**
   We will use a flexbox layout where each shelf row is dynamically created or simulated using CSS styling on the container or wrapping elements.
   *Decision*: Instead of grouping elements into explicit row arrays (which requires JS math that can break on resize), we will style the `flex-wrap` container or the binder cards themselves. The easiest way to create a responsive shelf is to give each row a shelf background. A common CSS trick for this is using a repeating linear gradient or pseudo-elements. However, for a robust shelf that wraps naturally, we can use a container with `display: flex; flex-wrap: wrap; gap: ...` and style the items to sit on a CSS `border-bottom` or pseudo-element that spans the full width of the shelf row.
   Alternatively, we can group binders by "shelves" in JS if we fix the item width and calculate items per row based on container width (ResizeObserver). 
   *Revised Decision*: The simplest responsive approach without JS calculations is to style the individual binder containers to look like they sit on a segment of a shelf, and connect them visually, or use a repeating background on the container if row heights are fixed. Given the cards are a fixed height (h-48), we can use a repeating background gradient on the parent container to draw the black/charcoal wooden planks at fixed intervals, aligning the binder cards exactly onto those planks.

2. **Black/Charcoal Wood Texture:**
   *Decision*: Use linear gradients and shadow drops to simulate the black/charcoal wood plank, rather than loading an external image texture, to keep the asset footprint small and load times fast.

3. **Binder Positioning:**
   *Decision*: Add `translate-y` or negative margin to the `BinderCard` container so its bottom overlaps the visual shelf line, giving the illusion it rests on the plank. Add a drop shadow below the binder to create depth against the shelf.

## Risks / Trade-offs

- **Risk**: Fixed background intervals mismatching with card heights on smaller screens or if padding changes.
  *Mitigation*: Ensure the flex container's `gap` and the `BinderCard`'s height perfectly align with the repeating background gradient's background-size.
- **Risk**: Visual clutter on mobile devices where only 1-2 binders fit per row.
  *Mitigation*: The repeating shelf background will naturally scale. We will test responsive breakpoints.
