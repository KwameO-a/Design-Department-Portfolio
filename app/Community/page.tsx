// app/community-plus/page.tsx
'use client';

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlur } from '../../lib/blur-placeholders';

const DARK = '#0D2B2B';
const ACCENT = '#8B6B52';
const BRAND = '#5A2E23';
const LIGHT = '#D9E4E4';

const HERO_IMG = '/images/CommunityHero.png';
const SPLIT_IMG = '/images/split.jpg';
const REJ_IMG   = '/images/classroom.png';
const DSG_IMG   = '/images/Student.jpg';
const COL_IMG   = '/images/StudentGroup.JPG';

const PLUS_IMG  = '/images/works/CommunityLogo.png';

const ROLES = [
  { title: 'Design Services',       icon: '/images/BookDesign.png', items: ['Architectural Design', 'Product Design', 'Programme Design'] },
  { title: 'Community Engagement',  icon: '/images/People.png',     items: ['Rural & Peri-Urban Survey', 'Volunteering', 'Monitoring, Evaluation & Research'] },
  { title: 'Project Management',    icon: '/images/Loading.png',    items: ['Programme Coordination', 'Construction / Fabrication Management'] },
  { title: 'Industry Mentorship',   icon: '/images/Mentorship.png', items: ['Programme Curation', 'Team Participation'] },
];

