## ADDED Requirements

### Requirement: Parse compound search queries
The system SHALL parse a single search input string into structured parts: an optional card name, an optional set name, and an optional card number. The parser SHALL use the following rules:
1. If the entire query is numeric, it SHALL be treated as a card number only.
2. If the query ends with a numeric token (preceded by at least one non-numeric token), the last token SHALL be treated as a card number and the remaining tokens SHALL be split into name and set parts.
3. If the query contains multiple non-numeric tokens, the first token SHALL be treated as the card name and the remaining tokens SHALL be treated as the set name.
4. If the query is a single non-numeric token, it SHALL be treated as a card name only.

#### Scenario: Single card name search
- **WHEN** the user searches for "Charizard"
- **THEN** the system SHALL query the API with `name:"Charizard*"`

#### Scenario: Bare number search
- **WHEN** the user searches for "25"
- **THEN** the system SHALL query the API with `number:25`

#### Scenario: Card name with set name
- **WHEN** the user searches for "Charizard Base Set"
- **THEN** the system SHALL query the API with `name:"Charizard*" set.name:"Base Set*"`

#### Scenario: Card name with card number
- **WHEN** the user searches for "Pikachu 25"
- **THEN** the system SHALL query the API with `name:"Pikachu*" number:25`

#### Scenario: Card name with set name and card number
- **WHEN** the user searches for "Charizard Base Set 4"
- **THEN** the system SHALL query the API with `name:"Charizard*" set.name:"Base Set*" number:4`

#### Scenario: Multi-word query with trailing number
- **WHEN** the user searches for "Mewtwo Genetic Apex 1"
- **THEN** the system SHALL query the API with `name:"Mewtwo*" set.name:"Genetic Apex*" number:1`

### Requirement: Build compound PokéTCG API queries
The system SHALL construct a PokéTCG API v2 query string by combining parsed parts with the following field mappings:
- Card name → `name:"<value>*"`
- Set name → `set.name:"<value>*"`
- Card number → `number:<value>`

Parts SHALL be joined with spaces to form an implicit AND query.

#### Scenario: Compound query construction
- **WHEN** the parser produces name="Charizard", set="Base Set", number=null
- **THEN** the constructed query SHALL be `name:"Charizard*" set.name:"Base Set*"`

#### Scenario: All fields present
- **WHEN** the parser produces name="Pikachu", set="Jungle", number="60"
- **THEN** the constructed query SHALL be `name:"Pikachu*" set.name:"Jungle*" number:60`

### Requirement: Backward-compatible search behavior
The system SHALL maintain identical behavior for queries that match current patterns. Single-word name searches and bare number searches SHALL produce the same API queries as the existing implementation.

#### Scenario: Existing name search preserved
- **WHEN** the user searches for "Bulbasaur"
- **THEN** the API query SHALL be `name:"Bulbasaur*"` (unchanged from current behavior)

#### Scenario: Existing number search preserved
- **WHEN** the user searches for "100"
- **THEN** the API query SHALL be `number:100` (unchanged from current behavior)

#### Scenario: Empty query handling
- **WHEN** the user searches with an empty or whitespace-only string
- **THEN** the system SHALL return an empty result array without making an API call

### Requirement: Fetch all print variants for name+number searches
When a search query contains both a card name and a card number but no set name, the system SHALL attempt to return all print variants (e.g., holofoil, reverse holofoil, 1st edition) of that card rather than a single canonical result. The system SHALL achieve this by:
1. Performing the initial compound query (name + number)
2. If fewer than 5 results are returned, performing a follow-up query using only the name filter
3. Client-side filtering the follow-up results to cards matching the same name prefix and card number
4. Returning the combined or filtered set of cards including all print variants

#### Scenario: Name + number search returns all print variants
- **WHEN** the user searches for a card with multiple print variants using only name and number (e.g., \"Ninetales 57\")
- **THEN** the system SHALL return all print variants (rare, holofoil, reverse holofoil, 1st edition) of that card, not just the canonical entry

#### Scenario: Name + number with set already returns all variants
- **WHEN** the user searches with name + number + set (e.g., \"Ninetales Base Set 57\")
- **THEN** the system SHALL use the compound query directly without a follow-up, as the set filter enables the API to return all variants in a single response

#### Scenario: Name + number with many results does not trigger follow-up
- **WHEN** the user searches for a common card with name + number (no set) and the initial query returns 5 or more results
- **THEN** the system SHALL return the initial results without a follow-up, as the result set is already comprehensive

#### Scenario: Bare number search behavior unchanged
- **WHEN** the user searches by number only (e.g., \"57\")
- **THEN** the system SHALL return all cards with that number across all sets without variant deduplication (unchanged from current behavior)
