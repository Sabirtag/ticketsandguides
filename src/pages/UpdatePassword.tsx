
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import AuthContainer from "@/components/auth/AuthContainer";
import LoadingSpinner from "@/components/profile/LoadingSpinner";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have a session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("🔑 Update password page - Session check:", data.session ? "Active session" : "No session");
    };
    
    checkSession();
  }, []);
  
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("🔑 Updating password");
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.log("❌ Update password error:", error);
        throw error;
      }
      
      console.log("✅ Password updated successfully");
      setIsSuccess(true);
      toast.success("Password updated successfully");
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error: any) {
      console.log("❌ Update password error:", error);
      setError(error.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Link to="/auth" className="flex items-center text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
            
            <AuthContainer
              title="Update your password"
              description="Enter a new password for your account"
            >
              {isSuccess ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      Your password has been updated successfully. You will be redirected to the login page.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/auth")}
                  >
                    Go to login page
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner className="mr-2 h-4 w-4" /> : null}
                    Update Password
                  </Button>
                </form>
              )}
            </AuthContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
