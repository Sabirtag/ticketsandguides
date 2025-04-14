
import React, { useState } from "react";
import SearchForm from "./hero/SearchForm";
import GuidePreferencesDialog from "./hero/GuidePreferencesDialog";
import { useSearch } from "@/contexts/SearchContext";
import { CornerMandala } from "@/assets/mandala-patterns";

interface GuidePreferences {
  languages: string[];
  budget: number;
}

const HeroSection = () => {
  const { date, setDate, visitors, setVisitors, guideChoice, setGuideChoice } = useSearch();
  const [showVisitors, setShowVisitors] = useState(false);
  const [showGuideOptions, setShowGuideOptions] = useState(false);
  const [showGuidePreferences, setShowGuidePreferences] = useState(false);
  
  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  return (
    <section className="relative h-[600px] sm:h-[700px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
          alt="Heritage background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Mandala corner decorations */}
      <div className="absolute top-0 left-0 z-10 transform -translate-x-1/4 -translate-y-1/4">
        <CornerMandala className="text-[#E6CCA9]" />
      </div>
      <div className="absolute top-0 right-0 z-10 transform translate-x-1/4 -translate-y-1/4 rotate-90">
        <CornerMandala className="text-[#E6CCA9]" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-fitzgerald font-bold text-white mb-2 sm:mb-3 animate-shimmer relative">
          Discover <span className="inline-block">Heritage</span> With Us
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#E6CCA9]/60 to-transparent"></div>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 md:mb-12">
          Connecting People to Diverse Attractions and Cultural Wonders
        </p>
        
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-white/10 relative overflow-hidden">
          {/* Subtle mandala background pattern */}
          <div className="absolute top-0 right-0 opacity-5 z-0">
            <CornerMandala className="text-white w-48 h-48" />
          </div>
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

      <GuidePreferencesDialog 
        showGuidePreferences={showGuidePreferences}
        setShowGuidePreferences={setShowGuidePreferences}
        guidePreferences={guidePreferences}
        setGuidePreferences={setGuidePreferences}
      />
      
      {/* Bottom corner mandalas */}
      <div className="absolute bottom-0 left-0 z-10 transform -translate-x-1/4 translate-y-1/4 rotate-270">
        <CornerMandala className="text-[#E6CCA9]" />
      </div>
      <div className="absolute bottom-0 right-0 z-10 transform translate-x-1/4 translate-y-1/4 rotate-180">
        <CornerMandala className="text-[#E6CCA9]" />
      </div>
    </section>
  );
};

export default HeroSection;
