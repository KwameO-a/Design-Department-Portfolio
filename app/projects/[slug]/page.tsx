import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getBlur } from '@/lib/blur-placeholders';

type Project = {
  title: string;
  subtitle?: string;
  hero: string;
  intro: string[];
  section2?: {
    leadImage: string;
    body: string[];
    tiles: string[];
  };
  gallery?: string[];
};

/** ✅ Local "DB" — build-time data source */
const DB: Record<string, Project> = {
  'aster-azalea': {
    title: 'Aster & Azalea I',
    subtitle: 'Townhouses | Accra, Ghana',
    hero: '/images/works/aster1.PNG',
    intro: [
      'The Twin Houses are conceived in a contemporary architectural style, characterized by clean lines, open volumes, and a seamless connection with nature.',
      'At the heart of the design lies a central courtyard, featuring a tranquil pool embraced by lush landscaping and thoughtfully arranged lounging areas.',
      'This courtyard-centric layout allows natural light and fresh air to flow throughout the home, enhancing the experience of each space.',
    ],
    section2: {
      leadImage: '/images/works/aster2.PNG',
      body: [
        'A quiet invitation unfolds upon entry, where open spaces drift between living, dining, and kitchen, bathed in natural light.',
        'Framed by sweeping glass, the heart of the home reveals a tranquil courtyard pool embraced by gardens, blurring the line between shelter and sky.',
        'Every corner of the twin homes whispers calm: light dances, materials breathe, and nature finds its way in. Here, architecture doesn\u2019t just house life; it frames moments, fosters stillness, and offers a sanctuary where modern living meets timeless peace.',
      ],
      tiles: [
        '/images/works/aster3.PNG',
        '/images/works/aster4.png',
        '/images/works/aster5.PNG',
        '/images/works/aster6.jpg',
        '/images/works/aster6.jpg',
        '/images/works/aster7.jpg',
        '/images/works/aster8.jpg',
        '/images/works/aster9.jpg',
      ],
    },
  },
  'house-in-squares': {
    title: 'House In Squares',
    subtitle: 'Private Residence | Accra, Ghana',
    hero: '/images/works/houseinsquare1.jpg',
    intro: [
      'The House In Squares embraces a minimalist architectural language rooted in texture and form. The home\u2019s bold geometry and monolithic appearance are softened by the natural warmth of its rammed-earth inspired façade, blending harmoniously with the landscape. The architecture prioritizes simplicity and sustainability. A restrained material palette, warm-toned walls, raw concrete accents, and natural stone, grounds the building in its environment while enhancing thermal performance. Deep window reveals frame curated views and shade the interiors, while carefully placed openings invite daylight and cross-ventilation.',
    ],
    section2: {
      leadImage: '/images/works/houseinsquare5.png',
      body: [
        'The xeriscaped front garden is a sculptural composition of cacti, aloes, and boulders; blurring the boundary between built and natural elements. At the rear, a shaded courtyard doubles as an outdoor kitchen and dining area, providing an intimate space for gathering, protected by the surrounding walls and dappled tree canopy. This home is not only a retreat but a celebration of earth, sky, and quiet elegance, where minimalism meets a sense of grounded luxury.',
      ],
      tiles: [
        '/images/works/houseinsquare3.jpg',
        '/images/works/houseinsquare4.jpg',
        '/images/works/houseinsquare2.jpg',
        '/images/works/houseinsquare1.jpg',
      ],
    },
  },
  'aster-azalea1': {
    title: 'Aster & Azalea II',
    subtitle: 'Town Houses | Accra, Ghana',
    hero: '/images/works/astera1.jpg',
    intro: [
      'Rooted in the earth and shaped by contemporary sensibilities, the Twin Houses are expressed through rammed earth walls that bring warmth, texture, and a sense of permanence to the architecture. Clean lines, open volumes, and a seamless relationship with nature define the design, while the materiality grounds the home in the context of Accra\u2019s climate and landscape. At the heart of each home is a central courtyard, an inwardlooking sanctuary featuring a still pool, enveloped by lush vegetation and calming lounging areas.',
    ],
    section2: {
      leadImage: '/images/works/astera2.jpg',
      body: [
        'Rooted in Earth, Raised for Tomorrow. Set within the vibrant fabric of Accra, this rammed earth townhouse explores the intersection of sustainability, material honesty, and contemporary African living. Built from compacted earth sourced on-site, the home offers thermal comfort, reduced carbon footprint, and a tactile connection to the land. Its warm, textured walls breathe with the climate, while clean architectural lines speak to a modern, forward-looking lifestyle. A celebration of grounded design, rooted in tradition, made for the future',
      ],
      tiles: [
        '/images/works/astera3.jpg',
        '/images/works/astera4.jpg',
        '/images/works/astera5.jpg',
        '/images/works/astera6.jpg',
      ],
    },
  },
  iaa: {
    title: 'IAA Grande',
    subtitle: 'Beach Resort | Gomoa, Ghana',
    hero: '/images/works/iaa1.jpg',
    intro: [
      'The IAA Grande resort blends coastal serenity with rich African aesthetics, creating a warm and inviting retreat. Inspired by traditional craft and natural materials, the interiors feature a palette of wood, earthy tones and soft textures that echo the surrounding landscape. The primary design theme is expressed through woven textiles, abstract artwork, and handcrafted wooden furniture with clean, modern lines.',
    ],
    section2: {
      leadImage: '/images/works/iaa2.jpg',
      body: [
        'Rooted in Earth, Raised for Tomorrow. Set within the vibrant fabric of Accra, this rammed earth townhouse explores the intersection of sustainability, material honesty, and contemporary African living. Built from compacted earth sourced on-site, the home offers thermal comfort, reduced carbon footprint, and a tactile connection to the land. Its warm, textured walls breathe with the climate, while clean architectural lines speak to a modern, forward-looking lifestyle. A celebration of grounded design, rooted in tradition, made for the future',
      ],
      tiles: [
        '/images/works/iaa3.jpg',
        '/images/works/iaa4.jpg',
        '/images/works/iaa5.jpg',
        '/images/works/iaa6.jpg',
        '/images/works/iaa7.jpg',
        '/images/works/iaa8.jpeg',
        '/images/works/iaa9.jpeg',
        '/images/works/iaa10.jpeg',
      ],
    },
  },
  kenya: {
    title: 'Michelangelo',
    subtitle: 'Beach Resort | Gomoa, Ghana',
    hero: '/images/works/kenya1.jpg',
    intro: [
      'Rising with quiet strength against the Kenyan sky, this house stands as a dialogue between art and permanence. Inspired by Michelangelo\u2019s mastery of form, it is less a dwelling than a sculpture in which one may live\u2014 each line, each shadow, chiseling space with intention.',
    ],
    section2: {
      leadImage: '/images/works/kenya2.JPG',
      body: [
        'Its planes stretch outward like the reach of a fresco, framing earth and horizon, while its columns lift the weight of stone with grace, a nod to the timeless language of the Renaissance,reinterpreted here in modern rhythm. Natural, hardwearing materials root it deeply in its land. Stone, timber, and textured concrete endure the seasons, bearing the touch of time as beautifully as marble once bore the sculptor\u2019s hand. The house does not hide its strength\u2014 it celebrates it, its surfaces weathering into poetry with every sun and rain.',
      ],
      tiles: [
        '/images/works/kenya3.PNG',
        '/images/works/kenya4.jpg',
        '/images/works/kenya5.jpg',
      ],
    },
  },
  'accra-housing': {
    title: 'Accra Housing',
    subtitle: 'Residential | Accra, Ghana',
    hero: '/images/works/accra.jpg',
    intro: [
      'At The Design Department, every project is a journey of discovery \u2014 merging creativity with context-sensitive design.',
    ],
    gallery: [
      '/images/works/city.jpg',
      '/images/works/concourse.jpg',
      '/images/works/courtyard.jpg',
      '/images/works/museum.jpg',
      '/images/works/industrial.jpg',
      '/images/works/campus.jpg',
    ],
  },
};

