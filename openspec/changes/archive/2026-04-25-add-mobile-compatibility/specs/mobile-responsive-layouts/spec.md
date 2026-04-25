## ADDED Requirements

### Requirement: Responsive layout system
The system SHALL use mobile-first responsive design across all pages with Tailwind CSS breakpoints.

#### Scenario: Shelf page on mobile
- **WHEN** user visits Shelf page on viewport width < 640px
- **THEN** binder cards display in single column grid with appropriate spacing

#### Scenario: Shelf page on tablet
- **WHEN** user visits Shelf page on viewport width 640px-1024px
- **THEN** binder cards display in 2-column grid

#### Scenario: Shelf page on desktop
- **WHEN** user visits Shelf page on viewport width > 1024px
- **THEN** binder cards display in 3-column grid

### Requirement: Responsive BinderViewer grid
The system SHALL adjust binder slot grid based on viewport size.

#### Scenario: BinderViewer on mobile
- **WHEN** user views binder page on mobile
- **THEN** slots display in a scrollable vertical layout appropriate for touch

#### Scenario: BinderViewer on tablet
- **WHEN** user views binder page on tablet
- **THEN** slots display in the selected layout (2x2, 3x3, or 4x3) scaled to fit

#### Scenario: BinderViewer on desktop
- **WHEN** user views binder page on desktop
- **THEN** slots display in the selected layout with full-size cards

### Requirement: Responsive CardDetailModal
The system SHALL display card details appropriately on all screen sizes.

#### Scenario: CardDetailModal on mobile
- **WHEN** user opens card detail on mobile
- **THEN** modal displays full-width with stacked image and details

#### Scenario: CardDetailModal on desktop
- **WHEN** user opens card detail on desktop
- **THEN** modal displays side-by-side image and details layout