## ADDED Requirements

### Requirement: Parser recognizes card name suffixes as part of the name
The parser SHALL recognize known Pokemon TCG card name suffixes (EX, ex, GX, V, VMAX, VSTAR, VUNION, BREAK, Prime, Legend, Lv.X, LV X, TAG TEAM, Radiant) and include them as part of the `name` field in the parsed query, not as a set name.

#### Scenario: Single-token suffix (EX)
- **WHEN** user searches "Gardevoir EX"
- **THEN** parsed result SHALL be `{ name: "Gardevoir EX" }` with no set field

#### Scenario: Single-token suffix case-insensitive (ex)
- **WHEN** user searches "Gardevoir ex"
- **THEN** parsed result SHALL be `{ name: "Gardevoir ex" }` with no set field

#### Scenario: Single-token suffix (V)
- **WHEN** user searches "Arceus V"
- **THEN** parsed result SHALL be `{ name: "Arceus V" }` with no set field

#### Scenario: Single-token suffix (VMAX)
- **WHEN** user searches "Charizard VMAX"
- **THEN** parsed result SHALL be `{ name: "Charizard VMAX" }` with no set field

#### Scenario: Single-token suffix (VSTAR)
- **WHEN** user searches "Arceus VSTAR"
- **THEN** parsed result SHALL be `{ name: "Arceus VSTAR" }` with no set field

#### Scenario: Single-token suffix (GX)
- **WHEN** user searches "Tapu Lele GX"
- **THEN** parsed result SHALL be `{ name: "Tapu Lele GX" }` with no set field

#### Scenario: Multi-token suffix (Lv X)
- **WHEN** user searches "Shaymin Lv X"
- **THEN** parsed result SHALL be `{ name: "Shaymin Lv X" }` with no set field

#### Scenario: Dotted suffix (Lv.X)
- **WHEN** user searches "Shaymin Lv.X"
- **THEN** parsed result SHALL be `{ name: "Shaymin Lv.X" }` with no set field

#### Scenario: BREAK suffix
- **WHEN** user searches "Greninja BREAK"
- **THEN** parsed result SHALL be `{ name: "Greninja BREAK" }` with no set field

### Requirement: Parser extracts card number from trailing digits
The parser SHALL treat a trailing numeric token as a card number when preceded by a card name (with or without suffix).

#### Scenario: Name plus number
- **WHEN** user searches "Ditto 63"
- **THEN** parsed result SHALL be `{ name: "Ditto", number: "63" }`

#### Scenario: Name plus suffix plus number
- **WHEN** user searches "Gardevoir EX 63"
- **THEN** parsed result SHALL be `{ name: "Gardevoir EX", number: "63" }`

#### Scenario: Number-only search
- **WHEN** user searches "63"
- **THEN** parsed result SHALL be `{ number: "63" }`

### Requirement: Parser treats remaining tokens as set name
After extracting the card name (including any suffix) and card number, remaining tokens SHALL be treated as a set name filter.

#### Scenario: Name plus set name
- **WHEN** user searches "Gardevoir Steam Siege"
- **THEN** parsed result SHALL be `{ name: "Gardevoir", set: "Steam Siege" }`

#### Scenario: Name plus set name plus number
- **WHEN** user searches "Gardevoir Steam Siege 35"
- **THEN** parsed result SHALL be `{ name: "Gardevoir", set: "Steam Siege", number: "35" }`

### Requirement: Query builder uses correct wildcard matching for name
The query builder SHALL construct PokeTCG API queries that match the card name with appropriate wildcards based on whether a suffix was specified.

#### Scenario: Name without suffix uses prefix wildcard
- **WHEN** parsed query has name "Gardevoir" without a suffix
- **THEN** API query SHALL include `name:"Gardevoir*"` to match all variants (Gardevoir, Gardevoir EX, Gardevoir-EX, etc.)

#### Scenario: Name with suffix uses targeted wildcard
- **WHEN** parsed query has name "Gardevoir EX" (suffix detected)
- **THEN** API query SHALL use a pattern that matches both "Gardevoir EX" and "Gardevoir-EX" forms (e.g., `name:"Gardevoir*EX*"`)

#### Scenario: Set filter uses contains matching
- **WHEN** parsed query has set "Steam Siege"
- **THEN** API query SHALL include `set.name:"*Steam Siege*"`

#### Scenario: Number filter is exact
- **WHEN** parsed query has number "63"
- **THEN** API query SHALL include `number:63`

### Requirement: Simple searches remain unchanged
Single-word and basic name searches SHALL continue to work as before.

#### Scenario: Single name search
- **WHEN** user searches "Pikachu"
- **THEN** parsed result SHALL be `{ name: "Pikachu" }`

#### Scenario: Empty search
- **WHEN** user searches ""
- **THEN** parsed result SHALL be `{}`
