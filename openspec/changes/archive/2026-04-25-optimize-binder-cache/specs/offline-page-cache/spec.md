## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Visual indicator during background page caching
**Reason**: The caching indicator is no longer needed because caching now only occurs on binder open (when cache is expired or missing) and after card operations. These are infrequent and non-blocking events. The previous aggressive caching on every visit was causing unnecessary UI disruption.
**Migration**: N/A - simply remove the indicator component and associated state from BinderViewer.