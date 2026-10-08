import { createClient } from '@/lib/supabase/server'
import { client } from '@/sanity/lib/client'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { MembershipCheckoutButton } from '@/components/organisms/MembershipCheckoutButton'
import { Check, ShieldCheck } from 'lucide-react'
import Script from 'next/script'
import Link from 'next/link'

export const instant = false

export default async function MembershipCheckoutPage({ searchParams }: { searchParams: { plan?: string } }) {
  await connection()

  const planId = searchParams.plan
  if (!planId) {
    redirect('/membership')
  }

  // 1. Authenticate
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/membership/checkout?plan=' + planId)
  }

  // 2. Fetch Plan
  const sanityPlan = await client.fetch(`*[_type == "membershipPlan" && _id == $id][0] { _id, name, price, billingPeriod, features }`, { id: planId })
  if (!sanityPlan) {
    redirect('/membership')
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] py-12 md:py-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-10 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-4">Secure Checkout</h1>
          <p className="text-[#5c5a58] text-[15px]">You are upgrading to the Angel Touch Premium Membership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-[#dde7dd] p-8 md:p-12 shadow-sm">
          
          {/* Left Column: Plan Summary */}
          <div>
            <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6">Plan Summary</h2>
            
            <div className="bg-[#faf8f2] p-6 border border-[#dde7dd] mb-8">
              <h3 className="font-playfair text-2xl text-[#1e2228] mb-2">{sanityPlan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-semibold text-[#1e2228]">₹{sanityPlan.price}</span>
                <span className="text-[#8a8d87] text-[13px]">/ {sanityPlan.billingPeriod?.toLowerCase()}</span>
              </div>
              <p className="text-[#5c5a58] text-[13px] leading-relaxed">
                By subscribing, you unlock unlimited instant access to our entire recorded vault.
              </p>
            </div>

            <ul className="space-y-4">
              {sanityPlan.features?.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-[#5c5a58] text-[14px]">
                  <Check className="w-4 h-4 text-[#2e7a3a] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Payment */}
          <div className="flex flex-col">
            <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6">Payment</h2>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#dde7dd]">
                <span className="text-[#5c5a58] text-[15px]">Subtotal</span>
                <span className="text-[#1e2228] font-semibold">₹{sanityPlan.price}</span>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-[#1e2228] text-lg font-playfair font-semibold">Total</span>
                <span className="text-[#1e2228] text-xl font-bold">₹{sanityPlan.price}</span>
              </div>

              <div className="bg-[#f0f9f0] border border-[#2e7a3a]/30 p-4 mb-6 flex items-start gap-3 rounded text-[#1e5f2e]">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] leading-relaxed">
                  Your payment is securely processed by Razorpay. Cancel anytime from your dashboard.
                </p>
              </div>

              <MembershipCheckoutButton 
                planId={sanityPlan._id} 
                amount={parseInt(sanityPlan.price)} 
              />
              
              <div className="text-center mt-6">
                <Link href="/membership" className="text-[#8a8d87] hover:text-[#1e2228] text-[11px] tracking-widest uppercase transition-colors">
                  Change Plan
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
