'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer
      id="contact"
      className="relative bg-ink-900 border-t border-white/5 overflow-hidden"
    >
      {/* Top neon line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60" />

      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Big ambient SkyLink wordmark */}
      <div className="relative pt-24 md:pt-32 pb-12 max-w-7xl mx-auto px-5 md:px-8">
        {/* Contact section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Left - heading + form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="tag-mono">Contact</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Travaillons{' '}
                <span className="italic font-light text-gradient-aurora">
                  ensemble.
                </span>
              </h2>
              <p className="mt-6 text-white/55 leading-relaxed text-base md:text-lg max-w-lg">
                Investisseur, partenaire industriel, restaurateur, autorité
                locale ou simple curieux : laissez-nous votre adresse, nous
                revenons vers vous personnellement.
              </p>
            </motion.div>

            {/* Email form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 max-w-lg"
            >
              <div className="relative group glass rounded-full p-1.5 flex items-center gap-2 hover:border-cyan/40 transition-colors">
                <div className="pl-4 pr-1 text-white/40">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.fr"
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30 py-2.5"
                />
                <button
                  type="submit"
                  className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan to-emerald text-ink-900 text-sm font-display font-medium hover:shadow-glow-cyan transition-shadow"
                >
                  <span>Envoyer</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 ml-4 text-sm text-emerald flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                  Merci, votre message a bien été reçu.
                </motion.p>
              )}
            </motion.form>
          </div>

          {/* Right - contact info cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <motion.a
              href="mailto:contact@skylink.fr"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group glass rounded-2xl p-5 flex items-center justify-between hover:border-cyan/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                  <Mail size={16} className="text-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
                    Email général
                  </div>
                  <div className="font-display text-base text-white mt-0.5">
                    contact@skylink.fr
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/30 group-hover:text-cyan transition-colors"
              />
            </motion.a>

            <motion.a
              href="mailto:investors@skylink.fr"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group glass rounded-2xl p-5 flex items-center justify-between hover:border-emerald/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                  <Mail size={16} className="text-emerald" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
                    Investisseurs
                  </div>
                  <div className="font-display text-base text-white mt-0.5">
                    investors@skylink.fr
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-white/30 group-hover:text-emerald transition-colors"
              />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin size={16} className="text-white/60" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
                  Siège
                </div>
                <div className="font-display text-base text-white mt-0.5">
                  France · Île-de-France
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer body */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Pionnier français de la livraison alimentaire par drone via
              kiosques dédiés.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-cyan/40 transition-colors"
              >
                <Linkedin size={14} className="text-white/70" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-cyan/40 transition-colors"
              >
                <Twitter size={14} className="text-white/70" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan/70 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Accueil', href: '#hero' },
                { label: 'Notre Vision', href: '#vision' },
                { label: 'Villes Tests', href: '#villes' },
                { label: 'Conformité', href: '#conformite' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan/70 mb-4">
              Entreprise
            </h4>
            <ul className="space-y-2.5">
              {['À propos', 'Investir', 'Carrières', 'Presse'].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan/70 mb-4">
              Légal
            </h4>
            <ul className="space-y-2.5">
              {[
                'Mentions légales',
                'Politique de confidentialité',
                'Cookies',
                'CGU',
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} SkyLink — Tous droits réservés. Marque
            et identité visuelle protégées.
          </p>
          <p className="text-xs text-white/35 max-w-2xl md:text-right">
            SkyLink est une initiative en phase de développement. Les
            informations communiquées sur ce site sont indicatives et
            n’engagent aucune offre commerciale ferme.
          </p>
        </div>

        {/* Giant ambient wordmark */}
        <div
          aria-hidden
          className="relative mt-12 overflow-hidden h-[14vw] flex items-end justify-center pointer-events-none select-none"
        >
          <span className="font-display font-semibold tracking-[-0.06em] text-[18vw] leading-[0.85] bg-gradient-to-b from-white/10 via-cyan/20 to-transparent bg-clip-text text-transparent">
            SkyLink
          </span>
        </div>
      </div>
    </footer>
  );
}
