import React, { useState, useEffect, useRef } from "react";
import SearchForm from "./hero/SearchForm";
import GuidePreferencesDialog from "./hero/GuidePreferencesDialog";
import { useSearch } from "@/contexts/SearchContext";

interface GuidePreferences {
  languages: string[];
  budget: number;
}

const HeroSection = () => {
  const { date, setDate, visitors, setVisitors, guideChoice, setGuideChoice } = useSearch();
  const [showVisitors, setShowVisitors] = useState(false);
  const [showGuideOptions, setShowGuideOptions] = useState(false);
  const [showGuidePreferences, setShowGuidePreferences] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isAttached, setIsAttached] = useState(false);
  const searchFormRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64; // Height of navbar in pixels
  
  // Static majestic fort image from Unsplash
  const backgroundImage = "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
  
  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 10) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
        setIsAttached(false);
      }
      
      if (scrollPosition > 300) {
        setIsAttached(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[600px] sm:h-[700px] overflow-hidden mt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Indian architectural detail" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#006466]/70"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className={`mb-8 transition-all duration-300 ${isFixed ? 'opacity-0 -translate-y-20' : 'opacity-100'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-fitzgerald font-bold text-[#FFD700] mb-2 sm:mb-3 animate-shimmer">
            Discover <span className="inline-block">Heritage</span> With Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#FFD700] font-fitzgerald max-w-2xl">
            Connecting People to Diverse Attractions and Cultural Wonders
          </p>
        </div>
        
        <div 
          ref={searchFormRef}
          className={`w-full max-w-5xl transition-all duration-300 ease-out ${
            isFixed 
              ? isAttached 
                ? 'fixed top-16 left-1/2 transform -translate-x-1/2 z-40 px-4 sm:px-6 md:px-8 w-full'
                : 'fixed top-20 left-1/2 transform -translate-x-1/2 z-40 px-4 sm:px-6 md:px-8 w-full'
              : 'relative'
          }`}
        >
          <div className={`bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-lg border border-gray-200 ${
            isFixed ? 'animate-fade-in' : ''
          }`}>
            <SearchForm 
              date={date}
              setDate={setDate}
              showVisitors={showVisitors}
              setShowVisitors={setShowVisitors}
              showGuideOptions={showGuideOptions}
              setShowGuideOptions={setShowGuideOptions}
              visitors={visitors}
              setVisitors={setVisitors}
              guideChoice={guideChoice}
              setGuideChoice={setGuideChoice}
              setShowGuidePreferences={setShowGuidePreferences}
            />
          </div>
        </div>
      </div>

      <GuidePreferencesDialog 
        showGuidePreferences={showGuidePreferences}
        setShowGuidePreferences={setShowGuidePreferences}
        guidePreferences={guidePreferences}
        setGuidePreferences={setGuidePreferences}
      />
    </section>
  );
};

export default HeroSection;
