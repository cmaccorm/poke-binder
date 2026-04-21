"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { BinderIdentity } from "@/lib/types";
import BinderCard from "./BinderCard";
import CreateBinderDialog from "./CreateBinderDialog";

export default function Shelf() {
  const router = useRouter();
  const [binders, setBinders] = useState<BinderIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetchBinders = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/binders");
    const data = await res.json();
    setBinders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBinders();
  }, [fetchBinders]);

  const handleOpen = (binder: BinderIdentity) => {
    router.push(`/binder/${binder.id}?page=${binder.lastViewedPage}`);
  };

  return (
    <div className="pokeball-bg min-h-screen bg-poke-dark p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header with accent stripe */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-poke-white/80 bg-poke-red shadow-lg shadow-poke-red/20" />
            <h1 className="text-3xl font-bold tracking-tight text-poke-white">My Binders</h1>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 transition-all hover:bg-poke-red-hover hover:shadow-lg hover:shadow-poke-red/30"
          >
            + New Binder
          </button>
        </div>

        {/* Divider line */}
        <div className="mb-8 h-px bg-gradient-to-r from-poke-red/40 via-poke-gold/20 to-transparent" />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-poke-gold border-t-transparent" />
          </div>
        ) : binders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 h-16 w-16 rounded-full border-4 border-poke-slate/30 bg-poke-dark-surface" />
            <p className="mb-4 text-lg text-poke-slate">No binders yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 transition-all hover:bg-poke-red-hover"
            >
              Create your first binder
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {binders.map((binder) => (
              <BinderCard
                key={binder.id}
                binder={binder}
                onClick={() => handleOpen(binder)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateBinderDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={fetchBinders}
      />
    </div>
  );
}
