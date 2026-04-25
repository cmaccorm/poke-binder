## ADDED Requirements

### Requirement: Binder page has black felt texture background
The binder page SHALL display a black felt-textured background mimicking premium VaultX binders.

#### Scenario: Page shows black felt background
- **WHEN** the BinderViewer displays a page
- **THEN** the page background shows a black felt-like texture

### Requirement: Card slots appear as peaked pockets
Each card slot SHALL appear as a peaked/pillar card pocket with three sides and open top where cards slide in.

#### Scenario: Empty slot shows peaked pocket
- **WHEN** a card slot is empty
- **THEN** the slot displays as a black peaked pocket with open top for card insertion

#### Scenario: Filled slot shows card in pocket
- **WHEN** a card is assigned to a slot
- **THEN** the card appears inserted into the pocket with pocket edges visible on left, right, and bottom

### Requirement: Binder page has accent stripe
Each page SHALL display a gold/orange accent stripe along the page edge as a signature VaultX element.

#### Scenario: Page shows accent stripe
- **WHEN** a page is displayed
- **THEN** a gold/orange accent stripe is visible along the page edge

### Requirement: Cards have visible separation from black background
Cards SHALL have subtle visual separation from the black pocket background.

#### Scenario: Card shows separation from pocket
- **WHEN** a card is displayed in a pocket
- **THEN** there is subtle border/glow that separates the card from the black pocket

### Requirement: Card assignment and removal unchanged
The visual changes SHALL NOT affect the card assignment or removal functionality.

#### Scenario: User assigns card
- **WHEN** user selects a card from the catalog modal
- **THEN** the card appears in the selected pocket slot

#### Scenario: User removes card
- **WHEN** user clicks remove button
- **THEN** the card is removed and pocket returns to empty state