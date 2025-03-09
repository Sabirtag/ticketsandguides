
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import BookingSite from "./pages/BookingSite";
import Guides from "./pages/Guides";
import GuideSelection from "./pages/GuideSelection";
import DestinationDetail from "./pages/DestinationDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import CityPage from "./pages/CityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/booking" element={<BookingSite />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guide-selection" element={<GuideSelection />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/city/:id" element={<CityPage />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              } />
              
              {/* These routes will be implemented in future iterations */}
              <Route path="/terms" element={<NotFound />} />
              <Route path="/privacy" element={<NotFound />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
