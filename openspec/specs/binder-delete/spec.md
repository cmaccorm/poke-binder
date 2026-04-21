## ADDED Requirements

### Requirement: Binder can be deleted with confirmation
The application MUST allow deleting a binder via a delete button in the binder viewer header. The delete button MUST only be visible when edit mode is active. Clicking the delete button MUST show a confirmation dialog with the text "Are you sure you want to delete this binder?" before proceeding.

#### Scenario: User deletes a binder
- **GIVEN** the binder viewer is in edit mode
- **WHEN** the user clicks the delete button
- **THEN** a confirmation dialog appears with the text "Are you sure you want to delete this binder?"
- **AND** the dialog has Cancel and Delete buttons

#### Scenario: User confirms deletion
- **GIVEN** the delete confirmation dialog is showing
- **WHEN** the user clicks the Delete button
- **THEN** the binder is deleted via the API (cascading to all pages and slots)
- **AND** the user is redirected to the shelf view

#### Scenario: User cancels deletion
- **GIVEN** the delete confirmation dialog is showing
- **WHEN** the user clicks Cancel
- **THEN** the dialog closes and the binder remains unchanged

#### Scenario: Delete not available in view mode
- **GIVEN** the binder viewer is in view mode (edit mode is off)
- **WHEN** the user views the header
- **THEN** no delete button is visible

### Requirement: Delete API cascades removal
The DELETE endpoint at `/api/binders/[binderId]` MUST delete the binder and all associated pages and slots. The endpoint MUST return 204 No Content on success.

#### Scenario: Successful deletion
- **WHEN** a DELETE request is sent for a valid binder ID
- **THEN** the binder, all its pages, and all its slots are removed from the database
- **AND** the response status is 204

#### Scenario: Deletion of nonexistent binder
- **WHEN** a DELETE request is sent for a binder ID that does not exist
- **THEN** the response status is 404
