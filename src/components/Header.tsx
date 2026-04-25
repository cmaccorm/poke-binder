"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CreateBinderDialog from "./CreateBinderDialog";

const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomCharacter(): string {
  const index = Math.floor(Math.random() * CHAR_POOL.length);
  return CHAR_POOL[index];
}

export default function Header() {
  const [randomChar, setRandomChar] = useState<string>("");
  const pathname = usePathname();
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    setRandomChar(getRandomCharacter());
  }, []);

  const handleCreated = () => {
    window.dispatchEvent(new Event("bindersUpdated"));
  };

  return (
    <header className="w-full bg-[var(--poke-dark-lighter)] border-b border-[var(--poke-dark-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1
            className="text-2xl sm:text-3xl tracking-wide text-[var(--poke-red)] drop-shadow-[0_0_10px_var(--poke-red)]"
            style={{ fontFamily: "var(--font-pokemon-classic)" }}
          >
            poké-binder
          </h1>
          <span
            className="text-xl sm:text-2xl text-[var(--poke-white)] select-none"
            style={{ fontFamily: "var(--font-pokemon-pixels)" }}
            aria-hidden="true"
            title="Random decorative character"
          >
            {randomChar}
          </span>
        </div>

        {pathname === "/" && (
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-lg bg-poke-red px-4 py-2 text-sm font-semibold text-white shadow-md shadow-poke-red/25 transition-all hover:bg-poke-red-hover hover:shadow-lg hover:shadow-poke-red/30"
          >
            + New Binder
          </button>
        )}
      </div>

      <CreateBinderDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={handleCreated}
      />
    </header>
  );
}
