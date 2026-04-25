## 1. Preparation & CSS Setup

- [x] 1.1 Add shelf background utility class `shelf-row` to `src/app/globals.css` using black/charcoal gradient and drop-shadow to simulate a plank.
- [x] 1.2 Add CSS variables to `src/app/globals.css` for the charcoal wood colors if needed (e.g., `--shelf-charcoal`, `--shelf-shadow`).

## 2. Component Layout Updates

- [x] 2.1 Refactor the `div` containing binders in `src/components/Shelf.tsx` to use the new `shelf-row` class or structure elements so they render on top of the visual shelf.
- [x] 2.2 Adjust `padding` and `gap` in `src/components/Shelf.tsx` to ensure the binder cards align vertically with the visual shelves from the background.

## 3. Binder Card Visual Tweaks

- [x] 3.1 In `src/components/BinderCard.tsx`, add a negative bottom margin or a `translate-y` to offset the card so it visually rests "on" the shelf plank.
- [x] 3.2 In `src/components/BinderCard.tsx`, add an enhanced box shadow at the bottom to ground the binder to the shelf.

## 4. Verification

- [x] 4.1 Verify the layout wraps gracefully on smaller screens without breaking the shelf alignment.
- [x] 4.2 Verify hover animations and clicking a binder still work perfectly.

