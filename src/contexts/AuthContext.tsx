
import React, { createContext, useContext } from "react";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { useAuthMethods } from "@/hooks/auth/useAuthMethods";
import { usePasswordReset } from "@/hooks/auth/usePasswordReset";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Combine all auth hooks
  const { user, profile, loading } = useAuthState();
  const { signUp, signIn, signOut } = useAuthMethods();
  const { resetPassword, updatePassword } = usePasswordReset();

  // Create combined context value
  const contextValue: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
