## ADDED Requirements

### Requirement: Binder viewer header exposes management controls in edit mode
The binder viewer header MUST show rename and delete controls only when edit mode is active, keeping the view mode experience clean and focused on browsing.

#### Scenario: Edit mode reveals management controls
- **GIVEN** the user toggles edit mode on in the binder viewer
- **WHEN** the header renders
- **THEN** the nickname becomes clickable for inline editing
- **AND** a delete button becomes visible in the header
