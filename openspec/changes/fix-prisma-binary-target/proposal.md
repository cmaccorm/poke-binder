## Why

The app works locally but fails on Vercel with `PrismaClient could not locate the Query Engine for runtime "rhel-openssl-3.0.x"`. The Prisma client was generated with native binaries for `debian-openssl-3.0.x` (matching the local WSL environment), but Vercel's serverless runtime uses `rhel-openssl-3.0.x`. The `.so.node` binary file doesn't match, so Prisma can't find a compatible query engine.

## What Changes

- Switch Prisma provider from `prisma-client` (native binary) to `prisma-client-js` (JavaScript engine) in `prisma/schema.prisma`
- Regenerate the Prisma client with `npx prisma generate`
- Commit the regenerated client files (currently gitignored but needed for Vercel builds)

## Capabilities

### New Capabilities
- `prisma-js-client`: Use JavaScript-based Prisma query engine instead of native binaries for serverless deployment compatibility

### Modified Capabilities
*(none — this is an infrastructure change, no behavior changes)*

## Impact

- `prisma/schema.prisma` — provider change
- `src/generated/prisma/` — regenerated client files (all generated files will differ)
- No API or behavior changes
