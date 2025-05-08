
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function usePasswordReset() {
  const navigate = useNavigate();

  const resetPassword = async (email: string) => {
    try {
      console.log("🔑 Requesting password reset for email:", email);
      
      // Get the current URL to construct the redirect URL
      const currentUrl = window.location.origin;
      const redirectUrl = `${currentUrl}/auth/update-password`;
      console.log("🔄 Password reset redirect URL:", redirectUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        console.log("❌ Password reset error:", error);
        throw error;
      }
      
      console.log("📧 Password reset email sent successfully");
      toast.success("Password reset instructions sent to your email");
      return true;
    } catch (error: any) {
      console.log("❌ Password reset error:", error);
      toast.error(error.message || "Failed to send reset instructions");
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      console.log("🔑 Updating password");
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.log("❌ Update password error:", error);
        throw error;
      }
      
      console.log("✅ Password updated successfully");
      toast.success("Password updated successfully");
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
      return true;
    } catch (error: any) {
      console.log("❌ Update password error:", error);
      toast.error(error.message || "Failed to update password");
      throw error;
    }
  };

  return {
    resetPassword,
    updatePassword
  };
}
