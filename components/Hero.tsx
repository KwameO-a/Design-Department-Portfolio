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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block border-2 border-white/80 p-8 mb-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-wider mb-2"
          >
            ARCHITECTURE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg md:text-xl tracking-widest"
          >
            AND DESIGN PORTFOLIO
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          className="text-2xl md:text-3xl font-light tracking-widest"
        >
          MMXXVI
        </motion.div>
      </div>
    </section>
  );
}
