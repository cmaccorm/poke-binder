## ADDED Requirements

### Requirement: Concurrency-limited background page caching
The system SHALL fetch missing binder pages for offline caching with a maximum concurrency of 2 simultaneous requests. The system MUST NOT fire all missing page fetches in parallel.

#### Scenario: Binder with 20 pages opened on page 5
- **WHEN** a user opens a binder with 20 pages at page 5 and the initial page data is available
- **THEN** the system SHALL fetch the remaining 19 pages in batches of at most 2 concurrent requests, not all 19 simultaneously

#### Scenario: Small binder with 3 pages
- **WHEN** a user opens a binder with 3 pages at page 1
- **THEN** the system SHALL fetch the 2 missing pages (pages 0 and 2), with at most 2 concurrent requests

### Requirement: Proximity-ordered fetch priority
The system SHALL fetch missing pages in order of proximity to the user's initial page position. Pages closest to the current page MUST be fetched before pages farther away.

#### Scenario: User on page 5 of a 20-page binder
- **WHEN** background caching begins with the user on page 5
- **THEN** pages 4 and 6 SHALL be fetched before pages 0 and 19

#### Scenario: User on page 0 of a 10-page binder
- **WHEN** background caching begins with the user on page 0
- **THEN** pages 1 and 2 SHALL be fetched before pages 8 and 9

### Requirement: Inter-batch delay
The system SHALL introduce a delay of at least 100ms between each batch of concurrent fetches during background caching to allow database connection pool recycling.

#### Scenario: Two consecutive batches
- **WHEN** a batch of 2 page fetches completes
- **THEN** the system SHALL wait at least 100ms before starting the next batch of fetches

### Requirement: Cancellation on unmount
The system SHALL stop the background caching loop if the BinderViewer component unmounts before caching completes. No further fetch requests SHALL be initiated after unmount.

#### Scenario: User navigates away during caching
- **WHEN** the user returns to the shelf while "Caching for offline..." is active
- **THEN** the background caching loop SHALL stop and no further page fetch requests SHALL be made for that binder

### Requirement: Non-blocking user navigation
Background caching MUST NOT block or interfere with the user's ability to navigate between pages. Active page loads and adjacent-page prefetches SHALL take priority over background caching.

#### Scenario: User flips pages while caching is in progress
- **WHEN** the user navigates to a new page while background caching is active
- **THEN** the page load and its adjacent prefetches SHALL succeed without being delayed by the background caching queue
