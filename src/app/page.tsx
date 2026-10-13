import { HeroSection } from '@/components/organisms/HeroSection'
import { BrandIntroductionSection } from '@/components/organisms/BrandIntroductionSection'
import { ThreeExperiencesSection } from '@/components/organisms/ThreeExperiencesSection'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { FeaturedProductsSection } from '@/components/organisms/FeaturedProductsSection'
import { FeaturedTreatmentsSection } from '@/components/organisms/FeaturedTreatmentsSection'
import { UpcomingClassesSection } from '@/components/organisms/UpcomingClassesSection'
import { RecordedLearningSection } from '@/components/organisms/RecordedLearningSection'
import { WhyChooseUsSection } from '@/components/organisms/WhyChooseUsSection'
import { AboutSection } from '@/components/organisms/AboutSection'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'
import { SocialSection } from '@/components/organisms/SocialSection'
import { FinalCTASection } from '@/components/organisms/FinalCTASection'
import { WelcomeAnimation } from '@/components/organisms/WelcomeAnimation'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = {
  title: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
  description:
    "India's premier women-only Ayurvedic salon, wellness centre, and certified beauty school. Experience authentic Shirodhara, Abhyanga, handcrafted Ayurvedic skincare, and live formulation masterclasses by Heena Thaker.",
  alternates: {
    canonical: 'https://angeltouch.in',
  },
  openGraph: {
    title: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    description:
      "India's premier women-only Ayurvedic salon. Authentic Shirodhara, Abhyanga, handcrafted skincare products, and certified formulation masterclasses.",
    url: 'https://angeltouch.in',
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
    title: 'Angel Touch by Heena Thaker | Ayurvedic Beauty & Wellness',
    description:
      "India's premier women-only Ayurvedic salon. Authentic Shirodhara, Abhyanga, handcrafted skincare products, and certified formulation masterclasses.",
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://angeltouch.in/#organization',
      name: 'Angel Touch',
      alternateName: 'Angel Touch by Heena Thaker',
      url: 'https://angeltouch.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://angeltouch.in/images/logo.png',
        width: 200,
        height: 60,
      },
      founder: {
        '@type': 'Person',
        name: 'Heena Thaker',
        jobTitle: 'Founder & Ayurvedic Expert',
        url: 'https://angeltouch.in/about',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-97231-79638',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
      sameAs: ['https://wa.me/919723179638'],
    },
    {
      '@type': 'BeautySalon',
      '@id': 'https://angeltouch.in/#business',
      name: 'Angel Touch by Heena Thaker',
      description:
        "India's premier women-only Ayurvedic salon, wellness centre, and certified beauty school. Authentic Shirodhara, Abhyanga, and handcrafted Ayurvedic skincare.",
      url: 'https://angeltouch.in',
      telephone: '+91-97231-79638',
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Credit Card, UPI, Razorpay',
      image: 'https://angeltouch.in/images/og-default.jpg',
      hasMap: 'https://angeltouch.in/contact',
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shirodhara' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abhyanga Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ayurvedic Skin Treatments' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bridal Styling' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ayurvedic Formulation Masterclasses' } },
      ],
    },
  ],
}


export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <WelcomeAnimation />
      <HeroSection />
      <BrandIntroductionSection />
      <ThreeExperiencesSection />
      <ServicesSection />
      <FeaturedProductsSection />
      <FeaturedTreatmentsSection />
      <UpcomingClassesSection />
      <RecordedLearningSection />
      <WhyChooseUsSection />
      <AboutSection />
      <TestimonialsSection />
      <SocialSection />
      <FinalCTASection />
    </>
  )
}
