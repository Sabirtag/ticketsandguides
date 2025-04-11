
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapPin, Calendar, Users, Sparkles, Search } from "lucide-react";
import DateSelector from "./DateSelector";
import VisitorSelector from "./VisitorSelector";
import GuideSelector from "./GuideSelector";
import MonumentSuggestions from "@/components/MonumentSuggestions";
import { Monument } from "@/data/monuments";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface MobileSearchFormProps {
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

const MobileSearchForm = ({
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
}: MobileSearchFormProps) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleMonumentSelect = (monument: Monument) => {
    setSearchQuery(monument.name);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center gap-2 bg-white/90 rounded-md p-2 relative">
          <MapPin className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search for Monuments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="border-0 bg-transparent focus-visible:ring-0 px-0 text-sm"
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0 bg-white text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.1)]"
              >
                <Search className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">When</span>
                  </div>
                  <DateSelector date={date} setDate={setDate} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Who</span>
                  </div>
                  <VisitorSelector
                    visitors={visitors}
                    setVisitors={setVisitors}
                    showVisitors={showVisitors}
                    setShowVisitors={setShowVisitors}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">With</span>
                  </div>
                  <GuideSelector
                    guideChoice={guideChoice}
                    showGuideOptions={showGuideOptions}
                    setShowGuideOptions={setShowGuideOptions}
                    setGuideChoice={setGuideChoice}
                    setShowGuidePreferences={setShowGuidePreferences}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full mt-6 bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]"
                >
                  Search
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1">
              <MonumentSuggestions 
                searchQuery={searchQuery}
                onSelect={handleMonumentSelect}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MobileSearchForm;
