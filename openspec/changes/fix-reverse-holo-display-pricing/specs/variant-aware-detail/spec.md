## ADDED Requirements

### Requirement: Modal displays slot variant label
When a card detail modal is opened for a slot that has a variant, the modal SHALL display the variant label (e.g. "Reverse Holo", "Holo", "1st Edition Holo") as a visible badge.

#### Scenario: Slot has a variant assigned
- **WHEN** user opens the card detail modal for a slot with `variant` = "Reverse Holo"
- **THEN** the modal displays a "Reverse Holo" badge styled consistently with the search result variant badges (gold text on gold/15 background)

#### Scenario: Slot has no variant (legacy or null)
- **WHEN** user opens the card detail modal for a slot with `variant` = null
- **THEN** no variant badge is displayed

### Requirement: Modal shows variant-specific price
When a slot has a variant, the modal SHALL display the TCGPlayer market price for that specific variant, not the first available price.

#### Scenario: Variant price available
- **WHEN** user opens the card detail modal for a "Reverse Holo" slot and the API returns a `reverseHolofoil.market` price
- **THEN** the modal displays that specific price (e.g. "$2.49")

#### Scenario: Variant price unavailable
- **WHEN** user opens the card detail modal for a "Reverse Holo" slot but the API does not include a `reverseHolofoil` price entry
- **THEN** the modal displays "N/A" as the price, not a different variant's price

#### Scenario: No variant on slot uses fallback chain
- **WHEN** user opens the card detail modal for a slot with `variant` = null
- **THEN** the modal uses the existing fallback price chain (normal → holofoil → reverseHolofoil → 1stEditionHolofoil) for backward compatibility
