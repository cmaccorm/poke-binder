## ADDED Requirements

### Requirement: Application tables enforce row-level security
The database MUST enable row-level security on all application-owned tables in the primary schema.

#### Scenario: RLS is enabled on all binder tables
- **WHEN** the database schema is inspected after the migration is applied
- **THEN** `Binder`, `Page`, `Slot`, `CatalogCard`, `CustomCardImage`, and `PriceTrend` all have RLS enabled

### Requirement: Access is denied without an explicit policy
The database MUST deny direct row access to application tables unless a matching policy allows the operation.

#### Scenario: Unprivileged access is rejected
- **WHEN** a role without a matching policy queries an application-owned table
- **THEN** the query returns no permitted rows or fails with an authorization error
- **AND** the role cannot insert, update, or delete rows without an explicit policy

### Requirement: Existing application operations remain permitted
The database MUST preserve the application's current read and write operations through the intended backend access path.

#### Scenario: Binder workflow still succeeds
- **WHEN** the application reads binders, pages, and slots through its normal backend database connection
- **THEN** the required rows are visible to the application
- **AND** updates such as creating binders, assigning cards, and removing cards continue to work
