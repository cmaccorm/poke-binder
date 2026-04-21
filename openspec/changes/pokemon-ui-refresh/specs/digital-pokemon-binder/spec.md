## MODIFIED Requirements

### Requirement: Shelf view shows binder identity
The application MUST provide a shelf view that displays each binder with its configured color and nickname, and MUST render binder tiles using the refreshed Pokémon-inspired palette and elevated surface treatment defined by the UI theme.

#### Scenario: Binder appears on the shelf with refreshed styling
- **GIVEN** a binder has a color and nickname
- **WHEN** the shelf view loads
- **THEN** the binder is shown using that color and nickname
- **AND** the binder tile uses the refreshed themed surface styling
