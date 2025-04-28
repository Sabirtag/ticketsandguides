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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setDate(undefined);
    }
  };
  return <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" onKeyDown={handleKeyDown} className="w-full bg-white/90 text-gray-900 placeholder:text-gray-500 h-9 sm:h-10 border-2 border-[#006d5b] focus:border-[#006d5b] pl-9 px-[11px] mx-0 text-base font-normal rounded py-0 text-left">
            <CalendarIcon className={cn("mr-2 h-3 w-3 sm:h-4 sm:w-4", isCompact && "mr-1 h-3 w-3")} />
            {date ? format(date, isCompact ? "MMM d" : "PPP") : isCompact ? "When" : "Add Date & Time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#FDE1D3] border-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))} className="pointer-events-auto text-gray-900" />
        </PopoverContent>
      </Popover>
    </div>;
};
export default DateSelector;