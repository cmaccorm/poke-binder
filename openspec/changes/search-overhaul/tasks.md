## 1. Suffix Registry

- [x] 1.1 Define the `KNOWN_SUFFIXES` constant in `src/lib/catalog.ts` — an ordered list of known Pokemon TCG name suffixes (longest multi-token first: "TAG TEAM", "Lv.X", "LV X", then single-token: EX, ex, GX, V, VMAX, VSTAR, VUNION, BREAK, Prime, Legend, Radiant)

## 2. Parser Rewrite

- [x] 2.1 Rewrite `parseSearchQuery` — extract first token as base name, then greedily match next token(s) against `KNOWN_SUFFIXES` (case-insensitive, longest match first) to build the full name
- [x] 2.2 Handle trailing number extraction — after suffix consumption, check if the last remaining token is numeric and extract as card `number`
- [x] 2.3 Handle remaining tokens as set name — any tokens left after name + suffix + number extraction become the `set` field
- [x] 2.4 Update `ParsedSearchQuery` type to include a `hasSuffix` boolean flag so `buildCatalogQuery` can choose the right wildcard strategy

## 3. Query Builder Update

- [x] 3.1 Update `buildCatalogQuery` — when `hasSuffix` is true, use `name:"<base>*<suffix>*"` pattern to match both hyphenated and spaced variants; when false, use `name:"<name>*"` prefix matching

## 4. Tests

- [x] 4.1 Add test file `src/__tests__/search-parser.test.ts` with cases for: single-token suffixes (EX, ex, GX, V, VMAX, VSTAR, BREAK), multi-token suffixes (Lv X, Lv.X), name+number, name+suffix+number, name+set, name+set+number, single name, empty input
- [x] 4.2 Add tests for `buildCatalogQuery` covering suffix vs. non-suffix wildcard strategies and set/number filters

## 5. Verification

- [x] 5.1 Run `npx vitest run` and confirm all tests pass
- [x] 5.2 Run `npm run build` and confirm no type errors
