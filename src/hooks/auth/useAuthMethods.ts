
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useAuthMethods() {
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log("📝 Attempting to register user:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error("❌ Registration error:", error);
        throw error;
      }

      console.log("✅ Registration successful:", data);
      toast.success("Registration successful! Please check your email for verification.");
      navigate("/");
      return data;
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      toast.error(error.message || "An error occurred during registration");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("🔐 Signing in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Sign in error:", error);
        throw error;
      }

      console.log("✅ Sign in successful, user:", data.user);
      toast.success("Logged in successfully!");
      navigate("/");
      return data;
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      toast.error(error.message || "Invalid login credentials");
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("🔵 Initiating Google sign-in");
      
      // Get the current URL to construct the redirect URL
      const currentUrl = window.location.origin;
      const redirectUrl = `${currentUrl}/auth/callback`;
      console.log("🔄 Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error("❌ Google sign-in error:", error);
        throw error;
      }
      
      console.log("🔄 Google auth redirect initiated", data);
      return data;
    } catch (error: any) {
      console.error("❌ Google sign-in failed:", error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("🚪 Signing out");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("❌ Sign out error:", error);
        throw error;
      }
      
      console.log("✅ Signed out successfully");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      console.error("❌ Sign out error:", error);
      toast.error(error.message || "Error signing out");
      throw error;
    }
  };

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };
}
