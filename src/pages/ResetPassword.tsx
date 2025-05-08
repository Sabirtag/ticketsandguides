
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import AuthContainer from "@/components/auth/AuthContainer";
import LoadingSpinner from "@/components/profile/LoadingSpinner";

const ResetPassword = () => {
  const { user, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email.trim() || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("🔑 Initiating password reset for:", email);
      await resetPassword(email);
      setIsEmailSent(true);
      console.log("📧 Reset email sent successfully");
    } catch (error: any) {
      console.log("❌ Reset password error:", error);
      setError(error.message || "Failed to send reset instructions");
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
              title="Reset your password"
              description="Enter your email address and we'll send you a link to reset your password"
            >
              {isEmailSent ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      We've sent you an email with instructions to reset your password. Please check your inbox.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                  >
                    Return to reset form
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Send Reset Instructions
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

export default ResetPassword;
