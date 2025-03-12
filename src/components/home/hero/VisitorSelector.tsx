
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Minus } from "lucide-react";

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

interface VisitorSelectorProps {
  visitors: VisitorCategory[];
  setVisitors: React.Dispatch<React.SetStateAction<VisitorCategory[]>>;
  showVisitors: boolean;
  setShowVisitors: React.Dispatch<React.SetStateAction<boolean>>;
}

const VisitorSelector = ({ 
  visitors, 
  setVisitors, 
  showVisitors, 
  setShowVisitors 
}: VisitorSelectorProps) => {
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

  return (
    <div>
      <label className="block text-white text-xs sm:text-sm mb-1">Who</label>
      <Popover open={showVisitors} onOpenChange={setShowVisitors}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0 h-9 sm:h-10 text-xs sm:text-sm"
          >
            {getTotalVisitors()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto sm:w-80 p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {visitors.map((category) => (
              <div key={category.type} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">{category.type}</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => handleVisitorCountChange(category.type, false)}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{category.count}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => handleVisitorCountChange(category.type, true)}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
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
