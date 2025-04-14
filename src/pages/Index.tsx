
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
import { CornerMandala, DividerMandala } from "@/assets/mandala-patterns";

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
    <div className="min-h-screen relative overflow-hidden mandala-background">
      {/* Large background mandala patterns with extremely low opacity */}
      <div className="fixed top-1/4 left-0 opacity-[0.015] z-0 transform -translate-x-1/2">
        <CornerMandala className="text-[rgba(100,73,37,255)] w-[600px] h-[600px]" />
      </div>
      <div className="fixed bottom-0 right-0 opacity-[0.015] z-0 transform translate-x-1/3">
        <CornerMandala className="text-[rgba(100,73,37,255)] w-[600px] h-[600px]" />
      </div>
      
      <Navbar />
      <main>
        <HeroSection />
        <WhyTagSection />
        <PopularDestinations userLocation={userLocation} />
        
        <DividerMandala className="opacity-30" />
        
        <ExperiencesSection />
        <PopularCities userLocation={userLocation} />
        
        <DividerMandala className="opacity-30" />
        
        <LesserKnownPlaces />
        <GuideRecruitBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
