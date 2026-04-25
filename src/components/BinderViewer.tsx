"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { BinderIdentity, BinderPage, BinderSlot, CardReference } from "@/lib/types";
import CardSearch from "./CardSearch";
import CardDetailModal from "./CardDetailModal";

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
  const [selectedCardDetail, setSelectedCardDetail] = useState<CardReference | null>(null);

  // Rename state
  const [nickname, setNickname] = useState(binder.nickname);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(binder.nickname);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Delete state
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    if (!editMode) {
      if (slot.card) {
        setSelectedCardDetail(slot.card);
      }
      return;
    }

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

  // Rename handlers
  const startRenaming = () => {
    setRenameValue(nickname);
    setIsRenaming(true);
    setTimeout(() => renameInputRef.current?.select(), 0);
  };

  const cancelRenaming = () => {
    setIsRenaming(false);
    setRenameValue(nickname);
  };

  const saveRename = async () => {
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === nickname) {
      cancelRenaming();
      return;
    }

    try {
      const res = await fetch(`/api/binders/${binder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: trimmed }),
      });
      if (res.ok) {
        setNickname(trimmed);
      }
    } catch {
      // Revert on failure
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveRename();
    } else if (e.key === "Escape") {
      cancelRenaming();
    }
  };

  // Delete handler
  const handleConfirmDelete = async () => {
    await fetch(`/api/binders/${binder.id}`, { method: "DELETE" });
    router.push("/");
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
    <div className="pokeball-bg flex min-h-screen flex-col bg-poke-dark">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-poke-white/10 bg-poke-dark-lighter px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-poke-slate hover:text-poke-white transition-colors"
          >
            &larr; Shelf
          </button>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border border-poke-white/30 shadow-sm"
              style={{ backgroundColor: binder.color }}
            />
            {isRenaming ? (
              <input
                ref={renameInputRef}
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={saveRename}
                onKeyDown={handleRenameKeyDown}
                className="rounded bg-poke-dark-surface px-2 py-0.5 text-lg font-bold text-poke-white outline-none ring-1 ring-poke-white/30 focus:ring-poke-gold"
              />
            ) : (
              <h1
                className={`text-lg font-bold text-poke-white ${editMode ? "cursor-pointer hover:text-poke-gold transition-colors" : ""}`}
                onClick={editMode ? startRenaming : undefined}
              >
                {nickname}
              </h1>
            )}
            {editMode && !isRenaming && (
              <button
                onClick={startRenaming}
                className="text-poke-slate hover:text-poke-gold transition-colors"
                title="Rename binder"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-poke-slate">
            Page {currentPageIndex + 1} / {binder.pageCount}
          </span>
          {editMode && (
            <button
              onClick={() => setConfirmDelete(true)}
              className="rounded-lg p-1.5 text-poke-slate hover:bg-poke-red/20 hover:text-poke-red transition-colors"
              title="Delete binder"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              editMode
                ? "bg-poke-gold text-poke-dark shadow-md shadow-poke-gold/20"
                : "bg-poke-dark-surface text-poke-slate hover:bg-poke-dark-surface/80 hover:text-poke-white"
            }`}
          >
            {editMode ? "Editing" : "View"}
          </button>
        </div>
      </header>

      {/* Page content */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex items-center gap-6">
          {/* Previous page button */}
          <button
            onClick={() => currentPageIndex > 0 && loadPage(currentPageIndex - 1)}
            disabled={currentPageIndex === 0}
            className="rounded-full p-2 text-poke-slate/60 hover:bg-poke-white/5 hover:text-poke-white disabled:invisible transition-colors"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page grid */}
          {loading ? (
            <div className="flex h-96 w-96 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-poke-gold border-t-transparent" />
            </div>
          ) : page ? (
            <div className="relative rounded-2xl vault-felt-bg p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),_0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/5 overflow-hidden">
              <div
                className="relative z-10 grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${binder.layoutCols}, 1fr)`,
                  gridTemplateRows: `repeat(${binder.layoutRows}, 1fr)`,
                }}
              >
                {page.slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    disabled={!editMode && !slot.card}
                    className={`relative flex aspect-[63/88] w-32 items-center justify-center rounded-b-lg rounded-t-sm border-x-2 border-b-2 border-t-0 transition-all shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),_0_2px_4px_rgba(0,0,0,0.5)] bg-vault-pocket ${
                      editMode
                        ? slot.card
                          ? "border-poke-red/40 hover:border-poke-red hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),_0_0_12px_rgba(220,38,38,0.2)] cursor-pointer"
                          : "border-dashed border-poke-gold/30 hover:border-poke-gold hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),_0_0_12px_rgba(255,215,0,0.2)] cursor-pointer"
                        : slot.card 
                          ? "border-black/80 hover:border-poke-white/30 hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),_0_0_12px_rgba(255,255,255,0.1)] cursor-pointer"
                          : "border-black/80"
                    }`}
                  >
                    {slot.card ? (
                      <div className="h-[96%] w-[96%] mt-1 flex items-center justify-center overflow-hidden rounded shadow-[0_0_10px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
                        <img
                          src={slot.card.imageSmall}
                          alt={slot.card.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <span className={`text-xs ${editMode ? "text-poke-gold/50" : "text-poke-slate/20"}`}>
                        {editMode ? "+" : ""}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-poke-slate">Page not found</div>
          )}

          {/* Next page button */}
          <button
            onClick={() =>
              currentPageIndex < binder.pageCount - 1 &&
              loadPage(currentPageIndex + 1)
            }
            disabled={currentPageIndex >= binder.pageCount - 1}
            className="rounded-full p-2 text-poke-slate/60 hover:bg-poke-white/5 hover:text-poke-white disabled:invisible transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm rounded-2xl border border-poke-white/10 bg-poke-dark-lighter p-6 shadow-2xl">
            <p className="mb-4 text-center text-poke-white">
              Are you sure you want to remove{" "}
              <strong className="text-poke-gold">{confirmRemove.card.name}</strong>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmRemove(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-poke-slate hover:bg-poke-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 hover:bg-poke-red-hover"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete binder confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm rounded-2xl border border-poke-white/10 bg-poke-dark-lighter p-6 shadow-2xl">
            <p className="mb-4 text-center text-poke-white">
              Are you sure you want to delete this binder?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-poke-slate hover:bg-poke-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 hover:bg-poke-red-hover"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card detail modal */}
      {selectedCardDetail && (
        <CardDetailModal
          externalId={selectedCardDetail.externalId}
          onClose={() => setSelectedCardDetail(null)}
        />
      )}
    </div>
  );
}
