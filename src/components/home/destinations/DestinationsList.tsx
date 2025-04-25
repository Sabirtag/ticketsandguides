import React, { useMemo, useRef } from "react";
import { Destination } from "./types";
import DestinationCard from "./DestinationCard";
import { calculateDistance } from "./utils";

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
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      if (a.distance !== undefined) return -1;
      if (b.distance !== undefined) return 1;
      return b.popularity - a.popularity;
    });
  }, [destinations, userLocation]);

  const visibleDestinations = destinationsWithDistance.slice(0, 4);

  return (
    <div>
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
    </div>
  );
};

export default DestinationsList;
