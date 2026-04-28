## Context

The PokeBinder search uses `parseSearchQuery` in `src/lib/catalog.ts` to split user input into `{ name, set, number }` fields, then `buildCatalogQuery` builds a PokeTCG API query string. The current parser naively takes the first token as the name and treats all remaining tokens as a set name — except when the last token is a number, in which case it becomes the card number.

This fails for Pokemon card name suffixes like "EX", "GX", "V", "VMAX", "VSTAR", "Lv.X", "ex", "BREAK", etc. which are part of the card name, not set identifiers. "Gardevoir EX" is parsed as name:"Gardevoir" + set:"EX" instead of name:"Gardevoir EX".

The PokeTCG API v2 supports Lucene-style queries on the `name` field with wildcards (`*`). Currently, `buildCatalogQuery` uses prefix-only matching (`name:"Gardevoir*"`), which works for simple names but fails to match "Gardevoir-EX" when searching "Gardevoir EX" unless the full compound name is in the query.

## Goals / Non-Goals

**Goals:**
- "Gardevoir EX" returns cards with both "Gardevoir" and "EX" in the name
- "Shaymin Lv X" returns cards with "Shaymin" and "Lv" in the name (Lv.X variants)
- "Ditto 63" returns all cards named "Ditto" with card number 63
- "Gardevoir Steam Siege" returns cards named "Gardevoir" in the "Steam Siege" set
- Maintain backward compatibility — simple single-word searches ("Pikachu") still work
- Add test coverage for the parser

**Non-Goals:**
- Fuzzy/typo-tolerant search (out of scope)
- Searching by rarity, type, or other card attributes
- Changes to the API route interface or response shape
- UI changes to the search component
- Caching or performance changes

## Decisions

### 1. Suffix recognition via a known-suffix list

**Decision**: Maintain a static list of known Pokemon TCG card name suffixes and check tokens against it during parsing.

**Suffixes**: `EX`, `ex`, `GX`, `V`, `VMAX`, `VSTAR`, `VUNION`, `BREAK`, `Prime`, `Legend`, `LV.X`, `Lv.X`, `TAG TEAM`, `Radiant`, `Amazing Rare` (single-token variants: case-insensitive matching for the common ones).

**Rationale**: The set of Pokemon TCG name suffixes is well-defined and changes infrequently (once per new game mechanic, roughly every 2-3 years). A static list is simple, fast, and easy to maintain. The alternative — heuristically guessing whether a token is a suffix vs. a set name — is fragile and error-prone.

**Alternatives considered**:
- Regex-based detection: Too brittle for multi-token suffixes like "Lv X" or "TAG TEAM"
- Sending multiple API queries and merging: Expensive and slow

### 2. Multi-token suffix handling (Lv X, TAG TEAM)

**Decision**: After extracting the first token as the base name, scan forward greedily to see if the next 1-2 tokens form a known suffix (checking longest match first). Consume them into the name field.

**Rationale**: "Lv X" is two tokens but one logical suffix. Greedy longest-match prevents "Lv" from being misinterpreted as a set name while "X" becomes something else.

### 3. Parse order: name → suffix → number → set

**Decision**: Parse in this fixed order:
1. First token = base name (always)
2. Check if next token(s) form a known suffix → append to name
3. Check if last remaining token is a number → card number
4. Remaining tokens → set name

**Rationale**: This order handles all documented use cases unambiguously. The number check happens on remaining tokens (after suffix consumption), so "Gardevoir EX 63" would correctly parse as name:"Gardevoir EX" + number:"63".

### 4. Wildcard strategy in `buildCatalogQuery`

**Decision**: When a suffix is part of the parsed name, use exact-prefix matching (`name:"Gardevoir EX*"`). When no suffix is detected and only a base name is present, use prefix matching (`name:"Gardevoir*"`) which naturally matches "Gardevoir", "Gardevoir EX", "Gardevoir-EX", etc.

**Rationale**: Prefix matching on just the base name is intentionally broad — if the user typed just "Gardevoir", they likely want to see all variants. When they typed "Gardevoir EX" explicitly, they want to narrow to EX variants specifically.

**Note**: The PokeTCG API `name` field stores the full card name including suffixes (e.g., "Gardevoir ex", "Gardevoir-EX"). The API's wildcard matching handles hyphens and spaces within the `name` field, so `name:"Gardevoir EX*"` will match "Gardevoir EX" and "Gardevoir EX (123/456)"-style names. For hyphenated variants like "Gardevoir-EX", we use `name:"Gardevoir*EX*"` pattern — embed a wildcard between name and suffix to handle both spaces and hyphens.

## Risks / Trade-offs

- **[Suffix list maintenance]** → New game mechanics may introduce new suffixes. Mitigation: the suffix list is a single constant, easy to update. Unknown suffixes fall through to set name matching, which is the existing behavior — so it degrades gracefully.
- **[Ambiguous queries]** → "Gardevoir V Star" could mean name:"Gardevoir VSTAR" or name:"Gardevoir V" + set:"Star". Mitigation: greedy longest-match on suffixes resolves this. "VSTAR" is a known suffix, so "V Star" matches it (case-insensitive, space-collapsed).
- **[API wildcard behavior]** → The PokeTCG API's wildcard handling for special characters (hyphens, periods) in names isn't fully documented. Mitigation: use broad prefix matching and let the API handle it; we can add post-filtering if results are too noisy.
