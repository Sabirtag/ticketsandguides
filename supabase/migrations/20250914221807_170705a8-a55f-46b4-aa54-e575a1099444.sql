-- SECURITY FIXES FOR IDENTIFIED VULNERABILITIES - CORRECTED

-- 1. Fix Affiliate Application Security - Require Authentication
-- Drop existing policy and recreate with proper security
DROP POLICY IF EXISTS "Authenticated users can apply to be affiliate" ON public.affiliates;
DROP POLICY IF EXISTS "Anyone can apply to be an affiliate" ON public.affiliates;

CREATE POLICY "Authenticated users can apply to be affiliate" 
ON public.affiliates 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 2. Secure Database Functions - Add proper search_path to prevent search_path attacks

-- Update is_admin() function with proper security (role-based instead of email pattern)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$function$;

-- Update is_user_admin() function with proper security
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_user_admin.user_id 
    AND role = 'admin'
  );
$function$;

-- Update generate_referral_code() function with proper security
CREATE OR REPLACE FUNCTION public.generate_referral_code(full_name text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  -- Generate a base code from the first part of the name
  new_code := LOWER(SUBSTRING(full_name FROM 1 FOR 3));
  
  -- Add some random characters
  new_code := new_code || SUBSTRING(MD5(random()::text) FROM 1 FOR 5);
  
  -- Check if this code already exists
  LOOP
    SELECT EXISTS(SELECT 1 FROM public.affiliates WHERE referral_code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
    -- If it exists, generate a new one
    new_code := LOWER(SUBSTRING(full_name FROM 1 FOR 3)) || SUBSTRING(MD5(random()::text) FROM 1 FOR 5);
  END LOOP;
  
  RETURN new_code;
END;
$function$;

-- Update handle_new_user() function with proper security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$function$;

-- Update handle_affiliate_approval() function with proper security
CREATE OR REPLACE FUNCTION public.handle_affiliate_approval()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF (TG_OP = 'UPDATE' AND NEW.status = 'approved' AND OLD.status = 'pending' AND NEW.referral_code IS NULL) THEN
    NEW.referral_code := public.generate_referral_code(NEW.full_name);
  END IF;
  RETURN NEW;
END;
$function$;

-- Update update_updated_at_column() function with proper security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$function$;

-- Update assign_admin_role() function with proper security
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  target_user_id uuid;
  result jsonb;
BEGIN
  -- Find the user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;
  
  -- Check if user exists
  IF target_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found with email: ' || user_email
    );
  END IF;
  
  -- Check if user already has admin role
  IF EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = target_user_id AND role = 'admin'
  ) THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'User already has admin role',
      'user_id', target_user_id,
      'email', user_email
    );
  END IF;
  
  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin');
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Admin role assigned successfully',
    'user_id', target_user_id,
    'email', user_email
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', 'Database error: ' || SQLERRM
  );
END;
$function$;

-- 3. Phone Verification Security - Add cleanup for expired OTP codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_phone_verification_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.profiles 
  SET 
    phone_verification_code = NULL,
    phone_verification_expires_at = NULL
  WHERE 
    phone_verification_expires_at IS NOT NULL 
    AND phone_verification_expires_at < now();
END;
$function$;

-- Create function to invalidate OTP after successful verification
CREATE OR REPLACE FUNCTION public.invalidate_phone_verification_code(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.profiles 
  SET 
    phone_verification_code = NULL,
    phone_verification_expires_at = NULL
  WHERE id = user_id;
END;
$function$;