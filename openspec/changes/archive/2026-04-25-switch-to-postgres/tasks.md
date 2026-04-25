## 1. Add PostgreSQL dependency

- [x] 1.1 Add `pg` package to `package.json` dependencies

## 2. Update Prisma schema

- [x] 2.1 Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`
- [x] 2.2 Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/migrations/migration_lock.toml`

## 3. Update database connection

- [x] 3.1 Update `DATABASE_URL` in `.env` to Supabase PostgreSQL connection string
- [x] 3.2 Delete `prisma/dev.db` (SQLite database file)

## 4. Regenerate Prisma artifacts

- [x] 4.1 Run `prisma migrate dev` against Supabase to generate PostgreSQL migrations
- [x] 4.2 Run `prisma generate` to regenerate the Prisma client

## 5. Verify the migration

- [x] 5.1 Confirm the app starts without database connection errors
- [x] 5.2 Confirm Prisma client types are generated correctly in `src/generated/prisma/`
