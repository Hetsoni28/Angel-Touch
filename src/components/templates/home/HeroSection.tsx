import Link from 'next/link'
import { ArrowRight, Leaf, BookOpen, ShieldCheck, Heart, Star } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Decorative leaf accents */}
      <div className="absolute top-10 right-10 opacity-10">
        <Leaf className="h-48 w-48 text-primary rotate-12" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <Leaf className="h-32 w-32 text-sage -rotate-12" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-light text-heading text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              Natural · Ayurvedic · Organic
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Natural Beauty,<br/>
              <span className="text-primary">Healthy You.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-body leading-relaxed mb-8 max-w-xl">
              Discover Ayurvedic products, healing treatments, and expert-led product-making classes curated by Heena Thaker.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto justify-center">
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/classes">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto justify-center bg-white">
                  Browse Classes
                  <BookOpen className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-heading font-medium">
              <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> 100% Natural</span>
              <span className="flex items-center gap-2"><Star className="h-5 w-5 text-accent" /> Expert Formulated</span>
              <span className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" /> Wellness Focused</span>
            </div>
          </div>
          
          <div className="relative hidden md:block">
             <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1615397323171-d41c19b08d4b?w=800&auto=format&fit=crop&q=80" alt="Ayurvedic Wellness" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-border flex items-center gap-4 animate-bounce">
                <div className="h-12 w-12 rounded-full bg-accent-light flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-semibold">Over 500+</p>
                  <p className="text-sm font-bold text-heading">Happy Clients</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

