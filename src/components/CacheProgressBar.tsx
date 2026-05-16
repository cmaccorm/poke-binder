'use client';

import { useEffect, useState } from 'react';

interface CacheProgressBarProps {
  readonly completed: number;
  readonly total: number;
  readonly isWarming: boolean;
}

export default function CacheProgressBar({
  completed,
  total,
  isWarming,
}: CacheProgressBarProps) {
  const [visible, setVisible] = useState(isWarming);

  useEffect(() => {
    if (isWarming) {
      const showTimer = globalThis.setTimeout(() => setVisible(true), 0);
      return () => globalThis.clearTimeout(showTimer);
    }

    const hideTimer = globalThis.setTimeout(() => setVisible(false), 750);
    return () => globalThis.clearTimeout(hideTimer);
  }, [isWarming]);

  if (!visible) return null;

  const percent = total > 0 ? (completed / total) * 100 : 0;
  const label = `Caching images for offline: ${completed} of ${total}`;

  return (
    <progress
      value={completed}
      max={total}
      aria-label={label}
      style={{
        display: 'block',
        height: '3px',
        width: '100%',
        backgroundColor: 'var(--poke-dark-surface, #1a1a2e)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'opacity 0.75s ease-out',
        opacity: isWarming ? 1 : 0,
        border: 'none',
        appearance: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${percent}%`,
          backgroundColor: 'var(--poke-gold, #f0c020)',
          transition: 'width 0.3s ease-out',
        }}
      />
    </progress>
  );
}
