// components/ContentGrid.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ContentItem {
  label: string;
  href?: string;
}

interface ContentGridProps {
  items: ContentItem[];
}

const MORPH_DOWN = 60;   // scroll down past 60px → morph
const MORPH_UP = 20;     // scroll back above 20px → unmorph (hysteresis)

const ContentGrid: React.FC<ContentGridProps> = ({ items }) => {
  const [morphed, setMorphed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const morphedRef = useRef(false);
  const rafId = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = window.requestAnimationFrame(() => {
      const y = window.scrollY;
      const wasMorphed = morphedRef.current;
      const shouldMorph = wasMorphed ? y > MORPH_UP : y > MORPH_DOWN;
      if (shouldMorph !== wasMorphed) {
        morphedRef.current = shouldMorph;
        setMorphed(shouldMorph);
      }
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onScroll]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 top-0 z-50"
      style={{
        padding: morphed ? '8px 10px 0' : '0',
        transition: 'padding 400ms ease-in-out',
        willChange: 'padding',
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{
          maxWidth: morphed ? '960px' : '100%',
          height: morphed ? '48px' : '64px',
          padding: morphed ? '0 16px' : '0 16px',
          borderRadius: morphed ? '9999px' : '0px',
          backgroundColor: morphed ? 'rgba(13, 43, 43, 0.85)' : 'transparent',
          backdropFilter: morphed ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: morphed ? 'blur(20px)' : 'none',
          boxShadow: morphed ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
          transition: 'max-width 400ms ease-in-out, height 400ms ease-in-out, border-radius 400ms ease-in-out, background-color 400ms ease-in-out, box-shadow 400ms ease-in-out, padding 400ms ease-in-out',
          willChange: 'height, max-width, border-radius, background-color',
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
            className="w-auto"
            style={{
              height: morphed ? '34px' : '56px',
              transition: 'height 400ms ease-in-out',
              willChange: 'height',
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              className="shrink-0 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52]"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: morphed ? '15px' : '17px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                transition: 'font-size 400ms ease-in-out',
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
            className="block h-0.5 w-5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              transition: 'transform 300ms ease',
            }}
          />
          <span
            className="block h-0.5 w-5 my-1"
            style={{
              background: 'rgba(255,255,255,0.9)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 300ms ease',
            }}
          />
          <span
            className="block h-0.5 w-5"
            style={{
              background: 'rgba(255,255,255,0.9)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              transition: 'transform 300ms ease',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? '320px' : '0',
          opacity: menuOpen ? 1 : 0,
          backgroundColor: 'rgba(13, 43, 43, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: morphed ? '0 0 24px 24px' : '0',
          marginTop: '4px',
          maxWidth: morphed ? '960px' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          transition: 'max-height 300ms ease, opacity 300ms ease',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {items.map(({ label, href = '#' }, idx) => (
            <a
              key={idx}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-white/90 hover:text-white"
              style={{
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                transition: 'color 200ms ease',
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
