## ADDED Requirements

### Requirement: Inline binder rendering when offline
When the user is offline and clicks a binder on the shelf, the system SHALL render the `BinderViewer` component inline within the shelf page using cached IndexedDB data, without performing any server navigation or RSC payload fetch.

#### Scenario: Open a cached binder while offline
- **WHEN** the user is offline and clicks a binder that has cached page data in IndexedDB
- **THEN** the shelf view is replaced by the `BinderViewer` displaying the binder's last viewed page from IndexedDB cache

#### Scenario: Open an uncached binder while offline
- **WHEN** the user is offline and clicks a binder that has no cached page data in IndexedDB
- **THEN** the `BinderViewer` renders with its existing 'offline unavailable' state for the page content

#### Scenario: Online navigation is unchanged
- **WHEN** the user is online and clicks a binder on the shelf
- **THEN** the system navigates to `/binder/[id]` via `router.push()` as before

### Requirement: Back navigation from inline offline viewer
When `BinderViewer` is rendered inline on the shelf (offline mode), the system SHALL provide a way to return to the shelf binder list without triggering server-dependent navigation.

#### Scenario: Return to shelf from inline offline binder
- **WHEN** the user clicks the back/home button in the inline offline `BinderViewer`
- **THEN** the `BinderViewer` unmounts and the shelf binder list is displayed again

#### Scenario: Back navigation in online mode is unchanged
- **WHEN** the user clicks the back/home button in `BinderViewer` during normal online usage (server-rendered route)
- **THEN** the system navigates to `/` via `router.push('/')` as before

### Requirement: BinderViewer onBack callback prop
`BinderViewer` SHALL accept an optional `onBack` callback prop. When provided, the back/home button SHALL call `onBack()` instead of `router.push('/')`.

#### Scenario: onBack prop provided
- **WHEN** `BinderViewer` is rendered with an `onBack` callback and the user clicks the back/home button
- **THEN** the `onBack` callback is invoked and `router.push('/')` is not called

#### Scenario: onBack prop not provided
- **WHEN** `BinderViewer` is rendered without an `onBack` prop and the user clicks the back/home button
- **THEN** `router.push('/')` is called as the default behavior

### Requirement: Service worker navigation fallback for binder routes
The service worker SHALL intercept navigation requests (`mode === 'navigate'`) to `/binder/*` paths and use a network-first strategy. On network failure, it SHALL respond with the cached `/` HTML shell.

#### Scenario: Online navigation to binder route
- **WHEN** a navigation request is made to `/binder/[id]` and the network is available
- **THEN** the service worker serves the network response

#### Scenario: Offline navigation to binder route (e.g. browser refresh)
- **WHEN** a navigation request is made to `/binder/[id]` and the network is unavailable
- **THEN** the service worker responds with the cached `/` HTML shell, and the user lands on the shelf page which loads cached binders from IndexedDB

#### Scenario: Static asset requests are unaffected
- **WHEN** a non-navigation request is made to a `/_next/static/*` path
- **THEN** the existing cache-first strategy continues to apply regardless of this change