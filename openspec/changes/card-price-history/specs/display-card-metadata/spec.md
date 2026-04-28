## MODIFIED Requirements

### Requirement: Card detail modal displays on click
When a user clicks on a slot containing a card in view mode (editMode is false), the system SHALL display a modal overlay showing detailed metadata for that card, including a price trend section below the existing details showing Cardmarket 1/7/30-day averages when available.

#### Scenario: Click card in view mode opens detail modal
- **WHEN** user clicks a slot that contains a card while in view mode
- **THEN** a modal appears with card metadata (image, name, price, rarity, set, types, artist) and a price trend section below the details (if trend data is available)

#### Scenario: Click empty slot in view mode does nothing
- **WHEN** user clicks a slot that is empty (no card) while in view mode
- **THEN** no modal appears and no error occurs

#### Scenario: Click card in edit mode opens remove confirmation
- **WHEN** user clicks a slot that contains a card while in edit mode
- **THEN** the remove confirmation dialog appears (existing behavior)
