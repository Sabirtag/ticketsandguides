
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

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
    console.log("Attempting to make admin:", email);

    // 1. Get the user ID from the email - use a proper query to auth.users
    const { data: users, error: userError } = await supabaseClient.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error fetching users:", userError);
      return new Response(
        JSON.stringify({
          error: `Failed to fetch users: ${userError.message}`,
        }),
        {
          headers: corsHeaders,
          status: 500,
        }
      );
    }

    const user = users.users.find(u => u.email === email);

    if (!user) {
      console.error("User not found:", email);
      return new Response(
        JSON.stringify({
          error: `User with email ${email} not found`,
        }),
        {
          headers: corsHeaders,
          status: 404,
        }
      );
    }

    const userId = user.id;
    console.log("Found user ID:", userId);

    // 2. Check if user already has admin role
    const { data: existingRole, error: roleCheckError } = await supabaseClient
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleCheckError) {
      console.error("Error checking existing role:", roleCheckError);
      return new Response(
        JSON.stringify({
          error: `Error checking existing role: ${roleCheckError.message}`,
        }),
        {
          headers: corsHeaders,
          status: 500,
        }
      );
    }

    if (existingRole) {
      console.log("User is already an admin");
      return new Response(
        JSON.stringify({
          success: true,
          user_id: userId,
          email: email,
          message: "User is already an admin",
        }),
        {
          headers: corsHeaders,
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
      console.error("Failed to add admin role:", insertError);
      return new Response(
        JSON.stringify({
          error: `Failed to add admin role: ${insertError.message}`,
        }),
        {
          headers: corsHeaders,
          status: 500,
        }
      );
    }

    console.log("Successfully added admin role for user:", email);
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        user_id: userId,
        email: email,
      }),
      {
        headers: corsHeaders,
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: `Unexpected error: ${error.message}`,
      }),
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});
