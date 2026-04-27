## ADDED Requirements

### Requirement: Custom card image storage
The system SHALL store custom card image overrides in a `CustomCardImage` database table with fields: `id`, `externalId`, `variant`, `imageSmall`, `imageLarge`, and `createdAt`. The composite key `(externalId, variant)` SHALL be unique.

#### Scenario: Custom image record exists for a card variant
- **WHEN** a `CustomCardImage` row exists with `externalId = "ex7-1"` and `variant = "Reverse Holo"`
- **THEN** the record SHALL contain `imageSmall` and `imageLarge` URLs pointing to the custom images

#### Scenario: No duplicate overrides allowed
- **WHEN** an insert is attempted with an `(externalId, variant)` pair that already exists
- **THEN** the database SHALL reject the insert with a unique constraint violation

### Requirement: Custom image resolution
The system SHALL provide a `resolveCardImages` function that, given a list of `(externalId, variant)` pairs, returns the appropriate image URLs for each pair. For each pair, the function SHALL return the custom image URLs if a `CustomCardImage` record exists, otherwise it SHALL return the default `CatalogCard` image URLs.

#### Scenario: Card variant has a custom image override
- **WHEN** `resolveCardImages` is called with `externalId = "ex7-1"` and `variant = "Reverse Holo"`
- **AND** a `CustomCardImage` record exists for that pair
- **THEN** the returned `imageSmall` and `imageLarge` SHALL be the custom URLs from `CustomCardImage`

#### Scenario: Card variant has no custom image override
- **WHEN** `resolveCardImages` is called with `externalId = "ex7-1"` and `variant = "Normal"`
- **AND** no `CustomCardImage` record exists for that pair
- **THEN** the returned `imageSmall` and `imageLarge` SHALL be the default URLs from `CatalogCard`

#### Scenario: Batch resolution for multiple cards
- **WHEN** `resolveCardImages` is called with 20 `(externalId, variant)` pairs
- **THEN** the function SHALL query `CustomCardImage` in a single batch query (not 20 individual queries)

### Requirement: Search results use custom images
The system SHALL resolve custom images for all card variants returned by catalog search before sending results to the client. Each `CardReference` in the search response SHALL have its `imageSmall` and `imageLarge` fields set to the custom image URLs when an override exists for that card's `(externalId, variant)`.

#### Scenario: Search returns a reverse holo card with custom image
- **WHEN** a user searches for a card
- **AND** the results include a "Reverse Holo" variant of a card that has a `CustomCardImage` override
- **THEN** the search result for that variant SHALL display the custom image, not the default PokémonTCG API image

#### Scenario: Search returns a variant without custom image
- **WHEN** a user searches for a card
- **AND** the results include a "Normal" variant with no `CustomCardImage` override
- **THEN** the search result SHALL display the default PokémonTCG API image

### Requirement: Binder slots use custom images
The system SHALL resolve custom images when loading binder page data. Each slot's card reference SHALL have its image URLs overridden with custom images when a `CustomCardImage` record exists for the slot's `(externalId, variant)` pair.

#### Scenario: Binder slot contains a reverse holo with custom image
- **WHEN** a binder page is loaded
- **AND** a slot contains a card with `variant = "Reverse Holo"` that has a `CustomCardImage` override
- **THEN** the slot SHALL render using the custom image URLs

#### Scenario: Binder slot contains a card without custom image
- **WHEN** a binder page is loaded
- **AND** a slot contains a card with no matching `CustomCardImage` record
- **THEN** the slot SHALL render using the default `CatalogCard` image URLs

### Requirement: Image host domain configuration
The system SHALL allow the custom image host domain in the Next.js image configuration (`next.config.ts` `images.remotePatterns`) so that `next/image` can optimize and serve custom images.

#### Scenario: Custom image from allowed host renders correctly
- **WHEN** a custom image URL uses a domain listed in `next.config.ts` remote patterns
- **THEN** the Next.js `Image` component SHALL load and optimize the image without errors
