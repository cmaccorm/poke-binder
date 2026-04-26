## ADDED Requirements

### Requirement: Binder page cache respects hourly time window
The system SHALL only cache binder pages if the binder's cached data is older than one hour or if no cached data exists.

#### Scenario: Cold binder (no cache) triggers caching
- **GIVEN** a binder has no cached data in IndexedDB
- **WHEN** the user opens the binder online
- **THEN** the application fetches all pages and caches them to IndexedDB
- **AND** stores a `cachedAt` timestamp with the binder data

#### Scenario: Fresh cache (within hour) skips caching
- **GIVEN** a binder was cached within the last hour
- **WHEN** the user opens the same binder online
- **THEN** the application does NOT fetch or re-cache any pages
- **AND** existing cached pages remain available offline

#### Scenario: Expired cache (older than hour) triggers re-caching
- **GIVEN** a binder was cached more than one hour ago
- **WHEN** the user opens the binder online
- **THEN** the application fetches all pages and overwrites the existing cache
- **AND** updates the `cachedAt` timestamp

### Requirement: Cache timestamp stored per binder
The system SHALL store a `cachedAt` timestamp alongside the binder data in IndexedDB to track when the last successful cache operation occurred.

#### Scenario: Timestamp recorded on successful cache
- **GIVEN** a binder is opened online with no recent cache
- **WHEN** all pages are successfully fetched and cached
- **THEN** the `cachedAt` timestamp is updated to the current time

#### Scenario: Timestamp preserved for in-memory cached pages
- **GIVEN** a binder was cached at a specific time and pages are in memory
- **WHEN** the user navigates between cached pages
- **THEN** the `cachedAt` timestamp in IndexedDB remains unchanged

### Requirement: Cache page data on card operations
The system SHALL immediately cache the current page after a card is assigned to or removed from a slot.

#### Scenario: Card assignment triggers page cache
- **GIVEN** a user assigns a card to an empty slot while online
- **WHEN** the card assignment API call succeeds
- **THEN** the updated page data is fetched and written to IndexedDB

#### Scenario: Card removal triggers page cache
- **GIVEN** a user removes a card from a slot while online
- **WHEN** the card removal API call succeeds
- **THEN** the updated page data is fetched and written to IndexedDB