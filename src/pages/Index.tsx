
import React from "react";
import Navbar from "@/components/Navbar";
import SearchResults from "@/components/SearchResults";
import { useSearch } from "@/contexts/SearchContext";
import HeroSection from "@/components/home/HeroSection";
import WhyTagSection from "@/components/home/WhyTagSection";
import UpcomingDatesSection from "@/components/home/UpcomingDatesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import Footer from "@/components/home/Footer";

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

      {/* Upcoming Dates Section */}
      <UpcomingDatesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