/* ——— Lightweight scroll animation (no framer-motion) ——— */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = '',
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: '-80px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const tx =
    direction === 'up'    ? `translateY(${distance}px)` :
    direction === 'down'  ? `translateY(-${distance}px)` :
    direction === 'left'  ? `translateX(${distance}px)` :
    direction === 'right' ? `translateX(-${distance}px)` : 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : tx,
        transition: `opacity ${duration}s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export default function CommunityPlusPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="min-h-screen" style={{ backgroundColor: DARK }}>
      {/* HERO */}
      <section className="relative min-h-[58vh]">
        <Image
          src={HERO_IMG}
          alt="Community Plus hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={getBlur(HERO_IMG)}
        />
        <div className="absolute inset-0 bg-black/25" />
        <HeaderLogo />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto w-full max-w-[1100px] text-center">
            <FadeIn direction="up" delay={0.3}>
              <h1
                className="font-bold text-white"
                style={{ fontSize: 'clamp(34px,5.5vw,64px)', letterSpacing: '0.01em' }}
              >
                Could we do more together?
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.5}>
              <p className="mt-3 text-white/90" style={{ fontSize: 'clamp(14px,2.3vw,18px)' }}>
                A Communal + Educational Spaces Initiative
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-2 items-center">
          <FadeIn direction="left">
            <h2
              className="mb-1 flex items-center font-extrabold"
              style={{ color: BRAND, fontSize: 'clamp(30px,4.2vw,46px)', gap: '6px' }}
            >
              <span>Community</span>
              <PlusIcon size={26} />
            </h2>
            <p className="text-neutral-600 mb-6">Communal + Educational Spaces Initiative</p>
            <p className="text-neutral-800/90 leading-8 text-justify">
              The <strong>Design Department&rsquo;s Community Plus Campaign</strong> is dedicated to transforming under-resourced communities by
              fostering equitable access to quality spaces for learning, growth, and collaboration through architectural design. We partner
              with socially driven institutions, NGOs, and local stakeholders to catalyse lasting change, empowering communities to shape a
              future of dignity, opportunity, and shared prosperity.
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <ContentImage src={SPLIT_IMG} alt="Community split image" />
          </FadeIn>
        </div>
      </section>

      {/* OUR ROLE */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto w-full max-w-[1100px]">
          <FadeIn direction="up">
            <div className="mb-2 flex items-center gap-3">
              <PlusIcon size={18} />
              <h3 className="text-3xl md:text-4xl font-semibold" style={{ color: BRAND }}>
                Our Role
              </h3>
            </div>
            <p className="text-neutral-600 mb-10">Our Role as your CSR Partner</p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-0">
            {ROLES.map((r, i) => (
              <FadeIn key={r.title} direction="up" delay={i * 0.12}>
                <RoleBlock {...r} showSeparator={i !== 0} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY FOCUS */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-2 items-start">
          <FadeIn direction="left">
            <h3
              className="mb-1 flex items-center font-extrabold"
              style={{ color: BRAND, fontSize: 'clamp(30px,4.2vw,46px)', gap: '6px' }}
            >
              <span>Community</span>
              <PlusIcon size={24} />
            </h3>
            <p className="text-neutral-600 mb-6">Communal + Educational Spaces Initiative</p>
            <h4 className="font-semibold text-neutral-800 mb-4">Primary Focus</h4>
            <ul className="space-y-3 text-neutral-800/90 text-justify">
              <li>+ Rejuvenate communal spaces for socio-economic development through design</li>
              <li>+ Design conducive teaching and learning environments for under-resourced schools</li>
              <li>+ Collaborate with well-resourced institutions and schools in impacting disadvantaged communities in West Africa and beyond</li>
            </ul>
          </FadeIn>
          <FadeIn direction="right">
            <ContentImage src={REJ_IMG} alt="Primary focus image" />
          </FadeIn>
        </div>
      </section>

      {/* STRATEGY SECTIONS */}
      <Strategy
        title="Rejuvenate"
        img={REJ_IMG}
        bullets={[
          'Participatory design approaches that involve community members in decision-making, reflecting local culture and needs.',
          'Adaptive reuse of materials and sustainable construction methods that reduce costs while maximising durability.',
          'Flexible spatial layouts that serve multiple functions, from markets to cultural gatherings.',
          'Incorporation of green and shaded areas to improve comfort, wellbeing, and resilience.',
          'Integrated infrastructure improvements — lighting, sanitation, accessibility — to enhance safety and inclusion.',
        ]}
      />
      <Strategy
        title="Design"
        img={DSG_IMG}
        bullets={[
          'Designing sustainable and incremental classrooms that can expand as resources grow.',
          'Developing prefabricated furniture and modular components for rapid, durable deployment.',
          'Creating multifunctional hubs for socio-cultural engagement serving both education and community.',
          'Integrating climate-responsive principles: natural ventilation, shading, and daylighting.',
        ]}
      />
      <Strategy
        title="Collaborate"
        img={COL_IMG}
        bullets={[
          'Mobilising resources through institutional partnerships (materials, books, tech, expertise).',
          'Co-designed community projects with schools, NGOs, and agencies.',
          'Facilitating research & data-sharing platforms to track progress and guide interventions.',
          'Building long-term alliances to ensure impact is scalable and replicable.',
        ]}
      />

      {/* TEAM */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto w-full max-w-[1100px]">
          <FadeIn direction="up">
            <div className="mb-4 flex items-center gap-3">
              <PlusIcon size={18} />
              <h3 className="text-3xl md:text-4xl font-semibold" style={{ color: BRAND }}>
                Our Team
              </h3>
            </div>
            <p className="text-neutral-600 mb-10">Meet the core members of our team</p>
          </FadeIn>

          {/* Mobile stack — centered */}
          <div className="md:hidden flex flex-col items-center space-y-10">
            <FadeIn direction="up" delay={0}>
              <TeamMember
                img="/images/KB.png"
                name={<>Dr. K. B. <span className="font-semibold">Owusu-Sekyere</span></>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Monitoring, Evaluation & Research Lead</span>}
                meta={<>Development Economist — JOC Consulting Ltd.</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <TeamMember
                img="/images/Zoe1.png"
                name={<>Zoe Lois <span className="font-semibold">Poku</span></>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Programmes Director</span>}
                meta={<>Mechanical Engineer — Mantrac Ghana Ltd.</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <TeamMember
                img="/images/kofi1.jpeg"
                name={<>Kofi <span className="font-semibold">Dako</span>, PMP&reg;</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Project Manager</span>}
                meta={<>Strategic Lead — Design Department</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <TeamMember
                img="/images/philip.jpeg"
                name={<>Philip <span className="font-semibold">Opare</span>, PMP&reg;</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Fund Manager</span>}
                meta={<>Cost Manager — Design Department</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <TeamMember
                img="/images/victor1.png"
                name={<>Victor K. <span className="font-semibold">Owusu-Sekyere</span>, AGIA</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Design Lead</span>}
                meta={<>Creative Director — Design Department</>}
              />
            </FadeIn>
          </div>

          {/* Desktop: row of 3, then 2 centred */}
          <div className="hidden md:grid grid-cols-12 gap-y-12">
            <FadeIn direction="up" delay={0} className="col-span-4 flex justify-center">
              <TeamMember
                img="/images/KB.png"
                name={<>Dr. K. B. <span className="font-semibold">Owusu-Sekyere</span></>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Monitoring, Evaluation & Research Lead</span>}
                meta={<>Development Economist — JOC Consulting Ltd.</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.12} className="col-span-4 flex justify-center">
              <TeamMember
                img="/images/kofi1.jpeg"
                name={<>Kofi <span className="font-semibold">Dako</span>, PMP&reg;</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Project Manager</span>}
                meta={<>Strategic Lead — Design Department</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.24} className="col-span-4 flex justify-center">
              <TeamMember
                img="/images/philip.jpeg"
                name={<>Philip <span className="font-semibold">Opare</span>, PMP&reg;</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Fund Manager</span>}
                meta={<>Cost Manager — Design Department</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.1} className="col-start-3 col-span-3 flex justify-center">
              <TeamMember
                img="/images/Zoe1.png"
                name={<>Zoe Lois <span className="font-semibold">Poku</span></>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Programmes Director</span>}
                meta={<>Mechanical Engineer — Mantrac Ghana Ltd.</>}
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.22} className="col-start-7 col-span-3 flex justify-center">
              <TeamMember
                img="/images/victor1.png"
                name={<>Victor K. <span className="font-semibold">Owusu-Sekyere</span>, AGIA</>}
                role={<span className="font-semibold" style={{ color: ACCENT }}>Design Lead</span>}
                meta={<>Creative Director — Design Department</>}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="px-6 py-14" style={{ backgroundColor: DARK }}>
        <div className="mx-auto w-full max-w-[1100px] text-center">
          <FadeIn direction="up" delay={0.1}>
            <h3 className="font-semibold" style={{ color: ACCENT, fontSize: 'clamp(22px,3vw,28px)' }}>
              Collaborate with us
            </h3>
            <p className="mx-auto mt-3 max-w-3xl" style={{ color: LIGHT, lineHeight: 1.8 }}>
              &ldquo;Every great transformation begins with one bold step. Together, we can ignite that first spark and empower communities to
              become the architects of lasting change.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* INLINE FOOTER */}
      <footer className="text-white py-4" style={{ backgroundColor: DARK }}>
        <div className="max-w-6xl md:max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            <div className="mt-6 md:mt-0 text-sm text-gray-300 text-center md:text-right w-full md:w-auto">
              &copy; {new Date().getFullYear()} All rights reserved
            </div>
          </div>

          <hr className="my-8 border-gray-700" />

          <div className="flex items-center justify-center md:justify-end gap-6 text-sm text-gray-300">
            {[
              { href: 'mailto:social@designdepartment.work?subject=Community%20Plus%20Partnership', label: 'Partner With Us' },
              { href: 'https://www.instagram.com/', label: 'Instagram' },
              { href: 'https://www.linkedin.com/company/design-department-work/', label: 'LinkedIn' },
              { href: 'https://wa.me/233501369226', label: 'WhatsApp' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative inline-block
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:text-white
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-current
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full px-4 py-2 text-white shadow-md transition hover:-translate-y-0.5"
          style={{ backgroundColor: ACCENT }}
          aria-label="Back to top"
        >
          &uarr;
        </button>
      )}
    </main>
  );
}

/* ——— atoms & helpers ——— */

function HeaderLogo() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 z-10 p-4 md:p-6 lg:p-8">
      <Link href="/" aria-label="Home" className="pointer-events-auto inline-flex shrink-0 items-center">
        <Image
          src="/images/Logo.png"
          alt="Design Department"
          width={280}
          height={140}
          priority
          className="h-10 w-auto md:h-14 lg:h-16 transition-all duration-300"
        />
      </Link>
    </div>
  );
}

function PlusIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src={PLUS_IMG}
      alt=""
      width={size}
      height={size}
      className={`inline-block align-middle translate-y-[2px] ${className}`}
    />
  );
}

function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 550px, 100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={getBlur(src)}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.src =
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
                 <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#eee"/><stop offset="1" stop-color="#ddd"/></linearGradient></defs>
                 <rect width="800" height="600" fill="url(#g)"/>
                 <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                       font-family="sans-serif" font-size="20" fill="#999">Image not found</text>
               </svg>`
            );
        }}
      />
    </div>
  );
}

