
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

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

    const email = "ticketsandguides@gmail.com";
    console.log("Attempting to make admin:", email);

    // Use the new database function to assign admin role
    const { data, error } = await supabaseClient.rpc('assign_admin_role', {
      user_email: email
    });

    if (error) {
      console.error("Error calling assign_admin_role function:", error);
      return new Response(
        JSON.stringify({
          error: `Failed to assign admin role: ${error.message}`,
        }),
        {
          headers: corsHeaders,
          status: 500,
        }
      );
    }

    console.log("Function result:", data);

    // Check if the function returned an error
    if (!data.success) {
      console.error("Admin assignment failed:", data.error);
      return new Response(
        JSON.stringify({
          error: data.error || "Failed to assign admin role",
        }),
        {
          headers: corsHeaders,
          status: 400,
        }
      );
    }

    console.log("Successfully processed admin assignment for:", email);
    
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        user_id: data.user_id,
        email: email,
        message: data.message,
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
