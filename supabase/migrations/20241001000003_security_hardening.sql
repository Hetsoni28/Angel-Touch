-- =============================================================
-- Angel Touch – Security Hardening
-- Migration: 20241001000003_security_hardening.sql
-- Run after: 20241001000002_rls_complete.sql
--
-- Fixes:
--   1. Privilege escalation — a logged-in customer could run
--        update profiles set is_admin = true where id = auth.uid()
--      from the browser (anon key) because the UPDATE policy only
--      checked ownership, not which columns changed.
--   2. Free class access — customers could INSERT their own
--      class_enrollments row (default status = 'confirmed') directly
--      from the browser and get the Zoom link + recording without paying.
--
-- Safe to run more than once.
-- =============================================================


-- =============================================================
-- 1. PROFILES — lock privileged columns
-- =============================================================

-- Layer A: column-level privileges.
-- Browser roles may only update display fields.
REVOKE UPDATE ON public.profiles FROM anon, authenticated;
GRANT  UPDATE (full_name, phone, avatar_url, updated_at)
  ON public.profiles TO authenticated;

-- Layer B: trigger guard (catches anything layer A misses, e.g. a
-- future GRANT ALL). SECURITY INVOKER on purpose: current_user must be
-- the real caller, not the function owner.
CREATE OR REPLACE FUNCTION public.protect_profile_privileged_columns()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF (
       NEW.id        IS DISTINCT FROM OLD.id
    OR NEW.is_admin  IS DISTINCT FROM OLD.is_admin
    OR NEW.is_active IS DISTINCT FROM OLD.is_active
  )
  AND current_user NOT IN ('postgres', 'supabase_admin', 'service_role')
  AND COALESCE(auth.role(), '') <> 'service_role'
  THEN
    RAISE EXCEPTION 'Changing id, is_admin or is_active is not allowed from the client.'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_privileged_columns ON public.profiles;
CREATE TRIGGER profiles_protect_privileged_columns
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_privileged_columns();


-- =============================================================
-- 2. CLASS_ENROLLMENTS — no direct writes from the browser
--
-- Enrollments are created by POST /api/classes/enroll (status
-- 'pending') and confirmed only after a verified Razorpay payment
-- (/api/payments/verify or the webhook), both using the service role.
-- =============================================================

DROP POLICY IF EXISTS "class_enrollments_customer_insert_own" ON public.class_enrollments;
DROP POLICY IF EXISTS "class_enrollments_customer_cancel_own" ON public.class_enrollments;
-- Old-name policies from the first migration, in case they survived
DROP POLICY IF EXISTS "enrollments: user can insert own" ON public.class_enrollments;
DROP POLICY IF EXISTS "enrollments: user can cancel own" ON public.class_enrollments;

REVOKE INSERT, UPDATE, DELETE ON public.class_enrollments FROM anon;


-- =============================================================
-- 3. Defence in depth — anon can never write to any app table
-- =============================================================
REVOKE INSERT, UPDATE, DELETE ON
  public.profiles,
  public.memberships,
  public.recording_purchases,
  public.recording_access,
  public.payments
FROM anon;


-- =============================================================
-- 4. 'pending' enrollment status
-- The enroll API inserts status = 'pending' before payment, but the
-- original enum did not include it. Added here so the flow works.
-- (Must stay the last statement — a new enum value cannot be used in
--  the same transaction it is created in.)
-- =============================================================
ALTER TYPE enrollment_status ADD VALUE IF NOT EXISTS 'pending';


-- =============================================================
-- AUDIT QUERIES — run these separately AFTER the migration and
-- review the results. They do not change anything.
-- =============================================================

-- (a) Who is admin right now? Every row here should be someone you trust.
-- SELECT p.id, u.email, p.full_name, p.updated_at
-- FROM public.profiles p JOIN auth.users u ON u.id = p.id
-- WHERE p.is_admin = TRUE;

-- (b) Confirmed enrollments that were never paid for
--     (possible abuse of the old INSERT policy).
-- SELECT e.id, u.email, e.class_id, e.class_name, e.status, e.created_at
-- FROM public.class_enrollments e
-- JOIN auth.users u ON u.id = e.user_id
-- WHERE e.status = 'confirmed'
--   AND NOT EXISTS (
--     SELECT 1 FROM public.payments pay
--     WHERE pay.user_id = e.user_id
--       AND pay.status = 'succeeded'
--       AND pay.payment_type = 'class_enrollment'
--   );
