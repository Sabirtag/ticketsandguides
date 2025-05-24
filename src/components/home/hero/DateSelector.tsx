
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isCompact?: boolean;
}

const DateSelector = ({
  date,
  setDate,
  isCompact = false
}: DateSelectorProps) => {
  console.log("🎨 Rendering DateSelector with theme colors");
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setDate(undefined);
    }
  };
  
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            onKeyDown={handleKeyDown} 
            className={cn(
              "w-full justify-center items-center text-center font-normal bg-white border-border text-gray-900 transition-none",
              isCompact ? "h-8 px-2 py-1 text-xs" : "h-12 text-sm", 
              !date && "text-gray-500"
            )}
          >
            <div className="flex items-center justify-center">
              <CalendarIcon 
                className={cn(
                  "h-4 w-4 text-gray-500", 
                  isCompact ? "mr-1 h-3 w-3" : "mr-1.5"
                )} 
              />
              <span className="text-center text-gray-900">
                {date 
                  ? format(date, isCompact ? "MMM d" : "PPP") 
                  : isCompact ? "When" : "Add Date & Time"
                }
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover border border-border shadow-md" align="start">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            initialFocus 
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))} 
            className="pointer-events-auto text-foreground bg-popover rounded-md" 
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
