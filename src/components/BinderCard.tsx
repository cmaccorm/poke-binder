"use client";

import type { BinderIdentity } from "@/lib/types";
import { layoutKey } from "@/lib/layout";

interface BinderCardProps {
  binder: BinderIdentity;
  onClick: () => void;
}

export default function BinderCard({ binder, onClick }: BinderCardProps) {
  const layout = layoutKey(binder.layoutRows, binder.layoutCols) ?? "?";
  const filledInfo = `${binder.pageCount} pages`;

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-poke-gold/50 focus:ring-offset-2 focus:ring-offset-poke-dark"
    >
      {/* Binder spine visual */}
      <div
        className="relative flex h-48 w-36 flex-col items-center justify-between overflow-hidden rounded-lg border border-poke-white/20 p-3 shadow-lg transition-shadow group-hover:shadow-xl group-hover:shadow-black/30"
        style={{ backgroundColor: binder.color }}
      >
        {/* Subtle pokeball decoration on binder spine */}
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border-2 border-white/10 opacity-20" />
        <div className="absolute -right-4 -top-4 h-16 w-16">
          <div className="absolute top-1/2 h-px w-full bg-white/10" />
        </div>

        <span className="relative text-xs font-medium text-white/60">{layout}</span>
        <span className="relative text-center text-sm font-bold text-white drop-shadow-md">
          {binder.nickname}
        </span>
        <span className="relative text-xs text-white/50">{filledInfo}</span>
      </div>
    </button>
  );
}
