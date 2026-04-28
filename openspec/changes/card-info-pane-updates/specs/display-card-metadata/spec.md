## MODIFIED Requirements

### Requirement: Modal shows card price from TCGPlayer
The modal SHALL display the card's market price, preferring TCGPlayer pricing. When TCGPlayer pricing is unavailable, the modal SHALL fall back to Cardmarket pricing. The modal SHALL display a label indicating the pricing source.

#### Scenario: TCGPlayer price available
- **WHEN** the card has TCGPlayer pricing data
- **THEN** the modal displays the TCGPlayer market price with the label "TCGPlayer Market"

#### Scenario: TCGPlayer unavailable, Cardmarket available
- **WHEN** the card has no TCGPlayer pricing data but has Cardmarket pricing data
- **THEN** the modal displays the Cardmarket price with the label "Cardmarket"

#### Scenario: No pricing available from either source
- **WHEN** the card has no pricing data from TCGPlayer or Cardmarket
- **THEN** the modal displays "N/A" as a placeholder

### Requirement: Modal shows card metadata
The modal SHALL display additional metadata: rarity and set name. The modal SHALL NOT display card types or artist.

#### Scenario: Display metadata without types and artist
- **WHEN** the card detail modal is open for a card with full metadata
- **THEN** the modal displays rarity and set name but does NOT display types or artist

#### Scenario: Missing metadata fields
- **WHEN** some metadata fields are missing from the API
- **THEN** the modal displays "~" for missing fields gracefully

## REMOVED Requirements

### Requirement: Display card types in modal
**Reason**: Types field removed from the card detail modal to reduce clutter.
**Migration**: No migration needed. The types field is simply no longer displayed.

### Requirement: Display card artist in modal
**Reason**: Artist field removed from the card detail modal to reduce clutter.
**Migration**: No migration needed. The artist field is simply no longer displayed.
