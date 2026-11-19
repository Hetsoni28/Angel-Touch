/**
 * Minimal types for the Razorpay Checkout browser SDK
 * (loaded from https://checkout.razorpay.com/v1/checkout.js).
 */

interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayFailureResponse {
  error?: {
    code?: string
    description?: string
    reason?: string
  }
}

interface RazorpayOptions {
  key?: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>
  modal?: { ondismiss?: () => void }
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
}

interface RazorpayInstance {
  open: () => void
  on: (event: 'payment.failed', callback: (response: RazorpayFailureResponse) => void) => void
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance
}
