'use client';

import { motion } from 'framer-motion';
import { Gauge, Leaf, Sparkles, Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ADVANTAGES = [
  {
    icon: Gauge,
    title: 'Ultra-rapide',
    metric: '8 min',
    metricLabel: 'objectif moyen',
    description:
      'Du kiosque au client en quelques minutes. Le drone s’affranchit de la circulation et raccourcit drastiquement le dernier kilomètre.',
    accent: 'cyan',
  },
  {
    icon: Leaf,
    title: 'Écologique',
    metric: '0 g',
    metricLabel: 'CO₂ à l’usage',
    description:
      'Propulsion 100% électrique. Une consommation énergétique très inférieure à un trajet voiture ou scooter sur la même distance.',
    accent: 'emerald',
  },
  {
    icon: Sparkles,
    title: 'Innovante',
    metric: 'EASA',
    metricLabel: 'cadre Specific',
    description:
      'Une technologie pensée en France, conforme aux exigences réglementaires européennes les plus strictes pour le vol urbain.',
    accent: 'cyan',
  },
  {
    icon: Users,
    title: 'Accessible',
    metric: '24/7',
    metricLabel: 'disponibilité visée',
    description:
      'Des kiosques de réception simples d’usage, sans application complexe, conçus pour démocratiser la livraison aérienne.',
    accent: 'emerald',
  },
];

export function Advantages() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Pourquoi SkyLink"
          title={
            <>
              Quatre promesses,{' '}
              <span className="italic font-light text-gradient-aurora">
                une seule trajectoire.
              </span>
            </>
          }
          description="Ce qui rend notre approche unique : la combinaison rare de vitesse, sobriété énergétique, conformité réglementaire et simplicité d'usage."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
          {ADVANTAGES.map((adv, i) => {
            const Icon = adv.icon;
            const isCyan = adv.accent === 'cyan';
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div className="relative h-full glass rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/15">
                  {/* Hover glow */}
                  <div
                    className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isCyan
                        ? 'bg-gradient-to-br from-cyan/20 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-emerald/20 via-transparent to-transparent'
                    }`}
                  />

                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-12">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                          isCyan
                            ? 'bg-cyan/10 border-cyan/30 group-hover:shadow-glow-cyan'
                            : 'bg-emerald/10 border-emerald/30 group-hover:shadow-glow-emerald'
                        } transition-all duration-500`}
                      >
                        <Icon
                          size={22}
                          className={isCyan ? 'text-cyan' : 'text-emerald'}
                        />
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-display text-3xl md:text-4xl font-semibold tracking-tight ${
                            isCyan ? 'text-cyan' : 'text-emerald'
                          }`}
                        >
                          {adv.metric}
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/35 mt-0.5">
                          {adv.metricLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
                      {adv.title}
                    </h3>
                    <p className="text-white/55 leading-relaxed text-sm md:text-base max-w-md">
                      {adv.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-8 flex items-center gap-3">
                      <div
                        className={`h-px flex-1 bg-gradient-to-r ${
                          isCyan
                            ? 'from-cyan/60 via-cyan/20 to-transparent'
                            : 'from-emerald/60 via-emerald/20 to-transparent'
                        }`}
                      />
                      <span className="font-mono text-[10px] text-white/30 tracking-[0.18em]">
                        {String(i + 1).padStart(2, '0')} / 04
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
