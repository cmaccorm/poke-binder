## ADDED Requirements

### Requirement: Scroll bounce prevention
On mobile devices, scrolling the card detail modal content SHALL NOT spring back to the original position after user releases scroll. The content position SHALL remain where the user scrolled it.

#### Scenario: Scroll up and release
- **WHEN** user scrolls up to see price field and releases touch
- **THEN** content stays in scrolled position
- **AND** does not bounce back

#### Scenario: Scroll to bottom and release
- **WHEN** user scrolls to bottom of metadata and releases touch
- **THEN** content stays at bottom
- **AND** does not bounce back

### Requirement: Native iOS momentum scrolling
The modal SHALL use native iOS momentum scrolling for a smooth scrolling experience.

#### Scenario: Flick scroll gesture
- **WHEN** user flick-scrollable content
- **THEN** content continues with momentum after release
- **AND** gradually slows down

### Requirement: Price visible without excessive scrolling
On devices with small viewports, the price field SHALL be accessible without having to scroll past full metadata section.

#### Scenario: Small viewport shows price
- **WHEN** viewport height is less than 500px
- **THEN** price is in the viewport or requires only minimal scroll
- **AND** user can see price without fully scrolling to bottom