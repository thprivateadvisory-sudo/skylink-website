'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Rocket, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const HIGHLIGHTS = [
  {
    icon: Rocket,
    title: 'Marché naissant',
    description:
      'Premier acteur français à viser un service commercial de livraison alimentaire par drone via kiosques.',
  },
  {
    icon: TrendingUp,
    title: 'Modèle scalable',
    description:
      'Du repas au colis, une infrastructure conçue dès le départ pour absorber de nouveaux usages.',
  },
  {
    icon: Globe2,
    title: 'Cadre européen',
    description:
      'Conformité EASA / DGAC visée, avec une trajectoire exportable vers d’autres pays de l’UE.',
  },
];

export function Invest() {
  return (
    <section
      id="investir"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Strong dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]" />

      {/* Animated gradient blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-cyan/20 via-emerald/10 to-transparent blur-[120px] rounded-full"
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-strong rounded-[2rem] md:rounded-[2.5rem] p-10 md:p-16 lg:p-20 border-gradient overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.04] via-transparent to-emerald/[0.04] pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-cyan/40" />
          <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-cyan/40" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-cyan/40" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-cyan/40" />

          <div className="relative">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 justify-center mb-8"
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan/60" />
              <span className="tag-mono">Levée de fonds</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan/60" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02] text-center text-white"
            >
              Co-écrivez le ciel
              <br />
              <span className="italic font-light text-gradient-aurora">
                logistique de demain.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 max-w-2xl mx-auto text-center text-base md:text-lg text-white/60 leading-relaxed"
            >
              SkyLink ouvre son tour de table aux investisseurs convaincus que
              la livraison aérienne urbaine sera, dans la prochaine décennie, un
              maillon clé de l’économie française. Rejoignez une aventure
              industrielle ambitieuse, ancrée dans le réel et la conformité.
            </motion.p>

            {/* Highlights grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    className="glass rounded-2xl p-6 hover:border-cyan/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-cyan" />
                    </div>
                    <h3 className="font-display text-lg font-medium text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-4 justify-center"
            >
              <Button href="#contact" variant="primary">
                Recevoir le dossier investisseur
              </Button>
              <Button href="#contact" variant="secondary" withArrow={false}>
                Demander un échange
              </Button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 text-center text-xs text-white/35 max-w-xl mx-auto leading-relaxed"
            >
              Communication non sollicitée à caractère informatif. Tout
              investissement présente un risque, y compris la perte totale du
              capital. Document non contractuel.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
