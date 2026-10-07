import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/molecules/Card'

// TODO: Replace with Sanity query
const placeholderTreatments = [
  { id: '1', name: 'Abhyanga Massage', duration: '60 min', description: 'A full-body warm oil massage using herbal oils to detoxify and rejuvenate.' },
  { id: '2', name: 'Shirodhara Therapy', duration: '45 min', description: 'A continuous stream of warm oil poured on the forehead to calm the nervous system.' },
  { id: '3', name: 'Panchakarma Cleanse', duration: '90 min', description: 'A comprehensive Ayurvedic detox program personalised to your body type.' },
]

export function FeaturedTreatmentsSection() {
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

