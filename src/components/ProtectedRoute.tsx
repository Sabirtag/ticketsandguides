
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Current path:", location.pathname);
  console.log("ProtectedRoute - Auth state:", { user: !!user, loading });

  // Show a proper loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated, preserving the intended location
  if (!user) {
    console.log("ProtectedRoute - User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // Render the protected content
  console.log("ProtectedRoute - User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
