'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlurImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  quality?: number;
  /** Show shimmer loading skeleton */
  shimmer?: boolean;
}

/**
 * Image component with blur-up loading effect.
 * Shows a blurred placeholder → shimmers → reveals the sharp image.
 */
export default function BlurImage({
  src,
  alt,
  blurDataURL,
  fill,
  width,
  height,
  sizes,
  priority = false,
  loading,
  className = '',
  quality,
  shimmer = true,
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      style={fill ? { position: 'absolute', inset: 0 } : { width: width ?? '100%', height: height ?? 'auto' }}
    >
      {/* Shimmer skeleton while loading */}
      {shimmer && !loaded && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: blurDataURL
              ? `url(${blurDataURL}) center/cover no-repeat`
              : 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: blurDataURL ? 'cover' : '200% 100%',
            animation: blurDataURL ? 'none' : 'shimmer 1.5s ease-in-out infinite',
            filter: blurDataURL ? 'blur(20px)' : 'none',
            transform: blurDataURL ? 'scale(1.1)' : 'none',
          }}
        />
      )}

      {/* Actual image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-20"
        style={fill ? { position: 'absolute', inset: 0 } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          sizes={sizes}
          priority={priority}
          loading={loading}
          quality={quality}
          className={className}
          onLoad={() => setLoaded(true)}
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
        />
      </motion.div>
    </motion.div>
  );
}
