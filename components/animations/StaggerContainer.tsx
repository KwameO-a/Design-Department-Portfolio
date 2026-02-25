'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between children */
  stagger?: number;
  /** Initial delay */
  delay?: number;
  /** Wrapper className */
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={{ stagger, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
