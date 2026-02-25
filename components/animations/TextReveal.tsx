'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  /** Delay before starting */
  delay?: number;
  /** Extra className */
  className?: string;
  /** HTML tag to render — rendered as motion.div with semantic role */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Style object */
  style?: React.CSSProperties;
  /** Animation type */
  variant?: 'fade-up' | 'slide-up' | 'blur';
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  'fade-up': {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'h2',
  style,
  variant = 'fade-up',
}: TextRevealProps) {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');
  const chosen = wordVariants[variant];

  if (!text) {
    // Fallback: wrap in the semantic tag, animate with motion.div
    return (
      <Tag className={className} style={style}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block' }}
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag style={style}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={delay}
        className={className}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={chosen} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
