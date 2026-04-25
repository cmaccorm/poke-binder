## Why

The current UI theme relies on navy blue and purple tones that don't fully align with the desired sleek and modern aesthetic of a trading card binder. The "My Binders" heading is also redundant since the main header already provides context. By moving to a dark charcoal and red theme with glowing accents and realistic 3D binder cards, we can create a much more polished and immersive user experience.

## What Changes

- Update global theme colors from navy blue/purple to dark charcoal/grey with red accents.
- Change the main "poké-binder" header text color to red and add a glowing effect.
- Remove the redundant "My Binders" heading and its icon from the shelf page.
- Redesign the binder cards to look like realistic 3D binders with a spine fold and page edges.

## Capabilities

### New Capabilities

- `ui-theme`: Defines the new charcoal and red theme and UI enhancements for the header and binder cards.

### Modified Capabilities

- None

## Impact

- `src/app/globals.css`: Global CSS variables for theme colors.
- `src/components/Header.tsx`: Header styling and text effects.
- `src/components/Shelf.tsx`: Layout and removal of the "My Binders" heading.
- `src/components/BinderCard.tsx`: Visual styling of the binder cards.
