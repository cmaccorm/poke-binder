## Context

The `searchCatalog()` function in `src/lib/catalog.ts` currently handles two mutually exclusive cases:
1. If the query is purely numeric, it searches by `number:<query>`
2. Otherwise, it searches by `name:"<query>*"`

This means a query like "Charizard Base Set" is sent as `name:"Charizard Base Set*"`, which returns zero results because no card is literally named "Charizard Base Set". Users have no way to combine name + set or name + number in a single search.

The PokéTCG API v2 supports compound Lucene-style queries — multiple field filters can be space-separated (implicit AND), e.g. `name:"Charizard" set.name:"Base"`.

## Goals / Non-Goals

**Goals:**
- Allow users to type compound queries like "Charizard Base Set" or "Pikachu 25" and get precise results
- Parse the search input client-side of the API boundary (in `searchCatalog`) to build a multi-field query
- Maintain full backward compatibility — plain name searches and bare number searches work identically

**Non-Goals:**
- Advanced query syntax exposed to users (no `field:value` syntax in the UI)
- Changes to the search UI component or API route contract
- Set browsing / autocomplete for set names
- Fuzzy matching or typo correction

## Decisions

### 1. Query parsing strategy: trailing-number heuristic

The parser will inspect the query string for a trailing numeric token:

- **"Pikachu 25"** → name=`Pikachu`, number=`25`
- **"Charizard Base Set"** → name=`Charizard`, set=`Base Set` (no trailing number)
- **"25"** → number=`25` (bare number, current behavior preserved)
- **"Charizard"** → name=`Charizard` (single word, current behavior preserved)

For queries with more than one word and no trailing number, the parser will try a name + set interpretation: the first word is the card name, remaining words form the set name filter.

**Rationale:** This heuristic covers the two most common compound patterns (name+set, name+number) without requiring any special syntax from the user. The PokéTCG API's wildcard support (`*`) makes partial set names work well.

**Alternative considered:** Regex-based set name matching against a known list — rejected because it requires maintaining a set list and adds complexity for minimal gain.

### 2. Multi-word card names: first-token split

When splitting "Charizard Base Set", treating only the first token as the card name is a reasonable default because:
- Most Pokémon names are a single word
- Multi-word names (e.g. "Mr. Mime") are less common and users can still search them without a set qualifier

If the first-token heuristic yields poor results, the user can simply search the name alone and scroll. This is strictly better than the current behavior.

### 3. Query building: compose PokéTCG Lucene filters

Parsed parts are mapped to API query fields:
- `name` → `name:"<value>*"`
- `set` → `set.name:"<value>*"`
- `number` → `number:<value>`

Parts are joined with spaces (implicit AND in the PokéTCG API).

### 4. All changes confined to `searchCatalog()` in `catalog.ts`

The API route, client components, and database layer are untouched. The only change is how the `q` variable is built inside `searchCatalog()`.

## Risks / Trade-offs

- **First-token split misses multi-word Pokémon names** (e.g. "Mr. Mime Jungle") → Mitigation: users can search "Mr. Mime" without a set qualifier. This is an acceptable trade-off for the simplicity gained.
- **Ambiguity between set name and second name word** (e.g. "Mew Two" — is "Two" a set?) → Mitigation: the PokéTCG API's wildcard matching on `set.name` will return empty for non-matching sets, and the `name` filter alone will still surface relevant cards. Worst case is fewer results, not wrong results.
- **Trailing number could be part of a set name** (e.g. set "XY12") → Mitigation: set names like "XY Evolutions" don't typically end with bare numbers. Edge cases are unlikely and recoverable by searching without the number.
