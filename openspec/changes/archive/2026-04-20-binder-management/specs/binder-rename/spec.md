## ADDED Requirements

### Requirement: Binder nickname can be renamed inline
The application MUST allow renaming a binder's nickname via inline click-to-edit on the nickname text in the binder viewer header. The rename control MUST only be available when edit mode is active.

#### Scenario: User renames a binder
- **GIVEN** the binder viewer is in edit mode
- **WHEN** the user clicks the nickname text
- **THEN** the nickname text becomes an editable input pre-filled with the current name
- **AND** pressing Enter or blurring the input saves the new name via the API
- **AND** the displayed nickname updates immediately

#### Scenario: User cancels a rename
- **GIVEN** the nickname input is active
- **WHEN** the user presses Escape
- **THEN** the input reverts to the previous nickname without making an API call

#### Scenario: User submits empty nickname
- **GIVEN** the nickname input is active
- **WHEN** the user clears the input and presses Enter or blurs
- **THEN** the input reverts to the previous nickname without making an API call

#### Scenario: Rename not available in view mode
- **GIVEN** the binder viewer is in view mode (edit mode is off)
- **WHEN** the user views the header
- **THEN** the nickname is displayed as static text with no edit affordance

### Requirement: Rename API validates input
The PATCH endpoint at `/api/binders/[binderId]` MUST accept a JSON body with a `nickname` field and MUST return 400 if the nickname is missing or empty after trimming.

#### Scenario: Valid rename request
- **WHEN** a PATCH request is sent with `{ "nickname": "New Name" }`
- **THEN** the binder's nickname is updated in the database
- **AND** the response contains the updated binder identity with status 200

#### Scenario: Empty nickname rejected
- **WHEN** a PATCH request is sent with `{ "nickname": "   " }`
- **THEN** the response is 400 with an error message
- **AND** the binder's nickname is unchanged
