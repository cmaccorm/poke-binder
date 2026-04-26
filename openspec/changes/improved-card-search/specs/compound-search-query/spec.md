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
