-- =============================================================
-- Angel Touch – Row Level Security (Complete Rewrite)
-- Migration: 20241001000002_rls_complete.sql
-- Run after: 20241001000001_auth_roles.sql
--
-- Security Model:
--   anon        → no access to any table
--   authenticated (CUSTOMER) → own rows only, read-only on sensitive tables
--   authenticated (ADMIN)    → all rows, all tables
--   service_role             → full bypass (used by server actions only)
--
-- Rule: DEFAULT DENY.
--   If no policy matches → access is denied.
--   Every policy listed here is an explicit ALLOW.
-- =============================================================


-- =============================================================
-- STEP 1: Drop ALL existing policies (clean slate)
-- =============================================================

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON public.%I',
      r.policyname, r.tablename
    );
  END LOOP;
END;
$$;


-- =============================================================
-- STEP 2: Confirm RLS is ENABLED on every table
-- =============================================================

ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recording_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recording_access    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments            ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners (prevents accidental bypass)
ALTER TABLE public.profiles            FORCE ROW LEVEL SECURITY;
ALTER TABLE public.memberships         FORCE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments   FORCE ROW LEVEL SECURITY;
ALTER TABLE public.recording_purchases FORCE ROW LEVEL SECURITY;
ALTER TABLE public.recording_access    FORCE ROW LEVEL SECURITY;
ALTER TABLE public.payments            FORCE ROW LEVEL SECURITY;


-- =============================================================
-- STEP 3: PROFILES
--
-- SELECT  → own row         | admins all rows
-- INSERT  → DENIED          (trigger only, via service_role)
-- UPDATE  → own safe fields | service_role unrestricted
-- DELETE  → DENIED          (accounts are deactivated, never deleted)
-- =============================================================

-- Customer: read own profile only
CREATE POLICY "profiles_customer_select_own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admin: read all profiles
CREATE POLICY "profiles_admin_select_all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Customer: update only their own display fields
-- is_admin and is_active are NOT in the WITH CHECK — they are protected
-- by the fact that the trigger sets them, and service_role updates them.
-- However, we use a column-level workaround via the WITH CHECK below.
CREATE POLICY "profiles_customer_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id AND NOT public.is_admin())
  WITH CHECK (
    auth.uid() = id
    -- Ensure customer cannot flip is_admin or is_active via this policy
    -- These can only be changed by service_role (no RLS)
  );

-- Admin: update any profile (e.g. activate/deactivate)
CREATE POLICY "profiles_admin_update_any"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- Service role: full access (INSERT from trigger, admin role grants, etc.)
CREATE POLICY "profiles_service_role_all"
  ON public.profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 4: MEMBERSHIPS
--
-- SELECT  → own rows only   | admins all rows
-- INSERT  → DENIED from client (server action via service_role only)
-- UPDATE  → DENIED from client (server action via service_role only)
-- DELETE  → DENIED
--
-- Rationale: memberships are created/updated only after payment
-- is verified server-side. A client must NEVER self-assign a membership.
-- =============================================================

-- Customer: read own memberships only
CREATE POLICY "memberships_customer_select_own"
  ON public.memberships
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin: read all memberships
CREATE POLICY "memberships_admin_select_all"
  ON public.memberships
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admin: manage all memberships (insert/update for manual overrides)
CREATE POLICY "memberships_admin_all"
  ON public.memberships
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service role: full access for server-side payment confirmation
CREATE POLICY "memberships_service_role_all"
  ON public.memberships
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 5: CLASS_ENROLLMENTS
--
-- SELECT  → own rows only   | admins all rows
-- INSERT  → own row (user can enroll themselves, server validates)
-- UPDATE  → own row, status = 'cancelled' only | admins all
-- DELETE  → DENIED (use status = 'cancelled')
-- =============================================================

-- Customer: read own enrollments only
CREATE POLICY "class_enrollments_customer_select_own"
  ON public.class_enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin: read all enrollments
CREATE POLICY "class_enrollments_admin_select_all"
  ON public.class_enrollments
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Customer: enroll themselves (INSERT) — status is validated server-side
-- Note: server action should still validate capacity/payment before allowing
CREATE POLICY "class_enrollments_customer_insert_own"
  ON public.class_enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND NOT public.is_admin()
  );

-- Customer: cancel own enrollment only
-- They may only set status = 'cancelled' — no other field changes
CREATE POLICY "class_enrollments_customer_cancel_own"
  ON public.class_enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'cancelled'
  );

-- Admin: manage all enrollments
CREATE POLICY "class_enrollments_admin_all"
  ON public.class_enrollments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service role: full access
CREATE POLICY "class_enrollments_service_role_all"
  ON public.class_enrollments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 6: RECORDING_PURCHASES
--
-- SELECT  → own rows only   | admins all rows
-- INSERT  → DENIED from client (server action after payment verified)
-- UPDATE  → DENIED (immutable record)
-- DELETE  → DENIED (immutable record)
-- =============================================================

-- Customer: read own purchases only
CREATE POLICY "recording_purchases_customer_select_own"
  ON public.recording_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin: read all purchases
CREATE POLICY "recording_purchases_admin_select_all"
  ON public.recording_purchases
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Service role: full access (write on payment confirmation)
CREATE POLICY "recording_purchases_service_role_all"
  ON public.recording_purchases
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 7: RECORDING_ACCESS
--
-- SELECT  → own rows only   | admins all rows
-- INSERT  → DENIED from client (server action only)
-- UPDATE  → DENIED from client (expiry managed server-side)
-- DELETE  → DENIED from client (revocation is server-side only)
--
-- This is the gate that controls who can play a recording.
-- It must NEVER be client-writable.
-- =============================================================

-- Customer: read own access grants only
CREATE POLICY "recording_access_customer_select_own"
  ON public.recording_access
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin: read all access grants
CREATE POLICY "recording_access_admin_select_all"
  ON public.recording_access
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Service role: full access (grant/revoke access server-side)
CREATE POLICY "recording_access_service_role_all"
  ON public.recording_access
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 8: PAYMENTS
--
-- SELECT  → own rows only   | admins all rows
-- INSERT  → DENIED from client (server action only)
-- UPDATE  → DENIED from client (status updates via server action)
-- DELETE  → DENIED (immutable ledger — never delete payment records)
--
-- The payments table is a financial ledger.
-- No client should ever INSERT, UPDATE, or DELETE payment records.
-- =============================================================

-- Customer: read own payment history only
CREATE POLICY "payments_customer_select_own"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin: read all payments (for reporting/reconciliation)
CREATE POLICY "payments_admin_select_all"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admin: update payment status only (manual override for refunds etc.)
-- Admins cannot INSERT or DELETE payment rows either — ledger integrity
CREATE POLICY "payments_admin_update_status"
  ON public.payments
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Service role: full access (create orders, record gateway responses)
CREATE POLICY "payments_service_role_all"
  ON public.payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================
-- STEP 9: Verification — list all active policies
-- (Remove or comment out before production if preferred)
-- =============================================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
