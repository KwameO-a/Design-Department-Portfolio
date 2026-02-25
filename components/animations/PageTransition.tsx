'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

function AnimatedContent({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnimatedContent>{children}</AnimatedContent>
    </Suspense>
  );
}
