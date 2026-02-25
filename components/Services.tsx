'use client';

import { ScrollReveal, TextReveal, BlurImage } from './animations';
import { getBlur } from '../lib/blur-placeholders';

export default function Services() {
  return (
    <section id="services" className="bg-white relative py-16 px-8 lg:px-16">
      <div className="absolute top-8 right-8 z-10" />

      <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] gap-8">
        {/* Left Section - Image with blur-up + scroll reveal */}
        <ScrollReveal direction="left" className="w-full lg:w-1/2">
          <div className="relative w-full rounded-md shadow-md overflow-hidden h-56 sm:h-72 md:h-96 lg:h-full min-h-[300px]">
            <BlurImage
              src="/images/works/houseinsquare4.jpg"
              alt="About us hero"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              blurDataURL={getBlur('/images/works/houseinsquare4.jpg')}
            />
          </div>
        </ScrollReveal>

        {/* Right Section - Content */}
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="w-full max-w-lg">
            <TextReveal
              as="h2"
              variant="fade-up"
              className="text-4xl font-bold mb-8 tracking-wide"
              style={{ color: '#8b6b52' }}
            >
              ABOUT US
            </TextReveal>

            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
              <ScrollReveal delay={0.1}>
                <p className="text-sm">
                  At The Design Department, we are a dynamic collective of architects, designers, and creative
                  thinkers dedicated to exploring the intersection between design and the human condition.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-sm">
                  We believe that design is more than form and function—it is a catalyst for shaping experiences,
                  inspiring emotion, and enhancing the way people live, work, and connect.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-sm">
                  Our multidisciplinary team thrives on curiosity, collaboration, and innovation, constantly pushing
                  boundaries to create solutions that are as thoughtful as they are beautiful. From concept to
                  completion, we approach each project with a sensitivity to context, culture, and the people it serves.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-sm">
                  Driven by a passion for meaningful design, we aim to craft environments, products, and experiences
                  that not only respond to practical needs but also enrich the human story.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