/* ---------- Static-export settings for Next (app router) ---------- */
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  return Object.keys(DB).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = DB[params.slug];
  if (!p) return {};
  const title = p.subtitle ? `${p.title} — ${p.subtitle}` : p.title;
  return { title };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = DB[params.slug];
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      <main className="mx-auto w-full max-w-7xl px-6 pt-28 pb-24 text-[#8B6B52]">
        {/* ---------- Section 1: Title + Hero ---------- */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 z-10">
            <h1
              className="
                mb-4 font-serif uppercase text-[#8B6B52]
                leading-[1.05] text-4xl md:text-6xl lg:text-7xl tracking-wide
                break-words pr-4 md:pr-8
              "
            >
              {project.title}
            </h1>

            <p className="mb-6 text-xs md:text-sm uppercase tracking-[0.25em] text-[#A28C74]">
              {project.subtitle ?? 'and collaborations'}
            </p>

            <div className="space-y-4">
              {project.intro.map((para, i) => (
                <p key={i} className="max-w-prose text-base leading-relaxed text-[#4B4B4B]">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-5 aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={project.hero}
                alt={project.title}
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-full w-full object-cover"
                priority
                placeholder="blur"
                blurDataURL={getBlur(project.hero)}
              />
            </div>
          </div>
        </section>

        {/* ---------- Section 2 ---------- */}
        {project.section2 ? (
          <section className="mt-12 border-t border-black/10 pt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="aspect-[2.2/1] overflow-hidden rounded-lg">
                  <Image
                    src={project.section2.leadImage}
                    alt={`${project.title} lead`}
                    width={1600}
                    height={725}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                    blurDataURL={getBlur(project.section2.leadImage)}
                  />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-4">
                  {project.section2.body.map((para, i) => (
                    <p key={i} className="text-base leading-relaxed text-[#4B4B4B]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-12 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.section2.tiles.map((src, i) => (
                    <div key={`${src}-${i}`} className="aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                        className="h-full w-full object-cover"
                        placeholder="blur"
                        blurDataURL={getBlur(src)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : project.gallery?.length ? (
          <section className="mt-12 border-t border-black/10 pt-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div key={`${src}-${i}`} className="aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                    className="h-full w-full object-cover"
                    placeholder="blur"
                    blurDataURL={getBlur(src)}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
