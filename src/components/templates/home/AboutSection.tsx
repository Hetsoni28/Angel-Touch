import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function AboutSection() {
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
              Angel Touch was born from Heena Thaker&apos;s passion for Ayurvedic wellness and natural beauty. With years of study and practice in traditional Ayurvedic formulations, Heena brings ancient wisdom into modern everyday life.
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
          <div className="rounded-2xl overflow-hidden h-80 md:h-96 relative shadow-lg">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80" alt="Heena Thaker" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

