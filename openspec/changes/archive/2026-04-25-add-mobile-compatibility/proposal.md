## Why

The current PokeBinder app is difficult to navigate on mobile devices. The interface was designed primarily for desktop use, resulting in poor usability on smaller screens - navigation is cumbersome, layouts break or require excessive horizontal scrolling, and touch interactions are not optimized for mobile.

## What Changes

- Add responsive layouts that adapt to mobile, tablet, and desktop viewports
- Improve touch-friendly navigation with mobile-optimized header/menus
- Enhance touch interactions for slot management, card search, and binder navigation
- Ensure all UI components render properly on mobile screens
- Add mobile-friendly gestures for binder navigation between pages

## Capabilities

### New Capabilities

- **mobile-responsive-layouts**: Implement responsive layouts across all pages (Shelf, BinderViewer, CardDetailModal) using mobile-first Tailwind breakpoints. Adjusts grid layouts, spacing, and component sizing for mobile viewports.
- **mobile-navigation**: Create mobile-optimized navigation including collapsible/hamburger menu, bottom navigation bar for binder pages, and touch-friendly navigation between binder pages.
- **mobile-touch-interactions**: Add touch gestures (swipe for page navigation, tap/hold for actions) and improve touch targets throughout the app.

### Modified Capabilities

_(none - this is a new mobile capability layer that doesn't change existing specs)_

## Impact

- **Frontend**: Modify all UI components in `src/components/` to be responsive
- **Pages**: Update `src/app/page.tsx`, `src/app/binder/[binderId]/page.tsx`
- **Styles**: Update `src/app/globals.css` with mobile-specific CSS if needed