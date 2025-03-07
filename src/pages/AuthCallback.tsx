
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // The hash contains the token
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error during auth callback:", error);
      }
      
      // Redirect to the home page whether successful or not
      navigate("/");
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-pulse text-2xl">Authenticating...</div>
    </div>
  );
};

export default AuthCallback;
