
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinationsWithDistance.map(destination => (
        <DestinationCard 
          key={destination.id}
          destination={destination} 
        />
      ))}
    </div>
  );
};

export default DestinationsList;
