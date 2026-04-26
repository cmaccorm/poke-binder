## 1. Query Parser

- [x] 1.1 Create a `parseSearchQuery(query: string)` function in `src/lib/catalog.ts` that returns `{ name?: string; set?: string; number?: string }` following the trailing-number heuristic from the design
- [x] 1.2 Add unit tests for `parseSearchQuery` covering all spec scenarios: single name, bare number, name+set, name+number, name+set+number, empty input

## 2. Query Builder

- [x] 2.1 Create a `buildCatalogQuery(parsed: { name?: string; set?: string; number?: string })` function that maps parsed parts to PokéTCG API Lucene query fields (`name:`, `set.name:`, `number:`)
- [x] 2.2 Add unit tests for `buildCatalogQuery` covering single-field and multi-field combinations

## 3. Integration

- [x] 3.1 Refactor `searchCatalog()` to use `parseSearchQuery` and `buildCatalogQuery` instead of the existing inline `isNumeric` logic
- [x] 3.2 Verify backward compatibility: existing single-name and bare-number searches produce identical API queries

## 4. Validation

- [x] 4.1 Run full test suite (`npx vitest run`) and confirm all tests pass
- [x] 4.2 Run lint (`npm run lint`) and fix any issues
