## ADDED Requirements

### Requirement: Shelf view shows binder identity
The application MUST provide a shelf view that displays each binder with its configured color and nickname.

#### Scenario: Binder appears on the shelf
- **GIVEN** a binder has a color and nickname
- **WHEN** the shelf view loads
- **THEN** the binder is shown using that color and nickname

### Requirement: Binder sizes and layouts are fixed
The application MUST support only the fixed binder sizes 2x2, 3x3, and 4x3, and MUST render each binder using the exact page layout defined for that size.

#### Scenario: Binder uses its configured grid
- **GIVEN** a binder is configured as 3x3
- **WHEN** the binder opens
- **THEN** the page uses the exact 3x3 layout for that binder size

### Requirement: Mirror mode preserves exact page layout
The application MUST support mirror mode for binders and MUST preserve the exact left and right page layouts without reflowing or changing slot positions.

#### Scenario: Mirrored pages remain aligned
- **GIVEN** a binder is opened in mirror mode
- **WHEN** the user flips pages
- **THEN** each page pair keeps the exact configured layout and slot arrangement

### Requirement: Default view mode supports page flipping
The application MUST open binders in a default view mode and MUST allow page flipping in both view mode and per-binder edit mode.

#### Scenario: User flips pages while editing
- **GIVEN** a binder is open in edit mode
- **WHEN** the user flips to another page
- **THEN** the binder changes pages without leaving edit mode

### Requirement: Empty-slot add flow searches the catalog
The application MUST allow adding a card in edit mode by clicking an empty slot, searching by card name or card number, showing live thumbnail results, and filling the selected slot with the chosen card.

#### Scenario: User fills an empty slot
- **GIVEN** a binder is open in edit mode and a slot is empty
- **WHEN** the user clicks the empty slot and searches for a card by name or number
- **THEN** matching cards appear as live thumbnail results
- **AND** selecting a result fills the slot with that card

### Requirement: Removal requires confirmation
The application MUST ask for confirmation before removing a card from a slot in edit mode and MUST use the text "Are you sure you want to remove {card name}?".

#### Scenario: User cancels a removal
- **GIVEN** a slot contains a card in edit mode
- **WHEN** the user chooses to remove it
- **THEN** the application prompts with "Are you sure you want to remove {card name}?"
- **AND** the card remains in the slot until the user confirms

### Requirement: Catalog data is cached locally
The application MUST source card images and metadata from the catalog and MUST keep a local cache to make binder browsing and editing responsive.

#### Scenario: Cached catalog data is used immediately
- **GIVEN** a card image and metadata were previously loaded
- **WHEN** the user revisits the binder view
- **THEN** the application can render the cached image and metadata without waiting for a fresh catalog fetch
