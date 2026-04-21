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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Binders</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + New Binder
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : binders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="mb-4 text-lg">No binders yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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
