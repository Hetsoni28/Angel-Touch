/**
 * Angel Touch — Email Service Abstraction Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * This file defines the INTERFACE for all transactional emails.
 * The actual provider (Resend, SendGrid, Nodemailer, etc.) is plugged in
 * via the `sendEmail()` function at the bottom.
 *
 * To switch providers: only change `sendEmail()`. Zero changes to callers.
 *
 * Email Types Required (Step 27):
 *   1.  REGISTRATION           → Welcome email after account creation
 *   2.  CLASS_PURCHASE         → Confirmation after class ticket purchase
 *   3.  PAYMENT_CONFIRMATION   → Generic payment receipt
 *   4.  CLASS_ENROLLMENT       → Zoom link delivery after confirmed enrollment
 *   5.  RECORDING_AVAILABLE    → Notifies attendees when recording is ready
 *   6.  MEMBERSHIP_ACTIVATION  → Welcome to membership + what's unlocked
 *   7.  MEMBERSHIP_EXPIRY      → Reminder 3 days before membership expires
 *   8.  PAYMENT_FAILED         → Notify user of payment failure
 */

export type EmailType =
  | 'REGISTRATION'
  | 'CLASS_PURCHASE'
  | 'PAYMENT_CONFIRMATION'
  | 'CLASS_ENROLLMENT'
  | 'RECORDING_AVAILABLE'
  | 'MEMBERSHIP_ACTIVATION'
  | 'MEMBERSHIP_EXPIRY'
  | 'PAYMENT_FAILED'

// ── Email Payload Shapes ──────────────────────────────────────────────────────

export interface RegistrationEmail {
  type: 'REGISTRATION'
  to: string
  name: string
}

export interface ClassPurchaseEmail {
  type: 'CLASS_PURCHASE'
  to: string
  name: string
  className: string
  amount: number        // in paise
  orderId: string
  classDate: string
}

export interface PaymentConfirmationEmail {
  type: 'PAYMENT_CONFIRMATION'
  to: string
  name: string
  amount: number        // in paise
  orderId: string
  paymentId: string
  description: string
}

export interface ClassEnrollmentEmail {
  type: 'CLASS_ENROLLMENT'
  to: string
  name: string
  className: string
  classDate: string
  classDuration: string
  zoomLink: string
}

export interface RecordingAvailableEmail {
  type: 'RECORDING_AVAILABLE'
  to: string
  name: string
  className: string
  dashboardUrl: string
}

export interface MembershipActivationEmail {
  type: 'MEMBERSHIP_ACTIVATION'
  to: string
  name: string
  planName: string
  expiresAt: string
  libraryUrl: string
}

export interface MembershipExpiryEmail {
  type: 'MEMBERSHIP_EXPIRY'
  to: string
  name: string
  planName: string
  expiresAt: string
  renewUrl: string
  daysRemaining: number
}

export interface PaymentFailedEmail {
  type: 'PAYMENT_FAILED'
  to: string
  name: string
  amount: number
  orderId: string
  retryUrl: string
}

export type EmailPayload =
  | RegistrationEmail
  | ClassPurchaseEmail
  | PaymentConfirmationEmail
  | ClassEnrollmentEmail
  | RecordingAvailableEmail
  | MembershipActivationEmail
  | MembershipExpiryEmail
  | PaymentFailedEmail

// ── Subject Lines ─────────────────────────────────────────────────────────────

function getSubject(payload: EmailPayload): string {
  switch (payload.type) {
    case 'REGISTRATION':
      return `Welcome to Angel Touch, ${payload.name} 🌿`
    case 'CLASS_PURCHASE':
      return `Your enrollment is confirmed — ${payload.className}`
    case 'PAYMENT_CONFIRMATION':
      return `Payment receipt — ₹${(payload.amount / 100).toFixed(0)}`
    case 'CLASS_ENROLLMENT':
      return `Your Zoom link is ready — ${payload.className}`
    case 'RECORDING_AVAILABLE':
      return `Your recording is now available — ${payload.className}`
    case 'MEMBERSHIP_ACTIVATION':
      return `Your Angel Touch membership is now active 🌿`
    case 'MEMBERSHIP_EXPIRY':
      return `Your membership expires in ${payload.daysRemaining} day${payload.daysRemaining !== 1 ? 's' : ''}`
    case 'PAYMENT_FAILED':
      return `Action required — your payment could not be completed`
  }
}

