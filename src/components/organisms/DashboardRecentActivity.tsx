import { History } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  status: string
  created_at: string
  payment_type: string
}

interface DashboardRecentActivityProps {
  payments: Payment[] | null
}

export function DashboardRecentActivity({ payments }: DashboardRecentActivityProps) {
  return (
    <section className="bg-white border border-[#dde7dd] p-8">
      <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6 flex items-center">
        <History className="w-3.5 h-3.5 mr-2" />
        Recent Activity
      </h2>
      
      <div className="space-y-4">
        {!payments || payments.length === 0 ? (
          <p className="text-[13px] text-[#5c5a58]">No recent activity found.</p>
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="pb-4 border-b border-[#dde7dd] last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[14px] text-[#1e2228] font-medium mb-1">
                    {payment.payment_type === 'class_enrollment' ? 'Class Purchase' : 'Membership Purchase'}
                  </p>
                  <p className="text-[12px] text-[#8a8d87]">
                    {new Date(payment.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-playfair text-[#1e2228]">₹{payment.amount}</p>
                  <p className={`text-[11px] uppercase tracking-wider font-semibold ${payment.status === 'succeeded' ? 'text-[#2e7a3a]' : 'text-[#8a8d87]'}`}>
                    {payment.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
