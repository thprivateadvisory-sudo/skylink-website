'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Notre Vision', href: '#vision' },
  { label: 'Villes Tests', href: '#villes' },
  { label: 'Technologie & Conformité', href: '#conformite' },
  { label: 'Investir', href: '#investir' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-strong border-b border-white/5'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#hero" aria-label="SkyLink — Accueil">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-gradient-to-r from-cyan to-emerald scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="#investir" variant="primary" withArrow>
              Investir
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-white"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Status bar - subtle technical element */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex absolute top-full left-0 right-0 h-7 items-center justify-between px-8 max-w-7xl mx-auto pointer-events-none"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cyan/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
                <span className="relative rounded-full bg-emerald w-1.5 h-1.5" />
              </span>
              SYS · ACTIVE
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/30">
              FR · EASA SPECIFIC · OPS PILOT
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-900/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm glass-strong border-l border-white/10 p-8 pt-24 flex flex-col gap-2"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-2xl font-medium tracking-tight text-white/90 hover:text-cyan transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <Button href="#investir" variant="primary">
                  Investir
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
