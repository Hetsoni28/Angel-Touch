import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'

export const instant = false

export default async function AdminCustomersPage() {
  await connection()
  const supabase = await createClient()

  const { data: customers } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Customers</h1>
        <p className="text-[#5c5a58] text-[15px]">Manage your registered users.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                <td className="px-6 py-4 font-semibold text-[#1e2228]">{customer.full_name || 'N/A'}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${customer.is_admin ? 'bg-purple-100 text-purple-700' : 'bg-[#e9f3e9] text-[#1e5f2e]'}`}>
                    {customer.is_admin ? 'Admin' : 'Customer'}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!customers || customers.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
