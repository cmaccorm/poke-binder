## 1. Database Security Migration

- [x] 1.1 Create a migration that enables and forces RLS on `Binder`, `Page`, `Slot`, `CatalogCard`, `CustomCardImage`, and `PriceTrend`.
- [x] 1.2 Add explicit allow policies for the backend role covering the current binder/page/slot read-write flows.
- [x] 1.3 Add explicit allow policies for the cached card, custom image, and price-trend tables so existing cache reads and writes continue to work.

## 2. Verification

- [x] 2.1 Verify the protected tables report RLS enabled after the migration is applied.
- [x] 2.2 Exercise the normal Prisma-backed workflows to confirm binder CRUD, slot updates, and cache upserts still succeed.
