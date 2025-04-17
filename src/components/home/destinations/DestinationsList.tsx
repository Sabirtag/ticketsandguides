
import React, { useMemo, useRef } from "react";
import { Destination } from "./types";
import DestinationCard from "./DestinationCard";
import { calculateDistance } from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Update to accept SimpleLocation type
interface DestinationsListProps {
  destinations: Destination[];
  userLocation: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ 
  destinations, 
  userLocation 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const destinationsWithDistance = useMemo(() => {
    if (!userLocation) return destinations;

    return destinations.map(destination => {
      if (!destination.latitude || !destination.longitude) return destination;
      
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        destination.latitude,
        destination.longitude
      );

      return {
        ...destination,
        distance
      };
    }).sort((a, b) => {
      // If both have distance, sort by distance
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      // If only one has distance, prioritize the one with distance
      if (a.distance !== undefined) return -1;
      if (b.distance !== undefined) return 1;
      // Default sort by popularity
      return b.popularity - a.popularity;
    });
  }, [destinations, userLocation]);

  // Only show the first 4 destinations
  const visibleDestinations = destinationsWithDistance.slice(0, 4);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Mobile scroll view */}
      <div 
        ref={scrollContainerRef}
        id="destinations-scroll-container"
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4 md:hidden"
      >
        {visibleDestinations.map(destination => (
          <div key={destination.id} className="flex-shrink-0 w-[270px]">
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
      
      {/* Desktop grid view */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {visibleDestinations.map(destination => (
          <div key={destination.id}>
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
      
      {/* Desktop navigation buttons */}
      <div className="hidden md:block">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md hover:bg-white z-10"
          onClick={() => scrollContainer('left')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white/80 rounded-full shadow-md hover:bg-white z-10"
          onClick={() => scrollContainer('right')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DestinationsList;
