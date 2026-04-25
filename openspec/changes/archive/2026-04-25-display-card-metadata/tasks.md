## 1. API Endpoint

- [x] 1.1 Create new `/api/catalog/card/[id]` route file
- [x] 1.2 Implement `getCardById` function in `catalog.ts` that fetches single card from PokéTCG API
- [x] 1.3 Add caching for single card lookups in `catalog.ts`

## 2. Card Detail Modal Component

- [x] 2.1 Create new `CardDetailModal.tsx` component
- [x] 2.2 Display card image (large) in the modal
- [x] 2.3 Display card name prominently
- [x] 2.4 Display TCGPlayer price (or N/~ if unavailable)
- [x] 2.5 Display rarity, set name, types, and artist
- [x] 2.6 Add close on overlay click
- [x] 2.7 Add close on Escape key

## 3. BinderViewer Integration

- [x] 3.1 Add state for selected card detail: `const [selectedCardDetail, setSelectedCardDetail] = useState<CardReference | null>(null)`
- [x] 3.2 Update `handleSlotClick` to open detail modal in view mode when slot has a card
- [x] 3.3 Render `<CardDetailModal>` when `selectedCardDetail` is set
- [x] 3.4 Add close handler to clear `selectedCardDetail`

## 4. Testing

- [x] 4.1 Test clicking a card in view mode opens modal
- [x] 4.2 Test modal displays all metadata fields
- [x] 4.3 Test modal closes on overlay click
- [x] 4.4 Test modal closes on Escape
- [x] 4.5 Verify click in edit mode still shows remove confirmation