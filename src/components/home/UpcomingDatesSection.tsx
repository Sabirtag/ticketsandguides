
import React from "react";
import { Calendar } from "lucide-react";

// Helper function to format date
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const UpcomingDatesSection = () => {
  const today = new Date();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Upcoming Available Dates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i + 1);
            return (
              <div 
                key={i} 
                className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-medium">{formatDate(date)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingDatesSection;
