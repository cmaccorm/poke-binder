## Why

The PokeBinder app currently renders the Shelf component directly with no header or branding, making it feel incomplete. Adding a styled header with custom Pokemon-themed typography will establish brand identity and create a more polished, engaging user experience consistent with the app's Pokemon card collection theme.

## What Changes

- Add a new `Header` component to the app layout that displays above all page content
- Integrate the "Pokemon Classic" font (from dafont.com) for the header title "poké-binder"
- Integrate the "Pokemon Pixels" font (from dafont.com) for a decorative random character displayed next to the title
- Implement server-side randomization of the decorative character (a-z, A-Z, 0-9) on every page refresh
- Add font files to the project and configure `@font-face` declarations in globals.css
- Ensure the header is responsive and matches the existing dark Pokemon-themed UI palette

## Capabilities

### New Capabilities
- `app-header-branding`: Branded app header with custom Pokemon-themed typography, including title rendering and randomized decorative character

### Modified Capabilities
- `pokemon-ui-theme`: Extend theme to include custom `@font-face` font families for the two new imported fonts (no spec-level behavior change, purely implementation detail)

## Impact

- Affects `src/app/layout.tsx` to include the new Header component
- New files: `src/components/Header.tsx`, font files in `public/fonts/`
- Updates to `src/app/globals.css` for `@font-face` declarations
- No API changes, no breaking changes, no database changes
- Minimal performance impact (two small font files loaded once)
