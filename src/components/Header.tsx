const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomCharacter(): string {
  const index = Math.floor(Math.random() * CHAR_POOL.length);
  return CHAR_POOL[index];
}

export default function Header() {
  const randomChar = getRandomCharacter();

  return (
    <header className="w-full bg-[var(--poke-dark-lighter)] border-b border-[var(--poke-dark-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <h1
          className="text-2xl sm:text-3xl tracking-wide text-[var(--poke-gold)]"
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
    </header>
  );
}
