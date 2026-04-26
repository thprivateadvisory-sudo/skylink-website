# SkyLink — Site vitrine premium

Site vitrine ultra-premium pour SkyLink, pionnier français de la livraison alimentaire par drone via kiosques dédiés.

## Stack

- **Next.js 15** (App Router) + React 19
- **Tailwind CSS** avec palette néon custom (cyan / emerald sur fond anthracite)
- **Framer Motion** pour les animations (scroll reveals, parallax, micro-interactions)
- **Three.js** + React Three Fiber pour la scène drone 3D du hero
- **Lucide React** pour les icônes
- Typographies : **Space Grotesk** (display), **Outfit** (body), **JetBrains Mono** (technique)

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:3000
```

## Build production

```bash
npm run build
npm start
```

## Structure

```
skylink/
├── app/
│   ├── layout.tsx          # Layout racine + fonts
│   ├── page.tsx            # Page d'accueil (assemblage)
│   └── globals.css         # Styles globaux + utilitaires (glass, gradients...)
├── components/
│   ├── sections/           # Sections de la page
│   │   ├── Navbar.tsx      # Nav fixe avec scroll trigger + drawer mobile
│   │   ├── Hero.tsx        # Hero spectaculaire avec drone 3D
│   │   ├── Vision.tsx      # Timeline 3 phases (food → colis → réseau)
│   │   ├── Advantages.tsx  # 4 cartes avantages
│   │   ├── Cities.tsx      # Carte interactive France + 4 villes
│   │   ├── Compliance.tsx  # Conformité EASA / DGAC
│   │   ├── Invest.tsx      # CTA levée de fonds
│   │   └── Footer.tsx      # Footer + contact form + mentions
│   └── ui/                 # Composants réutilisables
│       ├── Logo.tsx
│       ├── Button.tsx
│       ├── SectionHeader.tsx
│       ├── DroneScene.tsx  # Scène Three.js (drone low-poly + particules)
│       └── CustomCursor.tsx
├── lib/
│   └── cn.ts               # Helper className (clsx + tailwind-merge)
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## Personnalisation rapide

- **Couleurs** : voir `tailwind.config.ts` (clés `cyan`, `emerald`, `ink`)
- **Contenus textuels** : tous les textes en dur dans les fichiers de sections, en français
- **Villes tests** : tableau `CITIES` dans `components/sections/Cities.tsx`
- **Phases** : tableau `PHASES` dans `components/sections/Vision.tsx`
- **Avantages** : tableau `ADVANTAGES` dans `components/sections/Advantages.tsx`

## Notes

- Le curseur custom est désactivé sur mobile (CSS media query)
- La scène 3D est chargée dynamiquement (`dynamic(..., { ssr: false })`) pour éviter les soucis SSR
- Toutes les animations Framer Motion utilisent `viewport={{ once: true }}` pour ne pas re-jouer en remontant
- Scroll smooth natif via `scroll-behavior: smooth` sur `html`
- Accessibilité : `lang="fr"`, focus visible, aria-labels sur les éléments interactifs
