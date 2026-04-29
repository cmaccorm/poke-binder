## Why

Collectors often know exactly which cards they want in specific binder slots before they acquire them. Currently, the only options are to leave a slot empty or fill it with an owned card — there's no way to "reserve" a slot for a card you're hunting for. A wishlist mode lets collectors plan their binder layouts in advance and track which cards they still need to find.

## What Changes

- Add a `wishlist` boolean flag to slots so a card can be marked as "wanted but not owned"
- Persist the wishlist state in the database alongside the existing card assignment
- Expose the wishlist flag through the existing slot assign/update API
- Render wishlist cards with a distinct but subtle visual treatment that preserves the card art, using a badge and light frame treatment so they're immediately distinguishable from owned cards
- Allow toggling a slot between owned and wishlist states without removing the card
- Include wishlist status in the `BinderSlot` type so the full client stack is aware of it

## Capabilities

### New Capabilities
- `wishlist-slot`: Ability to assign a card to a slot as a wishlist item, persist that state, toggle between owned/wishlist, and visually differentiate wishlist cards from owned cards in the binder viewer.

### Modified Capabilities
_(none — this extends the existing slot assignment flow without changing any existing spec-level requirements)_

## Impact

- **Database**: New `isWishlist` column on the `Slot` table (nullable boolean, default `false`); requires a Prisma migration
- **API**: `PUT /api/binders/[id]/slots/[slotId]` gains an optional `isWishlist` field in the request body
- **Data layer**: `assignCardToSlot` in `src/lib/binders.ts` accepts an optional wishlist parameter; `BinderSlot` type in `src/lib/types.ts` gains an `isWishlist` field
- **UI**: `SlotCell` / card rendering components in the binder viewer need conditional styling for wishlist cards
- **No breaking changes** — existing slots default to `isWishlist: false`, preserving current behavior
