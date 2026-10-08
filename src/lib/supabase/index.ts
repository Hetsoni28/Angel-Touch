/**
 * src/lib/supabase/index.ts
 *
 * Barrel export — import from this file instead of individual modules.
 *
 * Usage:
 *   Server Component / Server Action:
 *     import { createClient } from '@/lib/supabase/server'
 *
 *   Client Component:
 *     import { createClient } from '@/lib/supabase/client'
 *
 *   Middleware:
 *     import { updateSession } from '@/lib/supabase/middleware'
 *
 *   Types:
 *     import type { Profile, Membership } from '@/lib/supabase/types'
 */

export type {
  Database,
  Profile,
  Membership,
  ClassEnrollment,
  RecordingPurchase,
  RecordingAccess,
  Payment,
  MembershipTier,
  MembershipStatus,
  EnrollmentStatus,
  PaymentStatus,
  PaymentType,
  PaymentGateway,
  AccessGrantedVia,
} from './types'

export {
  getMyProfile,
  getMyActiveMembership,
  getMyEnrollment,
  getMyEnrollments,
  getMyRecordingAccess,
  canAccessRecording,
  getMyPayments,
  assertOwnership,
} from './guards'

export type { UserRole } from './auth'

