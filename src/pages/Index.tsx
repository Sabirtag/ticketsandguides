
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
  // Default user location to New Delhi
  const userLocation = { city: "New Delhi", country: "India" };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WhyTagSection />
        <PopularDestinations userLocation={userLocation} />
        <ExperiencesSection />
        <PopularCities />
        <LesserKnownPlaces />
        <GuideRecruitBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
