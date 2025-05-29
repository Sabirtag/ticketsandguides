
import React, { useState, useEffect, useRef } from "react";
import SearchForm from "./hero/SearchForm";
import GuidePreferencesDialog from "./hero/GuidePreferencesDialog";
import StickySearchForm from "./hero/StickySearchForm";
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
  const [showStickySearch, setShowStickySearch] = useState(false);
  const searchFormRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  
  const backgroundImage = "/lovable-uploads/412bf041-40c3-41ed-a7e2-96edf2753aec.png";
  
  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  console.log("🎨 Rendering HeroSection with theme colors");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSectionRef.current?.offsetHeight || 0;
      const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 56;
      
      // Log measurements on first render
      if (heroSectionRef.current && !isFixed) {
        console.log(`📏 Hero section height: ${heroHeight}px`);
        console.log(`📏 Navbar height: ${navbarHeight}px`);
      }
      
      // Only show sticky search when scrolled significantly into hero section (past 1/3)
      const threshold = heroHeight * 0.33;
      
      if (scrollPosition > 10) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
        setIsAttached(false);
      }
      
      if (scrollPosition > threshold) {
        console.log(`🔄 Showing sticky search at ${scrollPosition}px (threshold: ${threshold}px)`);
        setShowStickySearch(true);
        
        if (scrollPosition > 300) {
          setIsAttached(true);
        }
      } else {
        if (showStickySearch) {
          console.log(`🔄 Hiding sticky search at ${scrollPosition}px`);
        }
        setShowStickySearch(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showStickySearch]);

  return (
    <section ref={heroSectionRef} className="relative h-[600px] sm:h-[700px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Historical Monument - Indian Heritage Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className={`mb-8 transition-all duration-300 ${isFixed ? 'opacity-0 -translate-y-20' : 'opacity-100 transform-none'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-fitzgerald tracking-wide text-white mb-2 sm:mb-3 bg-clip-text animate-fade-in">
            Discover Heritage With Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl font-fitzgerald animate-fade-in">
            Connecting People to Diverse Attractions and Cultural Wonders
          </p>
        </div>
        
        <div 
          ref={searchFormRef}
          className={`w-full max-w-5xl transition-all duration-300 ease-out ${
            isFixed 
              ? isAttached 
                ? 'opacity-0 transform scale-90' 
                : 'opacity-0 transform scale-95'
              : 'opacity-100 transform-none animate-fade-in'
          }`}
        >
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

      {/* Only show the sticky search form when scrolled past threshold */}
      {showStickySearch && <StickySearchForm isVisible={showStickySearch} />}
      
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
