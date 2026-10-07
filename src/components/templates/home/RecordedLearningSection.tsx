import Link from 'next/link'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function RecordedLearningSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-lg group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop&q=80" alt="Ayurvedic Class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
              <PlayCircle className="h-20 w-20 text-white opacity-90 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-sm">
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Now available</p>
              <p className="text-sm font-bold text-heading">15+ Recorded Ayurvedic Classes</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">On-Demand Learning</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Learn at Your Own Pace
            </h2>
            <p className="text-body leading-relaxed mb-6">
              Couldn&apos;t attend a live class? No problem. Access our growing library of recorded Ayurvedic product-making classes on-demand, anytime, anywhere.
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

