## ADDED Requirements

### Requirement: Database connection uses PostgreSQL
The application MUST connect to a PostgreSQL database via Prisma ORM using a connection string provided through the `DATABASE_URL` environment variable.

#### Scenario: Prisma connects to PostgreSQL
- **WHEN** the application starts and initializes PrismaClient
- **THEN** the connection uses the PostgreSQL provider configured in `prisma/schema.prisma`
- **AND** the connection string is read from the `DATABASE_URL` environment variable

#### Scenario: Connection fails gracefully
- **WHEN** `DATABASE_URL` is unset or invalid
- **THEN** PrismaClient throws a connection error on first query
- **AND** the error message indicates a database connection failure

### Requirement: Database provider is PostgreSQL
The Prisma schema MUST declare `provider = "postgresql"` as the datasource provider.

#### Scenario: Schema declares PostgreSQL provider
- **WHEN** `prisma/schema.prisma` is read
- **THEN** the datasource block contains `provider = "postgresql"`
- **AND** `migration_lock.toml` contains `provider = "postgresql"`

### Requirement: PostgreSQL driver dependency is present
The project MUST include the `pg` (node-postgres) package as a dependency to support Prisma's PostgreSQL driver.

#### Scenario: pg package is installed
- **WHEN** project dependencies are installed via `npm install` or `pnpm install`
- **THEN** the `pg` package is present in `node_modules`
- **AND** it is listed in `package.json` dependencies
