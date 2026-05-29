'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const revealImageVariants: Variants = {
  hidden: { scale: 1.03 },
  visible: { scale: 1, transition: { duration: 0.6, ease: EASE } },
};

type RevealContainerProps = {
  as?: 'div' | 'ul';
  children: ReactNode;
  className?: string;
  staggerSeconds?: number;
};

export function RevealContainer({
  as = 'div',
  children,
  className,
  staggerSeconds = 0.05,
}: RevealContainerProps) {
  const Component = as === 'ul' ? motion.ul : motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: staggerSeconds } } }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  as = 'article',
  children,
  className,
}: {
  as?: 'article' | 'div' | 'li';
  children: ReactNode;
  className?: string;
}) {
  const Component = as === 'article' ? motion.article : as === 'li' ? motion.li : motion.div;
  return (
    <Component variants={revealItemVariants} className={className}>
      {children}
    </Component>
  );
}

export function RevealImage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealImageVariants} className={className}>
      {children}
    </motion.div>
  );
}
