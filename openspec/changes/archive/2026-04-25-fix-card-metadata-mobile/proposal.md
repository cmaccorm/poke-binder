## Why

On mobile devices, when viewing a card in the detail modal, users can scroll to see the price but the scroll bounce effect causes the screen to bounce back and conceal the price. The price field is at the bottom of the scrollable content area, and when users scroll up to view it and release, the spring-back animation scrolls it back out of view. This makes it impossible to see the price on any mobile device (Android, iOS).

## What Changes

- Fix iOS scroll bounce behavior in the mobile card detail modal so content stays in place
- Ensure price field is always visible/accessible on mobile
- Evaluate moving price higher in the modal layout for better mobile UX

### New Capabilities

- `mobile-modal-scroll-fix`: Fix scroll bounce to keep price visible on mobile

### Modified Capabilities

- None - this is a bug fix for existing card detail view behavior

## Impact

- **Files**: `src/components/CardDetailModal.tsx`
- **UI**: Mobile card detail modal scroll behavior