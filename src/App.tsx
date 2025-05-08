
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

// Page components
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import BookingSite from "./pages/BookingSite";
import DestinationDetail from "./pages/DestinationDetail";
import ExperienceDetail from "./pages/ExperienceDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import Checkout from "./pages/Checkout";
import AllDestinations from "./pages/AllDestinations";
import Guides from "./pages/Guides";
import BecomePartner from '@/pages/BecomePartner';
import Profile from "@/pages/Profile";
import MyBookings from "@/pages/MyBookings";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";

// Components
import AffiliateApproval from '@/components/affiliates/AffiliateApproval';

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";

/**
 * Route logger component for debugging
 * Logs the current route path to console
 */
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);
  
  return null;
};

/**
 * Main application component
 * Sets up routing and global providers
 */
const App = () => {
  console.log("App rendering");
  
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <SearchProvider>
          <RouteLogger />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/update-password" element={<UpdatePassword />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/monument/:monumentId" element={<BookingSite />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/experience/:id" element={<ExperienceDetail />} />
            <Route path="/destinations" element={<AllDestinations />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/partner" element={<BecomePartner />} />
            <Route path="/affiliate-approval" element={<AffiliateApproval />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
