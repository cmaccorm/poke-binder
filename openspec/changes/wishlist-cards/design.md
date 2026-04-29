## Context

Currently, a `Slot` in a binder either has a `catalogCardId` (owned card) or is empty (`null`). There is no intermediate state to represent "I want this card here but don't have it yet." The data model, API, and UI all treat card assignment as binary: present or absent.

The wishlist feature adds a third semantic state — card assigned but not owned — while reusing the existing card assignment infrastructure. The slot still references a `CatalogCard`, but a boolean flag marks it as a wishlist entry.

## Goals / Non-Goals

**Goals:**
- Allow users to assign a card to a slot and mark it as a wishlist item
- Persist wishlist state in the database so it survives page reloads
- Visually distinguish wishlist cards from owned cards in the binder viewer
- Allow toggling between owned and wishlist without removing and re-assigning the card
- Zero impact on existing slots — all current data defaults to "owned"

**Non-Goals:**
- Wishlist analytics or summary views (e.g., "show all wishlist cards across binders")
- Wishlist-specific notifications or price alerts
- Bulk wishlist operations (mark multiple slots at once)
- Separate wishlist binders — this is per-slot, within existing binders

## Decisions

### 1. Boolean column on Slot (`isWishlist`) vs. separate junction table

**Decision**: Add `isWishlist Boolean @default(false)` column directly to the `Slot` model.

**Rationale**: The wishlist state is a property of the slot assignment, not of the card itself. A user might want the same card as owned in one binder and wishlisted in another. A separate table would add join complexity for no real benefit. A boolean on `Slot` is the simplest representation and aligns with how the data is already queried (slots are always loaded with their page).

**Alternative considered**: An enum field (`status: "owned" | "wishlist"`) — more extensible but YAGNI for now. A boolean is simpler and can be migrated to an enum later if needed.

### 2. API surface: extend existing PUT vs. new endpoint

**Decision**: Extend `PUT /api/binders/[binderId]/slots/[slotId]` to accept an optional `isWishlist` boolean in the request body.

**Rationale**: The wishlist flag is part of the card-to-slot assignment. It makes sense to set it at assignment time. Adding a separate endpoint would split a single conceptual operation into two requests and complicate the client. The existing `assignCardToSlot` function already accepts the slot ID and card ID — adding `isWishlist` as an optional parameter is minimal.

For toggling an already-assigned card between owned/wishlist, the same PUT endpoint works — the client sends `catalogCardId` (same card) with a different `isWishlist` value. Alternatively, a dedicated `PATCH` could toggle just the flag, but this adds API surface for marginal benefit.

### 3. Visual treatment for wishlist cards

**Decision**: Keep the card image at full fidelity and differentiate wishlist items with a small badge plus a subtle frame treatment on the slot container.

**Rationale**: The user explicitly wants the card art to remain the focus. A badge communicates wishlist state without dimming or flattening the artwork. A light frame treatment on the slot container adds a second signal without obscuring the card image. This approach:
- Preserves the visual impact of the card art
- Is purely CSS, no extra assets or network requests
- Is accessible (badge provides non-color-dependent signal)

Implementation: CSS classes on the slot `<button>` element, conditional on `slot.card` being present and `slot.isWishlist` being `true`. The card image remains unfiltered; the container gets a subtle accent border/glow and a positioned badge overlay.

### 4. Toggle UX flow

**Decision**: Add a toggle option in the existing slot interaction flow rather than a new mode.

**Rationale**: When a user long-presses/clicks an occupied slot in edit mode, they currently get a "remove card" confirmation. We'll extend this to also show a "Mark as wishlist" / "Mark as owned" toggle option. This keeps the interaction model consistent — slots are managed through the same click flow.

## Risks / Trade-offs

- **[Risk] Existing slots get `isWishlist: false` by default** → Mitigation: The migration uses `@default(false)` and backfills all existing rows, so no NULL handling is needed.
- **[Risk] Lightweight styling may be too subtle in busy binder layouts** → Mitigation: Combine a badge with a clear border accent so wishlist state is still visible at a glance.
- **[Trade-off] No bulk toggle** → Keeps the initial implementation simple. Users who want many wishlist cards must toggle them one at a time. Can be revisited if usage patterns demand it.
