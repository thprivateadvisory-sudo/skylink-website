import type { Metadata } from 'next';
import { Space_Grotesk, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'SkyLink — La livraison qui prend son envol',
  description:
    'SkyLink, pionnier français de la livraison alimentaire par drone via kiosques dédiés. Tests et autorisations Specific EASA/DGAC en cours.',
  keywords: [
    'drone',
    'livraison',
    'France',
    'EASA',
    'DGAC',
    'kiosque',
    'foodtech',
    'logistique',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-ink-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
