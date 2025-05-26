
import React, { useMemo } from "react";
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
      {/* Mobile horizontal scrollable layout */}
      <div className="md:hidden overflow-x-auto scrollbar-none pb-4">
        <div className="flex gap-3 min-w-max">
          {visibleDestinations.map(destination => (
            <div key={destination.id} className="w-44 flex-shrink-0">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 md:gap-6">
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
