## MODIFIED Requirements

### Requirement: Service worker caches card images
The service worker MUST intercept fetch requests for card images from `images.pokemontcg.io` and `images.production.sportscardinvestor.com` and cache responses using the Cache API with a cache-first strategy.

#### Scenario: Card image from pokemontcg.io is cached on first view
- **WHEN** a card image is loaded from `images.pokemontcg.io`
- **THEN** the service worker caches the response
- **AND** subsequent requests for the same image are served from cache without a network request

#### Scenario: Card image from sportscardinvestor.com is cached on first view
- **WHEN** a card image is loaded from `images.production.sportscardinvestor.com`
- **THEN** the service worker caches the response in the same image cache
- **AND** subsequent requests for the same image are served from cache without a network request

#### Scenario: Cached images from both hosts display offline
- **WHEN** the user views a binder page while offline
- **AND** the card images on that page were previously cached (from either host)
- **THEN** all previously-cached card images render correctly
