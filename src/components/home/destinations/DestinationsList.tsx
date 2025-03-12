
import React, { useMemo } from "react";
import { Destination } from "./types";
import DestinationCard from "./DestinationCard";
import { calculateDistance } from "./utils";

interface DestinationsListProps {
  destinations: Destination[];
  userLocation: GeolocationCoordinates | null;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ 
  destinations, 
  userLocation 
}) => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
      <div className="md:hidden col-span-2 overflow-x-auto pb-4 scrollbar-none">
        <div className="inline-flex space-x-4 w-max pl-0.5">
          {destinationsWithDistance.map(destination => (
            <div key={destination.id} className="w-[160px] md:w-full flex-shrink-0">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="hidden md:grid md:grid-cols-4 gap-6 w-full">
        {destinationsWithDistance.map(destination => (
          <div key={destination.id}>
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsList;
