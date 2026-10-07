import { HeroSection } from '@/components/templates/home/HeroSection'
import { WhatWeOfferSection } from '@/components/templates/home/WhatWeOfferSection'
import { FeaturedProductsSection } from '@/components/templates/home/FeaturedProductsSection'
import { FeaturedTreatmentsSection } from '@/components/templates/home/FeaturedTreatmentsSection'
import { UpcomingClassesSection } from '@/components/templates/home/UpcomingClassesSection'
import { RecordedLearningSection } from '@/components/templates/home/RecordedLearningSection'
import { AboutSection } from '@/components/templates/home/AboutSection'
import { WhyChooseUsSection } from '@/components/templates/home/WhyChooseUsSection'
import { TestimonialsSection } from '@/components/templates/home/TestimonialsSection'
import { SocialSection } from '@/components/templates/home/SocialSection'
import { FinalCTASection } from '@/components/templates/home/FinalCTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeOfferSection />
      <FeaturedProductsSection />
      <FeaturedTreatmentsSection />
      <UpcomingClassesSection />
      <RecordedLearningSection />
      <AboutSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <SocialSection />
      <FinalCTASection />
    </>
  )
}
