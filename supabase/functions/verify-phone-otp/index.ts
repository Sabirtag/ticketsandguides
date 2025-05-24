
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOtpRequest {
  otp: string;
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { otp, userId }: VerifyOtpRequest = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user's verification data
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("phone_verification_code, phone_verification_expires_at, phone")
      .eq("id", userId)
      .single();

    if (fetchError || !profile) {
      throw new Error("User not found");
    }

    // Check if OTP exists
    if (!profile.phone_verification_code) {
      throw new Error("No verification code found. Please request a new OTP.");
    }

    // Check if OTP has expired
    const now = new Date();
    const expiresAt = new Date(profile.phone_verification_expires_at);
    
    if (now > expiresAt) {
      // Clear expired OTP
      await supabase
        .from("profiles")
        .update({
          phone_verification_code: null,
          phone_verification_expires_at: null,
        })
        .eq("id", userId);
      
      throw new Error("Verification code has expired. Please request a new one.");
    }

    // Check if OTP matches
    if (profile.phone_verification_code !== otp) {
      throw new Error("Invalid verification code. Please try again.");
    }

    // Mark phone as verified and clear OTP
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        phone_verified: true,
        phone_verification_code: null,
        phone_verification_expires_at: null,
      })
      .eq("id", userId);

    if (updateError) {
      throw new Error(`Database error: ${updateError.message}`);
    }

    console.log("Phone verified successfully for user:", userId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Phone number verified successfully",
        phone: profile.phone 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-phone-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
