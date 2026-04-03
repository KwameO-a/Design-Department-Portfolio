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

const DB: Record<string, Project> = {
  'growing-schools': {
    title: 'Growing Schools Under Trees',
    subtitle: 'Classrooms | Libraries | Infirmaries | Playgrounds',
    hero: '/images/growing-schools-render.jpg',
    intro: [
      'Expanding access to safe classrooms, libraries, infirmaries and playgrounds in under-resourced communities across Ghana. Through modular, incremental design, we deliver express relief to schools under trees \u2014 one simple block at a time.',
      'Across Ghana, approximately 5,000\u20135,400 basic schools still operate under trees or in makeshift structures, with the problem heavily concentrated in the northern regions, where roughly 80% of these schools are located.',
      'The idea of building a school, library, health post or a playground does sound a little grand and somewhat costly. Let us share the way we see it from our perspective \u2014 MODULARITY. By breaking the development into useful basic units, we ensure that donors can divide and conquer over time.',
    ],
    section2: {
      leadImage: '/images/works/growing-schools/gs-6.jpg',
      body: [
        'A promise of learning beneath a sturdy roof in the heart of our communities. Together, we design more than buildings \u2014 we design hope, dignity, and the foundations of a brighter tomorrow.',
        'Laughter fills the playgrounds again, bringing back local games and folktales that once lit a fire in our hearts.',
      ],
      tiles: [
        '/images/works/growing-schools/gs-7.jpg',
        '/images/works/growing-schools/gs-8.jpg',
        '/images/works/growing-schools/gs-9.jpg',
        '/images/works/growing-schools/gs-10.jpg',
        '/images/works/growing-schools/gs-11.jpg',
        '/images/works/growing-schools/gs-12.jpg',
      ],
    },
  },
  'sirigu-maze': {
    title: 'New Breath to a Dying Art',
    subtitle: 'Traditional Arts & Crafts Gallery | Sirigu',
    hero: '/images/sirigu-maze-cover.jpg',
    intro: [
      'A cultural preservation initiative in Sirigu, celebrating and revitalising the traditional arts and crafts heritage of northern Ghana through a purpose-built gallery and community engagement space.',
      'Sirigu is renowned for its distinctive mural paintings and pottery traditions passed down through generations of women artisans. This project seeks to provide a permanent home for these art forms, ensuring their survival and continued evolution.',
    ],
    gallery: [
      '/images/sirigu-maze-render.jpg',
      '/images/works/sirigu/sm-2.jpg',
      '/images/works/sirigu/sm-3.jpg',
      '/images/works/sirigu/sm-4.jpg',
      '/images/works/sirigu/sm-5.jpg',
      '/images/works/sirigu/sm-6.jpg',
      '/images/works/sirigu/sm-7.jpg',
      '/images/works/sirigu/sm-8.jpg',
    ],
  },
};

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  return Object.keys(DB).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = DB[params.slug];
  if (!p) return {};
  const title = p.subtitle ? `${p.title} \u2014 ${p.subtitle}` : p.title;
  return { title };
}

export default function CommunityProjectPage({ params }: { params: { slug: string } }) {
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
              {project.subtitle ?? 'Community Plus Initiative'}
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.section2.tiles.map((src, i) => (
                    <div key={`${src}-${i}`} className="aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading="lazy"
                        className="h-full w-full object-cover"
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
