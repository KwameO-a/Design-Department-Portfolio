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

  const navClass = [
    'fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease-in-out',
    morphed ? 'px-[10px] md:px-[20px] pt-[8px]' : '',
  ].join(' ');

  return (
    <nav aria-label="Section navigation" className={navClass}>
      <div
        className={[
          'mx-auto flex items-center transition-all duration-[400ms] ease-in-out',
          morphed ? 'px-4 md:px-8' : 'px-4 md:px-10',
        ].join(' ')}
        style={{
          maxWidth: morphed ? '960px' : '100%',
          height: morphed ? 'clamp(48px, 8vw, 72px)' : 'clamp(56px, 10vw, 100px)',
          borderRadius: morphed ? '9999px' : '0px',
          backgroundColor: morphed ? 'rgba(13, 43, 43, 0.85)' : 'transparent',
          backdropFilter: morphed ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: morphed ? 'blur(20px)' : 'none',
          border: 'none',
          boxShadow: morphed ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        {/* Logo (left — desktop only) */}
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
            style={{ height: morphed ? '34px' : '56px' }}
          />
        </Link>

        {/* Nav links — fits all items on mobile */}
        <div className="flex items-center justify-center w-full md:w-auto gap-4 md:gap-8">
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              className="shrink-0 transition-all duration-300 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52]"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: morphed ? 'clamp(12px, 1.8vw, 15px)' : 'clamp(13px, 2vw, 17px)',
                fontWeight: 400,
                opacity: 1,
                letterSpacing: '0.01em',
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
