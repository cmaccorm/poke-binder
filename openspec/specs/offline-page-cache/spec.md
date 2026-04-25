## ADDED Requirements

### Requirement: All binder pages are cached when opened online
When a binder is opened while the device is online, the application SHALL fetch and persist every page of that binder to IndexedDB so that the entire binder is available offline without additional network requests.

#### Scenario: Binder opened online caches all pages
- **GIVEN** a binder has N pages and the device is online
- **WHEN** the user opens the binder
- **THEN** the application fetches all page indices from 0 to N-1 via the page API
- **AND** each successful response is written to IndexedDB
- **AND** the user can navigate to any page offline without a loading spinner

#### Scenario: Binder already has some pages in memory cache
- **GIVEN** a binder has pages 0 through K already in the in-memory Map
- **WHEN** the user opens the binder online
- **THEN** the application skips pages 0 through K and only fetches pages K+1 through N-1
- **AND** previously cached pages remain available offline

#### Scenario: Binder opened while offline uses cached pages
- **GIVEN** a binder was previously opened online and all pages were cached to IndexedDB
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

### Requirement: Visual indicator during background page caching
The application SHALL display a non-blocking indicator while pages are being fetched and cached in the background so the user knows offline preparation is in progress.

#### Scenario: Caching indicator appears while pages are being fetched
- **GIVEN** a binder with more than the initially-loaded pages is opened online
- **WHEN** background page fetches are in progress
- **THEN** a small indicator is shown (e.g., toast or inline text) stating that caching is in progress
- **AND** the indicator disappears once all pages have been fetched or all fetch attempts have completed

#### Scenario: Indicator does not block interaction
- **GIVEN** a binder is open and background caching is in progress
- **WHEN** the user navigates to any already-cached page
- **THEN** the page loads instantly from the in-memory Map
- **AND** the indicator remains visible until all pages are cached
