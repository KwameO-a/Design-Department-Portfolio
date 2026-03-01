'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollTextFillProps {
  children: ReactNode;
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Active (filled) color */
  fillColor?: string;
  /** Inactive (faded) color */
  baseColor?: string;
  /** Extra className */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
  /** Whether to only animate once */
  once?: boolean;
}

/**
 * Scroll-driven text color fill animation.
 * Text starts in a faded color and progressively fills with a dark color
 * from left to right as the user scrolls the element through the viewport.
 * Uses background-clip: text technique — no framer-motion dependency.
 */
export default function ScrollTextFill({
  children,
  as: Tag = 'h2',
  fillColor = '#333',
  baseColor = 'rgba(0,0,0,0.15)',
  className = '',
  style,
  once = true,
}: ScrollTextFillProps) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      if (doneRef.current) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start filling when element top is 85% from top of viewport
      // Complete when element top is 35% from top of viewport
      const startThreshold = vh * 0.85;
      const endThreshold = vh * 0.35;
      const range = startThreshold - endThreshold;

      let p = 0;
      if (rect.top <= startThreshold && rect.top >= endThreshold) {
        p = (startThreshold - rect.top) / range;
      } else if (rect.top < endThreshold) {
        p = 1;
      }

      p = Math.max(0, Math.min(1, p));
      setProgress(p);

      if (p >= 1 && once) {
        doneRef.current = true;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Initial check
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [once]);

  const pct = `${(progress * 100).toFixed(1)}%`;

  const fillStyle: React.CSSProperties = {
    ...style,
    color: baseColor,
    backgroundImage: `linear-gradient(90deg, ${fillColor}, ${fillColor})`,
    backgroundSize: `${pct} 100%`,
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'background-size 0.08s linear',
  };

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={className} style={fillStyle}>
      {children}
    </Tag>
  );
}
