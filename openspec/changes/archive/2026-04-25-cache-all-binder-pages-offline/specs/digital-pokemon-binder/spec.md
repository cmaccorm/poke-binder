## MODIFIED Requirements

### Requirement: Binder viewer header exposes management controls in edit mode

#### Scenario: Edit mode reveals management controls

- **GIVEN** the user toggles edit mode on in the binder viewer
- **WHEN** the header renders
- **THEN** the nickname becomes clickable for inline editing
- **AND** a delete button becomes visible in the header

---

## ADDED Requirements

### Requirement: Binder pages are fully available offline after online visit

The application SHALL make all pages of a binder available offline after the binder is opened while online, by fetching and persisting every page to IndexedDB in the background.

#### Scenario: User opens binder online and can later view all pages offline

- **GIVEN** a binder has N pages and was opened while online
- **WHEN** the device goes offline
- **THEN** all N pages are accessible in the binder without a network request

#### Scenario: Initial page is persisted to IndexedDB on mount

- **GIVEN** a binder is opened while online
- **WHEN** the BinderViewer mounts with server-rendered initial page data
- **THEN** that page data is written to IndexedDB immediately