// ── Email Body Builder (Plain Text fallback) ──────────────────────────────────

function buildTextBody(payload: EmailPayload): string {
  const brand = 'Angel Touch by Heena Thaker'
  const footer = `\n\n---\n${brand}\nAyurvedic Wellness | Satellite, Ahmedabad\nThis is an automated message. Please do not reply directly.`

  switch (payload.type) {
    case 'REGISTRATION':
      return `Hello ${payload.name},\n\nWelcome to Angel Touch! Your account has been created successfully.\n\nYou can now enroll in our Ayurvedic product-making masterclasses and browse our wellness treatments.${footer}`
    
    case 'CLASS_PURCHASE':
      return `Hello ${payload.name},\n\nThank you for enrolling in "${payload.className}"!\n\nOrder ID: ${payload.orderId}\nAmount Paid: ₹${(payload.amount / 100).toFixed(0)}\nClass Date: ${payload.classDate}\n\nYour Zoom link will be sent to this email as the class date approaches.${footer}`
    
    case 'PAYMENT_CONFIRMATION':
      return `Hello ${payload.name},\n\nYour payment has been received.\n\nDescription: ${payload.description}\nAmount: ₹${(payload.amount / 100).toFixed(0)}\nOrder ID: ${payload.orderId}\nPayment ID: ${payload.paymentId}${footer}`
    
    case 'CLASS_ENROLLMENT':
      return `Hello ${payload.name},\n\nYour enrollment for "${payload.className}" is confirmed!\n\nClass Date: ${payload.classDate}\nDuration: ${payload.classDuration}\nZoom Link: ${payload.zoomLink}\n\nPlease save this link. It is unique to you — do not share it.${footer}`
    
    case 'RECORDING_AVAILABLE':
      return `Hello ${payload.name},\n\nThe recording for "${payload.className}" is now available in your dashboard.\n\nWatch it here: ${payload.dashboardUrl}${footer}`
    
    case 'MEMBERSHIP_ACTIVATION':
      return `Hello ${payload.name},\n\nYour "${payload.planName}" membership is now active!\n\nYou now have access to the full Angel Touch Recorded Library.\nMembership valid until: ${payload.expiresAt}\n\nExplore the library: ${payload.libraryUrl}${footer}`
    
    case 'MEMBERSHIP_EXPIRY':
      return `Hello ${payload.name},\n\nYour "${payload.planName}" membership expires on ${payload.expiresAt} (${payload.daysRemaining} day${payload.daysRemaining !== 1 ? 's' : ''} remaining).\n\nRenew to keep your access to the Recorded Library:\n${payload.renewUrl}${footer}`
    
    case 'PAYMENT_FAILED':
      return `Hello ${payload.name},\n\nUnfortunately, your payment of ₹${(payload.amount / 100).toFixed(0)} could not be processed (Order: ${payload.orderId}).\n\nYour card was not charged. Please try again:\n${payload.retryUrl}\n\nIf you continue to experience issues, contact us on WhatsApp.${footer}`
  }
}

// ── Main sendEmail Function ────────────────────────────────────────────────────
// ⚠️  PROVIDER NOT YET CONFIGURED.
// When ready: install `resend` (recommended) and replace the placeholder below.
// npm install resend
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const subject = getSubject(payload)
  const text = buildTextBody(payload)

  // ── Placeholder: log emails in development ────────────────────────────────
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 [Email Service] Would send email:')
    console.log(`  To: ${payload.to}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  Body:\n${text}`)
    return
  }

  // ── Production: Plug in provider here ────────────────────────────────────
  // Example using Resend:
  // const { error } = await resend.emails.send({
  //   from: 'Angel Touch <noreply@angeltouch.in>',
  //   to: payload.to,
  //   subject,
  //   text,
  // })
  // if (error) throw new Error(`Failed to send email: ${error.message}`)

  throw new Error('Email provider not configured. Set up Resend or another provider in src/lib/email/service.ts')
}
