
import React, { useState } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import DateSelector from "./DateSelector";
import VisitorSelector from "./VisitorSelector";
import GuideSelector from "./GuideSelector";
import MonumentSuggestions from "@/components/MonumentSuggestions";
import { Monument } from "@/data/monuments";
import { cn } from "@/lib/utils";

interface StickySearchFormProps {
  isVisible: boolean;
}

const StickySearchForm: React.FC<StickySearchFormProps> = ({ isVisible }) => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    performSearch,
    date,
    setDate,
    visitors,
    setVisitors,
    guideChoice,
    setGuideChoice,
  } = useSearch();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showVisitors, setShowVisitors] = useState(false);
  const [showGuideOptions, setShowGuideOptions] = useState(false);
  const [showGuidePreferences, setShowGuidePreferences] = useState(false);

  const handleMonumentSelect = (monument: Monument) => {
    setSearchQuery(monument.name);
    setShowSuggestions(false);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guideChoice === "choose_own") {
      navigate("/guides");
    } else if (guideChoice === "choose_for_me") {
      setShowGuidePreferences(true);
    } else {
      try {
        await performSearch();
        navigate("/checkout");
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <div 
      className={cn(
        "fixed left-0 right-0 top-16 z-40 bg-white shadow-md transform transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto px-4 py-2 flex justify-center">
        <form onSubmit={handleBook} className="flex items-center gap-2 max-w-4xl w-full">
          <div className="relative flex-grow max-w-xs">
            <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
              <MapPin className="h-4 w-4 text-gray-500 ml-2" />
              <Input 
                placeholder="Where to" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onFocus={() => setShowSuggestions(true)}
                className="border-0 bg-transparent p-0 h-8 focus-visible:ring-0 pl-1 hover:bg-transparent"
              />
            </div>
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 z-50">
                <MonumentSuggestions 
                  searchQuery={searchQuery}
                  onSelect={handleMonumentSelect}
                />
              </div>
            )}
          </div>
          
          <div className="w-28">
            <DateSelector date={date} setDate={setDate} isCompact={true} />
          </div>
          
          <div className="w-24">
            <VisitorSelector 
              visitors={visitors} 
              setVisitors={setVisitors} 
              showVisitors={showVisitors} 
              setShowVisitors={setShowVisitors}
              isCompact={true}
            />
          </div>
          
          <div className="w-24">
            <GuideSelector 
              guideChoice={guideChoice}
              showGuideOptions={showGuideOptions}
              setShowGuideOptions={setShowGuideOptions}
              setGuideChoice={setGuideChoice}
              setShowGuidePreferences={setShowGuidePreferences}
              isCompact={true}
            />
          </div>
          
          <Button 
            type="submit" 
            size="sm"
            className="bg-[#006d5b] hover:bg-[#006d5b]/90 text-white transition-transform hover:scale-95 active:scale-90"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StickySearchForm;
