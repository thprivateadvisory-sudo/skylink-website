'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const CITIES = [
  {
    id: 'essonne',
    name: 'Essonne',
    region: 'Île-de-France',
    coords: { x: 48, y: 30 },
    population: '~1,3M hab.',
    rationale:
      'Couronne francilienne au tissu péri-urbain dense, idéal pour valider les premiers corridors aériens à proximité de zones tests existantes.',
    status: 'Étude de faisabilité',
  },
  {
    id: 'orleans',
    name: 'Orléans',
    region: 'Centre-Val de Loire',
    coords: { x: 46, y: 38 },
    population: '~290K hab. agglo.',
    rationale:
      'Métropole moyenne au cadre logistique structuré, offrant un terrain équilibré entre zones résidentielles et axes commerçants.',
    status: 'Pré-discussions locales',
  },
  {
    id: 'toulouse',
    name: 'Toulouse périphérie',
    region: 'Occitanie',
    coords: { x: 38, y: 75 },
    population: '~1M hab. métro.',
    rationale:
      'Capitale aérospatiale française : écosystème industriel mûr, expertise drone disponible, partenariats techniques accessibles.',
    status: 'Cible stratégique',
  },
  {
    id: 'lyon',
    name: 'Lyon Est',
    region: 'Auvergne-Rhône-Alpes',
    coords: { x: 65, y: 60 },
    population: '~1,4M hab. métro.',
    rationale:
      'Pôle économique majeur, demande logistique forte. Nous explorons les zones péri-urbaines de l’est lyonnais à plus faible densité aérienne.',
    status: 'Veille active',
  },
];

export function Cities() {
  const [active, setActive] = useState<string>(CITIES[0].id);
  const activeCity = CITIES.find((c) => c.id === active)!;

  return (
    <section
      id="villes"
      className="relative py-32 md:py-40 overflow-hidden bg-ink-900"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-800/40 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/5 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Villes Tests"
          title={
            <>
              Là où{' '}
              <span className="italic font-light text-gradient-aurora">
                tout commence.
              </span>
            </>
          }
          description="Quatre territoires français à l'étude pour nos phases pilotes. Chaque zone est sélectionnée pour son équilibre entre opportunité, accessibilité réglementaire et soutien local."
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Stylised France map */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-square glass rounded-3xl p-6 md:p-10 overflow-hidden border-gradient">
              {/* Coordinate grid */}
              <div className="absolute inset-0 grid-bg opacity-30" />

              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="tag-mono">Carte · FR</span>
                <span className="font-mono text-[10px] text-white/30">N 46.227 · E 2.213</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-white/30 tracking-[0.18em] uppercase">
                <span>Zones envisagées · 04</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  Live preview
                </span>
              </div>

              {/* Hexagonal France-like silhouette */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full p-12"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="france-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(0,255,163,0.05)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Approximate, abstract hexagon shape */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  d="M 50,8 L 78,18 L 88,42 L 82,68 L 68,86 L 42,90 L 22,76 L 14,52 L 18,28 L 32,14 Z"
                  stroke="url(#france-grad)"
                  strokeWidth="0.4"
                  fill="rgba(0, 229, 255, 0.03)"
                />

                {/* Inner detail lines */}
                <line x1="22" y1="40" x2="78" y2="40" stroke="rgba(0,229,255,0.08)" strokeWidth="0.15" strokeDasharray="0.5,1" />
                <line x1="22" y1="60" x2="78" y2="60" stroke="rgba(0,229,255,0.08)" strokeWidth="0.15" strokeDasharray="0.5,1" />
                <line x1="50" y1="10" x2="50" y2="88" stroke="rgba(0,229,255,0.08)" strokeWidth="0.15" strokeDasharray="0.5,1" />

                {/* City pins */}
                {CITIES.map((city) => {
                  const isActive = city.id === active;
                  return (
                    <g key={city.id}>
                      {/* Pulse */}
                      {isActive && (
                        <circle
                          cx={city.coords.x}
                          cy={city.coords.y}
                          r="3"
                          fill="rgba(0,229,255,0.3)"
                          className="animate-ping origin-center"
                        />
                      )}
                      {/* Outer ring */}
                      <circle
                        cx={city.coords.x}
                        cy={city.coords.y}
                        r={isActive ? 2.4 : 1.6}
                        fill="none"
                        stroke={isActive ? '#00ffa3' : 'rgba(0,229,255,0.5)'}
                        strokeWidth="0.3"
                        filter="url(#glow)"
                        style={{ transition: 'all 0.3s ease' }}
                      />
                      {/* Dot */}
                      <circle
                        cx={city.coords.x}
                        cy={city.coords.y}
                        r="0.8"
                        fill={isActive ? '#00ffa3' : '#00e5ff'}
                        style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                        onClick={() => setActive(city.id)}
                      />
                      {/* Connection line to active */}
                      {isActive && (
                        <line
                          x1="50"
                          y1="50"
                          x2={city.coords.x}
                          y2={city.coords.y}
                          stroke="rgba(0,255,163,0.3)"
                          strokeWidth="0.15"
                          strokeDasharray="0.5,0.5"
                        />
                      )}
                      {/* Label */}
                      <text
                        x={city.coords.x + 3}
                        y={city.coords.y + 1}
                        fontSize="2.2"
                        fill={isActive ? '#00ffa3' : 'rgba(255,255,255,0.5)'}
                        fontFamily="var(--font-mono)"
                        style={{ transition: 'fill 0.3s ease' }}
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}

                {/* Center crosshair */}
                <circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.5)" />
                <line x1="46" y1="50" x2="54" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.1" />
                <line x1="50" y1="46" x2="50" y2="54" stroke="rgba(255,255,255,0.2)" strokeWidth="0.1" />
              </svg>
            </div>
          </div>

          {/* City list + detail */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => setActive(city.id)}
                className={`group text-left glass rounded-2xl p-5 transition-all duration-300 ${
                  active === city.id
                    ? 'border-cyan/50 shadow-glow-soft bg-cyan/[0.03]'
                    : 'hover:border-white/15'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`mt-1 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        active === city.id
                          ? 'bg-cyan/15 text-cyan'
                          : 'bg-white/5 text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-lg font-medium tracking-tight text-white truncate">
                        {city.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/40 mt-0.5">
                        {city.region} · {city.population}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`flex-shrink-0 mt-2 transition-all ${
                      active === city.id
                        ? 'text-cyan translate-x-0'
                        : 'text-white/30 -translate-x-1 group-hover:translate-x-0'
                    }`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {active === city.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-white/5">
                        <p className="text-sm text-white/65 leading-relaxed">
                          {city.rationale}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 rounded-full px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-emerald">
                            {city.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
