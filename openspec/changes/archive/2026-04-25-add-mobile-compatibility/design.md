## Context

The PokeBinder app is a Next.js application using Tailwind CSS v4. Currently, there are no responsive breakpoints defined beyond basic padding adjustments. The app has a Header, Shelf (binder list), BinderViewer (view pages), and CardDetailModal components that need mobile optimization.

## Goals / Non-Goals

**Goals:**
- Make all pages responsive across mobile (<640px), tablet (640-1024px), and desktop (>1024px)
- Add touch-friendly navigation with minimum 44px touch targets
- Support swipe gestures for binder page navigation
- Provide mobile-optimized header with hamburger menu

**Non-Goals:**
- Native mobile app (PWA not required)
- Offline functionality
- Push notifications

## Decisions

### Decision 1: Use Tailwind CSS breakpoints exclusively
The app already uses Tailwind CSS. We will leverage existing breakpoints without additional custom CSS.

- **Alternative considered**: Custom CSS media queries
- **Rationale**: Maintain consistency with existing codebase and leverage Tailwind's utility classes

### Decision 2: Implement swipe navigation in BinderViewer client component
Swipe gestures will be implemented using pointer events in the existing BinderViewer React component.

- **Alternative considered**: External library like react-swipeable
- **Rationale**: Keep dependencies minimal; simple pointer events cover our use case

### Decision 3: Mobile header uses client-side state
The hamburger menu will be controlled via React useState in the Header component.

- **Alternative considered**: URL-based state
- **Rationale**: Simpler for navigation menu; no URL routing needed

## Risks / Trade-offs

- [Risk] Touch target sizing may break existing layout → [Mitigation] Use existing Tailwind min-h-* and min-w-* utilities with explicit sizing
- [Risk] Swipe gestures may conflict with horizontal scrolling → [Mitigation] Implement swipe only when horizontal delta exceeds vertical delta (directional lock)