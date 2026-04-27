## Context

PokeBinder currently renders all card variants using the same image from the PokémonTCG API — there is no visual distinction between a Normal print and a Reverse Holo. The variant system is pricing-driven: `expandVariants()` in `catalog.ts` splits cards by TCGPlayer price keys, and the `Slot.variant` column stores the label. Image URLs (`imageSmall`, `imageLarge`) live on `CatalogCard` and are shared across all variants.

For ex-era expansion stamp reverse holos (10 sets, ~800–1,000 cards), collectors want to see the actual reverse holo artwork. This requires a custom image override layer that sits between the existing card data and the rendering components.

## Goals / Non-Goals

**Goals:**
- Allow per-(externalId, variant) image overrides stored in the database
- Serve custom reverse holo images in search results, card detail modal, and binder slots
- Keep the override system generic enough to support future variant-specific images beyond ex-era sets
- Minimize changes to existing data access patterns

**Non-Goals:**
- Hosting the actual image files (out of scope — assumes images are already hosted at accessible URLs)
- Building an admin UI for managing custom images (seed via migration or script)
- Scraping or generating reverse holo images automatically
- Changing how variants are detected or expanded from the PokémonTCG API

## Decisions

### 1. Separate `CustomCardImage` table vs. adding columns to `CatalogCard`

**Decision:** New `CustomCardImage` model with composite unique key `(externalId, variant)`.

**Rationale:** `CatalogCard` is one row per card ID — it's a cache of API data. Adding variant-specific columns would break this 1:1 mapping and complicate cache invalidation. A separate table keeps concerns clean: `CatalogCard` = API cache, `CustomCardImage` = user-managed overrides.

**Alternative considered:** Adding `reverseHoloImageSmall`/`reverseHoloImageLarge` columns to `CatalogCard`. Rejected because it's not extensible to other variants and pollutes the cache model.

### 2. Image resolution strategy: lookup function vs. view/computed column

**Decision:** A TypeScript lookup function `resolveCardImage(externalId, variant)` that checks `CustomCardImage` first, then falls back to `CatalogCard` fields.

**Rationale:** Keeps the logic in the application layer where it's easy to test, cache, and extend. A database view would add complexity for minimal benefit since we already fetch card data in TypeScript.

### 3. Where to call the image resolver

**Decision:** Integrate at the data access layer (`binders.ts` for binder slot rendering, `catalog.ts` for search results) rather than in individual React components.

**Rationale:** Components currently receive `CardReference` objects with `imageSmall`/`imageLarge` already populated. Resolving at the data layer means components don't need to know about overrides — they just render what they receive. This avoids N+1 query patterns in components.

### 4. Image hosting domain

**Decision:** Add the custom image host domain to `next.config.ts` `images.remotePatterns`. The specific domain depends on where images are hosted (Supabase Storage, S3, Cloudflare R2, etc.).

**Rationale:** Next.js Image component requires allowlisted domains. Currently only `images.pokemontcg.io` is allowed. One additional entry covers all custom images.

### 5. Batch resolution for search results

**Decision:** For search results returning multiple cards, batch-query `CustomCardImage` for all returned externalIds + variants in a single `WHERE (externalId, variant) IN (...)` query.

**Rationale:** Search can return 20+ results. Individual lookups per card would add latency. A single batch query keeps the overhead to one additional DB round-trip.

## Risks / Trade-offs

- **[Empty override table initially]** → The table ships empty; images must be seeded separately. Mitigation: Provide a seed script or migration that can be run once image URLs are available. The system gracefully falls back to API images when no override exists.
- **[Image host availability]** → Custom images depend on external hosting uptime. Mitigation: Fallback to PokémonTCG API image if custom image fails to load (handled at the `<Image>` component level with `onError` fallback).
- **[Scope creep beyond ex-era]** → The generic (externalId, variant) key means anyone could add overrides for any card. This is a feature, not a bug, but could lead to inconsistent image quality. Mitigation: Administrative discipline; no UI for adding overrides means controlled population.
