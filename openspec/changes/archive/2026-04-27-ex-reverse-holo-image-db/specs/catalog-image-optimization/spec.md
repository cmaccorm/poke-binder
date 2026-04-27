## MODIFIED Requirements

### Requirement: Image resolution pipeline
The system SHALL resolve card images through a two-step pipeline: first checking for a custom image override in the `CustomCardImage` table by `(externalId, variant)`, then falling back to the default `CatalogCard` image URLs. This resolution SHALL occur at the data access layer before card data reaches rendering components.

#### Scenario: Custom override exists for requested variant
- **WHEN** a card's image is being resolved
- **AND** a `CustomCardImage` record exists for the card's `(externalId, variant)` pair
- **THEN** the system SHALL use the custom `imageSmall` and `imageLarge` URLs

#### Scenario: No custom override exists
- **WHEN** a card's image is being resolved
- **AND** no `CustomCardImage` record matches the card's `(externalId, variant)` pair
- **THEN** the system SHALL use the `imageSmall` and `imageLarge` URLs from `CatalogCard`

#### Scenario: Variant is null
- **WHEN** a card has `variant = null`
- **THEN** the system SHALL skip the custom image lookup and use `CatalogCard` image URLs directly
