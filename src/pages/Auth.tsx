
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthContainer from "@/components/auth/AuthContainer";

const Auth = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary mb-4 sm:mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <AuthContainer 
                  title="Welcome back" 
                  description="Enter your credentials to sign in to your account"
                >
                  <LoginForm />
                </AuthContainer>
              </TabsContent>
              
              <TabsContent value="register">
                <AuthContainer 
                  title="Create an account" 
                  description="Enter your details to create your account"
                >
                  <RegisterForm />
                </AuthContainer>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
