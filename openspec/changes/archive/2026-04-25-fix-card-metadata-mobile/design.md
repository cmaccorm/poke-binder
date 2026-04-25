## Context

The `CardDetailModal` component displays card metadata (price, set, rarity, types, artist) when a user clicks on a card. On mobile devices, the modal uses `flex-col` with `overflow-y-auto` to make content scrollable. However, the spring-back scroll behavior (scroll bounce) causes the content to bounce back after the user scrolls up and releases, hiding the price field which is positioned below the fold.

**Current code in `CardDetailModal.tsx` (line 65):**
```typescript
<div className="... overflow-y-auto">
```

The modal slide-up from bottom on mobile (`rounded-t-2xl`) and the scroll area is in the right content section on desktop but full-width on mobile.

## Goals / Non-Goals

**Goals:**
- Fix scroll bounce to keep scrolled content in place on mobile (Android and iOS)
- Ensure price field is accessible on mobile without fighting the bounce
- Test on actual mobile devices to verify fix

**Non-Goals:**
- This is NOT redesigning the modal layout
- This is NOT adding new metadata fields
- This is NOT changing desktop behavior

## Decisions

### 1. Disable scroll bounce on modal content
**Decision:** Add `overscroll-behavior-y: contain` CSS or use `-webkit-overflow-scrolling: touch`.

**Rationale:** Prevents the spring-back effect that hides scrolled content on mobile browsers.
**Alternative considered:** Move price higher in the layout — less robust if content grows.

### 2. Use proper overflow and momentum scrolling
**Decision:** Ensure `overflow-y-auto` and `-webkit-overflow-scrolling: touch` are set on the scroll container.

**Rationale:** Enables native momentum scrolling with bounce disabled on mobile.
**Alternative considered:** Custom scroll library — overkill for this use case.

### 3. Consider moving price higher in mobile layout
**Decision:** Move price to be more prominent on mobile, above the fold if possible.

**Rationale:** Even with fix, users shouldn't have to scroll to see price.
**Alternative considered:** Keep current layout — poor mobile UX.

## Risks / Trade-offs

- **[Risk]** CSS fix may not work on all iOS versions → **Mitigation:** Test on multiple iOS versions
- **[Risk]** Price at bottom may still be hard to reach on small screens → **Mitigation:** Move price higher in layout