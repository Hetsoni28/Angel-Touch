/**
 * API Layer — Shared Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Standardised success/error response helpers for all API routes.
 * All routes return { success, data?, error? } — never raw DB rows.
 */

import { NextResponse } from 'next/server'

export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiError = {
  success: false
  error: string
  code?: number
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data }, { status })
}

export function fail(error: string, status = 400) {
  return NextResponse.json<ApiError>({ success: false, error, code: status }, { status })
}

export function unauthorized() {
  return fail('Unauthorized — please log in.', 401)
}

export function forbidden() {
  return fail('Forbidden — you do not have permission.', 403)
}

export function serverError(message = 'An internal server error occurred.') {
  return fail(message, 500)
}

/** Returned by payment endpoints while PAYMENTS_ENABLED is off (see src/lib/features.ts). */
export function paymentsDisabled() {
  return fail('Online payments are not available yet. Please contact us on WhatsApp.', 503)
}
