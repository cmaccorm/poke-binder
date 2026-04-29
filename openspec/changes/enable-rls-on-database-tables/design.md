## Context

The app persists its core data in PostgreSQL through Prisma. The current schema contains application-owned tables for binders, pages, slots, cached catalog cards, custom card images, and cached price trends. None of those tables currently carry an explicit row-level access contract.

This change is primarily a security hardening step. The goal is to make the database deny access by default and then open only the backend paths the app actually needs.

## Goals / Non-Goals

**Goals:**
- Enable RLS on every application-owned table in the current schema.
- Add explicit policies that preserve the app's existing backend reads and writes.
- Keep the change compatible with the current Prisma data-access layer.
- Reduce exposure if the database is reachable through any additional access surface later.

**Non-Goals:**
- Adding end-user authentication or per-user ownership columns.
- Reworking the Prisma model or changing application query shapes.
- Splitting the schema into public/private namespaces.
- Replacing Prisma or introducing a separate authorization service.

## Decisions

### 1. Enable RLS on all app-owned tables

**Choice**: Turn on RLS for `Binder`, `Page`, `Slot`, `CatalogCard`, `CustomCardImage`, and `PriceTrend`.

**Rationale**: These tables form one data boundary. Leaving any of them unprotected creates a gap in the security model, especially because the cache tables are still application-managed data even though they are not user-authored content.

**Alternative considered**: Protect only the mutable tables (`Binder`, `Page`, `Slot`). Rejected because the cache tables can still leak application state or be mutated unexpectedly if exposed.

### 2. Use explicit allow policies for the backend access path

**Choice**: Add policies that allow the application's backend role to perform the current read/write operations.

**Rationale**: The app does not have a per-user ownership model today, so policy logic based on `auth.uid()` would be premature and brittle. A backend-role allowlist keeps the change focused on security hardening without redesigning the app's identity model.

**Alternative considered**: Add `user_id` ownership columns and write per-user policies now. Rejected because it requires an auth rollout and a larger schema migration that is unrelated to the immediate RLS hardening.

### 3. Force RLS enforcement on the protected tables

**Choice**: Apply `FORCE ROW LEVEL SECURITY` where supported so the policies are enforced even if the table owner is used as the runtime connection.

**Rationale**: Prisma-based apps often connect with a privileged database role. Forcing RLS avoids the common mistake where the owner bypasses policies and the change appears to exist but has no effect.

### 4. Keep the migration database path separate from runtime concerns

**Choice**: Treat RLS changes as schema/security work only; do not change the Prisma connection strategy in this change.

**Rationale**: The existing Prisma setup already has a direct migration path. RLS should be introduced independently so any failures are isolated to policy behavior rather than connection plumbing.

## Risks / Trade-offs

- **[Risk] Missing policy blocks legitimate app writes** → Mitigation: stage the migration, run the app's binder/card workflows, and add explicit policies for any missing Prisma operation.
- **[Risk] UPDATEs silently fail without SELECT access** → Mitigation: verify read and write policies together for each table that supports updates.
- **[Risk] Table owner bypasses RLS if FORCE is omitted** → Mitigation: force RLS on the protected tables and verify the catalog flags after migration.
- **[Risk] Future schema changes can introduce unprotected tables** → Mitigation: treat RLS as part of the definition of every new application-owned table.

## Migration Plan

1. Add a migration that enables RLS and creates the backend allow policies.
2. Verify the app's normal binder/page/card workflows against a staging database.
3. Confirm the protected tables report RLS enabled after migration.
4. Deploy to production once the read/write paths are validated.

Rollback:
- If a policy breaks an existing flow, drop the policy or relax the predicate in a follow-up migration.
- If the rollout must be reverted entirely, disable RLS on the affected tables and remove the added policies.

## Open Questions

- Should the app eventually move to per-user row ownership, or will it remain a single backend-managed data store?
