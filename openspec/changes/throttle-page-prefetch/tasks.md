## 1. Implement Throttled Caching Loop

- [x] 1.1 Replace the `Promise.allSettled(missingPages.map(fetchPage))` block in `BinderViewer.tsx` with a throttled loop that fetches at most 2 pages concurrently with 100ms delay between batches
- [x] 1.2 Sort missing pages by proximity to `initialPage` (ascending distance) before enqueueing
- [x] 1.3 Add a `cancelledRef` (or use an AbortController) to stop the caching loop on component unmount — wire it into the `useEffect` cleanup function

## 2. Verify

- [x] 2.1 Run `npm run build` to confirm no type or build errors
- [ ] 2.2 Manually test: open a binder with many pages, confirm "Caching for offline..." appears and completes without 500 errors in the network tab
