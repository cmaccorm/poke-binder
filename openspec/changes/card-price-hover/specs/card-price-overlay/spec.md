## ADDED Requirements

### Requirement: Price overlay on card hover
The system SHALL display a price overlay when the user hovers over a filled card slot in the binder grid. The overlay SHALL dim the card image and display the card's cached market price centered on the card.

#### Scenario: Card has a cached TCGPlayer price
- **WHEN** the user hovers over a filled slot whose card has a `priceTcgplayer` value
- **THEN** the card image dims and the TCGPlayer market price is displayed in USD format (e.g., "$12.34") centered over the card

#### Scenario: Card has only a cached Cardmarket price
- **WHEN** the user hovers over a filled slot whose card has no `priceTcgplayer` but has a `priceCardmarket` value
- **THEN** the card image dims and the Cardmarket price is displayed in USD format centered over the card

#### Scenario: Card has no cached price
- **WHEN** the user hovers over a filled slot whose card has neither `priceTcgplayer` nor `priceCardmarket`
- **THEN** no price overlay is shown and the card image does not dim

#### Scenario: Empty slot hover
- **WHEN** the user hovers over an empty slot
- **THEN** no price overlay is shown

### Requirement: Price data included in page response
The system SHALL include `priceTcgplayer` and `priceCardmarket` fields in the slot data returned by `getBinderPage()` so that prices are available for rendering without additional API calls.

#### Scenario: Page load includes price fields
- **WHEN** a binder page is loaded
- **THEN** each slot with a card SHALL include the card's `priceTcgplayer` and `priceCardmarket` values (which may be null)
