import crypto from 'crypto'

/**
 * Timing-safe HMAC-SHA256 verification
 * Prevents timing attacks by comparing hashes in constant time.
 */
export function verifyHmacSha256(data: string, signature: string, secret: string): boolean {
  if (!data || !signature || !secret) {
    return false
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex')

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8')
    const actualBuffer = Buffer.from(signature, 'utf8')

    if (expectedBuffer.length !== actualBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  } catch {
    return false
  }
}

/**
 * Verifies Razorpay client payment checkout signature:
 * data format: `${orderId}|${paymentId}`
 */
export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
  secret,
}: {
  orderId: string
  paymentId: string
  signature: string
  secret?: string
}): boolean {
  const secretKey = secret || process.env.RAZORPAY_KEY_SECRET
  if (!secretKey) {
    console.error('[Security] Missing RAZORPAY_KEY_SECRET for signature verification.')
    return false
  }

  const payload = `${orderId}|${paymentId}`
  return verifyHmacSha256(payload, signature, secretKey)
}

/**
 * Verifies Razorpay webhook payload signature:
 * data format: raw body string
 */
export function verifyRazorpayWebhookSignature(rawBody: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[Security] Missing RAZORPAY_WEBHOOK_SECRET.')
    return false
  }

  return verifyHmacSha256(rawBody, signature, webhookSecret)
}
