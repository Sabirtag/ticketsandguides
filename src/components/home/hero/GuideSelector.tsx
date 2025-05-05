
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
  
  return (
    <div>
      <Popover open={showGuideOptions} onOpenChange={setShowGuideOptions}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            onKeyDown={handleKeyDown} 
            className={cn(
              "w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0 transition-none",
              isCompact ? "h-8 px-2 py-1" : "h-9 sm:h-10", 
              "text-xs sm:text-sm"
            )}
          >
            <Sparkles 
              className={cn(
                "mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0", 
                isCompact && "mr-1 h-3 w-3"
              )} 
            />
            <span className="truncate text-left text-slate-950 text-sm mx-0 my-0 py-0 px-0">
              {isCompact 
                ? guideChoice 
                  ? guideChoice === "choose_for_me" 
                    ? "Guide chosen" 
                    : guideChoice === "choose_own" 
                      ? "Own guide" 
                      : "No guide" 
                  : "With" 
                : guideChoice === "choose_for_me" 
                  ? "Guide chosen for you" 
                  : guideChoice === "choose_own" 
                    ? "Choose own guide" 
                    : guideChoice === "no_guide" 
                      ? "No guide" 
                      : "Get a Guide?"
              }
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto sm:w-80 border-0 bg-popover shadow-md">
          <div className="space-y-2 p-2">
            {["choose_for_me", "choose_own", "no_guide"].map(choice => (
              <Button 
                key={choice} 
                variant="ghost" 
                onClick={() => handleGuideSelection(choice)} 
                className="w-full justify-start text-xs text-center transition-none bg-secondary text-foreground font-normal sm:text-base px-px py-[21px] rounded-md"
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
