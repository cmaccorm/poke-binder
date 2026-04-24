"use client";

import { useState } from "react";
import { BINDER_LAYOUTS, type BinderLayoutKey } from "@/lib/types";

const COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#22C55E" },
  { name: "Purple", value: "#A855F7" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Black", value: "#1F2937" },
  { name: "Teal", value: "#14B8A6" },
];

interface CreateBinderDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateBinderDialog({
  open,
  onClose,
  onCreated,
}: CreateBinderDialogProps) {
  const [nickname, setNickname] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [layout, setLayout] = useState<BinderLayoutKey>("3x3");
  const [pageCount, setPageCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { rows, cols } = BINDER_LAYOUTS[layout];

    try {
      const res = await fetch("/api/binders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname,
          color,
          layoutRows: rows,
          layoutCols: cols,
          pageCount,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create binder");
      }

      setNickname("");
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-poke-white/10 bg-poke-dark-lighter p-6 shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-bold text-poke-white">
          Create New Binder
        </h2>

        {/* Nickname */}
        <label className="mb-3 block">
          <span className="text-sm font-medium text-poke-slate">Nickname</span>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-poke-white/10 bg-poke-dark-surface px-3 py-2 text-poke-white placeholder-poke-slate/50 focus:border-poke-gold focus:outline-none focus:ring-1 focus:ring-poke-gold"
            placeholder="e.g. Main Set"
          />
        </label>

        {/* Color */}
        <div className="mb-3">
          <span className="text-sm font-medium text-poke-slate">Color</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  color === c.value
                    ? "scale-110 border-poke-gold shadow-md shadow-poke-gold/20"
                    : "border-poke-white/10 hover:scale-105 hover:border-poke-white/30"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Layout */}
        <label className="mb-3 block">
          <span className="text-sm font-medium text-poke-slate">
            Page Layout
          </span>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as BinderLayoutKey)}
            className="mt-1 block w-full rounded-lg border border-poke-white/10 bg-poke-dark-surface px-3 py-2 text-poke-white focus:border-poke-gold focus:outline-none focus:ring-1 focus:ring-poke-gold"
          >
            <option value="2x2">2x2 (4 cards per page)</option>
            <option value="3x3">3x3 (9 cards per page)</option>
            <option value="4x3">4x3 (12 cards per page)</option>
          </select>
        </label>

        {/* Page count */}
        <label className="mb-4 block">
          <span className="text-sm font-medium text-poke-slate">
            Number of Pages
          </span>
          <input
            type="number"
            min={1}
            max={100}
            value={pageCount}
            onChange={(e) => setPageCount(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-poke-white/10 bg-poke-dark-surface px-3 py-2 text-poke-white focus:border-poke-gold focus:outline-none focus:ring-1 focus:ring-poke-gold"
          />
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-poke-slate hover:bg-poke-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !nickname.trim()}
            className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 hover:bg-poke-red-hover disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Binder"}
          </button>
        </div>
      </form>
    </div>
  );
}
