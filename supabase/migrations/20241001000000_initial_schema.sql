-- =============================================================
-- Angel Touch – Supabase Database Schema
-- PostgreSQL via Supabase
--
-- Sections:
--   0. Extensions
--   1. ENUM types
--   2. Core tables
--      2a. profiles
--      2b. memberships
--      2c. class_enrollments
--      2d. recording_purchases
--      2e. recording_access
--      2f. payments
--   3. Functions & Triggers
--   4. Row Level Security (RLS) policies
--   5. Indexes
-- =============================================================


-- =============================================================
-- 0. EXTENSIONS
-- =============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- future fuzzy-search on names


-- =============================================================
-- 1. ENUM TYPES
-- =============================================================

-- Membership plan tier
CREATE TYPE membership_tier AS ENUM (
  'basic',
  'standard',
  'premium'
);

-- Membership / subscription status
CREATE TYPE membership_status AS ENUM (
  'active',
  'cancelled',
  'expired',
  'paused',
  'pending'
);

-- Enrollment status for a live class
CREATE TYPE enrollment_status AS ENUM (
  'confirmed',
  'waitlisted',
  'cancelled',
  'attended',
  'no_show'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
  'pending',
  'succeeded',
  'failed',
  'refunded',
  'partially_refunded'
);

-- Payment type — what was paid for
CREATE TYPE payment_type AS ENUM (
  'membership',
  'class_enrollment',
  'recording_purchase'
);

-- Supported payment gateways (extend as needed)
CREATE TYPE payment_gateway AS ENUM (
  'razorpay',
  'stripe',
  'manual'
);


-- =============================================================
-- 2a. PROFILES
-- Mirror of auth.users with business-specific fields.
-- Created automatically via trigger on auth.users INSERT.
-- =============================================================
CREATE TABLE profiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  full_name       TEXT,
  phone           TEXT,
  avatar_url      TEXT,

  -- Preferences / meta
  is_admin        BOOLEAN     NOT NULL DEFAULT FALSE,
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,

  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE profiles IS
  'Extended profile data for every authenticated user. Synced from auth.users via trigger.';


-- =============================================================
-- 2b. MEMBERSHIPS
-- One active membership row per user at a time.
-- Historical/expired rows are kept for audit.
-- =============================================================
CREATE TABLE memberships (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Plan details (denormalised from Sanity CMS at purchase time)
  plan_name         TEXT        NOT NULL,
  tier              membership_tier NOT NULL,

  -- Lifecycle
  status            membership_status NOT NULL DEFAULT 'pending',
  started_at        TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  cancelled_at      TIMESTAMPTZ,
  cancel_reason     TEXT,

  -- Billing references
  gateway           payment_gateway,
  gateway_subscription_id TEXT,        -- e.g. Razorpay subscription ID

  -- Timestamps
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Business rule: only one ACTIVE membership per user
  CONSTRAINT one_active_membership_per_user
    EXCLUDE USING btree (user_id WITH =)
    WHERE (status = 'active')
);

COMMENT ON TABLE memberships IS
  'Membership subscriptions. Only one row may be in status=active per user at any time.';


-- =============================================================
-- 2c. CLASS_ENROLLMENTS
-- One row per user per class session.
-- Sanity holds the class definition; this table holds who enrolled.
-- =============================================================
CREATE TABLE class_enrollments (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Reference to Sanity CMS class document
  class_id        TEXT        NOT NULL,   -- Sanity document _id
  class_name      TEXT        NOT NULL,   -- Denormalised at enroll time

  -- Lifecycle
  status          enrollment_status NOT NULL DEFAULT 'confirmed',
  enrolled_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancelled_at    TIMESTAMPTZ,
  attended_at     TIMESTAMPTZ,

  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A user can only enroll once per class
  UNIQUE (user_id, class_id)
);

COMMENT ON TABLE class_enrollments IS
  'Tracks which users have enrolled in which live Sanity-defined classes.';


-- =============================================================
-- 2d. RECORDING_PURCHASES
-- One-time purchase of a recorded class.
-- =============================================================
CREATE TABLE recording_purchases (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Reference to Sanity CMS recorded class document
  recording_id    TEXT        NOT NULL,   -- Sanity document _id
  recording_name  TEXT        NOT NULL,   -- Denormalised at purchase time

  -- Timestamps
  purchased_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A user can only purchase the same recording once
  UNIQUE (user_id, recording_id)
);

COMMENT ON TABLE recording_purchases IS
  'One-time recording purchases. Pair with recording_access to determine actual playback rights.';


-- =============================================================
-- 2e. RECORDING_ACCESS
-- Authoritative gate: can this user play this recording?
-- Derived from recording_purchases OR active membership tier.
-- Managed by application logic / Supabase Edge Functions.
-- =============================================================
CREATE TABLE recording_access (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Reference to Sanity CMS recorded class document
  recording_id    TEXT        NOT NULL,

  -- How was access granted?
  granted_via     TEXT        NOT NULL
    CHECK (granted_via IN ('purchase', 'membership')),

  -- FK to source of access (nullable depending on granted_via)
  purchase_id     UUID        REFERENCES recording_purchases(id) ON DELETE SET NULL,
  membership_id   UUID        REFERENCES memberships(id) ON DELETE SET NULL,

  -- Expiry (NULL = permanent; set for membership-based access)
  expires_at      TIMESTAMPTZ,

  -- Timestamps
  granted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- A user can only have one access row per recording
  UNIQUE (user_id, recording_id)
);

