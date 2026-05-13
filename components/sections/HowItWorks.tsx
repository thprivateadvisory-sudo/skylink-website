'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Store, Plane, Home, Clock, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const STEPS = [
  {
    n: '01',
    icon: Store,
    label: 'Préparation',
    title: 'Le restaurant prépare et scelle.',
    desc: 'Dès la commande validée, le restaurant partenaire prépare le repas et le glisse dans un boîtier isotherme verrouillé, identifié par QR-code, sur le kiosque SkyLink installé en façade.',
    time: '0:00 – 2:30',
    metric: { label: 'Préparation', value: '< 3 min' },
  },
  {
    n: '02',
    icon: Plane,
    label: 'Vol autonome',
    title: 'Le drone décolle, vole, navigue.',
    desc: 'Le drone se verrouille au boîtier, décolle verticalement du kiosque, rejoint son corridor U-Space et trace sa trajectoire : altitude 100-120 m, vitesse 60 km/h, supervision 24/7 par notre centre de commande.',
    time: '2:30 – 6:30',
    metric: { label: 'Vitesse', value: '60 km/h' },
  },
  {
    n: '03',
    icon: Home,
    label: 'Atterrissage',
    title: 'Livraison à domicile, sans contact.',
    desc: 'Le drone descend sur la plateforme du client (balcon, jardin, toit-terrasse, point relais), dépose le boîtier, redécolle. Le client déverrouille via l’app. Total : moins de 8 minutes, porte-à-porte.',
    time: '6:30 – 8:00',
    metric: { label: 'Total', value: '< 8 min' },
  },
];

