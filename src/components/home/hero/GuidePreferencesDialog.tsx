
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Languages } from "lucide-react";

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

  const handleLanguageToggle = (language: string) => {
    setGuidePreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
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
            }}
            className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
          >
            Find My Guide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidePreferencesDialog;
