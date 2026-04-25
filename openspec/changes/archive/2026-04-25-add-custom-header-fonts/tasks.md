## 1. Font Assets

- [x] 1.1 Download "Pokemon Classic" font file from dafont.com and place in `public/fonts/`
- [x] 1.2 Download "Pokemon Pixels" font file from dafont.com and place in `public/fonts/`
- [x] 1.3 Include license/readme files alongside font files in `public/fonts/`

## 2. Font Registration

- [x] 2.1 Add `@font-face` declaration for "Pokemon Classic" in `src/app/globals.css`
- [x] 2.2 Add `@font-face` declaration for "Pokemon Pixels" in `src/app/globals.css`
- [x] 2.3 Register both font families in the `@theme inline` block of `globals.css` using CSS variables
- [x] 2.4 Verify fonts are accessible via browser dev tools Network tab

## 3. Header Component

- [x] 3.1 Create `src/components/Header.tsx` as a React Server Component
- [x] 3.2 Implement server-side random character generation from pool `a-zA-Z0-9`
- [x] 3.3 Render title "poké-binder" using the "Pokemon Classic" font family
- [x] 3.4 Render the randomized character adjacent to the title using the "Pokemon Pixels" font family
- [x] 3.5 Style the header to match the existing dark Pokemon-themed UI palette (dark background, appropriate padding)
- [x] 3.6 Ensure header layout is responsive across screen sizes

## 4. Layout Integration

- [x] 4.1 Import and render `Header` component in `src/app/layout.tsx` above `children`
- [x] 4.2 Verify header appears on the home page (`/`)
- [x] 4.3 Verify header appears on binder pages (`/binder/[binderId]`)
- [x] 4.4 Confirm page body content still renders correctly below the header

## 5. Verification

- [x] 5.1 Refresh the home page multiple times and confirm the decorative character changes
- [x] 5.2 Confirm both fonts are loaded and applied correctly in browser dev tools
- [x] 5.3 Run the app build (`npm run build`) to ensure no compilation errors
- [x] 5.4 Run lint (`npm run lint`) to ensure no style violations
