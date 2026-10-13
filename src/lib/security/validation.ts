import { z } from 'zod'

/**
 * Common sanitization function for basic text input.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // Strip angle brackets
    .trim()
}

/**
 * Server-side payment verification schema.
 */
export const verifyPaymentSchema = z.object({
  razorpay_order_id: z
    .string()
    .min(1, 'Order ID is required')
    .max(100, 'Order ID is too long')
    .regex(/^order_[a-zA-Z0-9]+$/, 'Invalid Razorpay Order ID format'),
  razorpay_payment_id: z
    .string()
    .min(1, 'Payment ID is required')
    .max(100, 'Payment ID is too long')
    .regex(/^pay_[a-zA-Z0-9]+$/, 'Invalid Razorpay Payment ID format'),
  razorpay_signature: z
    .string()
    .min(1, 'Signature is required')
    .max(256, 'Signature is too long'),
  type: z.enum(['class_enrollment', 'membership']),
  referenceId: z
    .string()
    .min(1, 'Reference ID is required')
    .max(128, 'Reference ID is too long'),
})

/**
 * Create order schema for class enrollment.
 */
export const createOrderSchema = z.object({
  type: z.literal('class_enrollment'),
  referenceId: z
    .string()
    .min(1, 'Reference ID is required')
    .max(128, 'Reference ID is too long'),
})

/**
 * Create subscription schema for membership plan.
 */
export const createSubscriptionSchema = z.object({
  sanityPlanId: z
    .string()
    .min(1, 'Plan ID is required')
    .max(128, 'Plan ID is too long'),
})

/**
 * Class enrollment schema.
 */
export const enrollClassSchema = z.object({
  classId: z
    .string()
    .min(1, 'classId is required')
    .max(128, 'classId is too long'),
})

/**
 * Recording access query parameter schema.
 */
export const recordingAccessSchema = z.object({
  classId: z
    .string()
    .min(1, 'classId query parameter is required')
    .max(128, 'classId is too long'),
})
