'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Utensils, Package, Zap } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const PHASES = [
  {
    n: '01',
    icon: Utensils,
    label: 'Phase 1',
    title: 'Livraison alimentaire',
    period: 'Lancement progressif',
    color: 'cyan',
    points: [
      'Repas livrés en quelques minutes via kiosques de réception dédiés',
      'Partenariats avec restaurateurs et chaînes locales',
      'Zones péri-urbaines à faible densité aérienne',
    ],
  },
  {
    n: '02',
    icon: Package,
    label: 'Phase 2',
    title: 'Colis légers & courses',
    period: 'Extension progressive',
    color: 'emerald',
    points: [
      'Pharmacie, urgences logistiques et courses du quotidien',
      'Réseau de kiosques densifié, multi-usage',
      'Corridors aériens validés, opérations BVLOS',
    ],
  },
  {
    n: '03',
    icon: Zap,
    label: 'Phase 3',
    title: 'Réseau express national',
    period: 'Vision long terme',
    color: 'cyan',
    points: [
      'Logistique du dernier kilomètre à l’échelle métropolitaine',
      'Intégration multimodale avec opérateurs urbains',
      'Standardisation et exportation du modèle français',
    ],
  },
];

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="vision"
      className="relative py-32 md:py-40 overflow-hidden bg-ink-900"
    >
      {/* Subtle background detail */}
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20 md:mb-28">
          <SectionHeader
            eyebrow="Notre Vision"
            title={
              <>
                Un ciel utile,{' '}
                <span className="italic font-light text-gradient-aurora">
                  silencieux
                </span>
                <br />
                et résolument français.
              </>
            }
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-white/55 leading-relaxed text-base md:text-lg"
          >
            Nous construisons une infrastructure aérienne légère, sûre et
            scalable. Une livraison qui fait gagner du temps aux habitants,
            allège le trafic urbain et réduit l’empreinte carbone du dernier
            kilomètre.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line for mobile */}
          <div className="lg:hidden absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/60 via-emerald/40 to-transparent" />

          {/* Horizontal line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-cyan via-emerald to-cyan/40"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              const accent = phase.color === 'cyan' ? 'cyan' : 'emerald';
              return (
                <motion.div
                  key={phase.n}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-20 lg:pl-0"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan/30 pulse-ring" />
                      <div
                        className={`relative w-14 h-14 rounded-full glass-strong border-2 flex items-center justify-center ${
                          accent === 'cyan'
                            ? 'border-cyan/60 shadow-glow-cyan'
                            : 'border-emerald/60 shadow-glow-emerald'
                        }`}
                      >
                        <Icon
                          size={20}
                          className={accent === 'cyan' ? 'text-cyan' : 'text-emerald'}
                        />
                      </div>
                    </div>
                    <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  </div>

                  {/* Card */}
                  <div className="mt-6 lg:mt-10 glass rounded-2xl p-6 md:p-7 border-gradient relative group hover:border-cyan/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="tag-mono">{phase.label}</span>
                      <span className="font-mono text-[10px] text-white/30">
                        {phase.n}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                      {phase.title}
                    </h3>
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.18em] mb-5 ${
                        accent === 'cyan' ? 'text-cyan/80' : 'text-emerald/80'
                      }`}
                    >
                      {phase.period}
                    </p>

                    <ul className="space-y-2.5">
                      {phase.points.map((point, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm text-white/65 leading-relaxed"
                        >
                          <span
                            className={`mt-2 flex-shrink-0 w-1 h-1 rounded-full ${
                              accent === 'cyan' ? 'bg-cyan' : 'bg-emerald'
                            }`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Decorative corner */}
                    <div className="absolute top-3 right-3 w-8 h-8 opacity-30 pointer-events-none">
                      <div className="absolute top-0 right-0 w-3 h-px bg-cyan" />
                      <div className="absolute top-0 right-0 w-px h-3 bg-cyan" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
