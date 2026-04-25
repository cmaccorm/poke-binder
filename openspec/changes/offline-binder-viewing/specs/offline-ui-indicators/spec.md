## ADDED Requirements

### Requirement: Header displays online/offline status
The application header MUST display a visible indicator showing whether the user is currently online or offline. The indicator MUST update in real-time as connectivity changes.

#### Scenario: User goes offline
- **WHEN** the browser loses network connectivity
- **THEN** the header indicator updates to show "Offline" status

#### Scenario: User comes back online
- **WHEN** the browser regains network connectivity
- **THEN** the header indicator updates to show "Online" status

### Requirement: Card detail modal is disabled when offline
The application MUST NOT open the card detail modal when the user is offline. Tapping a card in view mode while offline MUST show a brief notification that card details are unavailable offline.

#### Scenario: User taps card while offline
- **WHEN** the user taps a card in view mode
- **AND** the user is offline
- **THEN** the card detail modal does not open
- **AND** a notification is shown indicating card details are unavailable offline

#### Scenario: User taps card while online
- **WHEN** the user taps a card in view mode
- **AND** the user is online
- **THEN** the card detail modal opens normally

### Requirement: Binder creation is disabled when offline
The "+ New Binder" button MUST be visually disabled when the user is offline. Interacting with it MUST NOT trigger the create binder dialog.

#### Scenario: User tries to create binder while offline
- **WHEN** the user is on the shelf view while offline
- **THEN** the "+ New Binder" button appears disabled
- **AND** clicking it does not open the create binder dialog

### Requirement: Binder editing is disabled when offline
The edit mode toggle in the binder viewer MUST be disabled when offline. The user MUST only be able to browse in view mode.

#### Scenario: User tries to enter edit mode while offline
- **WHEN** the user is viewing a binder while offline
- **THEN** the edit mode toggle is disabled
- **AND** the user cannot enter edit mode
