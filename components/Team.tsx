'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal, TextReveal, BlurImage, StaggerContainer, staggerItemVariants } from './animations';
import { getBlur } from '../lib/blur-placeholders';

export default function Team() {
  return (
    <section id="team" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-16">
        {/* MEET OUR TEAM */}
        <TextReveal
          as="h2"
          variant="fade-up"
          className="text-center font-bold tracking-wide mb-12 md:mb-16"
          style={{ color: '#8b6b52', fontSize: 'clamp(28px, 4.2vw, 48px)' }}
        >
          MEET OUR TEAM
        </TextReveal>

        {/* Top profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20 md:mb-24 justify-items-center">
          <ScrollReveal direction="up" delay={0}>
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <div className="w-full bg-white flex items-center justify-center h-[420px] sm:h-[480px] md:h-[560px] rounded-sm relative">
                <BlurImage
                  src="/images/victor.png"
                  alt="Victor Owusu-Sekyere"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                  blurDataURL={getBlur('/images/victor.png')}
                />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Victor Owusu-Sekyere, <span className="font-semibold">AGIA</span>
              </h3>
              <p className="text-[#8b6b52] text-sm font-medium">
                Managing Partner | <span className="font-semibold">Creative Director</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Chartered Architect: Ghana Institute of Architects | M. Arch. | B. Arch.
              </p>

              <EmailLink email="vic@designdepartment.work" className="mt-1" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="w-full max-w-md flex flex-col items-center text-center">
              <div className="w-full bg-white flex items-center justify-center h-[420px] sm:h-[480px] md:h-[560px] rounded-sm relative">
                <BlurImage
                  src="/images/kofi.jpeg"
                  alt="Kofi Dako"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                  blurDataURL={getBlur('/images/kofi.jpeg')}
                />
              </div>

              <h3 className="font-bold text-lg mt-6">
                Kofi Dako, <span className="font-semibold">PMP®</span>
              </h3>
              <p className="text-[#8b6b52] text-sm font-medium">
                Managing Partner | <span className="font-semibold">Strategic Lead</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                PMP® Certified Project Management Professional | B. Arch.
              </p>

              <EmailLink email="kofi@designdepartment.work" className="mt-1" />
            </div>
          </ScrollReveal>
        </div>

        {/* DEPARTMENT HEADS */}
        <TextReveal
          as="h3"
          variant="blur"
          className="text-center font-semibold mb-6"
          style={{ color: '#8b6b52', fontSize: 'clamp(20px, 2.4vw, 28px)' }}
        >
          Department Heads
        </TextReveal>

        {/* shifted right on md+ */}
        <StaggerContainer
          stagger={0.08}
          className="mx-auto max-w-6xl md:pl-12 lg:pl-24 xl:pl-40 md:translate-x-2 lg:translate-x-4 xl:translate-x-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { src: '/images/architect.png', alt: 'Design Studio', name: 'Vincent Hammond', dept: 'Design Studio', title: 'Architect' },
              { src: '/images/chip.png', alt: 'Information Technology', name: 'Eugene Osei-Adjapong', dept: 'Information Technology', title: 'Chief Technology Officer' },
              { src: '/images/cost.jpg', alt: 'Cost Management', name: 'Philip Opare', dept: 'Cost Management & Procurement Dept.', title: 'Quantity Surveyor | Cost Consultant | PMP' },
              { src: '/images/book.png', alt: 'Civil & Structural', name: 'Daniel Sam', dept: 'Civil & Structural Engineering Dept.', title: 'Structural Engineer' },
              { src: '/images/electrical.png', alt: 'Electrical Engineering', name: 'Alexander Nartey', dept: 'Electrical Engineering & Automation Dept.', title: 'Electrical Engineer' },
              { src: '/images/gears.png', alt: 'Mechanical Engineering', name: 'Richmond Akoliga', dept: 'Mechanical Engineering Dept.', title: 'Mechanical Engineer' },
            ].map((head) => (
              <motion.div
                key={head.name}
                variants={staggerItemVariants}
                className="flex items-start gap-3 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Image src={head.src} alt={head.alt} width={40} height={40} className="shrink-0 transition-transform group-hover:scale-110" loading="lazy" />
                <div className="text-left">
                  <p className="font-bold text-gray-900 leading-tight">{head.name}</p>
                  <p className="text-[#8b6b52] text-sm leading-tight">{head.dept}</p>
                  <p className="text-sm text-gray-600 leading-tight">{head.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

/* Email link with copy */
function EmailLink({ email, className = '' }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <a href={`mailto:${email}`} className="text-gray-600 text-sm hover:underline">
        {email}
      </a>
      <motion.button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${email} to clipboard`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-xs px-2 py-1 rounded border border-[#8b6b52]/30 text-[#8b6b52] hover:bg-[#8b6b52]/10 transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </motion.button>
    </div>
  );
}
