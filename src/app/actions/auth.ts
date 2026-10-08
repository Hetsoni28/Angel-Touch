'use server'

/**
 * Authentication Server Actions
 * ─────────────────────────────────────────────
 * All mutations to auth state go through here.
 * Server Actions run on the server — cookies are managed safely.
 */

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
  error?: string
  fieldErrors?: Record<string, string[]>
}

// ── Register ──────────────────────────────────────────────────

/**
 * Registers a new customer.
 *
 * Flow:
 *   1. Validate input
 *   2. Create Supabase Auth user (email + password)
 *   3. DB trigger auto-creates profiles row with is_admin = FALSE
 *   4. Redirect to /account on success
 *
 * Role is set to CUSTOMER by default in the DB trigger.
 * It can only be elevated to ADMIN via a server-side service-role action.
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

  // Validate
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
      // Passed to handle_new_user() trigger via raw_user_meta_data
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    // Translate Supabase error messages to user-friendly text
    if (error.message.includes('already registered')) {
      return { success: false, error: 'An account with this email already exists. Please log in.' }
    }
    return { success: false, error: error.message }
  }

  redirect('/account')
}

// ── Login ─────────────────────────────────────────────────────

/**
 * Signs in an existing user with email + password.
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
    // Never reveal whether email or password was wrong
    return {
      success: false,
      error: 'Invalid email or password. Please try again.',
    }
  }

  // Redirect based on role — read from DB, never from client
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

/**
 * Signs out the current user and clears the session cookie.
 */
export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
