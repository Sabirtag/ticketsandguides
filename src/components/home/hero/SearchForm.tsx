import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin } from "lucide-react";
import DateSelector from "./DateSelector";
import VisitorSelector from "./VisitorSelector";
import GuideSelector from "./GuideSelector";
import MobileSearchForm from "./MobileSearchForm";
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
  const {
    searchQuery,
    setSearchQuery,
    performSearch
  } = useSearch();
  const isMobile = useIsMobile();
  const [showSuggestions, setShowSuggestions] = useState(false);
  console.log("🎨 Rendering SearchForm with theme colors");
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.guideChoice === "choose_own") {
      navigate("/guides");
    } else if (props.guideChoice === "choose_for_me") {
      props.setShowGuidePreferences(true);
    } else {
      try {
        await performSearch();
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
  return <form onSubmit={handleBook} className="flex items-end gap-3">
      <div className="flex-1 relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input placeholder="Where to" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setShowSuggestions(true)} className="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 h-10 border-2 border-primary focus:border-primary rounded-md pl-9" />
        </div>
        {showSuggestions && <MonumentSuggestions searchQuery={searchQuery} onSelect={handleMonumentSelect} />}
      </div>
      
      <div className="w-[160px]">
        <DateSelector date={props.date} setDate={props.setDate} />
      </div>
      
      <div className="w-[160px]">
        <VisitorSelector visitors={props.visitors} setVisitors={props.setVisitors} showVisitors={props.showVisitors} setShowVisitors={props.setShowVisitors} />
      </div>
      
      <div className="w-[160px]">
        <GuideSelector guideChoice={props.guideChoice} showGuideOptions={props.showGuideOptions} setShowGuideOptions={props.setShowGuideOptions} setGuideChoice={props.setGuideChoice} setShowGuidePreferences={props.setShowGuidePreferences} />
      </div>
      
      <div className="w-[120px]">
        <Button type="submit" variant="cta" className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] px-[40px]">
          Book
        </Button>
      </div>
    </form>;
};
export default SearchForm;