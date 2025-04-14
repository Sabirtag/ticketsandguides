
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import DateSelector from "./DateSelector";
import VisitorSelector from "./VisitorSelector";
import GuideSelector from "./GuideSelector";
import MobileSearchForm from "./MobileSearchForm";
import { useIsMobile } from "@/hooks/use-mobile";
import MonumentSuggestions from "@/components/MonumentSuggestions";
import { Monument } from "@/data/monuments";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface SearchFormProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  showVisitors: boolean;
  setShowVisitors: React.Dispatch<React.SetStateAction<boolean>>;
  showGuideOptions: boolean;
  setShowGuideOptions: React.Dispatch<React.SetStateAction<boolean>>;
  visitors: VisitorCategory[];
  setVisitors: React.Dispatch<React.SetStateAction<VisitorCategory[]>>;
  guideChoice: string;
  setGuideChoice: React.Dispatch<React.SetStateAction<string>>;
  setShowGuidePreferences: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm = (props: SearchFormProps) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch } = useSearch();
  const isMobile = useIsMobile();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.guideChoice === "choose_own") {
      navigate("/guides");
    } else if (props.guideChoice === "choose_for_me") {
      props.setShowGuidePreferences(true);
    } else {
      try {
        await performSearch();
        // After search is complete, navigate to checkout
        navigate("/checkout");
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  const handleMonumentSelect = (monument: Monument) => {
    setSearchQuery(monument.name);
    setShowSuggestions(false);
  };

  if (isMobile) {
    return <MobileSearchForm {...props} />;
  }

  return (
    <form onSubmit={handleBook} className="flex flex-col space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-5 sm:gap-3">
      <div className="md:col-span-1 relative">
        <label className="block text-white text-xs sm:text-sm mb-1">Where</label>
        <Input
          placeholder="Search for Monuments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 h-9 sm:h-10"
        />
        {showSuggestions && (
          <MonumentSuggestions 
            searchQuery={searchQuery}
            onSelect={handleMonumentSelect}
          />
        )}
      </div>
      
      <div className="md:col-span-1">
        <DateSelector date={props.date} setDate={props.setDate} />
      </div>
      
      <div className="md:col-span-1">
        <VisitorSelector 
          visitors={props.visitors} 
          setVisitors={props.setVisitors} 
          showVisitors={props.showVisitors} 
          setShowVisitors={props.setShowVisitors} 
        />
      </div>
      
      <div className="md:col-span-1">
        <GuideSelector 
          guideChoice={props.guideChoice}
          showGuideOptions={props.showGuideOptions}
          setShowGuideOptions={props.setShowGuideOptions}
          setGuideChoice={props.setGuideChoice}
          setShowGuidePreferences={props.setShowGuidePreferences}
        />
      </div>
      
      <div className="md:col-span-1">
        <label className="block text-white text-xs sm:text-sm mb-1 opacity-0">Book</label>
        <Button 
          type="submit" 
          className="w-full h-9 sm:h-10 bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
        >
          <span>Book</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
