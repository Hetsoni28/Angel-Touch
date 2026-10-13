/**
 * Security Environment Variable Validation
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates that all server secrets are present and NOT exposed with NEXT_PUBLIC_
 * prefix. This file is intended for SERVER-SIDE use only.
 */

export function assertServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: Server environment module accessed from browser!')
  }

  const criticalServerSecrets = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'RAZORPAY_KEY_SECRET',
    'RAZORPAY_WEBHOOK_SECRET',
  ]

  const missing: string[] = []
  for (const secret of criticalServerSecrets) {
    if (!process.env[secret]) {
      missing.push(secret)
    }
  }

  if (missing.length > 0) {
    console.warn(`[Security Warning] Missing server environment variables: ${missing.join(', ')}`)
  }

  // Ensure no secrets are accidentally mapped to NEXT_PUBLIC_
  const exposed = Object.keys(process.env).filter(
    (key) =>
      key.startsWith('NEXT_PUBLIC_') &&
      (key.includes('SECRET') || key.includes('SERVICE_ROLE') || key.includes('PRIVATE'))
  )

  if (exposed.length > 0) {
    throw new Error(
      `CRITICAL SECURITY VIOLATION: Secrets exposed under NEXT_PUBLIC_ namespace: ${exposed.join(', ')}`
    )
  }
}
