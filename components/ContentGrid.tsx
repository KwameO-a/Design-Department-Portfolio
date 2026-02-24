// components/ContentGrid.tsx
import React from 'react';

interface ContentItem {
  label: string;
  href?: string;
}

type Size = 'sm' | 'md' | 'lg';

interface ContentGridProps {
  items: ContentItem[];
  /** Controls pill padding and font size */
  size?: Size;
  /** Extra classes applied to each pill (optional) */
  pillClassName?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-xs md:px-4 md:py-2.5 md:text-sm',
  md: 'px-3 py-1.5 text-sm md:px-8 md:py-1.5 md:text-base',
  lg: 'px-4 py-2 text-base md:px-10 md:py-5 md:text-lg',
};

const ContentGrid: React.FC<ContentGridProps> = ({ items, size = 'md', pillClassName = '' }) => {
  return (
    <section
      className="flex items-center justify-center py-3 md:py-4"
      style={{ backgroundColor: '#0D2B2B' }}
    >
      <div className="mx-auto w-full max-w-[1040px] px-4">
        <nav aria-label="Section navigation">
          <div
            className={[
              'flex w-full items-center',
              'gap-3 md:gap-6',
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
                  'rounded-xl border',
                  sizeClasses[size], // ← padding & font-size come from here
                  'font-bold text-center',
                  'transition-transform duration-200',
                  'md:hover:-translate-y-0.5 md:hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B52] focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-[#0D2B2B]',
                  pillClassName,
                ].join(' ')}
                style={{
                  borderColor: '#8B6B52',
                  color: '#8B6B52',
                  backgroundColor: 'transparent',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default ContentGrid;
