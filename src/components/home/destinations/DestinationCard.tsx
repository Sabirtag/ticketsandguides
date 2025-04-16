
import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "./types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronRight } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all h-full">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-4 px-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">{destination.name}</h3>
            
            {destination.distance !== undefined && (
              <p className="text-white/80 text-sm mt-1">
                {destination.distance < 1 
                  ? `${Math.round(destination.distance * 1000)} m away` 
                  : `${destination.distance.toFixed(1)} km away`}
              </p>
            )}
            
            <div className="flex items-center text-white/90 text-sm mt-3">
              <p className="font-medium">From ₹{parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0')}</p>
              <p className="ml-1">per person</p>
            </div>
          </div>
          
          {/* Info button for detailed attractions with blue background */}
          {destination.id === 5 && (
            <div className="absolute top-0 left-0 w-full h-full bg-blue-800/90 text-white p-4 flex flex-col">
              <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
              <p className="text-sm">Open from Monday to Friday</p>
              <p className="text-sm mb-4">Closes at 10PM</p>
              
              <div className="mt-auto">
                <p className="text-sm font-medium">Tickets:</p>
                <p className="text-sm">From ₹{parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0')} per person</p>
                
                <div className="flex items-center justify-between mt-3">
                  <button className="text-sm font-medium underline flex items-center">
                    Know More <ChevronRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
