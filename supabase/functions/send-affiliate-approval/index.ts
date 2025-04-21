
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApprovalEmailRequest {
  affiliateId: string;
  email: string;
  fullName: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ApprovalEmailRequest = await req.json();
    const { affiliateId, email, fullName } = requestData;

    // Create a token for the approval link
    const token = crypto.randomUUID();
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Store the token in a temporary table or field
    const { error: updateError } = await supabase
      .from('affiliates')
      .update({ 
        admin_notes: JSON.stringify({ 
          approval_token: token, 
          token_created_at: new Date().toISOString() 
        })
      })
      .eq('id', affiliateId);

    if (updateError) {
      throw new Error(`Failed to update affiliate: ${updateError.message}`);
    }

    // Generate approval link
    const baseUrl = Deno.env.get("PUBLIC_SITE_URL") || "http://localhost:5173";
    const approvalLink = `${baseUrl}/affiliate-approval?token=${token}&id=${affiliateId}`;

    // Send email using your preferred email service
    // For demo purposes, we'll just log the link
    console.log(`Approval link for ${fullName}: ${approvalLink}`);
    console.log(`Would send email to: ${email}`);

    // Return a success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Approval email sent",
        // For testing only - remove in production
        approvalLink
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-affiliate-approval function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
