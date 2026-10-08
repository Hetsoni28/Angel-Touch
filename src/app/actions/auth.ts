'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// ── Validation schemas ────────────────────────────────────────

const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long'),
})

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

// ── Types ─────────────────────────────────────────────────────

export type AuthActionResult = {
  success: boolean
  message?: string        // success message (e.g. check your email)
  error?: string          // global error message
  fieldErrors?: Record<string, string[]>
}

// ── Register ──────────────────────────────────────────────────

/**
 * Registers a new customer.
 *
 * Flow (with email confirmation ON):
 *   1. Validate input
 *   2. Create Supabase Auth user
 *   3. Supabase sends confirmation email automatically
 *   4. User must click the link — cannot login until verified
 *   5. DB trigger auto-creates profile on email confirmation
 *
 * Role is always CUSTOMER (is_admin = FALSE) — set by DB trigger.
 */
export async function registerAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = RegisterSchema.safeParse(rawData)
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { fullName, email, password } = parsed.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      // After clicking the confirmation link, user is redirected here
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      return {
        success: false,
        error: 'An account with this email already exists. Please sign in.',
      }
    }
    return { success: false, error: error.message }
  }

  // Don't redirect immediately — user must verify email first
  return {
    success: true,
    message: `We've sent a confirmation link to ${email}. Please check your inbox and click the link to activate your account.`,
  }
}

// ── Login ─────────────────────────────────────────────────────

/**
 * Signs in an existing user.
 * Supabase will automatically reject login if email is not confirmed.
 */
export async function loginAction(
  _prevState: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = LoginSchema.safeParse(rawData)
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { email, password } = parsed.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Supabase returns "Email not confirmed" if user hasn't verified
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return {
        success: false,
        error: 'Please verify your email first. Check your inbox for the confirmation link.',
      }
    }
    // Generic message — never reveal which field was wrong
    return {
      success: false,
      error: 'Invalid email or password. Please try again.',
    }
  }

  // Read role from DB — never from client
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .single()

  if (profile?.is_admin) {
    redirect('/admin')
  }

  redirect('/account')
}

// ── Logout ────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
