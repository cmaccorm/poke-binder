## ADDED Requirements

### Requirement: Card imagery remains stable while loading
The application MUST reserve space for card imagery and preserve aspect ratio so artwork does not shift layout as images load.

#### Scenario: Card art loads into a slot
- **WHEN** a card image is rendered
- **THEN** the slot keeps a stable size while the image loads
- **AND** the image preserves its native aspect ratio within the available space

### Requirement: Image presentation adapts to available space
The application MUST render catalog images responsively so card art remains sharp and appropriately scaled across shelf, binder, and edit views.

#### Scenario: The binder is viewed at a different size
- **WHEN** the viewport changes between compact and wide layouts
- **THEN** the same card image adapts to the available space without distortion
