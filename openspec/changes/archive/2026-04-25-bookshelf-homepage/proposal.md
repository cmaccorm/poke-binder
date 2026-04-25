## Why

The current homepage displays binders as floating cards with minimal visual context. Transforming it into a sleek bookshelf would make the collection feel tangible and immersive—like standing in front of a real card binder shelf—improving both visual appeal and the emotional connection to collecting.

## What Changes

- Add a visual bookshelf layout to the homepage Shelf component with black/charcoal wooden shelf planks and depth
- Binders displayed as physical volumes sitting on/embedded into shelves
- Multiple shelf rows that wrap based on the number of binders
- Maintain all existing functionality (create, open, hover states, animations)
- Preserve mobile responsiveness

## Capabilities

### New Capabilities

- `bookshelf-homepage`: A visual bookshelf metaphor for displaying the binder collection on the homepage, with black/charcoal shelves, depth, and binder positioning that evokes a physical collection.

### Modified Capabilities

<!-- No existing spec requirements change -->

## Impact

- `src/components/Shelf.tsx`: Replaced grid layout with bookshelf layout
- `src/app/globals.css`: Optional shelf-specific CSS variables if needed
- `src/components/BinderCard.tsx`: Minor style tweaks to fit bookshelf aesthetic
