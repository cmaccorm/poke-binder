## 1. Fix Mobile Scroll Bounce

- [x] 1.1 Add `overscroll-behavior-y: contain` to scroll container in modal
- [x] 1.2 Add `-webkit-overflow-scrolling: touch` for native momentum scrolling
- [x] 1.3 Verify scroll bounce is disabled on mobile

## 2. Improve Mobile Layout (Optional)

- [x] 2.1 Consider moving price higher in mobile layout
- [x] 2.2 Ensure price is above the fold on small viewports if possible
- [x] 2.3 Test on small mobile screens (iPhone SE / mini)

## 3. Testing & Verification

- [x] 3.1 Test on mobile - scroll up to price and release, verify stays in place
- [x] 3.2 Test on mobile - scroll to bottom and release, verify stays in place
- [x] 3.3 Test on mobile - flick gesture for momentum scroll
- [x] 3.4 Run lint and verify no errors