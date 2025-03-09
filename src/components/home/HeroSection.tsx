
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch, isSearching } = useSearch();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [visitors, setVisitors] = useState<string>("2 Adults");
  const [showGuideOptions, setShowGuideOptions] = useState<boolean>(false);
  const [withGuide, setWithGuide] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (withGuide) {
      navigate("/guide-selection");
    } else {
      try {
        await performSearch();
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <section className="relative h-[600px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
          alt="Heritage background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-3">
          Discover Heritage With Us
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-12">
          Connecting People to Diverse Attractions and Cultural Wonders
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">Where</label>
              <Input
                placeholder="Search for Monuments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90"
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">When</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/90 border-0",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Add Date & Time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">Who</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/90 border-0"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {visitors}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setVisitors("1 Adult")}
                    >
                      1 Adult
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setVisitors("2 Adults")}
                    >
                      2 Adults
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setVisitors("2 Adults, 1 Child")}
                    >
                      2 Adults, 1 Child
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setVisitors("2 Adults, 2 Children")}
                    >
                      2 Adults, 2 Children
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setVisitors("Group (5+)")}
                    >
                      Group (5+)
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">With</label>
              <Popover
                open={showGuideOptions}
                onOpenChange={setShowGuideOptions}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/90 border-0"
                    onClick={() => setShowGuideOptions(true)}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {withGuide ? "With a Guide" : "Get a Guide?"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        setWithGuide(true);
                        setShowGuideOptions(false);
                      }}
                    >
                      With a Guide
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        setWithGuide(false);
                        setShowGuideOptions(false);
                      }}
                    >
                      No Guide
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1 opacity-0">Book</label>
              <Button 
                type="submit" 
                className="w-full h-10 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isSearching || (!withGuide && !searchQuery.trim())}
              >
                {withGuide ? "Find Guides" : "Search"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
