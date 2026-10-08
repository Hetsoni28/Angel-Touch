import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

interface DashboardMembershipCardProps {
  isMember: boolean
  expiresAt?: string
}

export function DashboardMembershipCard({ isMember, expiresAt }: DashboardMembershipCardProps) {
  return (
    <section className="bg-white border border-[#dde7dd] p-8 relative overflow-hidden">
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-1">Membership Status</h2>
          <h3 className="font-playfair text-2xl text-[#1e2228]">
            {isMember ? 'Active Member' : 'No Active Membership'}
          </h3>
        </div>
        <Star className={`w-8 h-8 ${isMember ? 'text-[#edc179]' : 'text-[#dde7dd]'}`} />
      </div>
      
      {isMember && expiresAt ? (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            Your membership is active until {new Date(expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          </p>
          <Link href="/library" className="inline-flex items-center text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] transition-colors relative z-10">
            Access Video Library <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </>
      ) : (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            Join our membership to get unlimited access to all past class recordings and exclusive Ayurvedic content.
          </p>
          <Link href="/membership" className="inline-flex items-center text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] transition-colors relative z-10">
            Explore Membership <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </>
      )}
    </section>
  )
}
