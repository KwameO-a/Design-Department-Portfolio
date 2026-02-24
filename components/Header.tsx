// components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = { variant?: 'light' | 'dark' };

export default function Header({ variant = 'light' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(y > 80);
          const goingDown = y > lastY.current;
          const passed = y > 140;
          setHidden(goingDown && passed && !menuOpen); // don't hide while menu open
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Studio' },
    { href: '/#contact', label: 'Contact' },
    { href: '/Community', label: 'Community+' }
  ];

  const baseLink = 'text-sm uppercase tracking-[0.2em] transition';
  const linkColor =
    variant === 'dark'
      ? 'text-black/80 hover:text-[#8B6B52]'
      : 'text-white/90 hover:text-white';

  const barBg =
    scrolled
      ? variant === 'dark'
        ? 'bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
        : 'bg-black/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-[0_1px_0_0_rgba(255,255,255,0.08)]'
      : 'bg-transparent';

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        barBg,
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      ].join(' ')}
      aria-label="Main"
    >
      {/* Top bar */}
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center px-6">
        {/* Hamburger (mobile) */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={[
            'md:hidden mr-4 rounded p-2 focus:outline-none focus-visible:ring-2',
            variant === 'dark'
              ? 'text-black/80 hover:text-[#8B6B52] focus-visible:ring-black/30'
              : 'text-white/90 hover:text-white focus-visible:ring-white/40',
          ].join(' ')}
        >
          {/* simple icon */}
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
              className={`${baseLink} ${linkColor}`}
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
            src="/images/logo.png"
            alt="Design Department"
            width={280}
            height={140}
            priority
            className="h-16 w-auto md:h-20 lg:h-24 transition-all duration-300"
          />
        </Link>
      </div>

      {/* Mobile menu panel */}
      <div
        className={[
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
          variant === 'dark' ? 'bg-white/95' : 'bg-black/80',
          'backdrop-blur supports-[backdrop-filter]:backdrop-blur',
        ].join(' ')}
      >
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <nav className="flex flex-col gap-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'py-2',
                  baseLink,
                  variant === 'dark'
                    ? 'text-black/80 hover:text-[#8B6B52]'
                    : 'text-white/90 hover:text-white',
                ].join(' ')}
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
