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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-t-2xl border border-poke-white/10 bg-poke-dark-lighter p-4 shadow-2xl sm:rounded-2xl">
        {/* Search input */}
        <div className="mb-3 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by card name or number..."
            className="flex-1 rounded-lg border border-poke-white/10 bg-poke-dark-surface px-3 py-2 text-poke-white placeholder-poke-slate/50 focus:border-poke-gold focus:outline-none focus:ring-1 focus:ring-poke-gold"
          />
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-poke-slate hover:bg-poke-white/5"
          >
            Cancel
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-poke-gold border-t-transparent" />
            </div>
          ) : results.length === 0 && query.trim() ? (
            <p className="py-8 text-center text-sm text-poke-slate/60">
              No results found
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {results.map((card) => (
                <button
                  key={card.id}
                  onClick={() => onSelect(card)}
                  className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-poke-white/5 transition-colors"
                >
                  <div className="flex h-16 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-poke-dark-surface">
                    <img
                      src={card.imageSmall}
                      alt={card.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-poke-white">
                      {card.name}
                    </p>
                    <p className="text-xs text-poke-slate">
                      {card.number} &middot; {card.setName}
                    </p>
                    {card.rarity && (
                      <p className="text-xs text-poke-gold/60">{card.rarity}</p>
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
