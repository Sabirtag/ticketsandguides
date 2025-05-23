
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  success: boolean;
  user_id: string;
  email: string;
}

type ResponseData = ErrorResponse | SuccessResponse;

serve(async (req: Request) => {
  try {
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const email = "sabirborah.borah38@gmail.com";

    // 1. Get the user ID from the email
    const { data: userData, error: userError } = await supabaseClient
      .from("auth.users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (userError || !userData) {
      return new Response(
        JSON.stringify({
          error: `Failed to find user with email ${email}: ${userError?.message || "User not found"}`,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    const userId = userData.id;

    // 2. Check if user already has admin role
    const { data: existingRole, error: roleCheckError } = await supabaseClient
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleCheckError) {
      return new Response(
        JSON.stringify({
          error: `Error checking existing role: ${roleCheckError.message}`,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    if (existingRole) {
      return new Response(
        JSON.stringify({
          success: true,
          user_id: userId,
          email: email,
          message: "User is already an admin",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // 3. Insert the admin role for the user
    const { error: insertError } = await supabaseClient
      .from("user_roles")
      .insert([
        {
          user_id: userId,
          role: "admin",
        },
      ]);

    if (insertError) {
      return new Response(
        JSON.stringify({
          error: `Failed to add admin role: ${insertError.message}`,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        user_id: userId,
        email: email,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Unexpected error: ${error.message}`,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
