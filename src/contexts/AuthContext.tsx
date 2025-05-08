
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 AuthProvider initializing");
    const setupAuth = async () => {
      try {
        // Set up the auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log("🔔 Auth state change event:", event);
            setUser(session?.user || null);
            
            if (session?.user) {
              console.log("👤 User authenticated:", session.user.email);
              // Defer profile fetching to avoid Supabase SDK deadlock
              setTimeout(() => {
                fetchProfile(session.user.id);
              }, 0);
            } else {
              console.log("🚫 No authenticated user");
              setProfile(null);
            }
          }
        );
        
        // Then check for existing session
        const { data } = await supabase.auth.getSession();
        console.log("🔍 Initial session check:", data.session ? "Session exists" : "No session");
        setUser(data.session?.user || null);
        
        if (data.session?.user) {
          await fetchProfile(data.session.user.id);
        }
        
        setLoading(false);
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("❌ Error setting up auth:", error);
        setLoading(false);
      }
    };
    
    setupAuth();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("🔍 Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching profile:", error);
        return;
      }

      console.log("✅ Profile data retrieved:", data);
      setProfile(data);
    } catch (error) {
      console.error("❌ Error in fetchProfile:", error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
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
        throw error;
      }

      toast.success("Registration successful! Please check your email for verification.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration");
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
        throw error;
      }

      console.log("✅ Sign in successful, user:", data.user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      toast.error(error.message || "Invalid login credentials");
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
    } catch (error: any) {
      console.error("❌ Google sign-in failed:", error);
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const signOut = async () => {
    try {
      console.log("🚪 Signing out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      console.log("✅ Signed out successfully");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      console.error("❌ Sign out error:", error);
      toast.error(error.message || "Error signing out");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log("🔑 Requesting password reset for email:", email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
        captchaToken: 'disabled'
      });
      
      if (error) {
        console.log("❌ Password reset error:", error);
        throw error;
      }
      
      console.log("📧 Password reset email sent successfully");
      toast.success("Password reset instructions sent to your email");
      return;
    } catch (error: any) {
      console.log("❌ Password reset error:", error);
      toast.error(error.message || "Failed to send reset instructions");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
