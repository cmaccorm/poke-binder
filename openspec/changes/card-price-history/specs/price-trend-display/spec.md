## ADDED Requirements

### Requirement: Price trend API endpoint
The system SHALL expose `GET /api/catalog/card/[id]/price-trend` that returns Cardmarket pricing trend data for the specified card from TCGdex.

#### Scenario: Cached data exists and is fresh (within 7 days)
- **WHEN** a request is made for a card whose `PriceTrend.fetchedAt` is less than 7 days ago
- **THEN** the endpoint returns the cached data without calling the TCGdex API

#### Scenario: No cached data or cache is stale
- **WHEN** a request is made for a card with no cache entry or `fetchedAt` older than 7 days
- **THEN** the endpoint fetches from `GET https://api.tcgdex.net/v2/en/cards/<id>`, extracts the `pricing.cardmarket` object, upserts it into the `PriceTrend` table, and returns the data

#### Scenario: TCGdex API is unavailable or returns an error
- **WHEN** the TCGdex API call fails (network error, 4xx, 5xx)
- **THEN** the endpoint returns stale cached data if available, or a null pricing object with a 200 status (not a 500)

#### Scenario: Card has no Cardmarket pricing in TCGdex
- **WHEN** the TCGdex API returns a card with `pricing.cardmarket` as null
- **THEN** the endpoint returns a null pricing object with a 200 status

### Requirement: PriceTrend database table
The system SHALL store cached TCGdex pricing data in a `PriceTrend` table with a unique constraint on `externalId`.

#### Scenario: First fetch for a card
- **WHEN** trend data is fetched for a card not yet in the database
- **THEN** a new `PriceTrend` row is created with the JSON data and current timestamp

#### Scenario: Re-fetch after cache expiry
- **WHEN** trend data is fetched for a card whose cache has expired (older than 7 days)
- **THEN** the existing row is updated (upserted) with fresh data and a new `fetchedAt` timestamp

### Requirement: Price trend display component
The system SHALL render a price trend section in the card detail modal showing Cardmarket EUR pricing with directional indicators.

#### Scenario: Cardmarket pricing data is available
- **WHEN** the price trend API returns Cardmarket pricing data
- **THEN** the component displays the current average price, trend price, and 1-day/7-day/30-day averages with directional arrows (green up, red down, gray stable)

#### Scenario: Holo variant pricing available
- **WHEN** the Cardmarket data includes holo-specific fields (`avg-holo`, `trend-holo`, `avg1-holo`, `avg7-holo`, `avg30-holo`)
- **THEN** the component displays the holo pricing when the card's variant is "Holo", and normal pricing when the variant is "Normal" or null

#### Scenario: Price trend data is loading
- **WHEN** the price trend API request is in progress
- **THEN** a loading skeleton is shown in the trend section area

#### Scenario: Price trend data is unavailable
- **WHEN** the price trend API returns null pricing
- **THEN** the trend section is hidden entirely (no "unavailable" message cluttering the modal)

### Requirement: Trend direction indicators
The system SHALL show directional arrows based on comparing shorter-term to longer-term averages.

#### Scenario: Short-term price increase
- **WHEN** the 1-day average is more than 5% higher than the 7-day average
- **THEN** a green up arrow is shown next to the 1-day value

#### Scenario: Short-term price decrease
- **WHEN** the 1-day average is more than 5% lower than the 7-day average
- **THEN** a red down arrow is shown next to the 1-day value

#### Scenario: Price is stable
- **WHEN** the 1-day average is within 5% of the 7-day average
- **THEN** a gray horizontal arrow is shown next to the 1-day value

### Requirement: Currency labeling
The system SHALL clearly label the trend section as Cardmarket EUR pricing to distinguish it from the existing TCGPlayer USD spot price.

#### Scenario: Trend section header
- **WHEN** the trend section is displayed
- **THEN** it is labeled "Cardmarket Trends (EUR)" or similar to clearly indicate the data source and currency
