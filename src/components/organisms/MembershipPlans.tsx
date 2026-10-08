import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

interface MembershipPlansProps {
  plans: any[]
}

export function MembershipPlans({ plans }: MembershipPlansProps) {
  return (
    <section className="py-20 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-4">Choose Your Plan</h2>
        <p className="text-[#5c5a58]">Invest in your formulation journey today.</p>
      </div>

      {plans && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan: any) => (
            <div key={plan._id} className="bg-white border border-[#dde7dd] p-8 md:p-10 flex flex-col hover:border-[#2e7a3a]/30 hover:shadow-xl transition-all duration-300">
              <h3 className="font-playfair text-2xl text-[#1e2228] mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-semibold text-[#1e2228]">₹{plan.price}</span>
                <span className="text-[#8a8d87] text-[13px]">/ {plan.billingPeriod?.toLowerCase()}</span>
              </div>
              
              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[#5c5a58] text-[14px]">
                      <Check className="w-5 h-5 text-[#2e7a3a] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/membership/checkout?plan=${plan._id}`} className="w-full">
                <Button className="w-full bg-[#1e2228] hover:bg-[#2e7a3a] text-white py-4 rounded-none text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors">
                  Choose Plan
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white border border-dashed border-[#dde7dd]">
          <p className="text-[#5c5a58]">Membership plans are currently being updated. Please check back soon.</p>
        </div>
      )}
    </section>
  )
}
