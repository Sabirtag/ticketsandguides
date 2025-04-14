
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface GuidePreferences {
  languages: string[];
  budget: number;
}

interface GuidePreferencesDialogProps {
  showGuidePreferences: boolean;
  setShowGuidePreferences: React.Dispatch<React.SetStateAction<boolean>>;
  guidePreferences: GuidePreferences;
  setGuidePreferences: React.Dispatch<React.SetStateAction<GuidePreferences>>;
}

const GuidePreferencesDialog = ({
  showGuidePreferences,
  setShowGuidePreferences,
  guidePreferences,
  setGuidePreferences
}: GuidePreferencesDialogProps) => {
  const availableLanguages = [
    "English", "Hindi", "Sanskrit", "French", "German", 
    "Spanish", "Bengali", "Tamil", "Telugu", "Malayalam"
  ];
  
  const navigate = useNavigate();
  const [duration, setDuration] = useState<"half" | "full">("half");
  const [isSearching, setIsSearching] = useState(false);
  const [foundGuide, setFoundGuide] = useState<GuideProfile | null>(null);

  // Mock guide data for demonstration
  const mockGuide: GuideProfile = {
    id: "g123",
    name: "Rahul Sharma",
    languages: ["English", "Hindi"],
    halfDayRate: 1200,
    fullDayRate: 2200,
    specialties: ["Red Fort", "Qutub Minar"],
    rating: 4.8,
    responseTime: "5 min",
    experience: "5 years",
    about: "History enthusiast with deep knowledge of Delhi monuments. I specialize in Mughal architecture and can provide insights about the historical significance of monuments.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  };

  const handleLanguageToggle = (language: string) => {
    setGuidePreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleFindGuide = () => {
    if (guidePreferences.languages.length === 0) {
      toast.error("Please select at least one language");
      return;
    }

    setIsSearching(true);
    
    // Simulate searching for a guide
    setTimeout(() => {
      setIsSearching(false);
      setFoundGuide(mockGuide);
    }, 2000);
  };

  const handleConfirmGuide = () => {
    if (foundGuide) {
      toast.success(`Guide ${foundGuide.name} confirmed for your tour!`);
      setShowGuidePreferences(false);
    }
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    setFoundGuide(null);
    setShowGuidePreferences(false);
  };

  return (
    <Dialog open={showGuidePreferences} onOpenChange={setShowGuidePreferences}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Guide Preferences</DialogTitle>
          <DialogDescription>
            Help us find the perfect guide for you
          </DialogDescription>
        </DialogHeader>
        
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-center text-sm">Searching for guides that match your preferences...</p>
            <p className="text-center text-xs text-muted-foreground">This will take up to 2 minutes</p>
            <Button variant="outline" onClick={handleCancelSearch}>Cancel</Button>
          </div>
        ) : foundGuide ? (
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <img 
                src={foundGuide.image} 
                alt={foundGuide.name} 
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{foundGuide.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-500">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {foundGuide.rating} • {foundGuide.experience}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-muted p-3 space-y-2">
              <p className="text-sm font-medium">Languages</p>
              <div className="flex flex-wrap gap-1">
                {foundGuide.languages.map(lang => (
                  <span key={lang} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {lang}
                  </span>
                ))}
              </div>
              
              <p className="text-sm font-medium mt-2">Rate</p>
              <p className="text-sm">
                ₹{duration === "half" ? foundGuide.halfDayRate : foundGuide.fullDayRate} for {duration === "half" ? "Half Day (4 hrs)" : "Full Day (8 hrs)"}
              </p>
              
              <p className="text-sm font-medium mt-2">About</p>
              <p className="text-xs">{foundGuide.about}</p>
            </div>
            
            <div className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={handleCancelSearch}>Cancel</Button>
              <Button onClick={handleConfirmGuide}>Confirm Guide</Button>
            </div>
          </div>
        ) : (
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
                    className={guidePreferences.languages.includes(language) 
                      ? "bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]" 
                      : "border-[rgba(100,73,37,255)] text-[rgba(100,73,37,255)] bg-[rgba(100,73,37,0.1)] hover:bg-[rgba(100,73,37,0.2)]"}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={duration} onValueChange={(value) => setDuration(value as "half" | "full")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half">Half Day (4 Hours)</SelectItem>
                  <SelectItem value="full">Full Day (8 Hours)</SelectItem>
                </SelectContent>
              </Select>
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
              onClick={handleFindGuide}
              className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
            >
              Find My Guide
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Type definition for guide profiles
interface GuideProfile {
  id: string;
  name: string;
  languages: string[];
  halfDayRate: number;
  fullDayRate: number;
  specialties: string[];
  rating: number;
  responseTime: string;
  experience: string;
  about: string;
  image: string;
}

export default GuidePreferencesDialog;
