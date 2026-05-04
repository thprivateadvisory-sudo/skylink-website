'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  variant?: Variant;
  withArrow?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', withArrow = true, href = '#', className, children, ...rest },
  ref
) {
  const base =
    'group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display text-sm font-medium tracking-wide transition-colors overflow-hidden';

  const styles: Record<Variant, string> = {
    primary:
      'bg-gradient-to-r from-cyan to-emerald text-ink-900 hover:shadow-glow-cyan',
    secondary:
      'glass-strong text-white border border-white/10 hover:border-cyan/50 hover:text-cyan',
    ghost:
      'text-white/80 hover:text-white',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(base, styles[variant], className)}
      {...rest}
    >
      {/* Sheen on hover for primary */}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
        />
      )}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight
          size={16}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </motion.a>
  );
});
