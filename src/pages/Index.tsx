
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchResults from "@/components/SearchResults";
import { useSearch } from "@/contexts/SearchContext";
import HeroSection from "@/components/home/HeroSection";
import WhyTagSection from "@/components/home/WhyTagSection";
import GuideRecruitBanner from "@/components/home/GuideRecruitBanner";
import Footer from "@/components/home/Footer";
import PopularDestinations from "@/components/home/destinations/PopularDestinations";
import PopularCities from "@/components/home/PopularCities";
import LesserKnownPlaces from "@/components/home/LesserKnownPlaces";
import BookExperiences from "@/components/home/experiences/ExperiencesSection";
import { toast } from "sonner";

const Index = () => {
  const { searchResults } = useSearch();
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  const requestUserLocation = () => {
    if (!locationRequested) {
      setLocationRequested(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position.coords);
            toast.success("Location enabled! Showing attractions near you.");
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Could not access your location. Showing popular attractions instead.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser. Showing popular attractions instead.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(250,250,250,255)]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Search Results Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <SearchResults />
        </div>
      </section>

      {/* Why TAG Section - Reduced size */}
      {searchResults.length === 0 && <WhyTagSection />}

      {/* Location Request Banner */}
      {!userLocation && !locationRequested && (
        <div className="bg-primary/10 py-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                <p className="text-sm">Enable your location to see attractions near you</p>
              </div>
              <button 
                onClick={requestUserLocation}
                className="bg-[rgba(100,73,37,255)] text-primary-foreground px-4 py-2 rounded-md text-sm"
              >
                Enable Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular Destinations Section */}
      <PopularDestinations userLocation={userLocation} />

      {/* Book Experiences Section */}
      <BookExperiences />

      {/* Popular Cities Section */}
      <PopularCities userLocation={userLocation} />

      {/* Lesser Known Places Section */}
      <LesserKnownPlaces />

      {/* Guide Recruit Banner Section */}
      <GuideRecruitBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
