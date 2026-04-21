## ADDED Requirements

### Requirement: Catalog search results are cached in a single transaction
The catalog search function MUST upsert all returned card records within a single database transaction rather than individual sequential writes.

#### Scenario: Search with multiple results batches all upserts
- **GIVEN** a catalog search returns 20 card results
- **WHEN** the results are cached locally
- **THEN** all 20 upserts are executed in a single database transaction

#### Scenario: Transaction failure rolls back all upserts
- **GIVEN** a catalog search returns results and one upsert would fail
- **WHEN** the batch transaction executes
- **THEN** no partial results are cached — the entire batch fails atomically
- **AND** the original API results are still returned to the caller
