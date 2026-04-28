## ADDED Requirements

### Requirement: Pricing data is cached in the database
The system SHALL store card pricing data (TCGPlayer market price and Cardmarket price) in the CatalogCard database table alongside a `priceUpdatedAt` timestamp.

#### Scenario: Pricing columns exist on CatalogCard
- **WHEN** the database schema is inspected
- **THEN** the CatalogCard model includes `priceTcgplayer` (nullable Float), `priceCardmarket` (nullable Float), and `priceUpdatedAt` (nullable DateTime) columns

### Requirement: Cached pricing is served when fresh
The system SHALL return cached pricing data from the database when the `priceUpdatedAt` timestamp is less than 24 hours old, without making an external API call for pricing.

#### Scenario: Cache is fresh (under 24 hours)
- **WHEN** a user opens the card detail modal for a card whose `priceUpdatedAt` is less than 24 hours ago
- **THEN** the system returns the cached `priceTcgplayer` and `priceCardmarket` values from the database without calling the PokéTCG API for pricing

#### Scenario: Cache is stale (over 24 hours)
- **WHEN** a user opens the card detail modal for a card whose `priceUpdatedAt` is more than 24 hours ago
- **THEN** the system fetches fresh pricing from the PokéTCG API, updates the database with the new prices and timestamp, and returns the fresh data

#### Scenario: No cached pricing exists
- **WHEN** a user opens the card detail modal for a card that has no `priceUpdatedAt` value (null)
- **THEN** the system fetches pricing from the PokéTCG API, stores the prices and timestamp in the database, and returns the fresh data

### Requirement: Pricing cache updates the database after fetch
The system SHALL update the CatalogCard row with fresh pricing data and the current timestamp after fetching from the PokéTCG API.

#### Scenario: Successful API fetch updates cache
- **WHEN** the system fetches card data from the PokéTCG API and pricing data is present
- **THEN** the system writes the resolved TCGPlayer price, resolved Cardmarket price, and current timestamp to the CatalogCard row

#### Scenario: API fetch returns no pricing
- **WHEN** the system fetches card data from the PokéTCG API and no pricing data is present for either source
- **THEN** the system writes null for both price fields and sets `priceUpdatedAt` to the current timestamp to avoid repeated fetches
