## Why

The search parser (`parseSearchQuery`) incorrectly interprets Pokemon card name suffixes as set names. Searching "Gardevoir EX" treats "EX" as a set filter instead of part of the card name, returning zero results. Similarly, "Shaymin Lv X" looks for a set called "Lv X". The parser also can't distinguish between a multi-word set name ("Steam Siege") and a name suffix, making compound queries unreliable. Users expect natural searches like "Gardevoir EX", "Ditto 63", and "Gardevoir Steam Siege" to all return correct results.

## What Changes

- Replace the naive token-splitting parser with a smart parser that recognizes Pokemon card name suffixes (EX, GX, V, VMAX, VSTAR, VUNION, Lv.X, LV X, ex, BREAK, Prime, Legend, etc.) as part of the card name rather than set names
- When a name suffix is detected, the full compound name (e.g. "Gardevoir EX") is used in the API `name:` filter
- When a trailing number is detected after a name (e.g. "Ditto 63"), it is correctly parsed as name + card number
- When remaining tokens after the name (+ optional suffix) don't match a known suffix and aren't a number, they are treated as a set name filter (e.g. "Gardevoir Steam Siege")
- Update `buildCatalogQuery` to use wildcard matching on name (`*name*`) so that "Gardevoir" matches "Gardevoir EX", "Gardevoir ex", etc. when no suffix is explicitly provided
- Add comprehensive tests for the new parser covering all documented search patterns

## Capabilities

### New Capabilities
- `smart-search-parser`: Intelligent query parsing that recognizes Pokemon TCG card name suffixes (EX, GX, V, VMAX, etc.), set names, and card numbers from a single free-text search input

### Modified Capabilities

## Impact

- `src/lib/catalog.ts` — `parseSearchQuery` and `buildCatalogQuery` rewritten
- `src/__tests__/` — new test file for search parser
- No API route changes — the `/api/catalog/search` endpoint signature is unchanged
- No database schema changes
- No breaking changes to the `CardReference` type or downstream consumers
