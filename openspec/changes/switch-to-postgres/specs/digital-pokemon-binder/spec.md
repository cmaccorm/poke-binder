## MODIFIED Requirements

### Requirement: Catalog data is cached locally
The application MUST source card images and metadata from the catalog and MUST keep a local cache in a PostgreSQL database to make binder browsing and editing responsive. Cache writes MUST be batched into a single transaction per search operation for performance.

#### Scenario: Cached catalog data is used immediately
- **GIVEN** a card image and metadata were previously loaded
- **WHEN** the user revisits the binder view
- **THEN** the application can render the cached image and metadata without waiting for a fresh catalog fetch

#### Scenario: Multiple search results are cached efficiently
- **GIVEN** a catalog search returns multiple card results
- **WHEN** the results are written to the local cache
- **THEN** all results are persisted in a single database transaction
