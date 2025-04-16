
import React, { useState } from "react";
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
  
  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f45d0261-eccc-4880-b6a0-1d9cc5fc853d.png" 
          alt="Indian architectural detail" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <h1 className="mb-2 sm:mb-3 text-white">
          Discover <span className="inline-block">Heritage</span> With Us
        </h1>
        <p className="text-white/90 max-w-2xl mb-6 sm:mb-8 md:mb-12 responsive-text">
          Connecting People to Diverse Attractions and Cultural Wonders
        </p>
        
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6">
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
    </section>
  );
};

export default HeroSection;
