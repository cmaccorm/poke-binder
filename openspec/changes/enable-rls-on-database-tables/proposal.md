## Why

The database currently has no explicit row-level protection for the application-owned tables. Enabling RLS now hardens the data layer before the app grows additional access paths or exposes more data through Supabase.

## What Changes

- Enable RLS on the application tables in the primary schema.
- Add policies that allow only the intended application access patterns.
- Keep the existing Prisma-backed application flows working after RLS is enabled.
- Treat database access as deny-by-default unless a policy explicitly allows it.

## Capabilities

### New Capabilities
- `row-level-security`: Protect application tables with RLS and policies that match the app's intended read/write model.

### Modified Capabilities

## Impact

- **Database schema**: RLS must be enabled on the tables that store binder, page, slot, card cache, and related metadata.
- **Migrations**: New SQL migrations will be required to enable RLS and add policies.
- **Application access**: Prisma-based reads and writes must continue to work under the new policy model.
- **Security posture**: Reduces the blast radius if any table becomes reachable through a public or semi-public database surface.
