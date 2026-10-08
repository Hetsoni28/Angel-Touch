import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { Eye } from 'lucide-react'
import Link from 'next/link'

export const instant = false

export default async function AdminCustomersPage() {
  await connection()
  const supabase = await createClient()

  // Fetch profiles with memberships and enrollments
  const { data: customers } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      email,
      created_at,
      is_admin,
      memberships ( status, expires_at ),
      class_enrollments ( id, status )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Customers</h1>
        <p className="text-[#5c5a58] text-[15px]">Manage your registered users and their access.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Registration Date</th>
              <th className="px-6 py-4">Membership Status</th>
              <th className="px-6 py-4">Classes Purchased</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer: any) => {
              // Calculate Membership Status
              const activeMembership = customer.memberships?.find((m: any) => m.status === 'active' && new Date(m.expires_at) > new Date())
              const membershipStatus = activeMembership ? 'Active' : 'Inactive'

              // Calculate Classes Purchased
              const confirmedClasses = customer.class_enrollments?.filter((e: any) => e.status === 'confirmed').length || 0

              return (
                <tr key={customer.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1e2228] flex items-center gap-2">
                      {customer.full_name || 'N/A'}
                      {customer.is_admin && <span className="px-2 py-0.5 text-[9px] bg-purple-100 text-purple-700 rounded font-bold uppercase tracking-widest">Admin</span>}
                    </p>
                    <p className="text-[#8a8d87] text-[11px]">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4">{new Date(customer.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${membershipStatus === 'Active' ? 'bg-[#e9f3e9] text-[#1e5f2e]' : 'bg-gray-100 text-gray-500'}`}>
                      {membershipStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#1e2228]">
                    {confirmedClasses} {confirmedClasses === 1 ? 'Class' : 'Classes'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center text-[#8a8d87] hover:text-[#1e2228] transition-colors" title="View Customer Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {(!customers || customers.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
