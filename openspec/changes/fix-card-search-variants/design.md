## Context

The card search pipeline flows: user query → `parseSearchQuery` → `buildCatalogQuery` → PokéTCG API → cache in Prisma → render in `CardSearch.tsx`. Two problems exist:

1. **Set name matching is prefix-only**: `buildCatalogQuery` appends `*` only at the end (e.g., `set.name:"delta species*"`), which fails to match set names like "EX Delta Species" where the user's term appears mid-string.

2. **Variants are invisible**: The PokéTCG API returns one card entry per card number per set. Printing variants (Normal, Holo, Reverse Holo, 1st Edition Holo) are embedded as sub-objects under `tcgplayer.prices`, not as separate cards. The current UI shows one result per API card, so users cannot pick a specific variant.

## Goals / Non-Goals

**Goals:**
- Fix set name matching so partial/mid-string terms like "delta species" match "EX Delta Species"
- Surface each printing variant (Normal, Holo, Reverse Holo, 1st Edition Holo) as a separate selectable result in the card search UI
- Persist the user's chosen variant on the binder slot so it displays correctly

**Non-Goals:**
- Showing different card images per variant (the PokéTCG API provides one image per card regardless of variant)
- Variant-specific pricing display in the search results list (pricing is shown in the detail modal)
- Supporting custom/user-defined variants beyond what the API provides
- Changing how the card detail modal works

## Decisions

### 1. Wildcard wrapping for set name queries

**Decision**: Change `buildCatalogQuery` to wrap set name terms with wildcards on both sides: `set.name:"*delta species*"` instead of `set.name:"delta species*"`.

**Rationale**: The PokéTCG API supports leading wildcards. This is the minimal change that fixes the reported bug. The alternative — building a set name lookup table — adds complexity and an extra API call for marginal benefit.

### 2. Client-side variant expansion from `tcgplayer.prices`

**Decision**: After fetching cards from the PokéTCG API, expand each card into N results where N is the number of price variant keys present in `tcgplayer.prices`. Each expanded result shares the same card data but carries a distinct `variant` label.

**Rationale**: The PokéTCG API doesn't support querying by variant, so expansion must happen post-fetch. Doing it server-side (in `searchCatalog`) keeps the logic centralized and means the API route and UI don't need variant-specific knowledge. The alternative — expanding on the client — would duplicate logic and require the raw `tcgplayer` data to be sent to the client.

**Variant mapping**:
- `normal` → "Normal"
- `holofoil` → "Holo"
- `reverseHolofoil` → "Reverse Holo"
- `1stEditionHolofoil` → "1st Edition Holo"

If a card has no `tcgplayer.prices` data at all, return a single result with `variant: null` (unknown variant).

### 3. Store variant on the Slot, not on CatalogCard

**Decision**: Add a nullable `variant` column to the `Slot` model in Prisma. The `CatalogCard` model remains unchanged (one row per unique card).

**Rationale**: A single physical card (CatalogCard) can be placed in multiple slots with different variant designations. Storing variant on Slot avoids duplicating CatalogCard rows for each variant. The `assignCardToSlot` function already receives the slot ID and card reference — adding variant is a minor extension.

### 4. Extend CardReference with optional variant field

**Decision**: Add `variant: string | null` to the `CardReference` type. The search API returns expanded results with variant populated. The slot assignment flow passes variant through.

**Rationale**: This is the minimal type change that threads variant info through the entire pipeline without breaking existing code (variant is nullable, so all existing code that ignores it continues to work).

## Risks / Trade-offs

- **[More API calls for variant data]** → The variant expansion requires fetching full card details (including `tcgplayer.prices`) which the search endpoint already returns. No additional API calls needed.
- **[Result count inflation]** → A card with 3 variants becomes 3 results. With a `pageSize` of 20, effective unique cards shown could drop. → Acceptable trade-off; users searching specific cards want to see all variants. Could increase pageSize if needed later.
- **[Migration on existing slots]** → Existing slots have no variant data. → The column is nullable, so existing data is unaffected. UI treats null variant as "unspecified."
