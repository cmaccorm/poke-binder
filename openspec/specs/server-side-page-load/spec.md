## ADDED Requirements

### Requirement: Initial binder page data is fetched server-side
The server component MUST fetch the initial page's slot and card data alongside the binder identity, and MUST pass it to the client component as a prop so the first page renders without a client-side fetch.

#### Scenario: Binder opens with page data already loaded
- **GIVEN** a user navigates to a binder URL
- **WHEN** the server component renders
- **THEN** the binder identity and the initial page data (slots and cards) are both fetched server-side
- **AND** the client component renders the first page immediately without showing a loading spinner

#### Scenario: Binder opens with explicit page parameter
- **GIVEN** a user navigates to a binder URL with a `?page=N` parameter
- **WHEN** the server component renders
- **THEN** the server fetches page N's data (not just the lastViewedPage)
- **AND** the client renders page N immediately

#### Scenario: Requested page does not exist
- **GIVEN** a user navigates to a binder URL with an invalid page number
- **WHEN** the server component fetches the page data
- **THEN** the client component MUST fall back to rendering page 0
