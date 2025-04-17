
import React, { useState, useEffect } from "react";
import SearchForm from "./hero/SearchForm";
import GuidePreferencesDialog from "./hero/GuidePreferencesDialog";
import { useSearch } from "@/contexts/SearchContext";
import { debounce } from "lodash";

interface GuidePreferences {
  languages: string[];
  budget: number;
}

const HeroSection = () => {
  const { date, setDate, visitors, setVisitors, guideChoice, setGuideChoice } = useSearch();
  const [showVisitors, setShowVisitors] = useState(false);
  const [showGuideOptions, setShowGuideOptions] = useState(false);
  const [showGuidePreferences, setShowGuidePreferences] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Static majestic fort image from Unsplash
  const backgroundImage = "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
  
  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const progress = Math.min(scrollPosition / 200, 1);
      setScrollProgress(progress);
    }, 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundStyle = {
    transform: `scale(${1 - (0.2 * scrollProgress)})`,
    opacity: 1 - scrollProgress,
  };

  const heroTextStyle = {
    transform: `scale(${1 - (0.2 * scrollProgress)}) translateY(${scrollProgress * -30}px)`,
    opacity: 1 - scrollProgress,
  };

  return (
    <section className="relative h-[600px] sm:h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 z-0 transition-all duration-400 ease-out"
        style={backgroundStyle}
      >
        <img 
          src={backgroundImage}
          alt="Indian architectural detail" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div 
          className="transition-all duration-400 ease-out mb-8"
          style={heroTextStyle}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-fitzgerald font-bold text-white mb-2 sm:mb-3 animate-shimmer">
            Discover <span className="inline-block">Heritage</span> With Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
            Connecting People to Diverse Attractions and Cultural Wonders
          </p>
        </div>
        
        <div 
          className={`w-full max-w-5xl transition-all duration-400 ease-out ${
            scrollProgress > 0 
              ? 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-6 md:px-8'
              : 'relative'
          }`}
        >
          <div className={`bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6 shadow-lg transition-all duration-400 ${
            scrollProgress > 0 ? 'bg-white/95' : ''
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
