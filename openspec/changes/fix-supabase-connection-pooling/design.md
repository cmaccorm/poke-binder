## Context

The application uses Prisma ORM with a Supabase-hosted PostgreSQL database. The `DATABASE_URL` currently points to Supabase's connection pooler on port 5432, which runs PgBouncer in **session mode**. In session mode, a connection is held for the entire client session lifetime.

On Vercel, each serverless function invocation may cold-start a new `PrismaClient` instance. The singleton pattern in `src/lib/prisma.ts` only prevents duplicate instances within a single process — it does not share connections across invocations. This leads to rapid pool exhaustion, producing `MaxClientsInSessionMode` and `P2024` (connection pool timeout) errors under even moderate load.

Supabase exposes the same pooler on port 6543 in **transaction mode**, which releases connections back to the pool after each transaction completes — a much better fit for serverless.

## Goals / Non-Goals

**Goals:**
- Eliminate `MaxClientsInSessionMode` and `P2024` errors in production
- Configure Prisma to use PgBouncer transaction-mode pooling for all runtime queries
- Preserve a direct (non-pooled) connection path for Prisma migrations
- Require zero application code changes (only config/env changes)

**Non-Goals:**
- Changing the Prisma singleton pattern in `src/lib/prisma.ts` (it's already correct)
- Adding connection retry logic or custom error handling
- Migrating away from Supabase or PgBouncer
- Optimizing query performance or adding caching layers

## Decisions

### 1. Use transaction-mode pooling (port 6543) for runtime

**Choice**: Switch `DATABASE_URL` to port 6543 with `?pgbouncer=true`.

**Rationale**: Transaction mode releases connections after each transaction, matching the short-lived nature of serverless functions. Session mode (port 5432) holds connections indefinitely, causing pool exhaustion. The `pgbouncer=true` parameter tells Prisma to disable prepared statements, which are incompatible with PgBouncer transaction mode.

**Alternative considered**: Using Prisma Accelerate or a third-party connection pooler. Rejected because Supabase already provides PgBouncer and no additional service is needed.

### 2. Set `connection_limit=1` in DATABASE_URL

**Choice**: Append `&connection_limit=1` to the connection string.

**Rationale**: Each Vercel serverless function instance should open at most 1 connection to the database. PgBouncer handles the actual pooling across instances. Prisma's default of 5 connections per client wastes pool slots in a serverless context where each process handles one request at a time.

**Alternative considered**: Leaving the default (5). Rejected because it would exhaust PgBouncer's pool faster with no benefit in a single-concurrent-request serverless model.

### 3. Add `directUrl` for migrations

**Choice**: Add `DIRECT_URL` env var (port 5432) and `directUrl` field in `prisma/schema.prisma`.

**Rationale**: Prisma migrations use features (advisory locks, temporary tables) that require a direct connection, not transaction-mode pooling. The `directUrl` field tells Prisma CLI to use this connection for `migrate` commands while runtime queries use the pooled `url`.

### 4. No application code changes

**Choice**: Only modify `prisma/schema.prisma` and environment variables.

**Rationale**: The Prisma client singleton in `src/lib/prisma.ts` is already correctly implemented. The data access layer (`binders.ts`, `catalog.ts`) and API routes need no changes — the fix is purely at the connection configuration level.

## Risks / Trade-offs

- **[Risk] Transaction mode disables prepared statements** → Slight performance decrease for repeated identical queries. Mitigation: negligible for this application's query volume; PgBouncer's connection reuse more than compensates.

- **[Risk] Env var mismatch between local and Vercel** → If `DIRECT_URL` is missing in Vercel, migrations run via CI/CD could fail. Mitigation: document both env vars clearly; migrations are run manually (`npx prisma migrate deploy`), not in Vercel build.

- **[Risk] Forgetting to update Vercel env vars** → Deploy will still fail with old `DATABASE_URL`. Mitigation: tasks include explicit Vercel env var update step.

- **[Trade-off] `connection_limit=1` reduces per-instance throughput** → Acceptable because Vercel serverless functions handle one request at a time per instance anyway.
