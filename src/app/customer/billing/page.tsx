import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import type { Payment } from '@/lib/supabase/types'

export const instant = false // Allow dynamic Sanity fetches without suspense block

export default async function CustomerBillingPage() {
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

  return (
    <div className="w-full fade-in-up">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Billing History</h1>
        <p className="text-[#5c5a58] text-[15px]">View your past purchases, masterclass enrollments, and subscriptions.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
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
                  <td className="px-6 py-4">{new Date(payment.created_at).toLocaleDateString()}</td>
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
