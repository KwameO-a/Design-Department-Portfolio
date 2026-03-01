'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal, BlurImage, ScrollTextFill } from './animations';
import { getBlur } from '../lib/blur-placeholders';

export default function Contact() {
  return (
    <section id="contact" className="bg-white min-h-screen flex flex-col lg:flex-row">
      {/* Left Column – Logo and Intro Text */}
      <ScrollReveal direction="left" className="lg:w-1/3 p-8 flex flex-col justify-center">
        <Image
          src="/images/Logo.png"
          alt="Design Department Logo"
          width={192}
          height={96}
          className="w-48 mb-8 mx-auto lg:mx-0"
          loading="lazy"
          placeholder="blur"
          blurDataURL={getBlur('/images/Logo.png')}
        />
        <div className="space-y-4 text-sm text-gray-700 text-justify">
          <p>
            We'd love to hear from you. Whether you're starting a new project,
            seeking design collaboration, or simply want to learn more about our
            work, we welcome the conversation.
          </p>
          <p>
            At the heart of what we do is a belief in meaningful engagement, so
            let's talk about how we can create something exceptional together.
          </p>
        </div>
      </ScrollReveal>

      {/* Center Image with blur-up */}
      <ScrollReveal direction="up" className="lg:w-1/3 relative min-h-[500px]">
        <BlurImage
          src="/images/contact-image.JPG"
          alt="Contact showcase"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover object-center"
          blurDataURL={getBlur('/images/contact-image.JPG')}
        />
      </ScrollReveal>

      {/* Right Column */}
      <ScrollReveal direction="right" className="lg:w-1/3 p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <ScrollTextFill
            as="h2"
            fillColor="#8b6b52"
            className="font-bold tracking-widest mb-2 leading-none text-3xl sm:text-4xl md:text-5xl"
          >
            OUR
          </ScrollTextFill>
          <ScrollTextFill
            as="h2"
            fillColor="#8b6b52"
            className="font-bold tracking-widest leading-tight text-5xl sm:text-6xl md:text-7xl"
          >
            CONTACT
          </ScrollTextFill>
        </div>

        {/* Contact details with hover microinteractions */}
        <div className="mt-8 w-full max-w-xs sm:max-w-sm mx-auto text-left text-gray-800 text-sm space-y-4">
          {[
            { href: 'tel:+233501369226', icon: '/images/call.png', text: '+233 50 136 9226' },
            { href: 'tel:+233501369074', icon: '/images/call.png', text: '+233 50 136 9074' },
            { href: 'mailto:business@designdepartment.work', icon: '/images/icons8-email-50.png', text: 'business@designdepartment.work' },
          ].map((item) => (
            <motion.a
              key={item.text}
              href={item.href}
              className="flex items-center gap-3 group"
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Image src={item.icon} alt="" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="underline-offset-4 group-hover:underline">{item.text}</span>
            </motion.a>
          ))}

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Image src="/images/location.png" alt="" width={20} height={20} className="opacity-80" />
            <span>Accra, Ghana</span>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
