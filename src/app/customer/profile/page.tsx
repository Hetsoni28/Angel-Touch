import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/organisms/ProfileForm'

export default async function CustomerProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="w-full fade-in-up">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">My Profile</h1>
        <p className="text-[#5c5a58] text-[15px]">Manage your personal information.</p>
      </div>
      
      <ProfileForm initialData={{
        full_name: profile?.full_name || null,
        phone: profile?.phone || null,
        email: user.email
      }} />
    </div>
  )
}
