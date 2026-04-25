## ADDED Requirements

### Requirement: Service worker registers on app load
The application MUST register a service worker on initial page load that caches the app shell (HTML, JavaScript, CSS, and font assets) for offline use.

#### Scenario: First visit caches the app shell
- **WHEN** a user visits the application for the first time
- **THEN** a service worker is registered and begins caching app shell assets
- **AND** subsequent visits load the app shell from the SW cache when the network is unavailable

#### Scenario: App shell loads offline
- **WHEN** the user opens the application with no network connection
- **AND** the service worker has previously cached the app shell
- **THEN** the application shell (layout, navigation, styles) renders without network access

### Requirement: Service worker caches card images
The service worker MUST intercept fetch requests for card images from `images.pokemontcg.io` and cache responses using the Cache API with a cache-first strategy.

#### Scenario: Card image is cached on first view
- **WHEN** a card image is loaded from `images.pokemontcg.io`
- **THEN** the service worker caches the response
- **AND** subsequent requests for the same image are served from cache without a network request

#### Scenario: Cached images display offline
- **WHEN** the user views a binder page while offline
- **AND** the card images on that page were previously cached
- **THEN** all previously-cached card images render correctly

### Requirement: Service worker updates gracefully
The service worker MUST use `skipWaiting` and `clientsClaim` to activate updated versions promptly, ensuring users do not get stuck on a stale app shell.

#### Scenario: Updated service worker activates
- **WHEN** a new version of the service worker is deployed
- **AND** the user refreshes the page
- **THEN** the new service worker takes control without requiring a manual cache clear
