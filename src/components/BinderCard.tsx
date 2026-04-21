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
      className="group flex flex-col items-center gap-2 rounded-xl p-4 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ ["--binder-color" as string]: binder.color }}
    >
      {/* Binder spine visual */}
      <div
        className="flex h-48 w-36 flex-col items-center justify-between rounded-lg border-2 border-white/20 p-3 shadow-lg transition-shadow group-hover:shadow-xl"
        style={{ backgroundColor: binder.color }}
      >
        <span className="text-xs font-medium text-white/70">{layout}</span>
        <span className="text-center text-sm font-bold text-white drop-shadow">
          {binder.nickname}
        </span>
        <span className="text-xs text-white/60">{filledInfo}</span>
      </div>
    </button>
  );
}
