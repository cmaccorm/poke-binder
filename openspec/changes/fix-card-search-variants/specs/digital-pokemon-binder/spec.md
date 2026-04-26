## MODIFIED Requirements

### Requirement: Empty-slot add flow searches the catalog
The application MUST allow adding a card in edit mode by clicking an empty slot, searching by card name or card number, showing live thumbnail results with variant labels, and filling the selected slot with the chosen card and its variant.

#### Scenario: User fills an empty slot with a specific variant
- **WHEN** the user clicks an empty slot in edit mode
- **THEN** a search overlay appears
- **WHEN** the user types a card name and selects a specific variant (e.g., "Reverse Holo") from the results
- **THEN** the slot is filled with the chosen card and the variant is stored on the slot
