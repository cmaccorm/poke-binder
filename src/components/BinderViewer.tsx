"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { BinderIdentity, BinderPage, BinderSlot, CardReference } from "@/lib/types";
import CardSearch from "./CardSearch";

interface BinderViewerProps {
  binder: BinderIdentity;
  initialPage: number;
  initialPageData: BinderPage | null;
}

export default function BinderViewer({ binder, initialPage, initialPageData }: BinderViewerProps) {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage);
  const [page, setPage] = useState<BinderPage | null>(initialPageData);
  const [loading, setLoading] = useState(!initialPageData);
  const [editMode, setEditMode] = useState(false);
  const [searchSlot, setSearchSlot] = useState<BinderSlot | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<BinderSlot | null>(null);

  // Preload cache for adjacent pages
  const pageCache = useRef<Map<number, BinderPage>>(new Map());

  // Debounced lastViewedPage persistence
  const lastViewedPageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPage = useCallback(
    async (pageIndex: number, useCache = true): Promise<BinderPage | null> => {
      if (useCache && pageCache.current.has(pageIndex)) {
        return pageCache.current.get(pageIndex)!;
      }

      const res = await fetch(
        `/api/binders/${binder.id}/pages/${pageIndex}`
      );
      if (!res.ok) return null;

      const data: BinderPage = await res.json();
      pageCache.current.set(pageIndex, data);
      return data;
    },
    [binder.id]
  );

  const loadPage = useCallback(
    async (pageIndex: number) => {
      setLoading(true);
      setSearchSlot(null);
      const data = await fetchPage(pageIndex);
      setPage(data);
      setCurrentPageIndex(pageIndex);
      setLoading(false);

      // Prefetch adjacent pages
      if (pageIndex > 0) fetchPage(pageIndex - 1);
      if (pageIndex < binder.pageCount - 1) fetchPage(pageIndex + 1);
    },
    [fetchPage, binder.pageCount]
  );

  useEffect(() => {
    if (initialPageData) {
      // Seed cache with server-provided data and prefetch adjacent pages
      pageCache.current.set(initialPage, initialPageData);
      if (initialPage > 0) fetchPage(initialPage - 1);
      if (initialPage < binder.pageCount - 1) fetchPage(initialPage + 1);
    } else {
      loadPage(initialPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce lastViewedPage updates — only persist after user settles for 500ms
  useEffect(() => {
    if (lastViewedPageTimer.current) {
      clearTimeout(lastViewedPageTimer.current);
    }
    lastViewedPageTimer.current = setTimeout(() => {
      // Trigger the page API to persist lastViewedPage as a side effect.
      // The response data is ignored — this is just for the write.
      fetch(`/api/binders/${binder.id}/pages/${currentPageIndex}`).catch(() => {
        // Fire-and-forget — ignore errors
      });
    }, 500);
    return () => {
      if (lastViewedPageTimer.current) {
        clearTimeout(lastViewedPageTimer.current);
      }
    };
  }, [currentPageIndex, binder.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchSlot || confirmRemove) return; // don't navigate during search/confirm
      if (e.key === "ArrowLeft" && currentPageIndex > 0) {
        loadPage(currentPageIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        currentPageIndex < binder.pageCount - 1
      ) {
        loadPage(currentPageIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPageIndex, binder.pageCount, loadPage, searchSlot, confirmRemove]);

  const handleSlotClick = (slot: BinderSlot) => {
    if (!editMode) return;

    if (slot.card) {
      setConfirmRemove(slot);
    } else {
      setSearchSlot(slot);
    }
  };

  const handleCardSelected = async (card: CardReference) => {
    if (!searchSlot) return;

    await fetch(`/api/binders/${binder.id}/slots/${searchSlot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catalogCardId: card.id }),
    });

    // Invalidate cache and reload
    pageCache.current.delete(currentPageIndex);
    setSearchSlot(null);
    await loadPage(currentPageIndex);
  };

  const handleConfirmRemove = async () => {
    if (!confirmRemove) return;

    await fetch(`/api/binders/${binder.id}/slots/${confirmRemove.id}`, {
      method: "DELETE",
    });

    pageCache.current.delete(currentPageIndex);
    setConfirmRemove(null);
    await loadPage(currentPageIndex);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-400 hover:text-white"
          >
            &larr; Shelf
          </button>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: binder.color }}
            />
            <h1 className="text-lg font-bold text-white">{binder.nickname}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Page {currentPageIndex + 1} / {binder.pageCount}
          </span>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              editMode
                ? "bg-amber-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {editMode ? "Editing" : "View"}
          </button>
        </div>
      </header>

      {/* Page content */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex items-center gap-4">
          {/* Previous page button */}
          <button
            onClick={() => currentPageIndex > 0 && loadPage(currentPageIndex - 1)}
            disabled={currentPageIndex === 0}
            className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:invisible"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page grid */}
          {loading ? (
            <div className="flex h-96 w-96 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : page ? (
            <div
              className="grid gap-2 rounded-xl bg-gray-700/50 p-4"
              style={{
                gridTemplateColumns: `repeat(${binder.layoutCols}, 1fr)`,
                gridTemplateRows: `repeat(${binder.layoutRows}, 1fr)`,
              }}
            >
              {page.slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  disabled={!editMode}
                  className={`relative flex h-44 w-32 items-center justify-center overflow-hidden rounded-lg border-2 transition-all ${
                    editMode
                      ? slot.card
                        ? "border-red-400/40 hover:border-red-400 cursor-pointer"
                        : "border-dashed border-green-400/40 hover:border-green-400 cursor-pointer"
                      : "border-white/10"
                  } ${slot.card ? "bg-white/5" : "bg-white/[0.02]"}`}
                >
                  {slot.card ? (
                    <img
                      src={slot.card.imageSmall}
                      alt={slot.card.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">
                      {editMode ? "+" : ""}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">Page not found</div>
          )}

          {/* Next page button */}
          <button
            onClick={() =>
              currentPageIndex < binder.pageCount - 1 &&
              loadPage(currentPageIndex + 1)
            }
            disabled={currentPageIndex >= binder.pageCount - 1}
            className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:invisible"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchSlot && (
        <CardSearch
          onSelect={handleCardSelected}
          onClose={() => setSearchSlot(null)}
        />
      )}

      {/* Remove confirmation */}
      {confirmRemove && confirmRemove.card && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <p className="mb-4 text-center text-gray-900">
              Are you sure you want to remove{" "}
              <strong>{confirmRemove.card.name}</strong>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
