// components/ContentGrid.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ContentItem {
  label: string;
  href?: string;
}

interface ContentGridProps {
  items: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ items }) => {
  const [morphed, setMorphed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // When the sentinel scrolls out of view, the nav is stuck → morph
    const obs = new IntersectionObserver(
      ([entry]) => setMorphed(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Invisible sentinel — when it leaves viewport, nav is "stuck" */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden />

      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-50 transition-all duration-[400ms] ease-in-out"
        style={{
          // Outer wrapper: always full-width so the morph padding works
          padding: morphed ? '10px 16px' : '0 0',
        }}
      >
        <div
          className="mx-auto transition-all duration-[400ms] ease-in-out"
          style={{
            maxWidth: morphed ? '720px' : '100%',
            borderRadius: morphed ? '9999px' : '0px',
            backgroundColor: morphed
              ? 'rgba(13, 43, 43, 0.75)'
              : '#0D2B2B',
            backdropFilter: morphed ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: morphed ? 'blur(16px)' : 'none',
            border: morphed
              ? '1px solid rgba(139, 107, 82, 0.3)'
              : '1px solid transparent',
            boxShadow: morphed
              ? '0 4px 24px rgba(0, 0, 0, 0.25)'
              : 'none',
            padding: morphed ? '8px 12px' : '12px 16px',
          }}
        >
          <div
            className={[
              'flex w-full items-center',
              'gap-3 md:gap-5',
              'justify-start md:justify-center',
              'overflow-x-auto md:overflow-visible',
              'whitespace-nowrap',
              '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
              'scroll-px-4',
            ].join(' ')}
          >
            {items.map(({ label, href = '#' }, idx) => (
              <a
                key={idx}
                href={href}
                className={[
                  'shrink-0 inline-flex items-center justify-center',
                  'rounded-full border',
                  'text-sm font-semibold text-center',
                  'transition-all duration-200',
                  'md:hover:-translate-y-0.5 md:hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[#0D2B2B]',
                ].join(' ')}
                style={{
                  borderColor: '#8B6B52',
                  color: '#8B6B52',
                  backgroundColor: 'transparent',
                  padding: morphed ? '6px 16px' : '8px 24px',
                  fontSize: morphed ? '13px' : '14px',
                  transition: 'all 400ms ease-in-out',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default ContentGrid;
