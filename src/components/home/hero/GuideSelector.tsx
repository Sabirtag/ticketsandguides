import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface GuideSelectorProps {
  guideChoice: string;
  showGuideOptions: boolean;
  setShowGuideOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setGuideChoice: React.Dispatch<React.SetStateAction<string>>;
  setShowGuidePreferences: React.Dispatch<React.SetStateAction<boolean>>;
}
const GuideSelector = ({
  guideChoice,
  showGuideOptions,
  setShowGuideOptions,
  setGuideChoice,
  setShowGuidePreferences
}: GuideSelectorProps) => {
  const navigate = useNavigate();
  const handleGuideSelection = (choice: string) => {
    setGuideChoice(choice);
    if (choice === "choose_for_me") {
      setShowGuidePreferences(true);
    } else if (choice === "choose_own") {
      navigate("/guides");
    }
    setShowGuideOptions(false);
  };
  return <div>
      
      <Popover open={showGuideOptions} onOpenChange={setShowGuideOptions}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-2 border-[#006d5b] h-9 sm:h-10 text-xs sm:text-sm">
            <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#006d5b] flex-shrink-0" />
            <span className="truncate text-left text-slate-950 text-sm mx-0 my-0 py-0 px-0">
              {guideChoice === "choose_for_me" ? "Guide chosen for you" : guideChoice === "choose_own" ? "Choose own guide" : guideChoice === "no_guide" ? "No guide" : "Get a Guide?"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto sm:w-80">
          <div className="space-y-2 p-2">
            {["choose_for_me", "choose_own", "no_guide"].map(choice => <Button key={choice} variant="ghost" onClick={() => handleGuideSelection(choice)} className="w-full justify-start text-xs bg-[#006d5b] font-normal text-white rounded-sm text-center sm:text-sm">
                {choice === "choose_for_me" ? "Choose a guide for me" : choice === "choose_own" ? "I'll choose my own guide" : "Don't want a guide"}
              </Button>)}
          </div>
        </PopoverContent>
      </Popover>
    </div>;
};
export default GuideSelector;