"use client";

import { useEffect, useState } from "react";
import type { PokemonTcgCard } from "@/lib/catalog";
import { VARIANT_MAP } from "@/lib/catalog";

const VARIANT_PRICE_KEY_MAP: Record<string, string> = {};
for (const [key, label] of Object.entries(VARIANT_MAP)) {
  VARIANT_PRICE_KEY_MAP[label] = key;
}

interface CardDetailModalProps {
  externalId: string;
  variant: string | null;
  onClose: () => void;
}

export default function CardDetailModal({ externalId, variant, onClose }: CardDetailModalProps) {
  const [card, setCard] = useState<PokemonTcgCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCard() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/catalog/card/${encodeURIComponent(externalId)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCard(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [externalId]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  let priceDisplay: string;
  if (variant) {
    const priceKey = VARIANT_PRICE_KEY_MAP[variant];
    const prices = card?.tcgplayer?.prices;
    if (priceKey && prices) {
      const p = (prices as Record<string, { market: number } | undefined>)[priceKey];
      priceDisplay = p ? `$${p.market.toFixed(2)}` : "N/A";
    } else {
      priceDisplay = "N/A";
    }
  } else {
    const fallbackPrice = card?.tcgplayer?.prices?.normal?.market || 
                          card?.tcgplayer?.prices?.holofoil?.market || 
                          card?.tcgplayer?.prices?.reverseHolofoil?.market || 
                          card?.tcgplayer?.prices?.["1stEditionHolofoil"]?.market;
    priceDisplay = fallbackPrice ? `$${fallbackPrice.toFixed(2)}` : "N/A";
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative flex w-full max-h-[95vh] sm:max-h-[90vh] sm:max-w-4xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-poke-white/10 bg-poke-dark shadow-2xl md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-poke-dark-lighter/80 text-poke-slate hover:bg-poke-white/10 hover:text-poke-white transition-colors active:scale-95"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-poke-gold border-t-transparent" />
          </div>
        ) : error || !card ? (
          <div className="flex h-96 w-full flex-col items-center justify-center text-poke-slate">
            <svg className="mb-4 h-12 w-12 text-poke-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Failed to load card details.</p>
          </div>
        ) : (
          <>
            {/* Image Section */}
            <div className="flex w-full items-center justify-center bg-black/40 p-3 sm:p-8 md:w-1/2">
              <div className="relative aspect-[63/88] w-full max-w-[200px] sm:max-w-sm drop-shadow-2xl">
                <img
                  src={card.images.large || card.images.small}
                  alt={card.name}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Info Section */}
            <div
              className="flex w-full flex-col justify-start p-4 sm:p-8 md:w-1/2 overflow-y-auto overscroll-y-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="mb-2 flex items-center gap-2 sm:gap-3 flex-wrap">
                <h2 className="text-xl sm:text-3xl font-bold text-poke-white font-pokemon-classic tracking-wider">{card.name}</h2>
                <span className="rounded bg-poke-dark-lighter px-2 py-1 text-sm font-bold text-poke-slate border border-white/10">
                  {card.number}
                </span>
                {variant && (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-poke-gold/15 px-2 py-0.5 text-[10px] font-medium text-poke-gold">
                    {variant}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:mb-8">
                <span className="text-xl sm:text-2xl font-bold text-poke-gold">{priceDisplay}</span>
                <span className="ml-2 text-sm text-poke-slate">TCGPlayer Market</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase text-poke-slate/70">Set</h3>
                  <p className="text-lg text-poke-white">{card.set?.name || "~"}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold uppercase text-poke-slate/70">Rarity</h3>
                  <p className="text-lg text-poke-white">{card.rarity || "~"}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold uppercase text-poke-slate/70">Types</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {card.types && card.types.length > 0 ? (
                      card.types.map(t => (
                        <span key={t} className="rounded-full bg-poke-dark-lighter px-3 py-1 text-sm font-medium text-poke-white border border-white/5">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-lg text-poke-white">~</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase text-poke-slate/70">Artist</h3>
                  <p className="text-lg text-poke-white">{card.artist || "~"}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
