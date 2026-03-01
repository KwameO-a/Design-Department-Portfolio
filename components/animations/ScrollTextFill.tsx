'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Parse a hex color like "#8b6b52" to rgba(r,g,b,alpha) */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface ScrollTextFillProps {
  children: ReactNode;
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Active (filled) color — hex string like "#8b6b52" */
  fillColor?: string;
  /** Inactive (faded) color — auto-computed from fillColor at 20% opacity if omitted */
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
 * Text starts in a faded gray of the fill color and progressively fills
 * from left to right as the user scrolls the element through the viewport.
 * Uses background-clip: text technique — no framer-motion dependency.
 */
export default function ScrollTextFill({
  children,
  as: Tag = 'h2',
  fillColor = '#333',
  baseColor,
  className = '',
  style,
  once = true,
}: ScrollTextFillProps) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  // Auto-compute a faded version of the fill color if no baseColor supplied
  const computedBase = baseColor ?? hexToRgba(fillColor, 0.2);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      if (doneRef.current) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start filling when element enters viewport at the bottom edge
      // Complete when element reaches the upper third of the viewport
      // Wider range = slower, more gradual fill
      const startThreshold = vh * 1.0;
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
    color: computedBase,
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
