"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { BinderIdentity } from "@/lib/types";
import BinderCard from "./BinderCard";

export default function Shelf() {
  const router = useRouter();
  const [binders, setBinders] = useState<BinderIdentity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBinders = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/binders");
    const data = await res.json();
    setBinders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBinders();
    
    // Listen for updates from the Header's CreateBinderDialog
    const handleUpdate = () => fetchBinders();
    window.addEventListener("bindersUpdated", handleUpdate);
    return () => window.removeEventListener("bindersUpdated", handleUpdate);
  }, [fetchBinders]);

  const handleOpen = (binder: BinderIdentity) => {
    router.push(`/binder/${binder.id}?page=${binder.lastViewedPage}`);
  };

  return (
    <div className="pokeball-bg min-h-screen bg-poke-dark p-8">
      <div className="mx-auto max-w-5xl mt-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-poke-gold border-t-transparent" />
          </div>
        ) : binders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 h-16 w-16 rounded-full border-4 border-poke-slate/30 bg-poke-dark-surface" />
            <p className="mb-4 text-lg text-poke-slate">No binders yet</p>
            <p className="text-sm text-poke-slate/70">
              Click <strong className="text-poke-white">+ New Binder</strong> in the header to get started
            </p>
          </div>
        ) : (
          <div className="recessed-shelf">
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
    </div>
  );
}
