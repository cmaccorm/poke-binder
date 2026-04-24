## Context

The PokeBinder app is a Next.js 16 application using React 19, Tailwind CSS v4, and TypeScript. The current layout (`src/app/layout.tsx`) has no header or branding element—it renders `children` directly inside a minimal body wrapper. The app uses Google Fonts (Geist Sans/Mono) via `next/font/google`.

The change requires integrating two custom fonts from dafont.com ("Pokemon Classic" and "Pokemon Pixels"), which are not available through Google Fonts or `next/font`. This necessitates self-hosting the font files and declaring them via CSS `@font-face`.

## Goals / Non-Goals

**Goals:**
- Display a persistent app header on all pages via the root layout
- Render the title "poké-binder" using the "Pokemon Classic" font
- Display a single random decorative character (a-z, A-Z, 0-9) next to the title using the "Pokemon Pixels" font
- Randomize the character on every full page refresh (server-side)
- Match the existing dark Pokemon-themed color palette and responsive design

**Non-Goals:**
- No navigation links, search, or interactive header elements
- No client-side randomization or animations
- No changes to page content below the header
- No service worker or caching strategy for fonts beyond Next.js defaults

## Decisions

### Self-host font files in `public/fonts/`
**Rationale**: dafont.com fonts are not available through `next/font/google` or other CDN font services. Self-hosting via the `public/` directory is the standard Next.js approach for custom font files. The font files will be served as static assets and referenced via `@font-face` in CSS.

**Alternative considered**: Using a third-party font CDN or converting to Google Fonts equivalents—rejected because the user explicitly requested these specific dafont fonts.

### Server Component for Header with inline randomization
**Rationale**: The random character only needs to change on full page refresh, so server-side generation is sufficient and simpler. A React Server Component in the App Router can compute `Math.random()` during SSR/SSG and pass the result directly to the JSX. This avoids hydration mismatches and eliminates the need for client-side JavaScript for this feature.

**Alternative considered**: Client Component with `useEffect` and `useState` for randomization—rejected as unnecessary complexity; server-side generation is simpler and more performant for this use case.

### `@font-face` declarations in `globals.css`
**Rationale**: Tailwind CSS v4 supports custom font families through `@theme inline` by referencing CSS variables. Adding `@font-face` declarations in `globals.css` and exposing `--font-pokemon-classic` and `--font-pokemon-pixels` variables allows both Tailwind utility classes and inline styles to use the fonts consistently.

### Header as a separate component file
**Rationale**: Keeping the header in `src/components/Header.tsx` maintains separation of concerns and keeps `layout.tsx` clean. The component is simple enough to remain a Server Component.

## Risks / Trade-offs

- [Font Licensing] dafont fonts may have usage restrictions → **Mitigation**: Confirm fonts are free for personal/non-commercial use; include license files alongside font files in `public/fonts/`
- [Performance] Two additional font files increase initial page weight → **Mitigation**: Font files from dafont (.ttf or .otf) are typically small (<100KB); consider `font-display: swap` to prevent FOIT
- [Build/SSG] Server-side `Math.random()` during static generation could produce a fixed character at build time → **Mitigation**: Acceptable since the app appears to be running in dynamic/SSR mode (has database dependencies); if SSG is used, the character will be fixed per build which is acceptable for this feature
