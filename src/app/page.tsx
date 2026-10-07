import Link from 'next/link'
import { ArrowRight, Leaf, BookOpen, Sparkles, ShieldCheck, Heart, Star, ChevronRight, PlayCircle, Users } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/molecules/Card'

// ─── HERO SECTION ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Decorative leaf accents */}
      <div className="absolute top-10 right-10 opacity-10">
        <Leaf className="h-48 w-48 text-primary rotate-12" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <Leaf className="h-32 w-32 text-sage -rotate-12" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-light text-heading text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            Natural · Ayurvedic · Organic
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-6xl font-bold text-heading leading-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Natural Beauty,{' '}
            <span className="text-primary">Healthy You.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-body leading-relaxed mb-8 max-w-xl">
            Discover Ayurvedic products, healing treatments, and expert-led product-making classes curated by Heena Thaker.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="gap-2">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/classes">
              <Button variant="outline" size="lg" className="gap-2">
                Browse Classes
                <BookOpen className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-5 mt-10 text-sm text-muted">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> 100% Natural</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-accent" /> Expert Formulated</span>
            <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-primary" /> Wellness Focused</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── WHAT WE OFFER ───────────────────────────────────────────────────────────
function WhatWeOfferSection() {
  const offerings = [
    {
      icon: Sparkles,
      title: 'Ayurvedic Products',
      description: 'Handcrafted natural products made with traditional Ayurvedic recipes. From oils to skincare — pure, chemical-free, and effective.',
      href: '/shop',
      cta: 'Shop Now',
    },
    {
      icon: Heart,
      title: 'Healing Treatments',
      description: 'Experience traditional Ayurvedic therapies and personalised treatments designed to restore balance to your body and mind.',
      href: '/treatments',
      cta: 'View Treatments',
    },
    {
      icon: BookOpen,
      title: 'Product-Making Classes',
      description: 'Learn to make your own Ayurvedic products at home. Live classes with recording access — from beginners to advanced.',
      href: '/classes',
      cta: 'Browse Classes',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Complete Ayurvedic Journey
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map(({ icon: Icon, title, description, href, cta }) => (
            <Card key={title} className="hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-sm leading-relaxed">{description}</p>
              </CardContent>
              <CardFooter>
                <Link href={href} className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                  {cta} <ChevronRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED PRODUCTS ───────────────────────────────────────────────────────
// TODO: Replace placeholder data with Sanity CMS query
const placeholderProducts = [
  { id: '1', name: 'Ayurvedic Hair Oil', category: 'Hair Care', description: 'A traditional blend of herbs and oils for nourishing scalp and hair.', slug: 'ayurvedic-hair-oil' },
  { id: '2', name: 'Kumkumadi Face Serum', category: 'Skin Care', description: 'Ancient Ayurvedic formula for brightening and glowing skin.', slug: 'kumkumadi-face-serum' },
  { id: '3', name: 'Herbal Body Scrub', category: 'Body Care', description: 'Natural exfoliant made with herbs, oatmeal, and essential oils.', slug: 'herbal-body-scrub' },
]

function FeaturedProductsSection() {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
              Featured Products
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline" size="sm" className="gap-1 shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {placeholderProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow group">
              {/* Product Image placeholder */}
              <div className="h-52 bg-primary-light flex items-center justify-center">
                <Leaf className="h-16 w-16 text-sage opacity-50" />
              </div>
              <CardHeader>
                <p className="text-xs text-muted uppercase tracking-wider">{product.category}</p>
                <CardTitle className="text-lg mt-1">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-body line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <Link href={`/shop/${product.slug}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Link href={`/shop/${product.slug}#enquire`}>
                  <Button variant="primary" size="sm">Enquire Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED TREATMENTS ─────────────────────────────────────────────────────
// TODO: Replace with Sanity query
const placeholderTreatments = [
  { id: '1', name: 'Abhyanga Massage', duration: '60 min', description: 'A full-body warm oil massage using herbal oils to detoxify and rejuvenate.' },
  { id: '2', name: 'Shirodhara Therapy', duration: '45 min', description: 'A continuous stream of warm oil poured on the forehead to calm the nervous system.' },
  { id: '3', name: 'Panchakarma Cleanse', duration: '90 min', description: 'A comprehensive Ayurvedic detox program personalised to your body type.' },
]

function FeaturedTreatmentsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Treatments</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
              Healing Therapies
            </h2>
          </div>
          <Link href="/treatments">
            <Button variant="outline" size="sm" className="gap-1 shrink-0">
              All Treatments <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderTreatments.map((treatment) => (
            <Card key={treatment.id} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{treatment.name}</CardTitle>
                  <span className="text-xs text-muted bg-primary-light px-2 py-1 rounded-full shrink-0 ml-2">{treatment.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-body leading-relaxed">{treatment.description}</p>
              </CardContent>
              <CardFooter>
                <Link href="/treatments#enquire">
                  <Button variant="primary" size="sm">Enquire / Book</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── UPCOMING CLASSES ────────────────────────────────────────────────────────
// TODO: Replace with Sanity query
const placeholderClasses = [
  { id: '1', title: 'Ayurvedic Hair Oil Making', date: 'Nov 15, 2026', time: '11:00 AM IST', price: 1499, capacity: 20, enrolled: 14, slug: 'hair-oil-making' },
  { id: '2', title: 'Kumkumadi Serum Workshop', date: 'Nov 22, 2026', time: '3:00 PM IST', price: 1999, capacity: 20, enrolled: 20, slug: 'kumkumadi-serum' },
  { id: '3', title: 'Herbal Skincare Masterclass', date: 'Dec 1, 2026', time: '11:00 AM IST', price: 2499, capacity: 15, enrolled: 6, slug: 'herbal-skincare' },
]

function UpcomingClassesSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">Live Classes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Upcoming Classes
            </h2>
          </div>
          <Link href="/classes">
            <Button variant="secondary" size="sm" className="gap-1 shrink-0">
              View All Classes <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderClasses.map((cls) => {
            const spotsLeft = cls.capacity - cls.enrolled
            const isFull = spotsLeft === 0
            return (
              <div key={cls.id} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${isFull ? 'bg-error/20 text-red-200' : 'bg-success/20 text-green-200'}`}>
                    {isFull ? 'Full' : `${spotsLeft} spots left`}
                  </span>
                  <span className="text-xl font-bold text-accent">₹{cls.price.toLocaleString('en-IN')}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {cls.title}
                </h3>
                <p className="text-sm text-white/70 mb-1">{cls.date}</p>
                <p className="text-sm text-white/70 mb-5">{cls.time}</p>

                {/* Capacity bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>{cls.enrolled} enrolled</span>
                    <span>{cls.capacity} total</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <Link href={`/classes/${cls.slug}`}>
                  <Button
                    variant={isFull ? 'ghost' : 'secondary'}
                    size="sm"
                    className="w-full justify-center"
                    disabled={isFull}
                  >
                    {isFull ? 'Join Waitlist' : 'Purchase Class'}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── RECORDED LEARNING ───────────────────────────────────────────────────────
function RecordedLearningSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <div className="relative rounded-2xl overflow-hidden bg-primary-light h-72 md:h-96 flex items-center justify-center">
            <PlayCircle className="h-20 w-20 text-primary opacity-40" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-4">
              <p className="text-xs text-muted mb-0.5">Now available</p>
              <p className="text-sm font-semibold text-heading">15+ Recorded Ayurvedic Classes</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">On-Demand Learning</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Learn at Your Own Pace
            </h2>
            <p className="text-body leading-relaxed mb-6">
              Couldn't attend a live class? No problem. Access our growing library of recorded Ayurvedic product-making classes on-demand, anytime, anywhere.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Live class purchasers get recordings for free',
                'Purchase individual recordings anytime',
                'Membership unlocks the full recording library',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <div className="mt-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <p className="text-sm text-body">{point}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/classes/recorded">
                <Button variant="primary" size="md" className="gap-2">
                  Browse Recordings
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/membership">
                <Button variant="outline" size="md">
                  View Membership Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Meet Heena Thaker
            </h2>
            <p className="text-body leading-relaxed mb-4">
              Angel Touch was born from Heena Thaker's passion for Ayurvedic wellness and natural beauty. With years of study and practice in traditional Ayurvedic formulations, Heena brings ancient wisdom into modern everyday life.
            </p>
            <p className="text-body leading-relaxed mb-8">
              Every product is handcrafted with care, every treatment is personalised, and every class is taught with love — to empower you to take charge of your own natural wellbeing.
            </p>
            <Link href="/about">
              <Button variant="outline" size="md" className="gap-2">
                Our Story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Placeholder portrait */}
          <div className="rounded-2xl bg-primary-light h-80 md:h-96 flex items-center justify-center">
            <div className="text-center">
              <Leaf className="h-16 w-16 text-primary mx-auto opacity-40 mb-3" />
              <p className="text-sm text-muted">Heena Thaker photo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── WHY CHOOSE US ───────────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const reasons = [
    { icon: Leaf, title: '100% Natural', description: 'No harsh chemicals. Every ingredient is natural, ethically sourced, and Ayurvedically approved.' },
    { icon: ShieldCheck, title: 'Expert Formulated', description: 'Each product and treatment is designed by a certified Ayurvedic practitioner with years of experience.' },
    { icon: BookOpen, title: 'Knowledge Sharing', description: 'We believe in empowering you — not just selling to you. Learn the art behind every product.' },
    { icon: Heart, title: 'Holistic Wellness', description: 'We address beauty, health, and wellness together — body, mind, and spirit in harmony.' },
    { icon: Users, title: 'Community', description: 'Join a growing community of women embracing natural living and Ayurvedic wisdom.' },
    { icon: Star, title: 'Trusted Quality', description: 'Loved by hundreds of customers who have transformed their beauty and wellness routines naturally.' },
  ]

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Why Angel Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            The Angel Touch Difference
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-body leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-20 gradient-dark">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <Leaf className="h-12 w-12 text-accent mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Start Your Natural Wellness Journey
        </h2>
        <p className="text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
          Explore our Ayurvedic products, book a treatment, or join a class. Your journey to natural beauty and holistic wellness starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button variant="secondary" size="lg" className="gap-2">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" className="gap-2 bg-white text-primary hover:bg-ivory">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
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
      <FinalCTASection />
    </>
  )
}
