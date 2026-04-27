## Why

The PokémonTCG API provides only one image per card ID — all variants (Normal, Holo, Reverse Holo) share the same artwork. For the ex-era expansion stamp reverse holos, the physical cards have a distinctive stamped foil pattern that makes them visually unique and collectible. Collectors placing these variants in their binders should see accurate reverse holo imagery rather than a generic card image, especially since these 10 ex-era sets are a defined, bounded scope.

## What Changes

- Add a new `CustomCardImage` database table that maps (externalId + variant) to a custom image URL, allowing per-variant image overrides.
- Seed the table with entries for reverse holo cards across the 10 target ex-era sets: EX Deoxys, EX Crystal Guardians, EX Delta Species, EX Holon Phantoms, EX Power Keepers, EX Unseen Forces, EX Team Rocket Returns, EX Emerald, EX Legend Maker, EX Dragon Frontiers.
- Modify image resolution logic so that when displaying a card variant, the system checks for a custom image override before falling back to the PokémonTCG API image.
- Update the search results (gold variant badges) and binder slot rendering to use custom images when available.

## Capabilities

### New Capabilities
- `custom-card-images`: Database table, lookup logic, and image override resolution for per-variant custom card imagery. Covers schema, data access layer, and UI integration for serving custom images by (externalId, variant) key.

### Modified Capabilities
- `catalog-image-optimization`: Image resolution now includes a custom-image-first lookup step before falling back to the external API image. The rendering pipeline for search results and binder slots needs to prefer custom images when available.

## Impact

- **Database**: New `CustomCardImage` Prisma model + migration. Minimal storage (~1,000 rows of URL strings).
- **Data access layer**: `src/lib/catalog.ts` and/or `src/lib/binders.ts` gain a custom image lookup function.
- **UI components**: `CardSearch.tsx`, `CardDetailModal.tsx`, and `BinderViewer.tsx` updated to resolve images through the new override path.
- **Image hosting**: Custom reverse holo images must be hosted externally (e.g., Supabase Storage, S3, or a CDN). The `next.config.ts` image domains list may need updating to allow the new host.
- **No breaking changes** to existing card assignment, slot management, or API routes.
