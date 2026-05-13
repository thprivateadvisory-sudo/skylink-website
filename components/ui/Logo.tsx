'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Mark */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          aria-hidden
        >
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#00ffa3" />
            </linearGradient>
          </defs>
          {/* Stylised wing / drone */}
          <path
            d="M2 16 L14 12 L16 4 L18 12 L30 16 L18 20 L16 28 L14 20 Z"
            stroke="url(#lg)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(0, 229, 255, 0.06)"
          />
          <circle cx="16" cy="16" r="2" fill="url(#lg)" />
        </svg>
        <div className="absolute inset-0 blur-[8px] opacity-60">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <circle cx="16" cy="16" r="2" fill="#00e5ff" />
          </svg>
        </div>
      </motion.div>

      {/* Wordmark */}
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Sky<span className="text-cyan">Link</span>
      </span>
    </div>
  );
}
