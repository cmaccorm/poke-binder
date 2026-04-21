"use client";

import { useState, useEffect, useRef } from "react";
import type { CardReference } from "@/lib/types";

interface CardSearchProps {
  onSelect: (card: CardReference) => void;
  onClose: () => void;
}

export default function CardSearch({ onSelect, onClose }: CardSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CardReference[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/catalog/search?q=${encodeURIComponent(query.trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch {
        // Silently fail search
      }
      setLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-2xl bg-white p-4 shadow-2xl sm:rounded-2xl">
        {/* Search input */}
        <div className="mb-3 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by card name or number..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : results.length === 0 && query.trim() ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No results found
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {results.map((card) => (
                <button
                  key={card.id}
                  onClick={() => onSelect(card)}
                  className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-gray-100"
                >
                  <img
                    src={card.imageSmall}
                    alt={card.name}
                    className="h-16 w-12 rounded object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {card.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {card.number} &middot; {card.setName}
                    </p>
                    {card.rarity && (
                      <p className="text-xs text-gray-400">{card.rarity}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
