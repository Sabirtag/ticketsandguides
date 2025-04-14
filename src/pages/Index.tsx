
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

// Define a simpler location type that has what we need
interface SimpleLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

const Index = () => {
  // Create a simplified user location with New Delhi coordinates
  const userLocation: SimpleLocation = {
    latitude: 28.6139, // New Delhi coordinates
    longitude: 77.2090,
    accuracy: 1
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
