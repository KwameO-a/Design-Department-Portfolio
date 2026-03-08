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
  const [menuOpen, setMenuOpen] = useState(false);
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
        {/* Logo (left) */}
        <Link
          href="/"
          aria-label="Home"
          className="inline-flex shrink-0 items-center mr-auto"
        >
          <Image
            src="/images/Logo.png"
            alt="Design Department"
            width={280}
            height={140}
            priority
            className="w-auto transition-all duration-[400ms]"
            style={{ height: morphed ? 'clamp(34px, 5vw, 44px)' : 'clamp(56px, 9vw, 70px)' }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              className="shrink-0 transition-all duration-300 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52]"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: morphed ? '15px' : '17px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                transition: 'all 400ms ease-in-out',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <span
            className="block h-0.5 w-5 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.9)',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="block h-0.5 w-5 my-1 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.9)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.9)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={[
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        style={{
          backgroundColor: 'rgba(13, 43, 43, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: morphed ? '0 0 24px 24px' : '0',
          marginTop: '4px',
          maxWidth: morphed ? '960px' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-white/90 hover:text-white transition-colors duration-200"
              style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '0.01em' }}
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
