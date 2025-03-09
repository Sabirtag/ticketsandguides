
import React from "react";
import Navbar from "@/components/Navbar";
import SearchResults from "@/components/SearchResults";
import { useSearch } from "@/contexts/SearchContext";
import HeroSection from "@/components/home/HeroSection";
import WhyTagSection from "@/components/home/WhyTagSection";
import GuideRecruitBanner from "@/components/home/GuideRecruitBanner";
import Footer from "@/components/home/Footer";
import PopularDestinations from "@/components/home/PopularDestinations";
import PopularCities from "@/components/home/PopularCities";

const Index = () => {
  const { searchResults } = useSearch();

  return (
    <div className="min-h-screen bg-background">
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

      {/* Why TAG Section */}
      {searchResults.length === 0 && <WhyTagSection />}

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Popular Cities Section */}
      <PopularCities />

      {/* Guide Recruit Banner Section (replacing How It Works) */}
      <GuideRecruitBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
