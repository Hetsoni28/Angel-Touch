import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

// TODO: Replace with Sanity query
const placeholderClasses = [
  { id: '1', title: 'Ayurvedic Hair Oil Making', date: 'Nov 15, 2026', time: '11:00 AM IST', price: 1499, capacity: 20, enrolled: 14, slug: 'hair-oil-making' },
  { id: '2', title: 'Kumkumadi Serum Workshop', date: 'Nov 22, 2026', time: '3:00 PM IST', price: 1999, capacity: 20, enrolled: 20, slug: 'kumkumadi-serum' },
  { id: '3', title: 'Herbal Skincare Masterclass', date: 'Dec 1, 2026', time: '11:00 AM IST', price: 2499, capacity: 15, enrolled: 6, slug: 'herbal-skincare' },
]

export function UpcomingClassesSection() {
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

