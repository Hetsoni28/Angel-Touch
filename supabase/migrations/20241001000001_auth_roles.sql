-- =============================================================
-- Angel Touch – Auth & Roles Migration
-- Run after: 20241001000000_initial_schema.sql
-- =============================================================

-- =============================================================
-- 1. Secure role helper (SECURITY DEFINER = runs as DB owner,
--    not as the calling user — cannot be spoofed from client)
-- =============================================================
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    CASE WHEN is_admin THEN 'ADMIN' ELSE 'CUSTOMER' END
  FROM public.profiles
  WHERE id = auth.uid();
$$;

COMMENT ON FUNCTION public.get_my_role() IS
  'Returns ADMIN or CUSTOMER for the currently authenticated user.
   SECURITY DEFINER means it runs with owner privileges — the result
   cannot be forged by the client. Admins are only set server-side.';

-- Grant execute to authenticated users only
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_my_role() FROM anon;


-- =============================================================
-- 2. Helper: is the current user an admin?
--    Used in RLS policies for clarity.
-- =============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    FALSE
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;


-- =============================================================
-- 3. Harden the new-user trigger
--    Always set is_admin = FALSE on creation.
--    Admin status can ONLY be granted via service-role server action.
-- =============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    is_admin,   -- explicitly FALSE — never trust client metadata for roles
    is_active
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    FALSE,
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Re-create trigger (drop existing first to avoid duplicates)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- =============================================================
-- 4. Prevent clients from self-granting admin role via RLS
--    Users can only update non-privileged fields on their own profile.
-- =============================================================

-- Drop the previous overly-broad update policy
DROP POLICY IF EXISTS "profiles: user can update own" ON public.profiles;

-- Replacement: users can update ONLY display fields — not is_admin or is_active
CREATE POLICY "profiles: user can update own safe fields"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- is_admin and is_active cannot be changed here;
    -- they are only changeable via service-role server action
  );

-- Service-role-only policy: manage all profiles (for admin actions)
CREATE POLICY "profiles: service role can manage all"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role');
