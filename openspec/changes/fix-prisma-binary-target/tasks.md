## 1. Switch Prisma provider

- [x] 1.1 Change provider from `prisma-client` to `prisma-client-js` in `prisma/schema.prisma`

## 2. Regenerate Prisma client

- [x] 2.1 Run `npx prisma generate` to regenerate the client with JS engine
- [x] 2.2 Verify generated files use JS/WASM engine (`.so.node` is fallback only)

## 3. Commit and deploy

- [ ] 3.1 Add regenerated files to git
- [ ] 3.2 Commit with message "fix: switch to prisma-client-js for Vercel compatibility"
- [ ] 3.3 Push to trigger Vercel redeploy
