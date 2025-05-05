import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "./types";
import ImageGallery from "@/components/common/ImageGallery";
import { destinationGalleryImages } from "./destinationImages";
interface DestinationCardProps {
  destination: Destination;
}
const DestinationCard: React.FC<DestinationCardProps> = ({
  destination
}) => {
  const images = destinationGalleryImages[destination.id] || [destination.image];
  return <Link to={`/destination/${destination.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all h-full">
        <div className="relative overflow-hidden aspect-[3/4]">
          <ImageGallery images={images} alt={destination.name} aspectRatio="portrait" />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-4 px-4 bg-transparent">
            <h3 className="text-xl md:text-2xl font-bold text-white">{destination.name}</h3>
            
            {destination.distance !== undefined && <p className="text-white/80 text-sm mt-1">
                {destination.distance < 1 ? `${Math.round(destination.distance * 1000)} m away` : `${destination.distance.toFixed(1)} km away`}
              </p>}
            
            <div className="flex items-center text-white/90 text-sm mt-3">
              <p className="font-medium">From ₹{parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0')}</p>
              <p className="ml-1">per person</p>
            </div>
          </div>
        </div>
      </div>
    </Link>;
};
export default DestinationCard;