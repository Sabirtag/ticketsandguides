
import React from "react";
import DestinationCard from "./DestinationCard";
import { Destination } from "./types";

interface DestinationsListProps {
  destinations: Destination[];
  onDestinationClick: (id: number) => void;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ 
  destinations, 
  onDestinationClick 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {destinations.map((destination) => (
        <DestinationCard 
          key={destination.id} 
          destination={destination} 
          onClick={onDestinationClick} 
        />
      ))}
    </div>
  );
};

export default DestinationsList;
