import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'

export const instant = false

export default async function AdminMembershipsPage() {
  await connection()
  const supabase = await createClient()

  const { data: memberships } = await supabase
    .from('memberships')
    .select(`
      *,
      profiles:user_id(full_name, email)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Memberships</h1>
        <p className="text-[#5c5a58] text-[15px]">Manage active and expired subscriptions.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Plan Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Expires At</th>
            </tr>
          </thead>
          <tbody>
            {memberships?.map((membership) => {
              const isExpired = new Date(membership.expires_at) < new Date()
              const displayStatus = isExpired && membership.status === 'active' ? 'expired' : membership.status
              
              return (
                <tr key={membership.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1e2228]">{membership.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-[#8a8d87] text-[11px]">{membership.profiles?.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{membership.plan_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                      displayStatus === 'active' ? 'bg-[#e9f3e9] text-[#1e5f2e]' :
                      displayStatus === 'expired' ? 'bg-orange-100 text-orange-700' :
                      displayStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {displayStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {membership.expires_at ? new Date(membership.expires_at).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              )
            })}
            {(!memberships || memberships.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">No memberships found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
