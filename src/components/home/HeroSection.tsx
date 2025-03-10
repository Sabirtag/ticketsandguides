
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Languages, Sparkles, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface GuidePreferences {
  languages: string[];
  budget: number;
}

const HeroSection = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch, isSearching } = useSearch();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showVisitors, setShowVisitors] = useState(false);
  const [showGuideOptions, setShowGuideOptions] = useState(false);
  const [showGuidePreferences, setShowGuidePreferences] = useState(false);
  const [guideChoice, setGuideChoice] = useState<string>("");
  
  const [visitors, setVisitors] = useState<VisitorCategory[]>([
    { type: 'Indian', count: 0 },
    { type: 'SAARC', count: 0 },
    { type: 'Foreign', count: 0 }
  ]);

  const [guidePreferences, setGuidePreferences] = useState<GuidePreferences>({
    languages: [],
    budget: 1500
  });

  const availableLanguages = [
    "English", "Hindi", "Sanskrit", "French", "German", 
    "Spanish", "Bengali", "Tamil", "Telugu", "Malayalam"
  ];

  const handleVisitorCountChange = (type: 'Indian' | 'SAARC' | 'Foreign', increment: boolean) => {
    setVisitors(prev => prev.map(visitor => 
      visitor.type === type 
        ? { ...visitor, count: increment ? visitor.count + 1 : Math.max(0, visitor.count - 1) }
        : visitor
    ));
  };

  const getTotalVisitors = () => {
    const total = visitors.reduce((sum, category) => sum + category.count, 0);
    if (total === 0) return "Select Visitors";
    
    const categories = visitors
      .filter(cat => cat.count > 0)
      .map(cat => `${cat.count} ${cat.type}`)
      .join(", ");
    return categories;
  };

  const handleGuideSelection = (choice: string) => {
    setGuideChoice(choice);
    if (choice === "choose_for_me") {
      setShowGuidePreferences(true);
    } else if (choice === "choose_own") {
      navigate("/guides");
    }
    setShowGuideOptions(false);
  };

  const handleLanguageToggle = (language: string) => {
    setGuidePreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

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
        <h1 className="text-5xl md:text-6xl font-fitzgerald font-bold text-white mb-3">
          Discover Heritage With Us
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-12">
          Connecting People to Diverse Attractions and Cultural Wonders
        </p>
        
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-lg p-6">
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
              <label className="block text-white text-sm mb-1">When</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0",
                      !date && "text-gray-500"
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
              <Popover open={showVisitors} onOpenChange={setShowVisitors}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0"
                  >
                    {getTotalVisitors()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-4">
                    {visitors.map((category) => (
                      <div key={category.type} className="flex items-center justify-between">
                        <span>{category.type}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleVisitorCountChange(category.type, false)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{category.count}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleVisitorCountChange(category.type, true)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">With</label>
              <Popover open={showGuideOptions} onOpenChange={setShowGuideOptions}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {guideChoice === "choose_for_me" ? "Guide chosen for you"
                      : guideChoice === "choose_own" ? "Choose own guide"
                      : guideChoice === "no_guide" ? "No guide"
                      : "Get a Guide?"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2 p-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => handleGuideSelection("choose_for_me")}
                    >
                      Choose a guide for me
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => handleGuideSelection("choose_own")}
                    >
                      I'll choose my own guide
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => handleGuideSelection("no_guide")}
                    >
                      Don't want a guide
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
        </div>
      </div>

      <Dialog open={showGuidePreferences} onOpenChange={setShowGuidePreferences}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Guide Preferences</DialogTitle>
            <DialogDescription>
              Help us find the perfect guide for you
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Preferred Languages</Label>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((language) => (
                  <Button
                    key={language}
                    variant={guidePreferences.languages.includes(language) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageToggle(language)}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Budget Range (₹1000 - ₹5000)</Label>
              <Slider
                value={[guidePreferences.budget]}
                min={1000}
                max={5000}
                step={100}
                onValueChange={(value) => setGuidePreferences(prev => ({ ...prev, budget: value[0] }))}
              />
              <div className="text-right text-sm text-muted-foreground">
                ₹{guidePreferences.budget}
              </div>
            </div>
            <Button
              onClick={() => {
                setShowGuidePreferences(false);
                // Here you would typically save the preferences and proceed with the search
              }}
              className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
            >
              Find My Guide
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
