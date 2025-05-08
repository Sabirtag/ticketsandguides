
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 useAuthState: Initializing auth state");
    
    const setupAuth = async () => {
      try {
        // First set up the auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log("🔔 Auth state change event:", event);
            
            // Update the user state
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
        
        // Update user state based on session
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

  return { user, profile, loading };
}
