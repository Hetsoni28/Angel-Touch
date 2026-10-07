import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function FinalCTASection() {
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

