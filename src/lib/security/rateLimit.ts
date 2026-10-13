import { NextRequest, NextResponse } from 'next/server'

interface RateLimitRecord {
  count: number
  resetTime: number
}

interface RateLimitConfig {
  windowMs: number
  max: number
  prefix?: string
}

// In-memory token bucket store
const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodically clean up expired entries (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetTime <= now) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

/**
 * Extracts a client identifier from the request (IP address or fallback).
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return '127.0.0.1'
}

/**
 * Rate limit checker for Next.js API Routes and Server Actions.
 */
export function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig,
  customIdentifier?: string
): {
  allowed: boolean
  limit: number
  remaining: number
  resetTime: number
  retryAfterSeconds: number
} {
  const now = Date.now()
  const identifier = customIdentifier || getClientIp(req)
  const key = `${config.prefix || 'rl'}:${identifier}`

  let record = rateLimitStore.get(key)

  if (!record || record.resetTime <= now) {
    // New window
    record = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    rateLimitStore.set(key, record)
    return {
      allowed: true,
      limit: config.max,
      remaining: config.max - 1,
      resetTime: record.resetTime,
      retryAfterSeconds: Math.ceil(config.windowMs / 1000),
    }
  }

  // Window is ongoing
  record.count += 1
  const remaining = Math.max(0, config.max - record.count)
  const retryAfterSeconds = Math.ceil(Math.max(0, record.resetTime - now) / 1000)

  if (record.count > config.max) {
    return {
      allowed: false,
      limit: config.max,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds,
    }
  }

  return {
    allowed: true,
    limit: config.max,
    remaining,
    resetTime: record.resetTime,
    retryAfterSeconds,
  }
}

/**
 * Creates a standardized 429 Too Many Requests response with standard headers.
 */
export function rateLimitExceededResponse(result: {
  limit: number
  remaining: number
  resetTime: number
  retryAfterSeconds: number
}) {
  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please try again later.',
      code: 429,
    },
    {
      status: 429,
      headers: {
        'Retry-After': result.retryAfterSeconds.toString(),
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
      },
    }
  )
}

// Preset rate limiters for common endpoints
export const RATE_LIMIT_PRESETS = {
  // Stricter for payment order creation & verification (15 requests / minute)
  PAYMENTS: {
    windowMs: 60 * 1000,
    max: 15,
    prefix: 'payments',
  },
  // Sensitive endpoints like class enrollment (20 requests / minute)
  ENROLLMENT: {
    windowMs: 60 * 1000,
    max: 20,
    prefix: 'enroll',
  },
  // Video playback access checks (30 requests / minute)
  VIDEO_ACCESS: {
    windowMs: 60 * 1000,
    max: 30,
    prefix: 'video',
  },
  // Standard API endpoints (60 requests / minute)
  GENERAL_API: {
    windowMs: 60 * 1000,
    max: 60,
    prefix: 'api',
  },
}
