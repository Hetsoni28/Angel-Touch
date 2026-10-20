import { createClient } from '@/lib/supabase/server'
import { client } from '@/sanity/lib/client'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { MembershipCheckoutButton } from '@/components/organisms/MembershipCheckoutButton'
import { Check, ShieldCheck } from 'lucide-react'
import Script from 'next/script'
import Link from 'next/link'
import { PAYMENTS_ENABLED } from '@/lib/features'

export const instant = false

export default async function MembershipCheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  await connection()

  // Inquiry mode: membership is "coming soon" — no checkout yet
  if (!PAYMENTS_ENABLED) {
    redirect('/membership')
  }

  const resolvedSearchParams = await searchParams
  const planId = resolvedSearchParams.plan
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

  // 3. Prevent duplicate active subscription
  const { data: activeMembership } = await supabase
    .from('memberships')
    .select('id, plan_name, expires_at, status')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  const isAlreadyActive = !!activeMembership?.expires_at && new Date(activeMembership.expires_at) > new Date()

  return (
    <div className="min-h-screen bg-[#faf8f2] py-12 md:py-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-4xl mx-auto px-6">
        
        {isAlreadyActive ? (
          <div className="max-w-xl mx-auto bg-white border border-[#2e7a3a]/40 p-8 md:p-12 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#e9f3e9] flex items-center justify-center mx-auto mb-6 text-[#2e7a3a]">
              <Check className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2e7a3a] block mb-2">
              Subscription Active
            </span>
            <h2 className="font-playfair text-2xl md:text-3xl text-[#1e2228] mb-4">
              You Already Have an Active Membership
            </h2>
            <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-8">
              Your {activeMembership.plan_name || 'Premium'} membership is active and valid until{' '}
              {new Date(activeMembership.expires_at!).toLocaleDateString('en-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              . You already enjoy full access to all recordings in our vault.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/customer/library"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                Access Video Vault
              </Link>
              <Link
                href="/customer/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#dde7dd] hover:border-[#1e2228] text-[#1e2228] text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                My Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-4">Secure Checkout</h1>
              <p className="text-[#5c5a58] text-[15px]">You are upgrading to the Angel Touch Premium Membership.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white border border-[#dde7dd] p-6 sm:p-8 md:p-12 shadow-sm">
          
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
          </>
        )}
      </div>
    </div>
  )
}
