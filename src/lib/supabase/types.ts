/**
 * Supabase Database TypeScript Types
 * Angel Touch by Heena Thaker
 *
 * These types mirror the PostgreSQL schema exactly.
 * Keep in sync with supabase/migrations/20241001000000_initial_schema.sql
 */

// ── ENUM types ──────────────────────────────────────────────

export type MembershipTier = 'basic' | 'standard' | 'premium'

export type MembershipStatus = 'active' | 'cancelled' | 'expired' | 'paused' | 'pending'

export type EnrollmentStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | 'no_show'

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded' | 'partially_refunded'

export type PaymentType = 'membership' | 'class_enrollment' | 'recording_purchase'

export type PaymentGateway = 'razorpay' | 'stripe' | 'manual'

export type AccessGrantedVia = 'purchase' | 'membership'

// ── Table row types ──────────────────────────────────────────

export type Profile = {
  id: string                   // UUID — matches auth.users.id
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  is_admin: boolean
  is_active: boolean
  created_at: string           // ISO timestamptz
  updated_at: string
}

export type Membership = {
  id: string
  user_id: string
  plan_name: string
  tier: MembershipTier
  status: MembershipStatus
  started_at: string | null
  expires_at: string | null
  cancelled_at: string | null
  cancel_reason: string | null
  gateway: PaymentGateway | null
  gateway_subscription_id: string | null
  created_at: string
  updated_at: string
}

export type ClassEnrollment = {
  id: string
  user_id: string
  class_id: string             // Sanity document _id
  class_name: string
  status: EnrollmentStatus
  enrolled_at: string
  cancelled_at: string | null
  attended_at: string | null
  created_at: string
  updated_at: string
}

export type RecordingPurchase = {
  id: string
  user_id: string
  recording_id: string         // Sanity document _id
  recording_name: string
  purchased_at: string
  created_at: string
}

export type RecordingAccess = {
  id: string
  user_id: string
  recording_id: string
  granted_via: AccessGrantedVia
  purchase_id: string | null
  membership_id: string | null
  expires_at: string | null
  granted_at: string
  created_at: string
}

export type Payment = {
  id: string
  user_id: string
  payment_type: PaymentType
  reference_id: string | null
  amount_paise: number         // In smallest currency unit (paise for INR)
  currency: string
  status: PaymentStatus
  gateway: PaymentGateway
  gateway_order_id: string | null
  gateway_payment_id: string | null
  gateway_signature: string | null
  gateway_payload: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

// ── Supabase Database type (for createClient<Database>()) ────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Profile, 'id'>>
      }
      memberships: {
        Row: Membership
        Insert: Omit<Membership, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Membership, 'id' | 'user_id'>>
      }
      class_enrollments: {
        Row: ClassEnrollment
        Insert: Omit<ClassEnrollment, 'id' | 'created_at' | 'updated_at' | 'enrolled_at'> & {
          id?: string
          enrolled_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Pick<ClassEnrollment, 'status' | 'cancelled_at' | 'attended_at' | 'updated_at'>>
      }
      recording_purchases: {
        Row: RecordingPurchase
        Insert: Omit<RecordingPurchase, 'id' | 'created_at' | 'purchased_at'> & {
          id?: string
          purchased_at?: string
          created_at?: string
        }
        Update: never // Purchases are immutable
      }
      recording_access: {
        Row: RecordingAccess
        Insert: Omit<RecordingAccess, 'id' | 'created_at' | 'granted_at'> & {
          id?: string
          granted_at?: string
          created_at?: string
        }
        Update: Partial<Pick<RecordingAccess, 'expires_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Pick<Payment, 'status' | 'gateway_payment_id' | 'gateway_signature' | 'gateway_payload' | 'updated_at'>
      }
    }
    Enums: {
      membership_tier: MembershipTier
      membership_status: MembershipStatus
      enrollment_status: EnrollmentStatus
      payment_status: PaymentStatus
      payment_type: PaymentType
      payment_gateway: PaymentGateway
    }
  }
}
