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

export default function HomePage() {
  return (
    <>
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
