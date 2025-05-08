
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("🔄 AuthCallback: Processing authentication callback");
      
      try {
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ AuthCallback: Error during auth callback:", error);
          toast.error("Authentication failed. Please try again.");
          navigate("/auth");
          return;
        }
        
        if (data.session) {
          console.log("✅ AuthCallback: Authentication successful", data.session.user?.email);
          toast.success("Successfully signed in!");
        } else {
          console.log("⚠️ AuthCallback: No session found after redirect");
        }
        
        // Redirect to the home page whether successful or not
        navigate("/");
      } catch (err) {
        console.error("❌ AuthCallback: Unexpected error during auth callback:", err);
        toast.error("An unexpected error occurred during sign in");
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <div className="text-2xl">Authenticating...</div>
      <div className="mt-2 text-muted-foreground">Please wait while we complete the sign-in process</div>
    </div>
  );
};

export default AuthCallback;
