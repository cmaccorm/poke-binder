## Context

The app works locally but fails on Vercel with `PrismaClient could not locate the Query Engine for runtime "rhel-openssl-3.0.x"`. The Prisma client was generated on a Debian-based WSL environment (`debian-openssl-3.0.x`) but Vercel's serverless runtime uses RHEL (`rhel-openssl-3.0.x`). The native `.so.node` binary doesn't match, causing `PrismaClientInitializationError` on all database operations.

## Goals / Non-Goals

**Goals:**
- Switch Prisma to use the JavaScript query engine (`prisma-client-js`) instead of native binaries
- Ensure the app works on Vercel's serverless runtime
- No behavior or API changes

**Non-Goals:**
- Performance optimization
- Migration to a different database provider
- Adding new features

## Decisions

**Decision 1: Use `prisma-client-js` instead of `prisma-client`**
- Rationale: The JS engine has no native binaries, eliminating platform mismatch entirely. This is the recommended approach for serverless environments per Prisma docs.
- Alternatives considered:
  - Adding multiple `binaryTargets` — adds complexity, larger bundle, and still risks missing targets on serverless providers
  - Using `@prisma/adapter-neon` — unnecessary abstraction for this use case
  - Switching to direct DB connection (port 6543) — doesn't solve the binary mismatch

**Decision 2: Regenerate and commit the generated client**
- The generated files are currently in `.gitignore` but are needed on Vercel since the build doesn't run `prisma generate`.
- Keeping them committed ensures the deployment has the correct JS-based client.

## Risks / Trade-offs

- [Performance] JS engine is slightly slower than native binary (~5-10% for heavy workloads) → Mitigation: Negligible for this app's workload
- [Bundle size] JS engine adds ~2MB → Mitigation: Acceptable for serverless cold starts
- [Git history] Generated files are large → Mitigation: They're already in `.gitignore` locally, we'll add them selectively
