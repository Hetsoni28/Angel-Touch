'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type UpdateProfileResult = {
  success: boolean
  error?: string
}

export async function updateProfileAction(prevState: any, formData: FormData): Promise<UpdateProfileResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const fullName = formData.get('fullName')?.toString() || ''
  const phone = formData.get('phone')?.toString() || ''

  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name: fullName,
      phone: phone,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/customer/profile')
  return { success: true }
}
