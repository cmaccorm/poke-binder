## Why

The current card search only supports a single dimension at a time — either a card name (`name:"query*"`) or a bare number (`number:query`). Users cannot combine criteria like "Charizard Base Set" or "Pikachu 25" to narrow results. This makes it difficult to find a specific card when the name is common across many sets, leading to excessive scrolling through irrelevant results.

## What Changes

- Parse compound search queries to extract a card name, optional set name, and optional card number from a single search string
- Build multi-field PokéTCG API queries (combining `name:`, `set.name:`, and `number:` filters) instead of the current single-field approach
- Maintain backward compatibility: plain name searches and bare number searches continue to work as before

## Capabilities

### New Capabilities
- `compound-search-query`: Parse a single search input into structured parts (name, set name, card number) and build compound PokéTCG API queries that filter across multiple fields simultaneously

### Modified Capabilities

## Impact

- `src/lib/catalog.ts` — `searchCatalog()` query-building logic changes
- `src/app/api/catalog/search/route.ts` — no API contract changes (still `GET ?q=`), but results will be more precise for compound queries
- No database schema changes
- No new dependencies
- No breaking changes to the client — the search input field and API shape remain identical
