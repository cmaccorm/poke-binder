## ADDED Requirements

### Requirement: Binder data is auto-cached to IndexedDB on load
The application MUST persist binder data to IndexedDB automatically whenever binder data is fetched from the server. This includes the binder list from the shelf view and individual binder pages from the binder viewer.

#### Scenario: Shelf binder list is cached
- **WHEN** the shelf view fetches the binder list from `/api/binders`
- **THEN** the full binder list is persisted to IndexedDB

#### Scenario: Binder page is cached on navigation
- **WHEN** the user navigates to a page in a binder
- **THEN** that page's data (slots and card references) is persisted to IndexedDB

#### Scenario: Prefetched adjacent pages are cached
- **WHEN** the binder viewer prefetches adjacent pages
- **THEN** those pages are also persisted to IndexedDB

### Requirement: Offline data retrieval falls back to IndexedDB
The application MUST use a network-first strategy for data retrieval: attempt the network request first, and fall back to IndexedDB when the network is unavailable.

#### Scenario: Shelf loads from cache when offline
- **WHEN** the user opens the shelf view while offline
- **AND** the binder list was previously cached
- **THEN** the shelf renders using the cached binder list

#### Scenario: Binder page loads from cache when offline
- **WHEN** the user navigates to a binder page while offline
- **AND** that page was previously cached
- **THEN** the page renders with cached slot and card data

#### Scenario: Uncached binder shows unavailable message
- **WHEN** the user navigates to a binder while offline
- **AND** that binder has no cached data in IndexedDB
- **THEN** the application displays a message indicating the binder is not available offline

### Requirement: IndexedDB unavailability does not break the app
The application MUST gracefully handle environments where IndexedDB is unavailable (e.g., private browsing). When IndexedDB is unavailable, the app MUST function normally when online and MUST NOT throw errors.

#### Scenario: Private browsing without IndexedDB
- **WHEN** the user opens the app in a browser where IndexedDB is unavailable
- **AND** the user is online
- **THEN** the app functions normally without offline caching
- **AND** no errors are shown to the user
