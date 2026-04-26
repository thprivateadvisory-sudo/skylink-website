import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          900: '#040608',
          800: '#0a0e12',
          700: '#10151b',
          600: '#161c24',
          500: '#1d242e',
          400: '#2a3340',
        },
        cyan: {
          DEFAULT: '#00e5ff',
          glow: '#22f0ff',
          deep: '#0098b8',
        },
        emerald: {
          DEFAULT: '#00ffa3',
          glow: '#3affb8',
          deep: '#00b876',
        },
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent 0%, #040608 90%), linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'beam': 'beam 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        beam: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '0.8', transform: 'scaleY(1.2)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(0,229,255,0.6), 0 0 80px -20px rgba(0,229,255,0.3)',
        'glow-emerald': '0 0 40px -10px rgba(0,255,163,0.6), 0 0 80px -20px rgba(0,255,163,0.3)',
        'glow-soft': '0 0 24px -8px rgba(0,229,255,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
