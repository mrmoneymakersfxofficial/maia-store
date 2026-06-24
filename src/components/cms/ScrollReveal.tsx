'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade' | 'zoom-in';

const animations: Record<AnimationType, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  staggerDelay?: number;
}

/* Wrapper: uses staggerChildren if staggerDelay is provided */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
  staggerDelay,
}: ScrollRevealProps) {
  const variant = animations[animation];

  const staggerContainer: Variants | undefined = staggerDelay
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : undefined;

  const staggerItem: Variants | undefined = staggerDelay
    ? {
        hidden: variant.hidden,
        visible: {
          ...(typeof variant.visible === 'object' ? variant.visible : { opacity: 1, y: 0 }),
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }
    : undefined;

  if (staggerDelay) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-60px' }}
        variants={staggerContainer}
        className={className}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={staggerItem}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={staggerItem}>{children}</motion.div>
        }
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}