COMMENT ON TABLE recording_access IS
  'Single source of truth for recording playback rights. Populated by application logic when a purchase or membership is confirmed.';


-- =============================================================
-- 2f. PAYMENTS
-- Immutable payment ledger. Never UPDATE or DELETE a row.
-- One row per payment attempt (success or failure).
-- =============================================================
CREATE TABLE payments (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id             UUID        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,

  -- What was paid for
  payment_type        payment_type NOT NULL,
  reference_id        UUID,        -- enrollment / purchase / membership row id

  -- Amount
  amount_paise        INTEGER     NOT NULL CHECK (amount_paise > 0),  -- in smallest currency unit (paise for INR)
  currency            TEXT        NOT NULL DEFAULT 'INR',

  -- Status
  status              payment_status NOT NULL DEFAULT 'pending',

  -- Gateway
  gateway             payment_gateway NOT NULL,
  gateway_order_id    TEXT,        -- Razorpay order_id
  gateway_payment_id  TEXT,        -- Razorpay payment_id
  gateway_signature   TEXT,        -- Razorpay signature (for verification)

  -- Raw gateway response for debugging
  gateway_payload     JSONB,

  -- Timestamps (immutable — never update these)
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE payments IS
  'Immutable payment ledger. One row per payment attempt. Never delete or update amount/gateway fields after creation.';


-- =============================================================
-- 3. FUNCTIONS & TRIGGERS
-- =============================================================

-- 3a. updated_at auto-update trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to all mutable tables
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER class_enrollments_updated_at
  BEFORE UPDATE ON class_enrollments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();


-- 3b. Auto-create profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- =============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships        ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE recording_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE recording_access   ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;


-- ── profiles ──────────────────────────────────────────────────

-- Users can read their own profile
CREATE POLICY "profiles: user can read own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles: user can update own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles: admin can read all"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );


-- ── memberships ───────────────────────────────────────────────

-- Users can read their own memberships
CREATE POLICY "memberships: user can read own"
  ON memberships FOR SELECT
  USING (auth.uid() = user_id);

-- Service role (backend) can insert/update memberships
-- Users cannot directly write memberships — only via server actions
CREATE POLICY "memberships: admin can manage all"
  ON memberships FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );


-- ── class_enrollments ─────────────────────────────────────────

-- Users can read their own enrollments
CREATE POLICY "enrollments: user can read own"
  ON class_enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own enrollment (with server-side validation)
CREATE POLICY "enrollments: user can insert own"
  ON class_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can cancel their own enrollment (status update only)
CREATE POLICY "enrollments: user can cancel own"
  ON class_enrollments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can manage all enrollments
CREATE POLICY "enrollments: admin can manage all"
  ON class_enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );


-- ── recording_purchases ───────────────────────────────────────

-- Users can read their own purchases
CREATE POLICY "recording_purchases: user can read own"
  ON recording_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can manage all
CREATE POLICY "recording_purchases: admin can manage all"
  ON recording_purchases FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );


-- ── recording_access ──────────────────────────────────────────

-- Users can read their own access rows
CREATE POLICY "recording_access: user can read own"
  ON recording_access FOR SELECT
  USING (auth.uid() = user_id);

-- Admins / service role can manage all access
CREATE POLICY "recording_access: admin can manage all"
  ON recording_access FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );


-- ── payments ──────────────────────────────────────────────────

-- Users can read their own payments
CREATE POLICY "payments: user can read own"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all payments
CREATE POLICY "payments: admin can read all"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Nobody can UPDATE or DELETE payment rows directly
-- Mutations happen only via server-side service-role API calls


-- =============================================================
-- 5. INDEXES (for query performance)
-- =============================================================

-- profiles
CREATE INDEX idx_profiles_is_admin  ON profiles (is_admin) WHERE is_admin = TRUE;

-- memberships
CREATE INDEX idx_memberships_user_id   ON memberships (user_id);
CREATE INDEX idx_memberships_status    ON memberships (status);
CREATE INDEX idx_memberships_expires   ON memberships (expires_at) WHERE status = 'active';

-- class_enrollments
CREATE INDEX idx_class_enrollments_user_id  ON class_enrollments (user_id);
CREATE INDEX idx_class_enrollments_class_id ON class_enrollments (class_id);
CREATE INDEX idx_class_enrollments_status   ON class_enrollments (status);

-- recording_purchases
CREATE INDEX idx_recording_purchases_user_id    ON recording_purchases (user_id);
CREATE INDEX idx_recording_purchases_recording  ON recording_purchases (recording_id);

-- recording_access
CREATE INDEX idx_recording_access_user_id    ON recording_access (user_id);
CREATE INDEX idx_recording_access_recording  ON recording_access (recording_id);
CREATE INDEX idx_recording_access_expires    ON recording_access (expires_at) WHERE expires_at IS NOT NULL;

-- payments
CREATE INDEX idx_payments_user_id     ON payments (user_id);
CREATE INDEX idx_payments_type        ON payments (payment_type);
CREATE INDEX idx_payments_status      ON payments (status);
CREATE INDEX idx_payments_created_at  ON payments (created_at DESC);
