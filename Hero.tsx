'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, Plane } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const DroneScene = dynamic(
  () => import('@/components/ui/DroneScene').then((m) => m.DroneScene),
  { ssr: false }
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-ink-900"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 radial-fade" />

      {/* Aurora gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-cyan/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-emerald/15 blur-[120px]"
        />
      </div>

      {/* Scanning beam line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50 animate-scan pointer-events-none" />

      {/* Three.js drone scene - positioned right side */}
      <div className="absolute inset-0 lg:left-[40%]">
        {mounted && <DroneScene />}
      </div>

      {/* Diagonal accent line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0"
          y1="80"
          x2="100"
          y2="60"
          stroke="url(#hero-line)"
          strokeWidth="0.1"
          strokeDasharray="0.5,1"
        />
        <defs>
          <linearGradient id="hero-line" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(0,229,255,0)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.6)" />
            <stop offset="100%" stopColor="rgba(0,255,163,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-24 min-h-screen flex flex-col justify-center"
      >
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 self-start glass rounded-full pl-2 pr-4 py-1.5 mb-8"
        >
          <span className="flex items-center gap-1.5 bg-emerald/10 border border-emerald/30 rounded-full px-2.5 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
              <span className="relative rounded-full bg-emerald w-1.5 h-1.5" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-emerald uppercase">
              Phase pilote
            </span>
          </span>
          <span className="text-xs text-white/60">
            Premiers tests en zone Specific · 2026
          </span>
        </motion.div>

        {/* Heading */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-semibold tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,9vw,7.5rem)] text-white"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                SkyLink
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient-cyan"
              >
                La livraison qui
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block italic font-light text-gradient-aurora"
              >
                prend son envol.
              </motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed"
        >
          Pionnier français de la livraison alimentaire par drone via kiosques dédiés.
          Notre ambition : faire descendre vos repas du ciel en quelques minutes,
          dans le respect des cadres EASA et DGAC.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="#vision" variant="primary">
            Découvrir le projet
          </Button>
          <Button href="#investir" variant="secondary">
            Investir dans l'avenir
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 max-w-3xl border border-white/5 rounded-2xl overflow-hidden glass"
        >
          {[
            { k: '< 8 min', v: 'temps de livraison cible' },
            { k: '0 émission', v: 'à l’usage du drone' },
            { k: 'Cat. Specific', v: 'cadre EASA visé' },
            { k: '4 villes', v: 'zones tests envisagées' },
          ].map((stat, i) => (
            <div key={i} className="bg-ink-900/60 p-5">
              <div className="font-display text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {stat.k}
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mt-1">
                {stat.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Scroller
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-cyan" />
        </motion.div>
      </motion.div>

      {/* Tech overlay - top right corner */}
      <div className="hidden md:block absolute top-28 right-8 z-20 font-mono text-[10px] text-cyan/50 tracking-[0.15em] uppercase pointer-events-none">
        <div className="flex items-center gap-2">
          <Plane size={10} className="rotate-45" />
          <span>UAV · TELEMETRY</span>
        </div>
        <div className="mt-1 text-white/30">ALT 120m · SPD 18m/s</div>
        <div className="text-emerald/60">SIGNAL · NOMINAL</div>
      </div>
    </section>
  );
}
