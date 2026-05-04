'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, Plane, Battery, Signal, Navigation, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const DroneScene = dynamic(
  () => import('@/components/ui/DroneScene').then((m) => m.DroneScene),
  { ssr: false }
);

/* ──────────── Live counter ──────────── */
function Counter({
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useMotionValueEvent(mv, 'change', (v) => {
    setDisplay(v.toFixed(decimals));
  });

  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [mv, to, duration]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ──────────── Live HUD ──────────── */
function LiveHUD() {
  const [battery, setBattery] = useState(87);
  const [eta, setEta] = useState(247);
  const [alt, setAlt] = useState(118);
  const [spd, setSpd] = useState(17.4);

  useEffect(() => {
    const i = setInterval(() => {
      setBattery((b) => Math.max(45, b - Math.random() * 0.4));
      setEta((e) => (e <= 10 ? 380 : e - 1));
      setAlt(118 + Math.sin(Date.now() / 1500) * 4);
      setSpd(17.4 + Math.sin(Date.now() / 900) * 1.6);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, '0')}`;
  };

  return (
    <div className="hidden md:block absolute top-28 right-4 lg:right-8 z-20 w-[230px] glass-strong rounded-xl border border-white/10 p-3.5 font-mono text-[10px] tracking-[0.12em] uppercase">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
        <div className="flex items-center gap-1.5 text-cyan/90">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
            <span className="relative rounded-full bg-emerald w-1.5 h-1.5" />
          </span>
          UAV-04 · LIVE
        </div>
        <span className="text-white/30">FR-PARIS</span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div>
          <div className="flex items-center gap-1 text-white/40">
            <Battery size={10} /> Bat.
          </div>
          <div className="text-emerald text-[13px] mt-0.5">
            {battery.toFixed(0)}%
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-white/40">
            <Clock size={10} /> ETA
          </div>
          <div className="text-cyan text-[13px] mt-0.5">{fmt(eta)}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-white/40">
            <Navigation size={10} /> Alt.
          </div>
          <div className="text-white text-[13px] mt-0.5">
            {alt.toFixed(0)}<span className="text-white/30 text-[10px]">m</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-white/40">
            <Signal size={10} /> Vit.
          </div>
          <div className="text-white text-[13px] mt-0.5">
            {spd.toFixed(1)}<span className="text-white/30 text-[10px]">m/s</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-white/5">
        <div className="text-white/30 text-[9px]">Cible</div>
        <div className="text-white/80 text-[11px] mt-0.5 normal-case tracking-normal font-sans">
          14 rue de Rivoli, 75001
        </div>
      </div>
    </div>
  );
}

/* ──────────── Order ticker ──────────── */
const ORDERS = [
  { emoji: '🍕', what: 'Pizza Margherita', from: 'La Bottega · Paris 11', eta: '4 min' },
  { emoji: '🥗', what: 'Poke bowl saumon', from: 'Sunset Bowl · Paris 9', eta: '5 min' },
  { emoji: '🍔', what: 'Burger truffe', from: 'Le Comptoir · Lyon 2', eta: '6 min' },
  { emoji: '🍣', what: 'Plateau sushi 24p.', from: 'Tokyo Express · Marseille', eta: '7 min' },
  { emoji: '☕', what: 'Latte glacé + cookie', from: 'Café Dahlia · Bordeaux', eta: '3 min' },
  { emoji: '🥐', what: 'Petit-déjeuner duo', from: 'Maison Pierre · Paris 7', eta: '5 min' },
];

function OrderTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % ORDERS.length), 3500);
    return () => clearInterval(id);
  }, []);
  const order = ORDERS[i];

  return (
    <div className="hidden md:block absolute bottom-28 right-4 lg:right-8 z-20 w-[270px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -10, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-xl border border-white/10 p-3.5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan/20 to-emerald/10 flex items-center justify-center text-lg">
              {order.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-[9px] tracking-[0.2em] text-emerald/90 uppercase">
                  Commande reçue
                </span>
                <span className="text-cyan text-[10px] font-mono tabular-nums">
                  · {order.eta}
                </span>
              </div>
              <div className="text-sm text-white font-medium truncate">
                {order.what}
              </div>
              <div className="text-[11px] text-white/50 truncate">
                {order.from}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ──────────── Hero ──────────── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 20 });
  const py = useSpring(my, { stiffness: 80, damping: 20 });
  const blob1X = useTransform(px, (v) => v * 30);
  const blob1Y = useTransform(py, (v) => v * 20);
  const blob2X = useTransform(px, (v) => v * -40);
  const blob2Y = useTransform(py, (v) => v * -25);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 radial-fade" />

      {/* Aurora gradient blobs (mouse-reactive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-32 w-[700px] h-[700px] rounded-full bg-cyan/20 blur-[140px]"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -left-32 w-[600px] h-[600px] rounded-full bg-emerald/15 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[120px]"
        />
      </div>

      {/* Scanning beam line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50 animate-scan pointer-events-none" />

      {/* Three.js drone scene */}
      <div className="absolute inset-0 lg:left-[36%]">
        {mounted && <DroneScene />}
      </div>

      {/* Vignette to lift left content */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ink-900/90 via-ink-900/40 to-transparent lg:from-ink-900/95 lg:via-ink-900/30" />

      {/* Diagonal accent */}
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

      {/* HUD overlays */}
      <LiveHUD />
      <OrderTicker />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-24 min-h-[100svh] flex flex-col justify-center"
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
              Pionnier français · 2026
            </span>
          </span>
          <span className="text-xs text-white/60">
            Pré-série A · Cat. Specific EASA
          </span>
        </motion.div>

        {/* Heading */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-semibold tracking-[-0.04em] leading-[0.92] text-[clamp(2.8rem,8.5vw,7.5rem)] text-white"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                La livraison
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient-cyan"
              >
                descend du ciel
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block italic font-light text-gradient-aurora"
              >
                en moins de 8 min.
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
          <strong className="text-white/90 font-medium">SkyLink</strong> est le premier
          opérateur français de livraison alimentaire par drone via kiosques urbains.
          Une infrastructure verticale, autonome, conforme EASA — prête à ré-écrire la
          dernière dizaine de mètres.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <Button href="#investir" variant="primary">
            Investir dans l'avenir
          </Button>
          <Button href="#vision" variant="secondary">
            Découvrir le projet
          </Button>
          <a
            href="#vision"
            className="hidden sm:inline-flex items-center gap-2 text-white/50 hover:text-cyan transition-colors text-sm group"
          >
            <span className="relative flex h-7 w-7 rounded-full border border-cyan/30 items-center justify-center group-hover:border-cyan transition-colors">
              <Plane size={11} className="text-cyan rotate-45" />
            </span>
            Voir la démo en 90 sec.
          </a>
        </motion.div>

        {/* Stats strip — animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 max-w-3xl border border-white/5 rounded-2xl overflow-hidden glass"
        >
          {[
            { k: <Counter to={8} suffix=" min" />, v: 'temps de livraison cible', icon: Clock },
            { k: <Counter to={92} suffix="%" />, v: 'CO₂ évité vs scooter', icon: Plane },
            { k: <Counter to={4} suffix=" villes" />, v: 'pilotes France 2026', icon: Navigation },
            { k: <Counter to={2.5} decimals={1} suffix=" M€" />, v: 'levée pré-série A', icon: Package },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-ink-900/60 p-4 md:p-5 relative group">
                <Icon
                  size={14}
                  className="absolute top-3 right-3 text-cyan/30 group-hover:text-cyan transition-colors"
                />
                <div className="font-display text-2xl md:text-3xl font-semibold text-white tracking-tight tabular-nums">
                  {stat.k}
                </div>
                <div className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-white/40 mt-1">
                  {stat.v}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 items-center text-[11px] font-mono uppercase tracking-[0.18em] text-white/30"
        >
          <span className="text-white/50">Cadre réglementaire</span>
          <span className="hover:text-cyan transition-colors cursor-default">EASA · Specific</span>
          <span className="hover:text-cyan transition-colors cursor-default">DGAC France</span>
          <span className="hover:text-cyan transition-colors cursor-default">U-Space</span>
          <span className="hover:text-cyan transition-colors cursor-default">SORA</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#vision"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 group"
        aria-label="Faire défiler"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase group-hover:text-cyan transition-colors">
          Scroller
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-cyan" />
        </motion.div>
      </motion.a>
    </section>
  );
}
