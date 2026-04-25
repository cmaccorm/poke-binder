## MODIFIED Requirements

### Requirement: Shelf view shows binder identity
The application MUST provide a shelf view that displays each binder with its configured color and nickname, and MUST render binder tiles using the refreshed Pokémon-inspired palette and elevated surface treatment defined by the UI theme. When offline, the shelf view MUST fall back to cached binder data from IndexedDB.

#### Scenario: Binder appears on the shelf with refreshed styling
- **GIVEN** a binder has a color and nickname
- **WHEN** the shelf view loads
- **THEN** the binder is shown using that color and nickname
- **AND** the binder tile uses the refreshed themed surface styling

#### Scenario: Shelf renders from cache when offline
- **GIVEN** the binder list was previously cached in IndexedDB
- **WHEN** the shelf view loads while offline
- **THEN** all previously-cached binders are shown with their colors and nicknames

### Requirement: Default view mode supports page flipping
The application MUST open binders in a default view mode and MUST allow page flipping in both view mode and per-binder edit mode. When offline, the binder viewer MUST load page data from IndexedDB and MUST support page flipping across cached pages.

#### Scenario: User flips pages while editing
- **GIVEN** a binder is open in edit mode
- **WHEN** the user flips to another page
- **THEN** the binder changes pages without leaving edit mode

#### Scenario: User flips pages while offline
- **GIVEN** a binder is open in view mode while offline
- **WHEN** the user flips to a page that was previously cached
- **THEN** the page renders with cached slot and card data
