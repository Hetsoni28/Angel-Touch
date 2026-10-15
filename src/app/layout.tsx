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

const SITE_URL = 'https://angeltouch.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    template: '%s | Angel Touch',
  },
  description:
    'Angel Touch by Heena Thaker — India\'s premium women-only Ayurvedic salon, wellness centre, and certified beauty school. Authentic skin treatments, Shirodhara, Abhyanga, handcrafted Ayurvedic products, and live masterclasses.',

  keywords: [
    'Angel Touch',
    'Heena Thaker',
    'Ayurvedic salon India',
    'Ayurvedic treatments',
    'Shirodhara',
    'Abhyanga massage',
    'Ayurvedic skincare',
    'natural beauty products',
    'Ayurvedic masterclass',
    'women wellness centre',
  ],

  authors: [{ name: 'Heena Thaker', url: SITE_URL }],
  creator: 'Heena Thaker',
  publisher: 'Angel Touch',

  alternates: {
    canonical: SITE_URL,
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
    creator: '@angeltouch',
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
      </body>
    </html>
  );
}
