## ADDED Requirements

### Requirement: Visual Bookshelf Layout
The homepage SHALL display the user's binders on a visual bookshelf layout consisting of black/charcoal wooden shelf planks instead of a standard flex grid.

#### Scenario: Displaying binders on a shelf
- **WHEN** the homepage loads and the user has existing binders
- **THEN** the binders are rendered as physical volumes resting on black/charcoal wooden shelf planks.
- **AND THEN** the binders wrap to new shelf rows depending on available screen width.

### Requirement: Depth and Immersion
The shelf planks SHALL have visual depth to mimic physical shelves, and the binders SHALL be positioned to appear as though they are sitting on the shelves.

#### Scenario: Visual depth
- **WHEN** viewing the homepage
- **THEN** the shelves have a 3D effect (e.g., using shadows or borders) to simulate depth.
- **AND THEN** the bottom of each binder card visually rests on or slightly overlaps the shelf plank.

### Requirement: Preserve Existing Functionality
The visual update SHALL NOT remove existing homepage functionality, including the ability to open a binder, hover animations on the binders, and the "Create Binder" button.

#### Scenario: Interacting with binders
- **WHEN** the user hovers over a binder on the shelf
- **THEN** the binder card scales up as before.
- **WHEN** the user clicks a binder
- **THEN** the binder opens to its last viewed page.

### Requirement: Maintain Responsive Design
The bookshelf layout SHALL remain responsive across different screen sizes, ensuring binders wrap correctly without overflowing or breaking the layout.

#### Scenario: Resizing the window
- **WHEN** the user views the homepage on a mobile device or resizes the browser window
- **THEN** the shelf rows adjust to accommodate the number of binders that fit horizontally.
- **AND THEN** empty space on a shelf is still rendered as a continuous black/charcoal wooden plank.