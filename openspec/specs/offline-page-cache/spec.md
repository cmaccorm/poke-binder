## ADDED Requirements

### Requirement: All binder pages are cached when opened online
When a binder is opened while the device is online and its cache has expired (older than 1 hour) or does not exist, the application SHALL fetch and persist every page of that binder to IndexedDB so that the entire binder is available offline without additional network requests.

#### Scenario: Binder opened online with expired cache
- **GIVEN** a binder has cached data older than 1 hour and the device is online
- **WHEN** the user opens the binder
- **THEN** the application fetches all page indices from 0 to N-1 via the page API
- **AND** each successful response is written to IndexedDB
- **AND** the user can navigate to any page offline without a loading spinner

#### Scenario: Binder with valid cache skips re-caching
- **GIVEN** a binder has cached data from within the last hour
- **WHEN** the user opens the binder online
- **THEN** no network requests are made for caching purposes
- **AND** pages already in memory are served from memory
- **AND** pages not in memory are served from IndexedDB

#### Scenario: Binder opened while offline uses cached pages
- **GIVEN** a binder was previously opened online (within last hour) and all pages were cached to IndexedDB
- **WHEN** the user opens the same binder while offline
- **THEN** all pages are available and navigable without a network request

#### Scenario: Partial caching handles network failures gracefully
- **GIVEN** a binder has 10 pages and pages 0-6 are successfully cached
- **WHEN** the network fails during caching of pages 7-9
- **THEN** pages 0-6 remain available offline
- **AND** pages 7-9 are unavailable until the binder is opened online again

### Requirement: Initial page data from server-side rendering is persisted to IndexedDB
The application SHALL write the initial page data (provided by the server component as a prop) to IndexedDB immediately on mount, making it available offline before any client-side fetch occurs.

#### Scenario: Initial page available offline immediately after first online visit
- **GIVEN** a user opens a binder online for the first time
- **WHEN** the BinderViewer component mounts with SSR-provided page data
- **THEN** that page data is written to IndexedDB within the same mount cycle
- **AND** the user can view that page offline without a network request

#### Scenario: Initial page persists across browser refresh
- **GIVEN** a user opened a binder online and the initial page was cached
- **WHEN** the user refreshes the page (still online)
- **THEN** the server fetches the initial page again (normal SSR behavior)
- **AND** it is re-written to IndexedDB on mount

## REMOVED Requirements

### Requirement: Visual indicator during background page caching
**Reason**: The caching indicator is no longer needed because caching now only occurs on binder open (when cache is expired or missing) and after card operations. These are infrequent and non-blocking events. The previous aggressive caching on every visit was causing unnecessary UI disruption.
**Migration**: N/A - simply remove the indicator component and associated state from BinderViewer.

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