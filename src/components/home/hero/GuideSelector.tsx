
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GuideSelectorProps {
  guideChoice: string;
  showGuideOptions: boolean;
  setShowGuideOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setGuideChoice: React.Dispatch<React.SetStateAction<string>>;
  setShowGuidePreferences: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact?: boolean;
}

const GuideSelector = ({
  guideChoice,
  showGuideOptions,
  setShowGuideOptions,
  setGuideChoice,
  setShowGuidePreferences,
  isCompact = false
}: GuideSelectorProps) => {
  const navigate = useNavigate();
  
  console.log("🎨 Rendering GuideSelector with theme colors");
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setGuideChoice("");
    }
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

  const getButtonText = () => {
    if (isCompact) {
      if (guideChoice === "choose_for_me") return "Guide";
      if (guideChoice === "choose_own") return "Manual";
      if (guideChoice === "no_guide") return "None";
      return "Guide";
    } else {
      if (guideChoice === "choose_for_me") return "Select Guide";
      if (guideChoice === "choose_own") return "Guide Manual";
      if (guideChoice === "no_guide") return "No Guide";
      return "Add Guide";
    }
  };
  
  return (
    <div>
      <Popover open={showGuideOptions} onOpenChange={setShowGuideOptions}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            onKeyDown={handleKeyDown} 
            className={cn(
              "w-full justify-center items-center text-center font-normal bg-white border-border text-gray-900 transition-none",
              isCompact ? "h-8 px-2 py-1 text-xs" : "h-12 text-sm"
            )}
          >
            <Sparkles 
              className={cn(
                "mr-2 h-4 w-4 text-gray-500 flex-shrink-0", 
                isCompact && "mr-1 h-3 w-3"
              )} 
            />
            <span className="text-gray-900">
              {getButtonText()}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto sm:w-80 border border-border bg-white shadow-lg rounded-lg p-2">
          <div className="space-y-1">
            {["choose_for_me", "choose_own", "no_guide"].map(choice => (
              <Button 
                key={choice} 
                variant="ghost" 
                onClick={() => handleGuideSelection(choice)} 
                className="w-full justify-start text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 h-auto rounded-md transition-colors"
              >
                {choice === "choose_for_me" 
                  ? "Choose a guide for me" 
                  : choice === "choose_own" 
                    ? "I'll choose my own guide" 
                    : "Don't want a guide"
                }
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GuideSelector;
