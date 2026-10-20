/**
 * Feature switches
 * ─────────────────────────────────────────────────────────────────────────────
 * PAYMENTS_ENABLED — online payments (Razorpay) for classes and membership.
 *
 *   OFF (default): the site runs in inquiry mode. Classes, membership and
 *   recordings all route visitors to WhatsApp; checkout pages redirect away;
 *   payment APIs answer 503. No payment code is deleted.
 *
 *   ON: set NEXT_PUBLIC_PAYMENTS_ENABLED=true (in .env.local and on Vercel),
 *   add the Razorpay keys, and redeploy. NEXT_PUBLIC_ values are baked in at
 *   build time, so a rebuild is required after changing it.
 */
export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true'
