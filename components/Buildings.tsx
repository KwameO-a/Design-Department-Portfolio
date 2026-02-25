'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import { getBlur } from '../lib/blur-placeholders';

type Project = {
  slug: string;
  title: string;
  location: string;
  cover: string;
};

const PROJECTS: Project[] = [
  { slug: 'aster-azalea',      title: 'Aster & Azalea I',  location: 'Accra, Ghana',     cover: '/images/works/aster1.PNG' },
  { slug: 'house-in-squares',  title: 'House in Squares',  location: 'Cincinnati, USA',  cover: '/images/works/houseinsquare4.jpg' },
  { slug: 'aster-azalea1',     title: 'Aster & Azalea II', location: 'New York, USA',    cover: '/images/works/astera1.jpg' },
  { slug: 'iaa',               title: 'IAA Grande',        location: 'Gomoa, Ghana',     cover: '/images/works/iaa1.jpg' },
  { slug: 'kenya',             title: 'Michelangelo',      location: 'Kenya',            cover: '/images/works/kenya1.jpg' },
];

/** 12-col collage layout on lg; sculpt sizes */
const LAYOUT: Record<string, { col: number; rows: number }> = {
  iaa:                  { col: 8, rows: 3 },
  'industrial-gallery': { col: 8, rows: 3 },
  'aster-azalea':       { col: 8, rows: 2 },
  'house-in-squares':   { col: 4, rows: 1 },
  'aster-azalea1':      { col: 4, rows: 2 },
  kenya:                { col: 4, rows: 3 },
  'city-aerial':        { col: 4, rows: 1 },
  'atelier-courtyard':  { col: 4, rows: 1 },
  'museum-pink':        { col: 4, rows: 2 },
  'campus-masterplan':  { col: 4, rows: 2 },
};

/** Spotlight next to intro */
const SPOTLIGHT_SLUG = 'house-in-squares';

export default function Buildings() {
  const spotlight = PROJECTS.find((p) => p.slug === SPOTLIGHT_SLUG) ?? PROJECTS[0];
  const GRID_PROJECTS = PROJECTS.filter((p) => p.slug !== SPOTLIGHT_SLUG);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-6 pt-24 md:pt-28 lg:pt-32 pb-16">
        {/* Intro + Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5">
            <div className="space-y-1">
              <div className="text-2xl font-extrabold tracking-[0.35em] text-[#DDBFA9]">
                OUR
              </div>
              <div className="text-4xl md:text-5xl font-extrabold tracking-[0.25em] text-[#DDBFA9]">
                PROJECTS
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#C9A98F]">
                and collaborations
              </div>
            </div>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-white/80 text-justify">
              At The Design Department, every project is a journey of discovery — an
              opportunity to merge creativity, functionality, and purpose into spaces and
              experiences that resonate. We approach each brief with fresh eyes,
              embracing the unique context, culture, and aspirations that shape it. Our
              portfolio spans diverse sectors, from residential and hospitality to
              commercial and cultural spaces, reflecting the versatility and depth of our
              creative team. Each work is the result of collaboration, curiosity, and a
              commitment to design excellence, where no detail is too small and no idea
              too ambitious.
            </p>
          </div>

          <div className="hidden md:block md:col-span-7">
            <SpotlightTile p={spotlight} />
          </div>
        </div>

        {/* Mobile masonry */}
        <section className="block md:hidden mt-6">
          <div className="columns-2 gap-2 [column-fill:_balance]">
            {PROJECTS.map((p) => (
              <MasonryTile key={p.slug} p={p} />
            ))}
          </div>
        </section>

        {/* Desktop collage */}
        <section
          className="
            hidden md:grid grid-flow-dense
            md:grid-cols-6 lg:grid-cols-12
            gap-3 lg:gap-4 mt-8
          "
          style={{ gridAutoRows: '140px' }}
          aria-label="Project collage"
        >
          {GRID_PROJECTS.map((p) => {
            const layout = LAYOUT[p.slug] ?? { col: 4, rows: 2 };
            const col = Math.max(2, Math.min(12, layout.col));
            const rows = Math.max(1, Math.min(4, layout.rows));

            const colClass =
              col === 12 ? 'lg:col-span-12'
              : col === 10 ? 'lg:col-span-10'
              : col === 8  ? 'lg:col-span-8'
              : col === 6  ? 'lg:col-span-6'
              : col === 5  ? 'lg:col-span-5'
              : col === 4  ? 'lg:col-span-4'
              : 'lg:col-span-3';

            const rowClass =
              rows === 4 ? 'md:row-span-4'
              : rows === 3 ? 'md:row-span-3'
              : rows === 2 ? 'md:row-span-2'
              : 'md:row-span-1';

            return <GridTile key={p.slug} p={p} className={`${colClass} ${rowClass}`} />;
          })}
        </section>
      </div>
    </div>
  );
}

/* ========= Spotlight (unique taller) ========= */
function SpotlightTile({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block focus:outline-none focus-visible:ring focus-visible:ring-white/20 rounded-md"
      aria-label={`Open project: ${p.title}`}
    >
      <div className="relative w-full overflow-hidden h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 rounded-md">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes="(max-width: 1280px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={getBlur(p.cover)}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
        <CaptionOverlay title={p.title} location={p.location} pad="p-4" />
      </div>
    </Link>
  );
}

/* ========= Regular Tiles ========= */
function GridTile({ p, className }: { p: Project; className?: string }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={`group block focus:outline-none focus-visible:ring focus-visible:ring-white/20 rounded-md ${className}`}
      aria-label={`Open project: ${p.title}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={getBlur(p.cover)}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
        <CaptionOverlay title={p.title} location={p.location} pad="p-4" />
      </div>
    </Link>
  );
}

function MasonryTile({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      aria-label={`Open project: ${p.title}`}
      className="mb-2 block overflow-hidden break-inside-avoid group focus:outline-none focus-visible:ring focus-visible:ring-white/20 rounded-md"
    >
      <div className="relative w-full overflow-hidden rounded-md">
        <Image
          src={p.cover}
          alt={p.title}
          width={900}
          height={600}
          placeholder="blur"
          blurDataURL={getBlur(p.cover)}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
        <CaptionOverlay title={p.title} location={p.location} pad="p-3" />
      </div>
    </Link>
  );
}

/* ========= Shared overlay ========= */
function CaptionOverlay({
  title,
  location,
  pad,
}: {
  title: string;
  location: string;
  pad: string;
}) {
  return (
    <div
      className="
        absolute inset-0 flex items-end
        bg-gradient-to-t from-black/70 via-black/20 to-transparent
        opacity-0 transition-opacity duration-300
        group-hover:opacity-100 group-focus-visible:opacity-100
      "
      aria-hidden="true"
    >
      <div
        className={`${pad} translate-y-2 opacity-0 transition-all duration-300
                    group-hover:translate-y-0 group-hover:opacity-100
                    group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
      >
        <h3 className="font-serif text-white text-base md:text-lg font-semibold drop-shadow">
          {title}
        </h3>
        <p className="text-white/80 text-sm">{location}</p>
      </div>
    </div>
  );
}
