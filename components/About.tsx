// components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Hide when scrolling down, show when scrolling up (past threshold)
          const goingDown = y > lastY.current;
          const passed = y > 140;
          setHidden(goingDown && passed);

          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    onScroll(); // initialize on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-transform duration-300',
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      ].join(' ')}
    >
      {/* full width container, no max-width, no right padding */}
      <div className="flex h-24 w-full items-center pl-6 pr-0">
        {/* Left side (empty or nav later) */}
        <div className="mr-auto" />

        {/* Logo flush to right edge */}
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
            className="h-16 w-auto md:h-20 lg:h-24 transition-all duration-300"
          />
        </Link>
      </div>
    </header>
  );
}
