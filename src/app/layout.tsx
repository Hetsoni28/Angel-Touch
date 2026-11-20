import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { FloatingWhatsApp } from "@/components/molecules/FloatingWhatsApp";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // Real italic glyphs for the one-word heading accents (no browser-faked slant).
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import { Suspense } from "react";
import { Toaster } from '@/components/atoms/Toaster'
import { SITE_INFO } from '@/lib/siteInfo'
import Script from 'next/script'
import { INTRO_GATE_SCRIPT } from '@/lib/intro'

const SITE_URL = 'https://angeltouch.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    template: '%s | Angel Touch',
  },
  description:
    'Women-only Ayurvedic salon, wellness centre and beauty academy in Satellite, Ahmedabad. Shirodhara, aroma facials, bridal makeup and certified courses.',

  keywords: [
    'Angel Touch Ahmedabad',
    'Heena Thaker salon',
    'Ayurvedic salon Ahmedabad',
    'Women salon Satellite Ahmedabad',
    'Shirodhara therapy Ahmedabad',
    'Abhyanga body massage Ahmedabad',
    'Ayurvedic skin treatment Ahmedabad',
    'Bridal makeup artist Satellite Ahmedabad',
    'Botanical hair spa Ahmedabad',
    'Ayurvedic skincare India',
    'Natural beauty products Ahmedabad',
    'Ayurvedic formulation masterclass',
    'Women wellness sanctuary Satellite',
  ],

  authors: [{ name: 'Heena Thaker', url: SITE_URL }],
  creator: 'Heena Thaker',
  publisher: 'Angel Touch',

  // NOTE: no `alternates.canonical` here on purpose. Metadata is inherited, so
  // a canonical set in the root layout would make every page that forgets its
  // own canonical point at the homepage — and Google would drop that page.
  // Each page sets its own canonical through pageMetadata() (src/lib/seo.ts).

  // Google Search Console / Bing ownership verification. Set the codes in
  // .env.local and on Vercel; nothing is emitted while they are empty.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Angel Touch by Heena Thaker',
    title: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    description:
      'Premium women-only Ayurvedic salon, wellness centre, and beauty school. Authentic treatments, handcrafted products, and certified masterclasses.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Angel Touch by Heena Thaker — Ayurvedic Beauty & Wellness',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    description:
      'Premium women-only Ayurvedic salon, wellness centre, and beauty school. Authentic treatments, handcrafted products, and certified masterclasses.',
    images: ['/images/og-default.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    'geo.region': 'IN-GJ',
    'geo.placename': 'Ahmedabad, Satellite, Gujarat',
    'geo.position': `${SITE_INFO.google.lat};${SITE_INFO.google.lng}`,
    'ICBM': `${SITE_INFO.google.lat}, ${SITE_INFO.google.lng}`,
    'format-detection': 'telephone=yes',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-body">
        {/* Skip to main content link for keyboard & screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-3 focus:bg-[#2e7a3a] focus:text-white focus:text-[11px] focus:font-semibold focus:tracking-widest focus:uppercase focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2e7a3a]"
        >
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Suspense fallback={null}>
          <Footer />
          <FloatingWhatsApp />
        </Suspense>
        <Toaster />
        {/* Welcome intro gate: decides before hydration whether the homepage shows the intro (no flash) */}
        <Script id="intro-gate" strategy="beforeInteractive">{INTRO_GATE_SCRIPT}</Script>
      </body>
    </html>
  );
}
