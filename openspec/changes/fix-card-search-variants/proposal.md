## Why

Card search fails to return all printings of a card when the user includes descriptive terms like "delta species" in their query. The query parser incorrectly treats multi-word descriptors as set names, and the PokéTCG API query uses prefix matching (`set.name:"delta species*"`) which doesn't match set names like "EX Delta Species". Additionally, when a card exists with multiple rarity variants (Normal, Holo, Reverse Holo), the API returns a single card entry with variant pricing — but the UI has no way to let the user pick which variant they want for their binder.

## What Changes

- Improve the search query parser to use wildcard wrapping (`*term*`) instead of prefix-only matching for set names, so "delta species" matches "EX Delta Species"
- Expand the variant fetch logic so that when a card has multiple TCGPlayer price variants (normal, holofoil, reverseHolofoil, 1stEditionHolofoil), each variant is surfaced as a distinct selectable result in the search UI
- Add a `variant` field to the card data model so the user's specific variant choice is preserved when a card is placed in a binder slot
- Update the card search UI to display variant badges (e.g., "Holo", "Reverse Holo") so users can distinguish between printings

## Capabilities

### New Capabilities
- `card-variant-selection`: Ability to search for, distinguish between, and select specific card printing variants (Normal, Holo, Reverse Holo, 1st Edition Holo) when adding cards to binder slots

### Modified Capabilities
- `digital-pokemon-binder`: The empty-slot add flow must now surface variant options and preserve the user's variant choice when filling a slot

## Impact

- `src/lib/catalog.ts` — query parsing, query building, variant expansion logic
- `src/lib/types.ts` — `CardReference` interface gains a `variant` field
- `prisma/schema.prisma` — `CatalogCard` model or `Slot` model needs to store variant info
- `src/components/CardSearch.tsx` — display variant badges in search results
- `src/app/api/catalog/search/route.ts` — may need to pass through variant data
- `src/lib/binders.ts` — `assignCardToSlot` needs to accept and store variant
