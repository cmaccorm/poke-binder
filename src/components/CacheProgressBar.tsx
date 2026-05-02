'use client';

import { useEffect, useRef } from 'react';

interface CacheProgressBarProps {
  completed: number;
  total: number;
  isWarming: boolean;
}

export default function CacheProgressBar({
  completed,
  total,
  isWarming,
}: CacheProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const wasWarmingRef = useRef(false);

  useEffect(() => {
    if (!isWarming && wasWarmingRef.current && barRef.current) {
      barRef.current.style.opacity = '0';
      const bar = barRef.current;
      setTimeout(() => {
        bar.style.display = 'none';
      }, 750);
    }
    wasWarmingRef.current = isWarming;

    if (isWarming && barRef.current) {
      barRef.current.style.display = '';
      barRef.current.style.opacity = '1';
    }
  }, [isWarming]);

  if (!isWarming && !wasWarmingRef.current) return null;

  const percent = total > 0 ? (completed / total) * 100 : 0;
  const label = `Caching images for offline: ${completed} of ${total}`;

  return (
    <div
      ref={barRef}
      role='progressbar'
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={label}
      style={{
        display: '',
        height: '3px',
        width: '100%',
        backgroundColor: 'var(--poke-dark-surface, #1a1a2e)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'opacity 0.75s ease-out',
        opacity: 1,
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
    </div>
  );
}