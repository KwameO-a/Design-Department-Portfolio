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
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-[400ms] ease-in-out"
      style={{
        backgroundColor: scrolled
          ? 'rgba(13, 43, 43, 0.75)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(139, 107, 82, 0.3)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 24px rgba(0, 0, 0, 0.25)'
          : 'none',
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center px-4 md:px-6 transition-all duration-[400ms]"
        style={{ height: scrolled ? '56px' : '72px' }}
      >
        {/* Pill nav links (left) */}
        <div
          className={[
            'flex items-center min-w-0',
            'gap-2 md:gap-4',
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
                'transition-all duration-200',
                'md:hover:-translate-y-0.5 md:hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52] focus-visible:ring-offset-2',
                'focus-visible:ring-offset-[#0D2B2B]',
              ].join(' ')}
              style={{
                borderColor: '#8B6B52',
                color: '#8B6B52',
                backgroundColor: 'transparent',
                padding: scrolled ? '5px 14px' : '6px 18px',
                fontSize: scrolled ? '12px' : '13px',
                transition: 'all 400ms ease-in-out',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Logo (right – hidden on mobile to give pills full width) */}
        <Link
          href="/"
          aria-label="Home"
          className="ml-auto hidden md:inline-flex shrink-0 items-center pl-3"
        >
          <Image
            src="/images/Logo.png"
            alt="Design Department"
            width={280}
            height={140}
            priority
            className="w-auto transition-all duration-[400ms]"
            style={{ height: scrolled ? '36px' : '48px' }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default ContentGrid;
