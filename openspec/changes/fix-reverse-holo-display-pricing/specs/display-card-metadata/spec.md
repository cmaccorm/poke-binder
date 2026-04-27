## MODIFIED Requirements

### Requirement: Modal shows card price from TCGPlayer
The modal SHALL display the TCGPlayer price from the PokéTCG API. When the slot has a variant, the modal SHALL display the price for that specific variant. When no variant is present, the modal SHALL use the existing fallback chain.

#### Scenario: Price available with variant
- **WHEN** the slot has a variant and the PokéTCG API returns a price for that variant
- **THEN** the modal displays the variant-specific price (e.g., '$2.49')

#### Scenario: Price unavailable for variant
- **WHEN** the slot has a variant but the PokéTCG API does not return a price for that variant
- **THEN** the modal displays 'N/A'

#### Scenario: Price available without variant (legacy)
- **WHEN** the slot has no variant and the PokéTCG API returns price data
- **THEN** the modal displays the first available price using the fallback chain (normal → holofoil → reverseHolofoil → 1stEditionHolofoil)

#### Scenario: Price not available
- **WHEN** the PokéTCG API does not return any price data for the card
- **THEN** the modal displays 'N/A' or '~' as a placeholder
