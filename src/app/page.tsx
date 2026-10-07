import { HeroSection } from '@/components/templates/home/HeroSection'
import { BrandIntroductionSection } from '@/components/templates/home/BrandIntroductionSection'
import { ThreeExperiencesSection } from '@/components/templates/home/ThreeExperiencesSection'
import { FeaturedProductsSection } from '@/components/templates/home/FeaturedProductsSection'
import { FeaturedTreatmentsSection } from '@/components/templates/home/FeaturedTreatmentsSection'
import { UpcomingClassesSection } from '@/components/templates/home/UpcomingClassesSection'
import { RecordedLearningSection } from '@/components/templates/home/RecordedLearningSection'
import { WhyChooseUsSection } from '@/components/templates/home/WhyChooseUsSection'
import { AboutSection } from '@/components/templates/home/AboutSection'
import { TestimonialsSection } from '@/components/templates/home/TestimonialsSection'
import { SocialSection } from '@/components/templates/home/SocialSection'
import { FinalCTASection } from '@/components/templates/home/FinalCTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandIntroductionSection />
      <ThreeExperiencesSection />
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
