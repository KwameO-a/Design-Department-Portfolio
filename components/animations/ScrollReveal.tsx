'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element comes from */
  direction?: Direction;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Distance in pixels */
  distance?: number;
  /** Extra className for the wrapper */
  className?: string;
  /** Whether to animate only once */
  once?: boolean;
  /** Viewport margin for trigger */
  margin?: string;
}

const getVariants = (direction: Direction, distance: number): Variants => {
  const hidden: Record<string, number> = { opacity: 0 };
  if (direction === 'up') hidden.y = distance;
  if (direction === 'down') hidden.y = -distance;
  if (direction === 'left') hidden.x = distance;
  if (direction === 'right') hidden.x = -distance;

  return {
    hidden,
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = '',
  once = true,
  margin = '-80px',
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={getVariants(direction, distance)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
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
