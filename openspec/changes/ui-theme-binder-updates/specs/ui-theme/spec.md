## ADDED Requirements

### Requirement: Charcoal and Red Theme
The system SHALL use a dark charcoal and red color palette across the application interface.

#### Scenario: User views the application
- **WHEN** the application loads
- **THEN** the background and surface colors appear in shades of dark charcoal/grey
- **THEN** the primary accent color is red

### Requirement: Glowing Header Text
The main "poké-binder" header SHALL display with a red glowing effect.

#### Scenario: User views the header
- **WHEN** the header is rendered
- **THEN** the "poké-binder" text has a red text-shadow to simulate a glow
- **THEN** the text color is red

### Requirement: Realistic Binder Cards
Binder cards on the shelf SHALL resemble realistic 3D binders.

#### Scenario: User views binder cards
- **WHEN** the shelf page renders the binders
- **THEN** each binder card displays a vertical dark gradient on the left edge (spine)
- **THEN** each binder card displays a thick light-colored border on the right edge (pages)

### Requirement: Streamlined Shelf Header
The shelf page SHALL NOT display the redundant "My Binders" heading.

#### Scenario: User navigates to the shelf
- **WHEN** the user is on the root shelf page
- **THEN** the "My Binders" text and its associated icon are not visible
- **THEN** the "+ New Binder" button is still accessible at the top
