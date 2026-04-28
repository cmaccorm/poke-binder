## Context

The card detail modal (`CardDetailModal.tsx`) currently fetches card data from the PokéTCG API on every open via `getCardById()` in `catalog.ts`. This call is backed only by a volatile in-memory cache with a 1-hour TTL. Pricing data (only TCGPlayer) is extracted and displayed; Cardmarket data is fetched but discarded. The `CatalogCard` Prisma model has no pricing columns — it stores only identity and image data.

The modal also displays card types and artist, which are being removed to declutter the info pane.

## Goals / Non-Goals

**Goals:**
- Persist pricing data (TCGPlayer and Cardmarket) in the database with a 24-hour cache TTL
- Show Cardmarket pricing as a fallback when TCGPlayer pricing is unavailable
- Remove type and artist fields from the card detail modal
- Reduce unnecessary PokéTCG API calls for pricing data

**Non-Goals:**
- Caching all card metadata (attacks, weaknesses, etc.) in the database
- Changing the search flow or search result caching
- Supporting additional pricing sources beyond TCGPlayer and Cardmarket
- Displaying both TCGPlayer and Cardmarket prices simultaneously

## Decisions

### 1. Add pricing columns directly to CatalogCard

Add `priceTcgplayer`, `priceCardmarket`, and `priceUpdatedAt` columns to the existing `CatalogCard` model rather than creating a separate pricing table.

**Rationale**: The relationship is 1:1 (one card, one set of cached prices). A separate table adds join complexity with no normalization benefit. The CatalogCard table already serves as the local cache for card data.

**Alternative considered**: Separate `CardPricing` table with foreign key to `CatalogCard`. Rejected because it adds an unnecessary join for every card detail fetch and the data lifecycle is identical (pricing is always fetched/updated alongside the card).

### 2. Store a single resolved price per source, not the full price object

Store one `Float?` value per pricing source (the resolved market price for the card's variant or the best available price) rather than storing the entire nested pricing object as JSON.

**Rationale**: The modal only displays a single price value. Storing the full pricing tree adds schema complexity (JSON column or multiple columns per variant) for no user-facing benefit. The price resolution logic (variant mapping, fallback chain) runs at fetch time and the result is cached.

**Alternative considered**: Store full pricing JSON to support future multi-variant price displays. Rejected — can be revisited if needed, and the 24-hour cache means re-fetching is inexpensive.

### 3. Cache check happens in the API route, not the client

The `/api/catalog/card/[id]` route will check `CatalogCard.priceUpdatedAt` against the 24-hour threshold. If fresh, it returns cached prices alongside the API data. If stale or missing, it fetches from PokéTCG API, updates the DB, and returns the fresh data.

**Rationale**: Keeps cache logic server-side where it has direct DB access. The client remains a simple consumer of the API response. The existing in-memory cache in `catalog.ts` continues to work as a first-level cache for the full card object within a single server process lifetime.

### 4. Price source label in API response

The API response will include a `priceSource` field ("tcgplayer" or "cardmarket") so the frontend can display which source the price came from. The resolution order is: TCGPlayer first, Cardmarket as fallback.

**Rationale**: Users should know which marketplace the displayed price refers to. This is a simple string field that avoids the frontend needing to know the fallback logic.

### 5. Cardmarket price resolution

For Cardmarket fallback, use `averageSellPrice` as the primary value, falling back to `trendPrice`. The `PokemonTcgCard` interface will be extended to include these fields from the Cardmarket response.

**Rationale**: `averageSellPrice` is the closest equivalent to TCGPlayer's market price. `trendPrice` is a secondary option when sell data is sparse.

## Risks / Trade-offs

- **[Stale pricing]** 24-hour cache means prices can be up to a day old. → Acceptable for a collection tracker; users are not making real-time trading decisions. The timestamp is available if we want to display "last updated" in the future.
- **[First-open latency]** Cards without cached prices still require a live API call on first view. → Same as current behavior; no regression. Subsequent views within 24 hours will be faster.
- **[Migration on existing data]** Existing CatalogCard rows will have null pricing columns. → New columns are nullable. The null `priceUpdatedAt` triggers a fresh fetch on first view, which is the correct behavior.
- **[Variant-specific pricing in cache]** The cached price is resolved for a specific variant context. If a card exists in multiple slots with different variants, the cached price reflects the last-fetched variant. → Acceptable tradeoff for simplicity. Variant-aware caching would require a composite key (externalId + variant) which is significantly more complex.
