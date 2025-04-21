
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Create a unique token for the approval link
    const token = crypto.randomUUID();
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Store the token in admin_notes
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

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: [email],
      subject: "Affiliate Application Approval",
      html: `
        <h1>Hello ${fullName}!</h1>
        <p>Thank you for applying to our affiliate program. Please click the link below to approve your application:</p>
        <p><a href="${approvalLink}">Click here to approve your application</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Approval email sent" }),
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
