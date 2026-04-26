## ADDED Requirements

### Requirement: Search matches set names by substring
The search system MUST match set name terms anywhere within the full set name, not only as a prefix. A query containing "delta species" MUST match sets named "EX Delta Species", "EX Crystal Guardians", etc., where the term appears mid-string.

#### Scenario: Mid-string set name match
- **WHEN** the user searches "beedrill delta species"
- **THEN** the search returns cards named "Beedrill" from sets whose name contains "delta species" (e.g., "EX Delta Species")

#### Scenario: Prefix set name match still works
- **WHEN** the user searches "pikachu base"
- **THEN** the search returns cards named "Pikachu" from sets whose name contains "base" (e.g., "Base Set", "Base Set 2")

### Requirement: Search surfaces all printing variants as separate results
The search system MUST expand each card into separate results for each printing variant present in the card's pricing data. Recognized variants are: Normal, Holo, Reverse Holo, and 1st Edition Holo.

#### Scenario: Card with multiple variants returns multiple results
- **WHEN** the user searches for a card that has Normal, Holo, and Reverse Holo pricing data
- **THEN** the search returns three separate results for that card, one per variant

#### Scenario: Card with single variant returns one result
- **WHEN** the user searches for a card that only has Normal pricing data
- **THEN** the search returns one result for that card with variant "Normal"

#### Scenario: Card with no pricing data returns one result
- **WHEN** the user searches for a card that has no tcgplayer pricing data
- **THEN** the search returns one result for that card with no variant label

### Requirement: Search results display variant labels
The search UI MUST display a visible variant label on each result so the user can distinguish between printings of the same card.

#### Scenario: Variant badge is shown
- **WHEN** search results include a card with variant "Reverse Holo"
- **THEN** that result displays a "Reverse Holo" badge alongside the card name, number, set, and rarity

#### Scenario: No variant badge for unknown variant
- **WHEN** search results include a card with no variant data
- **THEN** that result does not display a variant badge

### Requirement: Variant choice is preserved on slot assignment
The system MUST store the user's chosen variant when a card is assigned to a binder slot. The variant MUST be persisted so it can be displayed when the binder is viewed later.

#### Scenario: Assigning a variant card to a slot
- **WHEN** the user selects a "Reverse Holo" variant from search results and assigns it to a slot
- **THEN** the slot stores both the card reference and the "Reverse Holo" variant

#### Scenario: Existing slots without variant data remain valid
- **WHEN** a slot was assigned before variant tracking existed
- **THEN** the slot displays normally with no variant label
