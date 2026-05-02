## ADDED Requirements

### Requirement: Progress bar displays during image warmup
The system SHALL display a thin (2-3px) horizontal progress bar below the binder viewer header while the image warmup is active. The bar SHALL fill from left to right proportional to the ratio of completed images to total images.

#### Scenario: Warmup in progress
- **WHEN** the image warmup is active with 42 of 100 images completed
- **THEN** a progress bar is visible below the binder header, filled to approximately 42%

#### Scenario: Warmup not active
- **WHEN** the image warmup is not active (either not started or already complete)
- **THEN** no progress bar is visible

### Requirement: Progress bar uses the existing poke-gold theme color
The progress bar fill color SHALL use the `poke-gold` CSS variable to match the existing application theme.

#### Scenario: Visual consistency
- **WHEN** the progress bar is displayed
- **THEN** the bar fill color matches the `poke-gold` theme color used elsewhere in the app

### Requirement: Progress bar fades out on completion
The progress bar SHALL fade out smoothly (opacity transition) when the warmup completes, rather than disappearing abruptly.

#### Scenario: Warmup finishes
- **WHEN** the image warmup completes (all images processed)
- **THEN** the progress bar fills to 100% and fades out over a short transition (approximately 500ms-1s)

### Requirement: Progress bar is accessible
The progress bar element SHALL include an `aria-label` describing the current caching progress (e.g., "Caching images for offline: 42 of 100") and a `role="progressbar"` attribute with appropriate `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

#### Scenario: Screen reader announces progress
- **WHEN** a screen reader encounters the progress bar
- **THEN** it reads the current caching progress including the number of completed and total images

### Requirement: Progress bar does not interfere with binder navigation
The progress bar SHALL be positioned in a way that does not block, obscure, or shift any interactive elements in the binder viewer. Page navigation buttons, the edit toggle, and card slots SHALL remain fully accessible while the progress bar is visible.

#### Scenario: User navigates pages during warmup
- **WHEN** the user clicks page navigation arrows while the warmup progress bar is visible
- **THEN** page navigation works normally and the progress bar remains visible without interfering
