'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Radio, Eye } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const PILLARS = [
  {
    icon: FileCheck,
    title: 'Catégorie Specific',
    description:
      'Notre cadre opérationnel cible la catégorie Specific de l’EASA, dédiée aux opérations à risque modéré nécessitant une autorisation préalable de l’autorité.',
  },
  {
    icon: ShieldCheck,
    title: 'SORA & dossier d’opérations',
    description:
      'Une analyse SORA (Specific Operations Risk Assessment) structure chaque scénario : zones de vol, mesures de mitigation, niveau de robustesse exigé.',
  },
  {
    icon: Radio,
    title: 'Liaison & redondance',
    description:
      'Liens de commande redondés, suivi temps réel et procédures de retour automatique en cas de perte de signal ou de conditions dégradées.',
  },
  {
    icon: Eye,
    title: 'Supervision DGAC',
    description:
      'Échanges en cours avec la DGAC. Aucun vol commercial n’interviendra avant l’obtention des autorisations nécessaires.',
  },
];

export function Compliance() {
  return (
    <section
      id="conformite"
      className="relative py-32 md:py-40 overflow-hidden bg-ink-900"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan/8 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald/5 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column - intro + visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              eyebrow="Technologie & Conformité"
              title={
                <>
                  La sécurité,{' '}
                  <span className="italic font-light text-gradient-aurora">
                    avant tout.
                  </span>
                </>
              }
            />
            <p className="mt-6 text-white/55 leading-relaxed text-base md:text-lg max-w-md">
              SkyLink ne lancera aucun service commercial sans avoir obtenu
              l’ensemble des autorisations requises. Notre approche est
              progressive, documentée et menée en dialogue avec les autorités
              françaises et européennes.
            </p>

            {/* Compliance shield visual */}
            <div className="mt-10 relative aspect-square max-w-sm glass-strong rounded-3xl p-10 border-gradient overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-40" />

              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale, opacity: 1 - i * 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className="absolute w-full h-full rounded-full border border-cyan/30"
                  />
                ))}
              </div>

              {/* Center shield */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-cyan/40 rounded-full" />
                  <div className="relative w-24 h-24 rounded-3xl glass-strong border border-cyan/40 flex items-center justify-center shadow-glow-cyan">
                    <ShieldCheck size={42} className="text-cyan" />
                  </div>
                </div>
              </motion.div>

              {/* Corner labels */}
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-cyan/70">
                EASA · DGAC
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
                Cat. Specific
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
                  <span className="relative rounded-full bg-emerald w-1.5 h-1.5" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald">
                  En cours
                </span>
              </div>
            </div>
          </div>

          {/* Right column - pillars */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative glass rounded-2xl p-6 md:p-7 hover:border-cyan/30 transition-all"
                  >
                    <div className="flex gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-transparent border border-cyan/20 flex items-center justify-center group-hover:shadow-glow-soft transition-shadow">
                          <Icon size={20} className="text-cyan" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 mb-2">
                          <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-white">
                            {pillar.title}
                          </h3>
                          <span className="font-mono text-[10px] text-white/30 tracking-[0.18em]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Disclaimer note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex gap-3"
            >
              <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-cyan to-emerald flex-shrink-0" />
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                <span className="text-white/70 font-medium">Note importante : </span>
                Le projet SkyLink est en phase de développement et d’instruction
                réglementaire. Les calendriers, périmètres opérationnels et
                modalités de service présentés sont indicatifs et conditionnés à
                l’obtention effective des autorisations DGAC et à la validation
                des scénarios par l’EASA.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
