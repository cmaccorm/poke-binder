## 1. Update Prisma Schema

- [x] 1.1 Add `directUrl = env("DIRECT_URL")` to the datasource block in `prisma/schema.prisma`

## 2. Update Environment Variables

- [ ] 2.1 Update `.env` — set `DATABASE_URL` to use port 6543 with `?pgbouncer=true&connection_limit=1`
- [ ] 2.2 Add `DIRECT_URL` to `.env` pointing to port 5432 (current connection string, no pgbouncer params)

## 3. Regenerate Prisma Client

- [ ] 3.1 Run `npx prisma generate` and verify the client regenerates without errors

## 4. Verify

- [ ] 4.1 Run `npm run build` to confirm the application builds successfully with the updated schema
- [x] 4.2 Document the Vercel env var changes needed: update `DATABASE_URL` and add `DIRECT_URL` in Vercel project settings

**Vercel Environment Variables to Update:**

1. **DATABASE_URL** — Replace existing value with:
   ```
   postgresql://postgres.kspjrzphgpdmffakdsnk:REDACTED_PASSWORD@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   ```
   Key changes: port `5432` → `6543`, appended `?pgbouncer=true&connection_limit=1`

2. **DIRECT_URL** — Add new variable with current DATABASE_URL value:
   ```
   postgresql://postgres.kspjrzphgpdmffakdsnk:REDACTED_PASSWORD@aws-1-us-east-2.pooler.supabase.com:5432/postgres
   ```
   This is used only by Prisma CLI for migrations, not at runtime.
