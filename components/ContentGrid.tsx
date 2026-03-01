// components/ContentGrid.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ContentItem {
  label: string;
  href?: string;
}

interface ContentGridProps {
  items: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ items }) => {
  const [morphed, setMorphed] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setMorphed(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease-in-out"
      style={{ padding: morphed ? '10px 16px' : '0' }}
    >
      <div
        className="mx-auto flex items-center transition-all duration-[400ms] ease-in-out"
        style={{
          maxWidth: morphed ? '800px' : '100%',
          borderRadius: morphed ? '9999px' : '0px',
          backgroundColor: morphed
            ? 'rgba(13, 43, 43, 0.75)'
            : 'transparent',
          backdropFilter: morphed ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: morphed ? 'blur(16px)' : 'none',
          border: morphed
            ? '1px solid rgba(139, 107, 82, 0.3)'
            : '1px solid transparent',
          boxShadow: morphed
            ? '0 4px 24px rgba(0, 0, 0, 0.25)'
            : 'none',
          padding: morphed ? '6px 16px' : '16px 24px',
        }}
      >
        {/* Logo (left – hidden on mobile to give pills full width) */}
        <Link
          href="/"
          aria-label="Home"
          className="hidden md:inline-flex shrink-0 items-center mr-auto"
        >
          <Image
            src="/images/Logo.png"
            alt="Design Department"
            width={280}
            height={140}
            priority
            className="w-auto transition-all duration-[400ms]"
            style={{ height: morphed ? '28px' : '44px' }}
          />
        </Link>

        {/* Nav pill links (right) */}
        <div
          className={[
            'flex items-center',
            'gap-2 md:gap-3',
            'overflow-x-auto md:overflow-visible',
            'whitespace-nowrap',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          ].join(' ')}
        >
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              className={[
                'shrink-0 inline-flex items-center justify-center',
                'rounded-full border',
                'font-semibold text-center',
                'transition-all duration-[400ms]',
                'md:hover:-translate-y-0.5 md:hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52] focus-visible:ring-offset-2',
                'focus-visible:ring-offset-[#0D2B2B]',
              ].join(' ')}
              style={{
                borderColor: '#8B6B52',
                color: '#8B6B52',
                backgroundColor: 'transparent',
                padding: morphed ? '4px 12px' : '6px 18px',
                fontSize: morphed ? '11px' : '13px',
                transition: 'all 400ms ease-in-out',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ContentGrid;
