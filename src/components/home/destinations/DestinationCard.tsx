
import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "./types";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow aspect-[3/4] touch-manipulation group">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 text-black px-2 py-1 rounded-full text-xs md:text-sm">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{destination.popularity}</span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{destination.name}</h3>
          <p className="text-white/80 text-sm mb-1">{destination.location}</p>
          
          {destination.distance !== undefined && (
            <p className="text-white/80 text-sm">
              {destination.distance < 1 
                ? `${Math.round(destination.distance * 1000)} m away` 
                : `${destination.distance.toFixed(1)} km away`}
            </p>
          )}
          
          <div className="flex items-center text-white/90 text-sm mt-2">
            <span>{destination.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
