import React from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { Card } from '@/components/molecules/Card'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'
import { EmptyState } from '@/components/molecules/EmptyState'
import { ErrorState } from '@/components/molecules/ErrorState'
import { Loading } from '@/components/molecules/Loading'
import { Pagination } from '@/components/molecules/Pagination'

export const metadata = {
  title: 'Design System | Angel Touch',
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#faf8f2] py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-24">
        
        <header>
          <h1 className="text-[3rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Design System
          </h1>
          <p className="text-[#5c5a58]">A live preview of all the global UI components built for Angel Touch.</p>
        </header>

        {/* Badges */}
        <section>
          <h2 className="text-[1.5rem] font-medium text-[#1e2228] mb-6 border-b border-[#dde7dd] pb-2" style={{ fontFamily: 'var(--font-heading)' }}>1. Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="live">Live Class</Badge>
            <Badge variant="recorded">Recorded</Badge>
            <Badge variant="membership">Membership</Badge>
            <Badge variant="neutral">Upcoming</Badge>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-[1.5rem] font-medium text-[#1e2228] mb-6 border-b border-[#dde7dd] pb-2" style={{ fontFamily: 'var(--font-heading)' }}>2. Buttons</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <Button variant="primary">Primary CTA</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" isLoading>Loading State</Button>
            <Button variant="primary" size="sm">Small Size</Button>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-[1.5rem] font-medium text-[#1e2228] mb-6 border-b border-[#dde7dd] pb-2" style={{ fontFamily: 'var(--font-heading)' }}>3. Cards & Skeletons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              title="Ayurvedic Hair Elixir Formulation" 
              subtitle="Masterclass"
              imageUrl="/images/ayurvedic_masterclass.jpg"
              badge={<Badge variant="live">Live Now</Badge>}
            >
              <Button variant="outline" className="w-full mt-4">Enroll Now — ₹999</Button>
            </Card>

            <Card 
              title="Kumkumadi Face Glow Oil" 
              subtitle="Recorded Vault"
              badge={<Badge variant="recorded">Recorded</Badge>}
            >
              <p className="text-[14px] text-[#5c5a58] mb-4">Learn how to make the traditional Kumkumadi Tailam using 21 herbs.</p>
              <Button variant="primary" className="w-full">Watch Video</Button>
            </Card>

            <CardSkeleton />
          </div>
        </section>

        {/* Feedback States */}
        <section>
          <h2 className="text-[1.5rem] font-medium text-[#1e2228] mb-6 border-b border-[#dde7dd] pb-2" style={{ fontFamily: 'var(--font-heading)' }}>4. Feedback States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EmptyState 
              title="No Classes Found" 
              description="You haven't purchased any masterclasses yet. Explore our upcoming classes to get started."
              actionLabel="View Classes"
              actionHref="/classes"
            />
            
            <ErrorState 
              title="Failed to Load" 
              description="We couldn't connect to the database to retrieve your classes."
              actionLabel="Retry Connection"
            />
          </div>
        </section>

        {/* Loading & Pagination */}
        <section>
          <h2 className="text-[1.5rem] font-medium text-[#1e2228] mb-6 border-b border-[#dde7dd] pb-2" style={{ fontFamily: 'var(--font-heading)' }}>5. Loading & Pagination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-[#dde7dd] p-8">
            <div className="flex justify-center border-r border-[#dde7dd]">
              <Loading text="Authenticating..." />
            </div>
            <div>
              <Pagination currentPage={2} totalPages={5} />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