function RoleBlock({
  title, items, icon, showSeparator = false,
}: { title: string; items: string[]; icon: string; showSeparator?: boolean }) {
  return (
    <div className="relative flex flex-col items-center px-6 pb-6 text-center">
      {showSeparator && (
        <span
          aria-hidden
          className="absolute left-0 top-2 hidden h-[92%] w-px md:block"
          style={{ backgroundColor: '#C39B86' }}
        />
      )}

      <div className="mb-5">
        <IconSafe src={icon} />
      </div>

      <div className="mb-2 text-[18px] font-semibold" style={{ color: BRAND }}>
        {title}
      </div>

      <ul className="mx-auto w-full max-w-[26rem] space-y-2 text-neutral-800/90 text-left md:text-center">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 md:justify-center">
            <span className="mt-[9px] block h-[6px] w-[6px] shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Fixed-size icon (no fill) */
function IconSafe({ src }: { src: string }) {
  return (
    <div className="h-[110px] w-[140px] mx-auto flex items-center justify-center">
      <Image
        src={src}
        alt=""
        width={140}
        height={110}
        loading="lazy"
        className="object-contain"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.src =
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="110">
                 <rect x="8" y="8" width="124" height="94" rx="10" ry="10" fill="#EFE7E3" stroke="#C39B86"/>
               </svg>`
            );
        }}
      />
    </div>
  );
}

function Strategy({ title, bullets, img }: { title: string; bullets: string[]; img: string }) {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="mx-auto w-full max-w-[1100px]">
        <FadeIn direction="up">
          <div className="mb-6 flex items-center gap-3">
            <PlusIcon size={18} />
            <h3 className="text-3xl md:text-4xl font-semibold" style={{ color: BRAND }}>
              {title}
            </h3>
          </div>
          <p className="text-neutral-600 mb-6">Communal + Educational Spaces</p>
        </FadeIn>
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <FadeIn direction="left">
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">Strategy</h4>
              <p className="text-neutral-800/90 leading-8 mb-5">
                We aim to revitalise and improve spaces through human-centred, context-specific, and sustainable design strategies. This
                includes:
              </p>
              <ul className="space-y-3 text-neutral-800/90">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: ACCENT }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <ContentImage src={img} alt={`${title} image`} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

type FitType = 'cover' | 'contain';

/** Team avatar fetched at 224x224 (2x) but displayed at 112x112 for retina crispness */
function TeamMember({
  img, name, role, meta, fit = 'cover', inset = false, bg,
}: {
  img: string;
  name: React.ReactNode;
  role: React.ReactNode;
  meta: React.ReactNode;
  fit?: FitType;
  inset?: boolean;
  bg?: string;
}) {
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <article className="text-center max-w-[280px] mx-auto">
      <div
        className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full ring-1 ring-neutral-200 flex items-center justify-center bg-white"
        style={bg ? { backgroundColor: bg } : undefined}
      >
        <Image
          src={img}
          alt=""
          width={224}
          height={224}
          loading="lazy"
          decoding="async"
          className={`${inset ? 'h-[88%] w-[88%] rounded-full' : 'h-full w-full'} ${fitClass} object-center`}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.src =
              'data:image/svg+xml;utf8,' +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112">
                   <defs><linearGradient id="g" x1="0" x2="1">
                     <stop stop-color="#EFE7E3"/><stop offset="1" stop-color="#E6D9D2"/>
                   </linearGradient></defs>
                   <rect width="112" height="112" rx="56" ry="56" fill="url(#g)"/>
                 </svg>`
              );
          }}
        />
      </div>
      <h4 className="text-[17px] text-neutral-900">{name}</h4>
      <p className="mt-1 text-[14px]">{role}</p>
      <p className="mt-1 text-[13px] text-neutral-700">{meta}</p>
    </article>
  );
}

function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="rounded-xl border-2 px-5 py-2.5 font-bold transition-transform duration-200 hover:-translate-y-0.5"
      style={{ borderColor: ACCENT, color: ACCENT }}
    >
      {children}
    </Link>
  );
}