/* Drone path along the journey — SVG path string */
const DRONE_PATH =
  'M 90 360 C 220 200, 380 140, 600 220 S 980 380, 1110 240';

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [active, setActive] = useState(0);

  // Drone progress along path (0..1)
  const droneProgress = useTransform(scrollYProgress, [0.18, 0.82], [0, 1]);
  const beamOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const dashOffset = useTransform(scrollYProgress, [0.15, 0.85], [1500, 0]);

  // Active step depends on scroll
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.35) setActive(0);
    else if (v < 0.65) setActive(1);
    else setActive(2);
  });

  // Drone position state (we update on every frame)
  const [pos, setPos] = useState({ x: 90, y: 360, angle: 0 });
  const [pathEl, setPathEl] = useState<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (!pathEl) return;
    setPathLen(pathEl.getTotalLength());
  }, [pathEl]);

  useMotionValueEvent(droneProgress, 'change', (p) => {
    if (!pathEl || !pathLen) return;
    const dist = pathLen * Math.max(0, Math.min(1, p));
    const point = pathEl.getPointAtLength(dist);
    const next = pathEl.getPointAtLength(Math.min(pathLen, dist + 1));
    const angle = Math.atan2(next.y - point.y, next.x - point.x) * (180 / Math.PI);
    setPos({ x: point.x, y: point.y, angle });
  });

  return (
    <section
      ref={ref}
      id="comment"
      className="relative bg-ink-900"
      style={{ minHeight: '300vh' }}
    >
      {/* Sticky inner */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 grid-bg opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
          className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan/10 blur-[160px] rounded-full"
        />
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.5, 1], [0, 1]) }}
          className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-emerald/10 blur-[160px] rounded-full"
        />

        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col">
          {/* Header band */}
          <div className="pt-24 md:pt-28 pb-6 md:pb-8">
            <SectionHeader
              eyebrow="Comment ça marche"
              title={
                <>
                  Du restaurant à votre porte,{' '}
                  <span className="italic font-light text-gradient-aurora">
                    en 3 étapes.
                  </span>
                </>
              }
            />
          </div>

          {/* Body — 2 cols on desktop */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-10 md:pb-16 min-h-0">
            {/* LEFT: animated step card */}
            <div className="lg:col-span-5 flex items-center">
              <div className="relative w-full">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.n}
                      initial={false}
                      animate={{
                        opacity: active === i ? 1 : 0,
                        y: active === i ? 0 : 20,
                        pointerEvents: active === i ? 'auto' : 'none',
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <div className="glass-strong border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                        {/* Top tag row */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan/20 to-emerald/10 border border-cyan/30 flex items-center justify-center">
                              <Icon size={18} className="text-cyan" />
                            </div>
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.22em] text-cyan/80 uppercase">
                                Étape {step.n}
                              </div>
                              <div className="font-display text-sm font-medium text-white/90">
                                {step.label}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-white/40">
                            <Clock size={10} /> {step.time}
                          </div>
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white leading-[1.15] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed">
                          {step.desc}
                        </p>

                        {/* Metric row */}
                        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-mono text-[9px] tracking-[0.22em] text-white/30 uppercase">
                              {step.metric.label}
                            </div>
                            <div className="font-display text-2xl font-semibold text-gradient-cyan tabular-nums mt-1">
                              {step.metric.value}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald/80 text-[11px] font-mono tracking-[0.18em] uppercase">
                            <CheckCircle2 size={12} />
                            Validé
                          </div>
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute top-3 right-3 w-8 h-8 opacity-30 pointer-events-none">
                          <div className="absolute top-0 right-0 w-3 h-px bg-cyan" />
                          <div className="absolute top-0 right-0 w-px h-3 bg-cyan" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Step nav dots */}
                <div className="absolute -bottom-12 lg:-bottom-14 left-0 flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.n}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        active === i
                          ? 'w-10 bg-gradient-to-r from-cyan to-emerald'
                          : 'w-5 bg-white/15'
                      }`}
                    />
                  ))}
                  <div className="ml-3 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    {String(active + 1).padStart(2, '0')} / 03
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SVG journey scene */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 flex items-center">
                <JourneyScene
                  setPathEl={setPathEl}
                  pos={pos}
                  beamOpacity={beamOpacity}
                  dashOffset={dashOffset}
                  active={active}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Journey SVG ──────────────────── */

function JourneyScene({
  setPathEl,
  pos,
  beamOpacity,
  dashOffset,
  active,
}: {
  setPathEl: (el: SVGPathElement | null) => void;
  pos: { x: number; y: number; angle: number };
  beamOpacity: import('framer-motion').MotionValue<number>;
  dashOffset: import('framer-motion').MotionValue<number>;
  active: number;
}) {
  return (
    <svg
      viewBox="0 0 1200 500"
      className="w-full h-full max-h-[80vh]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,0.10)" />
          <stop offset="60%" stopColor="rgba(0,229,255,0.02)" />
          <stop offset="100%" stopColor="rgba(0,255,163,0.0)" />
        </linearGradient>
        {/* Path gradient */}
        <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#00ffa3" />
          <stop offset="100%" stopColor="#22f0ff" />
        </linearGradient>
        {/* Glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>

      {/* Sky gradient bg */}
      <rect x="0" y="0" width="1200" height="500" fill="url(#sky)" />

      {/* Distant city silhouette */}
      <g opacity="0.2">
        <path
          d="M 0 500 L 0 410 L 30 410 L 30 380 L 60 380 L 60 420 L 90 420 L 90 360 L 130 360 L 130 400 L 170 400 L 170 350 L 210 350 L 210 390 L 250 390 L 250 370 L 290 370 L 290 410 L 330 410 L 330 380 L 380 380 L 380 420 L 430 420 L 430 360 L 470 360 L 470 400 L 520 400 L 520 350 L 560 350 L 560 390 L 600 390 L 600 370 L 650 370 L 650 410 L 700 410 L 700 380 L 750 380 L 750 420 L 800 420 L 800 360 L 850 360 L 850 400 L 900 400 L 900 350 L 950 350 L 950 390 L 1000 390 L 1000 370 L 1050 370 L 1050 410 L 1100 410 L 1100 380 L 1150 380 L 1150 400 L 1200 400 L 1200 500 Z"
          fill="url(#path-grad)"
          opacity="0.18"
        />
      </g>

      {/* Foreground city silhouette (closer, more contrast) */}
      <g opacity="0.5">
        <path
          d="M 0 500 L 0 450 L 70 450 L 70 430 L 140 430 L 140 460 L 220 460 L 220 410 L 290 410 L 290 440 L 360 440 L 360 420 L 440 420 L 440 460 L 530 460 L 530 430 L 610 430 L 610 450 L 700 450 L 700 420 L 790 420 L 790 460 L 880 460 L 880 430 L 970 430 L 970 410 L 1060 410 L 1060 450 L 1150 450 L 1150 430 L 1200 430 L 1200 500 Z"
          fill="#0a0e12"
        />
      </g>

      {/* Window lights random */}
      <g opacity="0.5">
        {[
          [40, 460], [50, 470], [85, 445], [160, 470], [180, 445],
          [240, 425], [270, 450], [310, 455], [380, 435], [410, 460],
          [470, 435], [510, 470], [560, 440], [630, 460], [680, 435],
          [740, 470], [820, 435], [860, 470], [930, 445], [1010, 425],
          [1080, 460], [1130, 440], [1170, 460],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="3"
            height="3"
            fill={i % 3 === 0 ? '#00ffa3' : '#00e5ff'}
            opacity={0.6 + (i % 4) * 0.1}
          />
        ))}
      </g>

      {/* Restaurant building (left) — kiosque */}
      <g
        transform="translate(50, 320)"
        style={{ opacity: active === 0 ? 1 : 0.45, transition: 'opacity 0.5s' }}
      >
        {/* Building */}
        <rect x="0" y="0" width="80" height="80" fill="#10151b" stroke="#00e5ff" strokeOpacity="0.4" />
        <rect x="10" y="12" width="14" height="14" fill="#00e5ff" opacity="0.4" />
        <rect x="30" y="12" width="14" height="14" fill="#00ffa3" opacity="0.4" />
        <rect x="50" y="12" width="14" height="14" fill="#00e5ff" opacity="0.4" />
        <rect x="10" y="34" width="14" height="14" fill="#00e5ff" opacity="0.3" />
        <rect x="30" y="34" width="14" height="14" fill="#00e5ff" opacity="0.3" />
        <rect x="50" y="34" width="14" height="14" fill="#00ffa3" opacity="0.3" />
        {/* SkyLink kiosk on roof */}
        <rect x="20" y="-22" width="40" height="22" fill="#0a0e12" stroke="#00e5ff" strokeOpacity="0.7" />
        <rect x="26" y="-15" width="28" height="2" fill="#00ffa3" />
        <circle cx="40" cy="-22" r="3" fill="#00e5ff">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
        </circle>
        {/* Label */}
        <text
          x="40"
          y="100"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#00e5ff"
          opacity="0.7"
          letterSpacing="2"
        >
          KIOSQUE FR-001
        </text>
      </g>

      {/* Customer rooftop landing pad (right) */}
      <g
        transform="translate(1080, 200)"
        style={{ opacity: active === 2 ? 1 : 0.5, transition: 'opacity 0.5s' }}
      >
        {/* Building */}
        <rect x="0" y="0" width="80" height="220" fill="#10151b" stroke="#00ffa3" strokeOpacity="0.4" />
        {[20, 50, 80, 110, 140, 170].map((y, i) => (
          <g key={i}>
            <rect x="10" y={y} width="14" height="14" fill="#00e5ff" opacity={0.25 + (i % 3) * 0.15} />
            <rect x="30" y={y} width="14" height="14" fill="#00ffa3" opacity={0.25 + ((i + 1) % 3) * 0.15} />
            <rect x="50" y={y} width="14" height="14" fill="#00e5ff" opacity={0.25 + ((i + 2) % 3) * 0.15} />
          </g>
        ))}
        {/* Landing pad on roof */}
        <g transform="translate(40, -10)">
          <ellipse cx="0" cy="0" rx="34" ry="10" fill="#10151b" stroke="#00ffa3" strokeOpacity="0.7" />
          <ellipse cx="0" cy="-1" rx="22" ry="6" fill="none" stroke="#00ffa3" strokeOpacity="0.8" />
          <circle cx="0" cy="-2" r="3" fill="#00ffa3" />
          {active === 2 && (
            <ellipse cx="0" cy="0" rx="34" ry="10" fill="none" stroke="#00ffa3" strokeWidth="1.5">
              <animate attributeName="rx" from="34" to="60" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="ry" from="10" to="18" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
          )}
        </g>
        <text
          x="40"
          y="240"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#00ffa3"
          opacity="0.7"
          letterSpacing="2"
        >
          CLIENT 14e
        </text>
      </g>

      {/* Flight path — dashed background */}
      <path
        d={DRONE_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Flight path — animated overlay (drawn as you scroll) */}
      <motion.path
        ref={(el) => setPathEl(el)}
        d={DRONE_PATH}
        fill="none"
        stroke="url(#path-grad)"
        strokeWidth="2"
        strokeDasharray="1500"
        style={{ strokeDashoffset: dashOffset, filter: 'url(#glow)' }}
      />

      {/* Waypoints along path */}
      {[
        { x: 90, y: 360, label: 'DÉPART' },
        { x: 600, y: 220, label: 'CRUISE · 120m' },
        { x: 1110, y: 240, label: 'ARRIVÉE' },
      ].map((wp, i) => (
        <g key={i} transform={`translate(${wp.x}, ${wp.y})`}>
          <circle r="6" fill="#040608" stroke="#00e5ff" strokeWidth="1.5" />
          <circle r="2" fill="#00e5ff" />
          <text
            x="0"
            y="-14"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="8"
            fill="#00e5ff"
            opacity="0.6"
            letterSpacing="1.5"
          >
            {wp.label}
          </text>
        </g>
      ))}

      {/* Beam from drone when delivering */}
      <motion.g style={{ opacity: beamOpacity }}>
        <line
          x1={pos.x}
          y1={pos.y}
          x2={1120}
          y2={210}
          stroke="#00ffa3"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.6"
        />
      </motion.g>

      {/* Drone marker — moves along path */}
      <g transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.angle})`}>
        {/* Halo */}
        <circle r="22" fill="#00e5ff" opacity="0.18">
          <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Body */}
        <g>
          {/* Arms cross */}
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#161c24" strokeWidth="3" strokeLinecap="round" />
          <line x1="-12" y1="12" x2="12" y2="-12" stroke="#161c24" strokeWidth="3" strokeLinecap="round" />
          {/* Center */}
          <rect x="-7" y="-4" width="14" height="8" rx="1" fill="#0a0e12" stroke="#00e5ff" strokeWidth="0.5" />
          <rect x="-3" y="-1" width="6" height="2" fill="#00ffa3" />
          {/* Propellers */}
          <circle cx="-12" cy="-12" r="6" fill="none" stroke="#00e5ff" strokeOpacity="0.6" strokeWidth="1" />
          <circle cx="12" cy="12" r="6" fill="none" stroke="#00e5ff" strokeOpacity="0.6" strokeWidth="1" />
          <circle cx="-12" cy="12" r="6" fill="none" stroke="#00ffa3" strokeOpacity="0.6" strokeWidth="1" />
          <circle cx="12" cy="-12" r="6" fill="none" stroke="#00ffa3" strokeOpacity="0.6" strokeWidth="1" />
          {/* Cargo — only visible while in flight */}
          {active >= 1 && active < 3 && (
            <g>
              <line x1="0" y1="4" x2="0" y2="14" stroke="#00e5ff" strokeWidth="0.5" />
              <rect x="-4" y="14" width="8" height="6" rx="1" fill="#1a2129" stroke="#00ffa3" strokeWidth="0.5" />
            </g>
          )}
        </g>
      </g>

      {/* Telemetry mini panel — top right of viewport */}
      <g
        transform="translate(990, 60)"
        opacity={active === 1 ? 1 : 0.4}
        style={{ transition: 'opacity 0.5s' }}
      >
        <rect
          x="0"
          y="0"
          width="180"
          height="68"
          rx="8"
          fill="rgba(10,14,18,0.8)"
          stroke="rgba(0,229,255,0.2)"
        />
        <text x="12" y="18" fontFamily="ui-monospace, monospace" fontSize="9" fill="#00e5ff" letterSpacing="2">
          UAV-TELEMETRY
        </text>
        <line x1="12" y1="24" x2="168" y2="24" stroke="rgba(255,255,255,0.06)" />
        <text x="12" y="40" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)">
          ALT
        </text>
        <text x="40" y="40" fontFamily="ui-monospace, monospace" fontSize="10" fill="#fff">
          118m
        </text>
        <text x="92" y="40" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)">
          SPD
        </text>
        <text x="120" y="40" fontFamily="ui-monospace, monospace" fontSize="10" fill="#fff">
          17.4m/s
        </text>
        <text x="12" y="58" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)">
          BAT
        </text>
        <text x="40" y="58" fontFamily="ui-monospace, monospace" fontSize="10" fill="#00ffa3">
          87%
        </text>
        <text x="92" y="58" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)">
          ETA
        </text>
        <text x="120" y="58" fontFamily="ui-monospace, monospace" fontSize="10" fill="#00e5ff">
          0:37
        </text>
      </g>

      {/* Cloud-like accents */}
      <g opacity="0.15">
        <ellipse cx="380" cy="100" rx="60" ry="8" fill="#00e5ff" />
        <ellipse cx="780" cy="80" rx="80" ry="6" fill="#00ffa3" />
      </g>
    </svg>
  );
}
