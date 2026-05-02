## ADDED Requirements

### Requirement: Image warmup collects all unique image URLs from cached binder pages
The system SHALL collect all unique `imageLarge` URLs from every cached page of the active binder in IndexedDB. Only non-null card image URLs SHALL be included.

#### Scenario: Binder with cards across multiple pages
- **WHEN** a binder has 10 cached pages with cards in some slots
- **THEN** the warmup collects every unique `imageLarge` URL across all pages, with no duplicates

#### Scenario: Binder with empty slots
- **WHEN** a binder page contains empty slots (no card assigned)
- **THEN** empty slots are skipped and do not contribute URLs to the warmup set

#### Scenario: No cached pages exist
- **WHEN** the binder has no pages cached in IndexedDB
- **THEN** the warmup produces an empty URL set and completes immediately

### Requirement: Image warmup skips already-cached images
The system SHALL check the Service Worker `IMAGE_CACHE` via the Cache API (`caches.open` + `cache.match`) before fetching each image URL. Images already present in the cache SHALL be skipped.

#### Scenario: All images already cached
- **WHEN** every image URL from the binder is already in the SW image cache
- **THEN** no network requests are made and progress immediately reports 100%

#### Scenario: Some images cached, some missing
- **WHEN** 50 of 100 image URLs are already in the SW image cache
- **THEN** only the 50 missing images are fetched from the network

### Requirement: Image warmup fetches missing images in throttled batches
The system SHALL fetch missing images in batches of no more than 4 concurrent requests, with a short delay (approximately 50ms) between batches, to avoid saturating the network or degrading the user's browsing experience.

#### Scenario: Warmup fetches images in batches
- **WHEN** 20 images need to be fetched
- **THEN** the system issues at most 4 concurrent fetch requests at a time
- **AND** waits briefly between batches before starting the next group

#### Scenario: A fetch fails for a single image
- **WHEN** one image fetch fails (network error, 404, etc.)
- **THEN** the warmup continues with remaining images without retrying the failed one
- **AND** progress increments past the failed image

### Requirement: Image warmup triggers after binder page data is cached
The system SHALL start the image warmup only after `cacheBinderPagesIfNeeded()` has completed for the active binder, ensuring all page data is available in IndexedDB before image URLs are collected.

#### Scenario: Warmup runs after page caching on binder open
- **WHEN** the user opens a binder while online
- **AND** `cacheBinderPagesIfNeeded()` completes
- **THEN** the image warmup begins

#### Scenario: Warmup does not run when offline
- **WHEN** the user is offline
- **THEN** the image warmup does not start

#### Scenario: Warmup does not run when page cache is fresh
- **WHEN** the binder's page cache is still fresh (within the staleness threshold)
- **AND** all images are already cached
- **THEN** the warmup completes immediately with no network requests

### Requirement: Image warmup exposes progress state
The system SHALL expose reactive state for the warmup process: the number of images completed, the total number of images to process, and whether the warmup is currently active. This state SHALL be consumable by UI components.

#### Scenario: Progress updates as images are cached
- **WHEN** the warmup is processing 100 images
- **AND** 42 have completed (cached or skipped)
- **THEN** the exposed state reports `{ completed: 42, total: 100, isWarming: true }`

#### Scenario: Warmup completes
- **WHEN** all images have been processed
- **THEN** the exposed state reports `{ completed: N, total: N, isWarming: false }`
