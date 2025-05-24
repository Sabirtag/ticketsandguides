
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Minus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface VisitorSelectorProps {
  visitors: VisitorCategory[];
  setVisitors: React.Dispatch<React.SetStateAction<VisitorCategory[]>>;
  showVisitors: boolean;
  setShowVisitors: React.Dispatch<React.SetStateAction<boolean>>;
  isCompact?: boolean;
}

const VisitorSelector = ({
  visitors,
  setVisitors,
  showVisitors,
  setShowVisitors,
  isCompact = false
}: VisitorSelectorProps) => {
  const handleVisitorCountChange = (type: 'Indian' | 'SAARC' | 'Foreign', increment: boolean) => {
    setVisitors(prev => prev.map(visitor => visitor.type === type ? {
      ...visitor,
      count: increment ? visitor.count + 1 : Math.max(0, visitor.count - 1)
    } : visitor));
  };

  const getTotalVisitors = () => {
    const total = visitors.reduce((sum, category) => sum + category.count, 0);
    if (total === 0) return isCompact ? "Who" : "Select Visitors";
    if (isCompact) return `${total} Visitors`;
    const categories = visitors.filter(cat => cat.count > 0).map(cat => `${cat.count} ${cat.type}`).join(", ");
    return categories;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setVisitors([{
        type: 'Indian',
        count: 0
      }, {
        type: 'SAARC',
        count: 0
      }, {
        type: 'Foreign',
        count: 0
      }]);
    }
  };

  return (
    <div>
      <Popover open={showVisitors} onOpenChange={setShowVisitors}>
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
            {!isCompact ? getTotalVisitors() : (
              <>
                <Users className="mr-1 h-3 w-3" />
                {getTotalVisitors()}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto sm:w-80 border border-border bg-white shadow-lg rounded-lg p-3">
          <div className="space-y-3">
            {visitors.map(category => (
              <div key={category.type} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{category.type}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-white text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)] hover:bg-secondary/80 transition-colors"
                    onClick={() => handleVisitorCountChange(category.type, false)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm text-foreground">{category.count}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-white text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)] hover:bg-secondary/80 transition-colors"
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
  );
};

export default VisitorSelector;
