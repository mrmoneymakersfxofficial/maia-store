'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function Counter({
  target,
  duration = 3.5,
  prefix = '',
  suffix = '',
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    const startTime = performance.now();
    const stiffness = 60;
    const damping = 22;

    const springTick = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);

      const zeta = damping / (2 * Math.sqrt(stiffness));
      const omega = Math.sqrt(stiffness);
      const omegaD = omega * Math.sqrt(Math.abs(1 - zeta * zeta));
      const exponential = Math.exp(-zeta * omega * t);
      const springValue = (1 - exponential) * (1 + exponential * Math.cos(omegaD * t));

      const currentValue = Math.round(springValue * target);

      setCount(currentValue);

      if (t < 1 || currentValue < target) {
        requestAnimationFrame(springTick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(springTick);
  }, [isInView, hasAnimated, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('es-PE')}
      {suffix}
    </span>
  );
}