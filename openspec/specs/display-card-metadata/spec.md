## ADDED Requirements

### Requirement: Card detail modal displays on click
When a user clicks on a slot containing a card in view mode (editMode is false), the system SHALL display a modal overlay showing detailed metadata for that card.

#### Scenario: Click card in view mode opens detail modal
- **WHEN** user clicks a slot that contains a card while in view mode
- **THEN** a modal appears with card metadata (image, name, price, rarity, set, types, artist)

#### Scenario: Click empty slot in view mode does nothing
- **WHEN** user clicks a slot that is empty (no card) while in view mode
- **THEN** no modal appears and no error occurs

#### Scenario: Click card in edit mode opens remove confirmation
- **WHEN** user clicks a slot that contains a card while in edit mode
- **THEN** the remove confirmation dialog appears (existing behavior)

### Requirement: Modal shows card price from TCGPlayer
The modal SHALL display the TCGPlayer price from the PokéTCG API when available.

#### Scenario: Price available
- **WHEN** the PokéTCG API returns price data for the card
- **THEN** the modal displays the price (e.g., '$3.99')

#### Scenario: Price not available
- **WHEN** the PokéTCG API does not return price data for the card
- **THEN** the modal displays 'N/A' or '~' as a placeholder

### Requirement: Modal shows card metadata
The modal SHALL display additional metadata: rarity, set name, card types, and artist.

#### Scenario: Display full metadata
- **WHEN** the API returns all metadata fields
- **THEN** the modal displays rarity, set name, types, and artist

#### Scenario: Missing metadata fields
- **WHEN** some metadata fields are missing from the API
- **THEN** the modal displays '~' or hides missing fields gracefully

### Requirement: Modal can be closed
The user SHALL be able to close the modal using multiple methods.

#### Scenario: Click outside modal closes it
- **WHEN** user clicks on the overlay background outside the modal
- **THEN** the modal closes

#### Scenario: Press Escape closes modal
- **WHEN** user presses the Escape key while the modal is open
- **THEN** the modal closes