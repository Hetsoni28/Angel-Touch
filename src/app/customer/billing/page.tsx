import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import type { Payment } from '@/lib/supabase/types'
import { connection } from 'next/server'

export const instant = false // Allow dynamic Sanity fetches without suspense block

export default async function CustomerBillingPage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch payments for the logged in user
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch Sanity metadata to map references
  const [masterclasses, membershipPlans] = await Promise.all([
    client.fetch(`*[_type == "masterclass"] { _id, title }`),
    client.fetch(`*[_type == "membershipPlan"] { _id, name }`)
  ])

  const referenceMap = [...masterclasses, ...membershipPlans].reduce((acc: Record<string, string>, curr: { _id: string, title?: string, name?: string }) => {
    if (curr._id) {
      acc[curr._id] = curr.title || curr.name || 'Unknown'
    }
    return acc
  }, {} as Record<string, string>)

  // Handle legacy schema types safely
  type CustomerPayment = Payment & { 
    razorpay_order_id?: string,
    gateway_order_id?: string,
    razorpay_payment_id?: string,
    gateway_payment_id?: string,
    amount?: number,
    amount_paise?: number
  }

  const typedPayments = (payments as unknown as CustomerPayment[]) || []

  const rows = typedPayments.map((payment) => ({
    id: payment.id,
    ref: payment.razorpay_payment_id || payment.gateway_payment_id || payment.razorpay_order_id || payment.gateway_order_id || 'Pending',
    amount: payment.amount ? payment.amount : (payment.amount_paise ? payment.amount_paise / 100 : 0),
    item: payment.reference_id ? referenceMap[payment.reference_id] || (payment.payment_type === 'membership' ? 'Membership' : 'Class enrollment') : (payment.payment_type === 'membership' ? 'Membership' : 'Class enrollment'),
    status: payment.status,
    date: payment.created_at ? new Date(payment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
  }))
  const badge = (status: string) =>
    status === 'succeeded' ? 'bg-[#e9f3e9] text-[#1e5f2e]'
    : status === 'failed' ? 'bg-red-100 text-red-700'
    : status === 'refunded' ? 'bg-orange-100 text-orange-700'
    : 'bg-gray-100 text-gray-700'
  const inr = (n: number) => n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

  return (
    <div className="w-full fade-in-up">
      <div className="mb-5 md:mb-8">
        <h1 className="font-playfair text-[1.65rem] leading-tight md:text-3xl text-[#1e2228] mb-1.5">Billing &amp; <span className="accent-italic">payments</span></h1>
        <p className="text-[#5c5a58] text-[14px] md:text-[15px]">Your purchases, class enrollments and membership payments.</p>
      </div>

      {/* Phones: one card per payment (no sideways-scrolling table) */}
      <ul className="md:hidden space-y-3">
        {rows.map((r) => (
          <li key={r.id} className="bg-white border border-[#dde7dd] rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[15px] font-semibold text-[#1e2228] leading-snug">{r.item}</p>
              <p className="text-[16px] font-semibold text-[#1e2228] tabular shrink-0">{inr(r.amount)}</p>
            </div>
            <div className="flex items-center justify-between gap-3 mt-3">
              <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${badge(r.status)}`}>{r.status}</span>
              <span className="text-[12.5px] text-[#6b6e68] tabular">{r.date}</span>
            </div>
            <p className="mt-3 pt-3 border-t border-[#dde7dd]/70 font-mono text-[11px] text-[#8a8d87] break-all">{r.ref}</p>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="bg-white border border-[#dde7dd] rounded-xl px-5 py-10 text-center">
            <p className="text-[15px] text-[#1e2228] mb-1">No payments yet</p>
            <p className="text-[13px] text-[#6b6e68]">Your completed payments will appear here.</p>
          </li>
        )}
      </ul>

      {/* Tablet and up: table */}
      <div className="hidden md:block bg-white border border-[#dde7dd] rounded-xl overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58] min-w-[620px]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {typedPayments.map((payment) => {
              const displayId = payment.razorpay_payment_id || payment.gateway_payment_id || payment.razorpay_order_id || payment.gateway_order_id || 'Pending'
              const displayAmount = payment.amount ? payment.amount : (payment.amount_paise ? payment.amount_paise / 100 : 0)
              
              // Map reference or fallback to type
              const refName = payment.reference_id ? referenceMap[payment.reference_id] : (payment.payment_type === 'membership' ? 'Premium Membership' : 'Class Enrollment')

              return (
                <tr key={payment.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4 font-mono text-[11px] text-[#8a8d87]">{displayId}</td>
                  <td className="px-6 py-4 font-medium text-[#1e2228]">{refName}</td>
                  <td className="px-6 py-4 font-semibold text-[#1e2228]">₹{displayAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                      payment.status === 'succeeded' ? 'bg-[#e9f3e9] text-[#1e5f2e]' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-700' :
                      payment.status === 'refunded' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{payment.created_at ? new Date(payment.created_at).toLocaleDateString() : '—'}</td>
                </tr>
              )
            })}
            {typedPayments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <p className="text-[14px] text-[#5c5a58] mb-2">No billing history found.</p>
                  <p className="text-[12px] text-[#8a8d87]">Your completed transactions will appear here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
