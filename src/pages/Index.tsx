
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import PopularDestinations from "@/components/home/destinations/PopularDestinations";
import WhyTagSection from "@/components/home/WhyTagSection";
import ExperiencesSection from "@/components/home/experiences/ExperiencesSection";
import PopularCities from "@/components/home/PopularCities";
import LesserKnownPlaces from "@/components/home/LesserKnownPlaces";
import GuideRecruitBanner from "@/components/home/GuideRecruitBanner";
import Footer from "@/components/home/Footer";

const Index = () => {
  // Create a null userLocation for now, or it could be set via geolocation API
  const userLocation: GeolocationCoordinates | null = {
    latitude: 28.6139, // New Delhi coordinates
    longitude: 77.2090,
    accuracy: 1,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WhyTagSection />
        <PopularDestinations userLocation={userLocation} />
        <ExperiencesSection />
        <PopularCities userLocation={userLocation} />
        <LesserKnownPlaces />
        <GuideRecruitBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
