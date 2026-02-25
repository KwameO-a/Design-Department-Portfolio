'use client';

import { ParallaxImage } from './animations';
import { getBlur } from '../lib/blur-placeholders';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background with blur placeholder */}
      <ParallaxImage
        src="/images/Hero.png"
        alt="Hero background"
        speed={0.15}
        priority
        sizes="100vw"
        quality={90}
        blurDataURL={getBlur('/images/Hero.png')}
        className="absolute inset-0"
        overlay={0.3}
      />

      {/* Content — animated entrance */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-wider"
        >
          ARCHITECTURE
        </motion.h1>
      </div>
    </section>
  );
}
