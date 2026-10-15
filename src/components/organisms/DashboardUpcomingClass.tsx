import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

interface NextClass {
  title: string
  date: string
  time: string
  slug: any
}

interface DashboardUpcomingClassProps {
  nextClass: NextClass | null
}

export function DashboardUpcomingClass({ nextClass }: DashboardUpcomingClassProps) {
  return (
    <section className="bg-white border border-[#dde7dd] p-8" aria-label="Upcoming Masterclass">
      <h2 className="text-[#5c5a58] text-[11px] font-semibold tracking-widest uppercase mb-6">Your Next Class</h2>
      
      {nextClass ? (
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-playfair text-xl text-[#1e2228] mb-1">{nextClass.title}</h3>
            <p className="text-[#5c5a58] text-[14px] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1e5f2e]" aria-hidden="true" /> 
              {new Date(nextClass.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {nextClass.time} IST
            </p>
          </div>
          <Link 
            href={`/classes/${nextClass.slug.current || nextClass.slug}`}
            aria-label={`View details for upcoming class: ${nextClass.title}`}
            className="self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded"
          >
            <Button variant="primary" size="md">
              View Details
            </Button>
          </Link>
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed border-[#dde7dd]" role="status">
          <p className="text-[#5c5a58] text-[14px] mb-4">You have no upcoming live classes.</p>
          <Link href="/classes#upcoming" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded">
            <Button variant="outline" size="md">
              Browse Classes
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
