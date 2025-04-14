
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface GuidePreferencesDialogProps {
  showGuidePreferences: boolean;
  setShowGuidePreferences: React.Dispatch<React.SetStateAction<boolean>>;
  guidePreferences: GuidePreferences;
  setGuidePreferences: React.Dispatch<React.SetStateAction<GuidePreferences>>;
}

interface GuidePreferences {
  languages: string[];
  budget: number;
}

interface Guide {
  id: string;
  name: string;
  languages: string[];
  halfDayRate: number;
  fullDayRate: number;
  specialties: string[];
  rating: number;
  experience: number;
}

const GuidePreferencesDialog = ({ 
  showGuidePreferences, 
  setShowGuidePreferences,
  guidePreferences,
  setGuidePreferences
}: GuidePreferencesDialogProps) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [tourDuration, setTourDuration] = useState<string>("half");
  const [budget, setBudget] = useState<number>(1500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchingInProgress, setMatchingInProgress] = useState<boolean>(false);
  const [matchedGuide, setMatchedGuide] = useState<Guide | null>(null);
  const [guideStatus, setGuideStatus] = useState<'pending' | 'accepted' | 'declined' | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);
  const [selectedSite, setSelectedSite] = useState<string>("");

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
  };

  const findGuide = () => {
    setIsLoading(true);
    setMatchingInProgress(true);

    // Mock finding a guide
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock guide data
      const mockGuide: Guide = {
        id: "g123",
        name: "Rahul Sharma",
        languages: [selectedLanguage],
        halfDayRate: tourDuration === "half" ? budget : budget / 2,
        fullDayRate: tourDuration === "full" ? budget : budget * 2,
        specialties: ["Taj Mahal", "Red Fort", "Qutub Minar"],
        rating: 4.8,
        experience: 5
      };
      
      setMatchedGuide(mockGuide);
      setGuideStatus('pending');
      
      // Start the countdown timer
      let countdown = 120;
      const timer = setInterval(() => {
        countdown -= 1;
        setTimeRemaining(countdown);
        
        if (countdown <= 0) {
          clearInterval(timer);
          // If guide hasn't responded after 2 minutes
          if (guideStatus === 'pending') {
            setGuideStatus(null);
            setMatchingInProgress(false);
            toast.error("No guides available at the moment. Please try again later.");
          }
        }
        
        // Simulate guide accepting after 10 seconds
        if (countdown === 110) {
          setGuideStatus('accepted');
          clearInterval(timer);
        }
      }, 1000);
    }, 2000);
  };

  const handleConfirmBooking = () => {
    toast.success(`Guide ${matchedGuide?.name} has been booked for your trip!`);
    setShowGuidePreferences(false);
    setMatchingInProgress(false);
    setMatchedGuide(null);
    setGuideStatus(null);
    // Navigate to checkout
    navigate("/checkout");
  };

  const handleCancel = () => {
    if (matchingInProgress) {
      toast.info("Guide search cancelled");
    }
    setShowGuidePreferences(false);
    setMatchingInProgress(false);
    setMatchedGuide(null);
    setGuideStatus(null);
  };

  return (
    <Dialog open={showGuidePreferences} onOpenChange={setShowGuidePreferences}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Guide Preferences</DialogTitle>
          <DialogDescription>
            Tell us what you're looking for in a guide, and we'll match you with the best available option.
          </DialogDescription>
        </DialogHeader>
        
        {!matchingInProgress && !matchedGuide && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {["English", "Hindi", "French", "Spanish", "German", "Japanese"].map((lang) => (
                  <Badge 
                    key={lang} 
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    className={`py-2 justify-center cursor-pointer ${
                      selectedLanguage === lang 
                        ? "bg-[rgba(100,73,37,255)] text-white" 
                        : "bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.2)]"
                    }`}
                    onClick={() => handleLanguageClick(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tourDuration">Tour Duration</Label>
              <RadioGroup value={tourDuration} onValueChange={setTourDuration} className="flex gap-4 mt-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="half" id="half-day" />
                  <Label htmlFor="half-day" className="cursor-pointer">Half Day (4 Hours)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full-day" />
                  <Label htmlFor="full-day" className="cursor-pointer">Full Day (8 Hours)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="budget">Budget (₹)</Label>
                <span className="text-sm font-medium">₹{budget}</span>
              </div>
              <Slider
                id="budget"
                defaultValue={[1500]}
                max={5000}
                min={500}
                step={100}
                onValueChange={(values) => setBudget(values[0])}
                className="mt-1"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹500</span>
                <span>₹5000</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heritage-site">Heritage Site (Optional)</Label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger className="text-foreground">
                  <SelectValue placeholder="Select site (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any site</SelectItem>
                  <SelectItem value="taj-mahal">Taj Mahal</SelectItem>
                  <SelectItem value="red-fort">Red Fort</SelectItem>
                  <SelectItem value="qutub-minar">Qutub Minar</SelectItem>
                  <SelectItem value="amber-fort">Amber Fort</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgba(100,73,37,255)]"></div>
            <p className="mt-4 text-center">Finding the perfect guide for you...</p>
          </div>
        )}
        
        {matchedGuide && guideStatus === 'pending' && (
          <div className="py-4">
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(100,73,37,0.1)] flex items-center justify-center mb-2">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold">{matchedGuide.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-1">⭐ {matchedGuide.rating}</span>
                <span>• {matchedGuide.experience} years experience</span>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4 mb-4">
              <p className="text-center mb-2">Guide has been notified of your request</p>
              <div className="flex justify-center items-center gap-2">
                <div className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></div>
                <p className="text-sm">Waiting for confirmation ({timeRemaining}s)</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center mb-4">
              The guide will confirm your booking shortly. You can wait or cancel and try again.
            </p>
          </div>
        )}
        
        {matchedGuide && guideStatus === 'accepted' && (
          <div className="py-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <p className="text-center text-green-700 font-medium">Guide has accepted your request!</p>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(100,73,37,0.1)] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{matchedGuide.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <span className="mr-1">⭐ {matchedGuide.rating}</span>
                  <span>• {matchedGuide.experience} years experience</span>
                </div>
                <p className="text-sm mb-2">
                  Languages: {matchedGuide.languages.join(", ")}
                </p>
                <div className="text-sm font-medium">
                  {tourDuration === "half" ? "Half Day Rate" : "Full Day Rate"}: 
                  ₹{tourDuration === "half" ? matchedGuide.halfDayRate : matchedGuide.fullDayRate}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm mb-4">
                Your guide is an expert in {matchedGuide.specialties.join(", ")} and will enhance your heritage experience.
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!matchingInProgress && !matchedGuide && (
            <>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={findGuide} className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)]">Find Guide</Button>
            </>
          )}
          
          {matchingInProgress && guideStatus === 'pending' && (
            <Button variant="outline" onClick={handleCancel} className="w-full">Cancel Request</Button>
          )}
          
          {matchingInProgress && guideStatus === 'accepted' && (
            <>
              <Button variant="outline" onClick={handleCancel}>Decline</Button>
              <Button onClick={handleConfirmBooking} className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)]">Confirm Booking</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuidePreferencesDialog;
