## 1. Database Schema & Migration

- [x] 1.1 Add `isWishlist Boolean @default(false)` field to the `Slot` model in `prisma/schema.prisma`
- [x] 1.2 Generate and apply the Prisma migration (backfills existing rows with `false`)
- [x] 1.3 Run `npx prisma generate` to regenerate the Prisma client

## 2. Data Layer & Types

- [x] 2.1 Add `isWishlist: boolean` to the `BinderSlot` interface in `src/lib/types.ts`
- [x] 2.2 Update `assignCardToSlot` in `src/lib/binders.ts` to accept an optional `isWishlist` parameter (default `false`)
- [x] 2.3 Update `removeCardFromSlot` in `src/lib/binders.ts` to reset `isWishlist` to `false` when clearing a slot
- [x] 2.4 Update `getBinderPage` in `src/lib/binders.ts` to include `isWishlist` in the `BinderSlot` mapping

## 3. API Route

- [x] 3.1 Update `PUT /api/binders/[binderId]/slots/[slotId]` to parse optional `isWishlist` from request body and pass it to `assignCardToSlot`

## 4. UI — Wishlist Visual Treatment

- [x] 4.1 Add subtle wishlist styling (accent frame / glow) to the slot rendering in `BinderViewer.tsx` without dimming the card art
- [x] 4.2 Add a wishlist badge/icon overlay on wishlist card slots

## 5. UI — Toggle Interaction

- [x] 5.1 Extend the slot interaction flow in edit mode to show a "Mark as wishlist" / "Mark as owned" toggle option alongside the existing "Remove card" action
- [x] 5.2 Implement the toggle API call (PUT with same `catalogCardId` and flipped `isWishlist`) and optimistic UI update
- [x] 5.3 Add `isWishlist` flag to the card search/assign flow so users can assign a card directly as a wishlist item

## 6. Verification

- [x] 6.1 Verify the app builds without errors (`npm run build`)
- [x] 6.2 Verify existing tests pass (`npx vitest run`)
