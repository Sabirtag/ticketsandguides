
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import DateSelector from "./DateSelector";
import VisitorSelector from "./VisitorSelector";
import GuideSelector from "./GuideSelector";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface GuidePreferences {
  languages: string[];
  budget: number;
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

const SearchForm = ({
  date,
  setDate,
  showVisitors,
  setShowVisitors,
  showGuideOptions,
  setShowGuideOptions,
  visitors,
  setVisitors,
  guideChoice,
  setGuideChoice,
  setShowGuidePreferences
}: SearchFormProps) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guideChoice === "choose_own") {
      navigate("/guides");
    } else {
      try {
        await performSearch();
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-1">
        <label className="block text-white text-sm mb-1">Where</label>
        <Input
          placeholder="Search for Monuments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/90 text-gray-900 placeholder:text-gray-500"
        />
      </div>
      
      <div className="md:col-span-1">
        <DateSelector date={date} setDate={setDate} />
      </div>
      
      <div className="md:col-span-1">
        <VisitorSelector 
          visitors={visitors} 
          setVisitors={setVisitors} 
          showVisitors={showVisitors} 
          setShowVisitors={setShowVisitors} 
        />
      </div>
      
      <div className="md:col-span-1">
        <GuideSelector 
          guideChoice={guideChoice}
          showGuideOptions={showGuideOptions}
          setShowGuideOptions={setShowGuideOptions}
          setGuideChoice={setGuideChoice}
          setShowGuidePreferences={setShowGuidePreferences}
        />
      </div>
      
      <div className="md:col-span-1">
        <label className="block text-white text-sm mb-1 opacity-0">Search</label>
        <Button 
          type="submit" 
          className="w-full h-10 bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
