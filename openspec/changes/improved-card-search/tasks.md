## 1. Query Parser

- [x] 1.1 Create a `parseSearchQuery(query: string)` function in `src/lib/catalog.ts` that returns `{ name?: string; set?: string; number?: string }` following the trailing-number heuristic from the design
- [x] 1.2 Add unit tests for `parseSearchQuery` covering all spec scenarios: single name, bare number, name+set, name+number, name+set+number, empty input

## 2. Query Builder

- [x] 2.1 Create a `buildCatalogQuery(parsed: { name?: string; set?: string; number?: string })` function that maps parsed parts to PokéTCG API Lucene query fields (`name:`, `set.name:`, `number:`)
- [x] 2.2 Add unit tests for `buildCatalogQuery` covering single-field and multi-field combinations

## 3. Integration

- [x] 3.1 Refactor `searchCatalog()` to use `parseSearchQuery` and `buildCatalogQuery` instead of the existing inline `isNumeric` logic
- [x] 3.2 Verify backward compatibility: existing single-name and bare-number searches produce identical API queries

## 5. Variant Fetching (name or number without set)

- [x] 5.1 When `searchCatalog` receives `name` + `number` without `set`, and the initial query returns fewer than 5 results, perform a follow-up query using only the name filter to retrieve all print variants, then client-side filter to cards matching the same name and number
- [x] 5.2 Add tests for variant fetching behavior covering: name+number with multiple variants, name+number with single result, name+number with set (no variant fetch needed)
- [ ] 5.3 Same follow-up logic should apply to `name` + `set` without `number` — when the compound query returns fewer than 5 results, do a name-only follow-up and filter by set to surface all print variants

## 6. Validation

- [x] 6.1 Run full test suite (`npx vitest run`) and confirm all tests pass
- [x] 6.2 Run lint (`npm run lint`) and fix any issues