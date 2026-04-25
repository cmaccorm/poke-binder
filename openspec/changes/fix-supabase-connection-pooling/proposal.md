## Why

The application crashes with `MaxClientsInSessionMode` and `P2024` (connection pool timeout) errors when deployed to Vercel. The Supabase `DATABASE_URL` uses the pooler on port 5432 (session mode), which holds connections for the full session lifetime — incompatible with Vercel's serverless model where each function invocation creates its own Prisma client. Switching to transaction-mode pooling (port 6543) and tuning Prisma's connection settings will eliminate these production errors.

## What Changes

- Switch `DATABASE_URL` from Supabase session-mode pooler (port 5432) to transaction-mode pooler (port 6543) with `?pgbouncer=true&connection_limit=1`
- Add `DIRECT_URL` environment variable pointing to port 5432 for Prisma migrations (migrations require a direct connection, not transaction-mode pooling)
- Update `prisma/schema.prisma` datasource block to include `directUrl = env("DIRECT_URL")`
- Regenerate Prisma client after schema change

## Capabilities

### New Capabilities

- `serverless-db-pooling`: Configure Prisma + Supabase connection pooling for serverless deployment on Vercel

### Modified Capabilities

- `server-side-page-load`: No requirement change — but implementation will benefit from stable database connections

## Impact

- **Config files**: `prisma/schema.prisma`, `.env`
- **Environment variables**: New `DIRECT_URL` env var required in Vercel project settings; existing `DATABASE_URL` value changes
- **Dependencies**: No new dependencies — Prisma natively supports `directUrl` and `pgbouncer` query params
- **Deployment**: Requires Vercel env var update before next deploy; existing migrations remain compatible
- **Generated code**: `src/generated/prisma/` will be regenerated (no behavioral change)
