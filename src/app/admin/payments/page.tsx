import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { client } from '@/sanity/lib/client'
import type { Payment, Profile } from '@/lib/supabase/types'

export const instant = false

export default async function AdminPaymentsPage() {
  await connection()
  const supabase = await createClient()

  const { data: payments } = await supabase
    .from('payments')
    .select(`
      *,
      profiles:user_id(full_name, email)
    `)
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

  type PaymentWithProfile = Payment & { 
    profiles?: Pick<Profile, 'full_name' | 'email'> | null,
    razorpay_payment_id?: string, // legacy
    gateway_payment_id?: string,
    razorpay_order_id?: string,   // legacy
    gateway_order_id?: string,
    amount?: number,              // legacy
    amount_paise?: number
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Payments</h1>
        <p className="text-[#5c5a58] text-[15px]">View and reconcile financial transactions.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Payment ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Reference</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {(payments as unknown as PaymentWithProfile[])?.map((payment) => {
              // Handle schema variations (amount vs amount_paise, razorpay_payment_id vs gateway_payment_id)
              const displayId = payment.razorpay_payment_id || payment.gateway_payment_id || payment.razorpay_order_id || payment.gateway_order_id || 'Pending'
              const displayAmount = payment.amount ? payment.amount : (payment.amount_paise ? payment.amount_paise / 100 : 0)
              
              // Handle reference resolution
              const refName = payment.reference_id ? referenceMap[payment.reference_id] : (payment.payment_type === 'membership' ? 'Premium Membership' : 'Class Enrollment')

              return (
                <tr key={payment.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4 font-mono text-[11px] text-[#8a8d87]">{displayId}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1e2228]">{payment.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-[#8a8d87] text-[11px]">{payment.profiles?.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1e2228] max-w-[150px] truncate" title={refName}>
                    {refName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold bg-blue-50 text-blue-700 rounded">
                      {payment.payment_type?.replace('_', ' ')}
                    </span>
                  </td>
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
            {(!payments || payments.length === 0) && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
