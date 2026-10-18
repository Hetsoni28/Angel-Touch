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
  title: "Angel Touch by Heena Thaker | Women's Ayurvedic Salon & Wellness — Ahmedabad",
  description:
    "Exclusive women-only Ayurvedic salon, wellness sanctuary, and beauty school in Satellite, Ahmedabad. Authentic Shirodhara, restorative aroma skin facials, bridal styling, botanical hair care, and certified formulation masterclasses by Heena Thaker.",
  alternates: {
    canonical: 'https://angeltouch.in',
  },
  keywords: [
    'Angel Touch Ahmedabad',
    'Heena Thaker salon',
    'Ayurvedic salon Ahmedabad',
    'Aroma facial Satellite Ahmedabad',
    'Aromatherapy Ahmedabad',
    'Women salon Satellite Ahmedabad',
    'Shirodhara therapy Ahmedabad',
    'Abhyanga body massage Ahmedabad',
    'Herbal skin facial Satellite',
    'Bridal makeup artist Ahmedabad',
    'Botanical hair spa Ahmedabad',
    'Ayurvedic beauty parlour Satellite',
    'Organic skincare India',
    'Skincare formulation academy Ahmedabad',
    'Ladies wellness centre Ahmedabad',
  ],
  openGraph: {
    title: "Angel Touch by Heena Thaker | Women's Ayurvedic Salon & Wellness — Ahmedabad",
    description:
      "Exclusive women-only Ayurvedic salon & wellness sanctuary in Satellite, Ahmedabad. Shirodhara, Abhyanga, aroma skin facials, bridal styling, and formulation masterclasses.",
    url: 'https://angeltouch.in',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Angel Touch by Heena Thaker — Women\'s Ayurvedic Salon in Satellite, Ahmedabad',
      },
    ],
  },
  twitter: {
    title: "Angel Touch by Heena Thaker | Women's Ayurvedic Salon & Wellness — Ahmedabad",
    description:
      "Exclusive women-only Ayurvedic salon & wellness sanctuary in Satellite, Ahmedabad. Shirodhara, Abhyanga, aroma skin facials, and bridal styling.",
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://angeltouch.in/#organization',
      name: 'Angel Touch',
      alternateName: ['Angel Touch by Heena Thaker', 'Angel Touch Salon Ahmedabad'],
      url: 'https://angeltouch.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://angeltouch.in/logo.svg',
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
      sameAs: [
        'https://www.instagram.com/angeltouch_by_heena_thaker/',
        'https://wa.me/919723179638',
      ],
    },
    {
      '@type': ['BeautySalon', 'DaySpa', 'HealthAndBeautyBusiness'],
      '@id': 'https://angeltouch.in/#business',
      name: 'Angel Touch by Heena Thaker',
      alternateName: 'Angel Touch Ayurvedic Salon Satellite Ahmedabad',
      description:
        "Top-rated women-only Ayurvedic salon, wellness spa, and certified beauty academy in Satellite, Ahmedabad. Specializing in authentic Shirodhara, Abhyanga, herbal facials, hair therapies, bridal styling, and handcrafted organic products.",
      url: 'https://angeltouch.in',
      telephone: '+91-97231-79638',
      priceRange: '₹₹ - ₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Google Pay, PhonePe, Paytm, Net Banking',
      image: 'https://angeltouch.in/images/og-default.jpg',
      hasMap: 'https://maps.google.com/maps?q=Policlinic+Chamber,+Judges+Bungalow+Road,+Satellite,+Ahmedabad',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road',
        addressLocality: 'Satellite',
        addressRegion: 'Gujarat',
        postalCode: '380015',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.02937,
        longitude: 72.504909,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '10:00',
          closes: '16:30',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '184',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Satellite, Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Bodakdev, Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Judges Bungalow Road, Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Vastrapur, Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Prahlad Nagar, Ahmedabad' },
        { '@type': 'AdministrativeArea', name: 'Ambawadi, Ahmedabad' },
        { '@type': 'City', name: 'Ahmedabad' },
        { '@type': 'State', name: 'Gujarat' },
      ],
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Authentic Shirodhara Therapy' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abhyanga Full-Body Massage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Advanced Aroma Facials & Skin Treatments' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Botanical Hair Spa & Keratin Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bridal & Wedding Makeup Artistry' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ayurvedic Cosmetic Formulation Masterclasses' } },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://angeltouch.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What makes Angel Touch a premier women-only Ayurvedic salon in Satellite, Ahmedabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Angel Touch by Heena Thaker is a premier women-only Ayurvedic sanctuary in Satellite, Ahmedabad. Located at UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road, Angel Touch provides authentic Shirodhara, Abhyanga massage, personalized aroma and herbal facials, botanical hair care, bridal styling, and certified beauty academy courses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I get authentic Shirodhara and Ayurvedic treatments in Ahmedabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can experience authentic traditional Shirodhara therapy with warm medicated herbal oils at Angel Touch in Satellite, Ahmedabad. The therapy promotes deep relaxation, mental clarity, and stress relief in a serene, private environment for women.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Angel Touch exclusively for women?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Angel Touch is an exclusive, private sanctuary dedicated 100% to women. Founded by Heena Thaker, all treatments, beauty services, and academy masterclasses are designed specifically for women.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I book an appointment at Angel Touch Salon in Ahmedabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can book an appointment easily by calling or messaging on WhatsApp at +91 97231 79638, or visiting our contact page at angeltouch.in/contact.',
          },
        },
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
