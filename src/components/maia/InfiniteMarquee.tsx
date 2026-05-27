'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}

export default function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = '',
  gap = 'gap-6',
}: InfiniteMarqueeProps) {
  const id = useMemo(
    () => `mq-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const translateDir = direction === 'left' ? '-50%' : '50%';
  const cssKeyframes = `
    @keyframes mq-scroll-${id} {
      from { transform: translateX(0); }
      to { transform: translateX(${translateDir}); }
    }
    .mq-track-${id} {
      animation: mq-scroll-${id} ${speed}s linear infinite;
      display: flex;
      align-items: center;
      width: max-content;
      gap: 1.5rem;
    }
  `;

  const hoverCss = pauseOnHover
    ? `.mq-wrap-${id}:hover .mq-track-${id} { animation-play-state: paused; }`
    : '';

  return (
    <>
      <style>{cssKeyframes}{hoverCss}</style>
      <div className={`mq-wrap-${id} relative overflow-hidden ${className}`}>
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background via-background/70 to-transparent" />
        <div className={`mq-track-${id}`}>
          {children}
          <div style={{ display: 'flex', alignItems: 'center', width: 'max-content', gap: '1.5rem' }} aria-hidden>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
