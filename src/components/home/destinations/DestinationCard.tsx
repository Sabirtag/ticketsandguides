
import React from "react";
import { Destination } from "./types";

interface DestinationCardProps {
  destination: Destination;
  onClick: (id: number) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow aspect-[3/4] touch-manipulation"
      onClick={() => onClick(destination.id)}
    >
      <img 
        src={destination.image} 
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">{destination.name}</h3>
        <p className="text-white/80 text-sm mb-2">{destination.location}</p>
        
        {destination.price && (
          <div className="flex items-center text-white/90 text-sm">
            <span>From {destination.price} per person</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
