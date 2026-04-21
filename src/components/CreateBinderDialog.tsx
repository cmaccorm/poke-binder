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

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { rows, cols } = BINDER_LAYOUTS[layout];

    await fetch("/api/binders", {
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

    setLoading(false);
    setNickname("");
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Create New Binder
        </h2>

        {/* Nickname */}
        <label className="mb-3 block">
          <span className="text-sm font-medium text-gray-700">Nickname</span>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. Main Set"
          />
        </label>

        {/* Color */}
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Color</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  color === c.value
                    ? "scale-110 border-gray-900"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Layout */}
        <label className="mb-3 block">
          <span className="text-sm font-medium text-gray-700">
            Page Layout
          </span>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as BinderLayoutKey)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="2x2">2x2 (4 cards per page)</option>
            <option value="3x3">3x3 (9 cards per page)</option>
            <option value="4x3">4x3 (12 cards per page)</option>
          </select>
        </label>

        {/* Page count */}
        <label className="mb-4 block">
          <span className="text-sm font-medium text-gray-700">
            Number of Pages
          </span>
          <input
            type="number"
            min={1}
            max={100}
            value={pageCount}
            onChange={(e) => setPageCount(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !nickname.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Binder"}
          </button>
        </div>
      </form>
    </div>
  );
}
