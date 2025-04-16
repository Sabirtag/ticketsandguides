
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
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  return (
    <div>
      <label className="block text-white text-xs sm:text-sm mb-1">When</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white/90 text-gray-900 border-0 h-9 sm:h-10 text-xs sm:text-sm mobile-tap-target",
              !date && "text-gray-500"
            )}
          >
            <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {date ? format(date, "PPP") : "Add Date & Time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
