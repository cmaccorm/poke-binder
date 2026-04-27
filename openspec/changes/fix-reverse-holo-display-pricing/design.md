## Context

The `CardDetailModal` currently accepts only an `externalId` prop and fetches the full card from the API. It picks a price using a fallback chain (`normal → holofoil → reverseHolofoil → 1stEditionHolofoil`) regardless of which variant the user assigned to the slot. The variant is already stored on the `Slot` model and returned in page data — it just never reaches the modal.

## Goals / Non-Goals

**Goals:**
- Show the slot's variant label (e.g. "Reverse Holo") in the card detail modal.
- Display the price for the specific variant stored on the slot.
- Fall back to "N/A" when the variant-specific price is unavailable, rather than silently showing a different variant's price.

**Non-Goals:**
- Changing how variants are assigned during card search (that flow already works).
- Showing variant badges on the binder grid thumbnails (separate concern).
- Modifying the CatalogCard model or database schema.
- Adding variant switching within the modal (user picks variant at search time).

## Decisions

### 1. Pass `variant` as an optional prop to CardDetailModal

**Choice:** Add `variant: string | null` to `CardDetailModalProps`. The caller (`BinderViewer`) already has the variant from `slot.card.variant`.

**Alternative considered:** Have the modal look up the variant by querying the slot. Rejected because the data is already available client-side and adding a round-trip would be unnecessary complexity.

### 2. Map variant labels back to TCGPlayer price keys

**Choice:** Create a reverse lookup from the display label (e.g. "Reverse Holo") to the TCGPlayer price key (`reverseHolofoil`). The forward map already exists in `catalog.ts` as `VARIANT_MAP`. We will export `VARIANT_MAP` and derive the reverse mapping in the modal.

**Alternative considered:** Pass the raw price key instead of the label. Rejected because the label is what's stored on the slot and displayed to the user — changing the stored format would require a data migration for no gain.

### 3. Variant-specific price selection with strict fallback

**Choice:** If a variant is provided, look up only that variant's price. If the specific price is missing, show "N/A" — do not fall back to another variant's price. If no variant is provided (legacy slots assigned before the variant feature), keep the existing fallback chain for backward compatibility.

**Rationale:** Silently showing a different variant's price is the core bug being fixed. Strict selection avoids misleading the user about their collection's value.

## Risks / Trade-offs

- **Legacy slots without variant** → These pre-date the variant feature and have `variant: null`. The existing fallback chain handles them. No migration needed.
- **VARIANT_MAP coupling** → The modal depends on `catalog.ts` for the label-to-key mapping. This is acceptable since both components deal with the same domain concept and the map is small and stable.
