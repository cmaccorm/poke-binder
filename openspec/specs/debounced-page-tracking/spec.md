## ADDED Requirements

### Requirement: Page read and lastViewedPage write are parallelized in the API
The API route for fetching a binder page MUST execute the page data read and the lastViewedPage write in parallel so that the write never blocks the response.

#### Scenario: Page data returned without waiting for write
- **WHEN** a client requests a binder page via the API
- **THEN** the page data read and the lastViewedPage update execute concurrently
- **AND** the response is sent as soon as the page data read completes

### Requirement: Client debounces lastViewedPage tracking
The client MUST debounce lastViewedPage updates so that rapid page navigation (e.g., holding an arrow key) only triggers one write after the user settles on a page.

#### Scenario: Rapid page flipping triggers one update
- **GIVEN** a user flips through 5 pages in quick succession
- **WHEN** the user stops on page 7
- **THEN** only one lastViewedPage update is sent (for page 7) after a ~500ms pause

#### Scenario: Single page navigation updates normally
- **GIVEN** a user navigates to a single page and stays
- **WHEN** 500ms passes without further navigation
- **THEN** the lastViewedPage is updated to that page
