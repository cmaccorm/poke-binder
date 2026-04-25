## Context

The app uses Prisma v6.19.3 with SQLite as the database provider. The schema has 4 models: Binder, Page, Slot, and CatalogCard. All database access goes through PrismaClient exported from `src/lib/prisma.ts`. The SQLite database file lives at `prisma/dev.db` (gitignored). The app is a Next.js application with API routes that call library functions which use Prisma.

## Goals / Non-Goals

**Goals:**
- Switch Prisma datasource from SQLite to PostgreSQL (Supabase)
- Maintain all existing functionality — no behavioral changes
- Regenerate migrations and Prisma client for PostgreSQL
- Keep the same schema structure (all Prisma models are dialect-agnostic)

**Non-Goals:**
- Data migration from SQLite to PostgreSQL (fresh start, no existing data to migrate)
- Connection pooling configuration (Supabase handles this)
- Database schema changes (same models, same fields)
- Changing the Prisma client singleton pattern in `src/lib/prisma.ts`

## Decisions

1. **Use `pg` dependency** — Prisma's PostgreSQL driver requires `pg` (node-postgres). This is the standard Node.js PostgreSQL client.
   - Alternative: Use `@prisma/adapter-pg` — not needed since Prisma v6 has built-in PostgreSQL support via `pg`.

2. **Cloud-hosted via Supabase** — Supabase provides a managed PostgreSQL instance with connection string in standard URI format. Port 5432, SSL enabled by default.
   - Alternative: Self-hosted PostgreSQL — would require Docker setup and maintenance.
   - Alternative: Other cloud providers (Neon, Railway) — Supabase already set up.

3. **Fresh database, no data migration** — Since this is a dev/development change, we delete the SQLite file and start fresh with PostgreSQL.
   - Rationale: Simpler, no risk of migration errors. Data can be re-entered.

## Risks / Trade-offs

[Risk] Supabase connection string contains password in `.env` → [Mitigation] `.env` is gitignored, follow standard credential management practices.

[Risk] Prisma client regeneration breaks generated code imports → [Mitigation] Generated files are gitignored and auto-regenerated; imports in `src/lib/prisma.ts` reference `@prisma/client` which is unchanged.

[Risk] PostgreSQL has stricter type checking than SQLite → [Mitigation] The current schema uses standard types (String, Int, DateTime) that are fully compatible with PostgreSQL. No schema changes needed.
