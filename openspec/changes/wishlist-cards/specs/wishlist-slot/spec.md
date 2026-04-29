## ADDED Requirements

### Requirement: Slot wishlist state persistence
The system SHALL store an `isWishlist` boolean flag on each slot. The flag SHALL default to `false` for all new and existing slots. The flag SHALL only be meaningful when a slot has a card assigned (`catalogCardId` is not null). When a card is removed from a slot, the `isWishlist` flag SHALL be reset to `false`.

#### Scenario: New slot defaults to owned
- **WHEN** a new binder is created with empty slots
- **THEN** every slot SHALL have `isWishlist` set to `false`

#### Scenario: Existing slots unaffected by migration
- **WHEN** the migration is applied to a database with existing slots
- **THEN** all existing slots SHALL have `isWishlist` set to `false`

#### Scenario: Wishlist flag reset on card removal
- **WHEN** a card is removed from a slot that had `isWishlist: true`
- **THEN** the slot's `isWishlist` flag SHALL be reset to `false`
- **AND** the slot's `catalogCardId` SHALL be `null`

### Requirement: Assign card as wishlist item
The system SHALL allow assigning a card to a slot with `isWishlist: true` via the slot assignment API. The `PUT /api/binders/[binderId]/slots/[slotId]` endpoint SHALL accept an optional `isWishlist` boolean field in the request body. When `isWishlist` is omitted, it SHALL default to `false`.

#### Scenario: Assign a card as a wishlist item
- **WHEN** a PUT request is made to `/api/binders/{binderId}/slots/{slotId}` with `{ catalogCardId: "abc", isWishlist: true }`
- **THEN** the slot SHALL be updated with the given `catalogCardId` and `isWishlist: true`

#### Scenario: Assign a card as owned (default)
- **WHEN** a PUT request is made to `/api/binders/{binderId}/slots/{slotId}` with `{ catalogCardId: "abc" }` (no `isWishlist` field)
- **THEN** the slot SHALL be updated with the given `catalogCardId` and `isWishlist: false`

### Requirement: Toggle wishlist state on an existing card
The system SHALL allow toggling the `isWishlist` flag on a slot that already has a card assigned, without requiring the card to be removed and re-assigned.

#### Scenario: Toggle owned card to wishlist
- **WHEN** a PUT request is made to a slot that already has `catalogCardId: "abc"` and `isWishlist: false`, with body `{ catalogCardId: "abc", isWishlist: true }`
- **THEN** the slot SHALL update `isWishlist` to `true` while keeping the same `catalogCardId`

#### Scenario: Toggle wishlist card to owned
- **WHEN** a PUT request is made to a slot that has `catalogCardId: "abc"` and `isWishlist: true`, with body `{ catalogCardId: "abc", isWishlist: false }`
- **THEN** the slot SHALL update `isWishlist` to `false` while keeping the same `catalogCardId`

### Requirement: Wishlist state in page data
The `isWishlist` flag SHALL be included in the slot data returned by the page loading API. The `BinderSlot` type SHALL include an `isWishlist: boolean` field.

#### Scenario: Page data includes wishlist flag
- **WHEN** a page is loaded that contains a slot with `isWishlist: true`
- **THEN** the slot object in the response SHALL include `isWishlist: true`

#### Scenario: Page data includes owned flag
- **WHEN** a page is loaded that contains a slot with `isWishlist: false`
- **THEN** the slot object in the response SHALL include `isWishlist: false`

### Requirement: Visual differentiation of wishlist cards
Wishlist cards SHALL be visually distinct from owned cards in the binder viewer. The visual treatment SHALL preserve the card image at full fidelity and SHALL include both a badge or icon indicator and a subtle frame treatment that does not rely solely on color.

#### Scenario: Wishlist card is visibly marked
- **WHEN** a binder page is rendered containing a slot with a card and `isWishlist: true`
- **THEN** the card image SHALL remain fully visible and unfiltered
- **AND** a wishlist indicator badge SHALL be visible on the slot
- **AND** the slot container SHALL show a subtle accent treatment

#### Scenario: Owned card appears normal
- **WHEN** a binder page is rendered containing a slot with a card and `isWishlist: false`
- **THEN** the card image SHALL be displayed with normal saturation and opacity
- **AND** no wishlist indicator badge SHALL be shown

### Requirement: Toggle wishlist from slot interaction
In edit mode, the user SHALL be able to toggle a slot's wishlist state through the existing slot interaction flow (click/tap on an occupied slot). The toggle option SHALL be available alongside the existing "remove card" action.

#### Scenario: Toggle to wishlist from edit mode
- **WHEN** the user is in edit mode and interacts with an occupied slot that has `isWishlist: false`
- **THEN** the UI SHALL present an option to mark the card as a wishlist item
- **AND** selecting that option SHALL update the slot to `isWishlist: true`

#### Scenario: Toggle to owned from edit mode
- **WHEN** the user is in edit mode and interacts with an occupied slot that has `isWishlist: true`
- **THEN** the UI SHALL present an option to mark the card as owned
- **AND** selecting that option SHALL update the slot to `isWishlist: false`
