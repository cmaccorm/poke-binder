## ADDED Requirements

### Requirement: Transaction-mode connection pooling for runtime queries
The system SHALL use Supabase's PgBouncer transaction-mode pooler (port 6543) with `pgbouncer=true` for all runtime database queries via the `DATABASE_URL` environment variable.

#### Scenario: Serverless function connects to database
- **WHEN** a Vercel serverless function invocation creates a PrismaClient and executes a query
- **THEN** the connection SHALL be routed through PgBouncer transaction mode (port 6543) and released after the transaction completes

#### Scenario: Multiple concurrent serverless invocations
- **WHEN** multiple serverless function instances execute database queries simultaneously
- **THEN** each instance SHALL hold at most 1 database connection (via `connection_limit=1`) and PgBouncer SHALL manage pooling across instances

### Requirement: Direct connection for migrations
The system SHALL provide a `DIRECT_URL` environment variable pointing to the Supabase pooler on port 5432 (session mode) for use by Prisma migration commands. The `prisma/schema.prisma` datasource block SHALL include `directUrl = env("DIRECT_URL")`.

#### Scenario: Running prisma migrate deploy
- **WHEN** a developer runs `npx prisma migrate deploy`
- **THEN** Prisma SHALL use the `DIRECT_URL` connection (port 5432) instead of the transaction-mode pooled `DATABASE_URL`

#### Scenario: DIRECT_URL not set in runtime
- **WHEN** the application starts without `DIRECT_URL` set
- **THEN** runtime queries SHALL still function normally using `DATABASE_URL` (directUrl is only used by Prisma CLI)

### Requirement: Prisma client regeneration after schema change
The Prisma client SHALL be regenerated after modifying the datasource block in `prisma/schema.prisma` to ensure the generated client reflects the `directUrl` configuration.

#### Scenario: Schema datasource updated
- **WHEN** `directUrl` is added to the datasource block in `prisma/schema.prisma`
- **THEN** running `npx prisma generate` SHALL produce an updated client at `src/generated/prisma/` without errors
