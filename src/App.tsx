
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import BookingSite from "./pages/BookingSite";
import DestinationDetail from "./pages/DestinationDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import Guides from "./pages/Guides";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/city/:cityName" element={<CityPage />} />
            <Route path="/monument/:monumentId" element={<BookingSite />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
