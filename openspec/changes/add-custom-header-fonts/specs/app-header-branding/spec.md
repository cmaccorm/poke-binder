## ADDED Requirements

### Requirement: Header displays branded title
The header SHALL display the text "poké-binder" as the application title.

#### Scenario: User views any page
- **WHEN** the user navigates to any page in the application
- **THEN** the header is visible at the top of the page
- **AND** the title "poké-binder" is rendered within the header

### Requirement: Title uses Pokemon Classic font
The title text in the header SHALL be rendered using the "Pokemon Classic" font family.

#### Scenario: Title font family applied
- **WHEN** the header title is rendered
- **THEN** the browser applies the "Pokemon Classic" font family to the title text

### Requirement: Header displays randomized decorative character
The header SHALL display a single random character immediately adjacent to the title.

#### Scenario: Character is rendered on page load
- **WHEN** the page is loaded or refreshed
- **THEN** a single character is displayed next to the title

### Requirement: Decorative character uses Pokemon Pixels font
The decorative character in the header SHALL be rendered using the "Pokemon Pixels" font family.

#### Scenario: Character font family applied
- **WHEN** the decorative character is rendered
- **THEN** the browser applies the "Pokemon Pixels" font family to the character

### Requirement: Character pool and randomization
The random decorative character SHALL be selected from the set of characters a-z, A-Z, and 0-9. The character SHALL be randomized on every full page refresh.

#### Scenario: Character changes on refresh
- **WHEN** the user refreshes the page
- **THEN** a new character is selected from the pool a-z, A-Z, 0-9
- **AND** the displayed character may differ from the previous refresh

### Requirement: Header integration in root layout
The header SHALL be integrated into the root layout so it is visible on all pages of the application.

#### Scenario: Header appears on all routes
- **WHEN** the user navigates to the home page or any binder page
- **THEN** the header is rendered above the page content
