// components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = { variant?: 'light' | 'dark' };

const MORPH_DOWN = 60;
const MORPH_UP = 20;

export default function Header({ variant = 'light' }: HeaderProps) {
  const [morphed, setMorphed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (!morphed && y > MORPH_DOWN) setMorphed(true);
          else if (morphed && y < MORPH_UP) setMorphed(false);
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [morphed]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Studio' },
    { href: '/#contact', label: 'Contact' },
    { href: '/Community', label: 'Community+' }
  ];

  const baseLink = 'text-sm uppercase tracking-[0.2em]';
  const linkColor =
    variant === 'dark'
      ? 'text-black/80 hover:text-[#8B6B52]'
      : 'text-white/90 hover:text-white';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      style={{
        padding: morphed ? '10px 16px' : '0',
        transition: 'padding 400ms ease-in-out',
      }}
      aria-label="Main"
    >
      {/* Morphing nav bar */}
      <div
        style={{
          maxWidth: morphed ? '1060px' : '100%',
          width: '100%',
          height: morphed ? '56px' : '64px',
          padding: morphed ? '0 24px' : '0 16px',
          borderRadius: morphed ? '9999px' : '0px',
          backgroundColor: morphed
            ? 'rgba(13, 43, 43, 0.85)'
            : variant === 'dark'
              ? 'transparent'
              : 'transparent',
          backdropFilter: morphed ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: morphed ? 'blur(12px)' : 'none',
          boxShadow: morphed ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
          transition: [
            'max-width 400ms ease-in-out',
            'height 400ms ease-in-out',
            'padding 400ms ease-in-out',
            'border-radius 400ms ease-in-out',
            'background-color 400ms ease-in-out',
            'backdrop-filter 400ms ease-in-out',
            'box-shadow 400ms ease-in-out',
          ].join(', '),
          willChange: 'max-width, height, border-radius, background-color',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Hamburger (mobile) */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={[
            'md:hidden mr-4 rounded p-2 focus:outline-none focus-visible:ring-2',
            variant === 'dark' && !morphed
              ? 'text-black/80 hover:text-[#8B6B52] focus-visible:ring-black/30'
              : 'text-white/90 hover:text-white focus-visible:ring-white/40',
          ].join(' ')}
        >
          <span className="block h-0.5 w-5 my-1" style={{ background: 'currentColor' }} />
          <span className="block h-0.5 w-5 my-1" style={{ background: 'currentColor' }} />
          <span className="block h-0.5 w-5 my-1" style={{ background: 'currentColor' }} />
        </button>

        {/* Desktop nav (left) */}
        <nav className="mr-auto hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${baseLink} ${morphed ? 'text-white/90 hover:text-white' : linkColor}`}
              style={{
                transition: 'color 300ms ease, opacity 300ms ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo far right */}
        <Link
          href="/"
          aria-label="Home"
          className="ml-auto inline-flex shrink-0 items-center"
        >
          <Image
            src="/images/Logo.png"
            alt="Design Department"
            width={280}
            height={140}
            priority
            className="w-auto"
            style={{
              height: morphed ? '38px' : '56px',
              transition: 'height 400ms ease-in-out',
              willChange: 'height',
            }}
          />
        </Link>
      </div>

      {/* Mobile menu panel */}
      <div
        className={[
          'md:hidden overflow-hidden absolute left-0 right-0',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        style={{
          top: morphed ? '76px' : '64px',
          margin: morphed ? '0 16px' : '0',
          borderRadius: morphed ? '16px' : '0',
          backgroundColor: morphed ? 'rgba(13, 43, 43, 0.95)' : 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'max-height 300ms ease, opacity 300ms ease, top 400ms ease-in-out, margin 400ms ease-in-out, border-radius 400ms ease-in-out',
        }}
      >
        <div className="px-6 pb-4">
          <nav className="flex flex-col gap-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-2 ${baseLink} text-white/90 hover:text-white`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
