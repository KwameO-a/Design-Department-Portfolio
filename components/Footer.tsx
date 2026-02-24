// components/Footer.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // Show button only after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkFx =
    'relative inline-block transition-all duration-300 ' +
    'hover:-translate-y-0.5 hover:text-white ' +
    'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 ' +
    'after:bg-current after:transition-all after:duration-300 hover:after:w-full';

  return (
    <footer
      className="text-white py-12 relative"
      style={{ backgroundColor: '#0D2B2B' }} // custom background colour
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-light tracking-wider mb-2">
              Designdepartment.work
            </h3>
            <p className="text-gray-300 text-sm">
              Crafting meaningful design experiences since 2015
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="text-sm text-gray-300 text-center md:text-right">
              © 2025 All rights reserved
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div className="mb-4 md:mb-0" />
            <div className="flex gap-6">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkFx}
                aria-label="Open Instagram (new tab)"
              >
                Instagram
              </Link>

              <Link
                href="https://www.linkedin.com/company/design-department-work/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkFx}
                aria-label="Open LinkedIn (new tab)"
              >
                LinkedIn
              </Link>

              <Link
                href="https://wa.me/233501369226"
                target="_blank"
                rel="noopener noreferrer"
                className={linkFx}
                aria-label="Open WhatsApp chat (new tab)"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-6 px-4 py-2 bg-[#8B6B52] text-white text-sm rounded-full shadow-lg hover:bg-[#6d5240] transition"
        >
          ↑ Back to Top
        </button>
      )}
    </footer>
  );
}
