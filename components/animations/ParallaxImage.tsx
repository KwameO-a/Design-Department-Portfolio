'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax speed: 0 = none, 0.5 = heavy */
  speed?: number;
  /** Optional blur placeholder */
  blurDataURL?: string;
  /** Priority loading (for hero) */
  priority?: boolean;
  /** Extra className for the container */
  className?: string;
  /** Extra className for the image */
  imgClassName?: string;
  /** Sizes attribute */
  sizes?: string;
  /** Quality */
  quality?: number;
  /** Dark overlay opacity (0-1) */
  overlay?: number;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  blurDataURL,
  priority = false,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  quality = 85,
  overlay = 0,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  // Don't add 'relative' when caller already passes an absolute/fixed position
  const hasPosition = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div ref={ref} className={`${hasPosition ? '' : 'relative'} overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-20%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          className={`object-cover object-center ${imgClassName}`}
        />
      </motion.div>
      {overlay > 0 && (
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlay})` }} />
      )}
    </div>
  );
}
