
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Destination } from "./types";
import ImageGallery from "@/components/common/ImageGallery";
import { destinationGalleryImages } from "./destinationImages";
import { getRandomImage } from "@/utils/pexels";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination
}) => {
  console.log("🎨 Rendering DestinationCard with hover effects");
  
  const [destinationImages, setDestinationImages] = useState<string[]>([destination.image]);

  useEffect(() => {
    const fetchDestinationImages = async () => {
      try {
        const image = await getRandomImage(`${destination.name} ${destination.location} monument heritage`);
        if (image?.src.medium) {
          setDestinationImages([image.src.medium]);
        } else {
          // Fallback to original gallery images
          const images = destinationGalleryImages[destination.id] || [destination.image];
          setDestinationImages(images);
        }
      } catch (error) {
        console.error(`Error fetching image for ${destination.name}:`, error);
        // Fallback to original gallery images
        const images = destinationGalleryImages[destination.id] || [destination.image];
        setDestinationImages(images);
      }
    };

    fetchDestinationImages();
  }, [destination.id, destination.name, destination.location, destination.image]);
  
  return (
    <Link to={`/destination/${destination.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        <div className="relative overflow-hidden aspect-[3/4]">
          <ImageGallery 
            images={destinationImages} 
            alt={destination.name} 
            aspectRatio="portrait" 
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-8 md:pt-12 pb-3 md:pb-4 px-3 md:px-4">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white font-fitzgerald line-clamp-2">{destination.name}</h3>
            
            {destination.distance !== undefined && (
              <p className="text-white/80 text-xs md:text-sm mt-1">
                {destination.distance < 1 
                  ? `${Math.round(destination.distance * 1000)} m away` 
                  : `${destination.distance.toFixed(1)} km away`
                }
              </p>
            )}
            
            <div className="flex items-center text-white/90 text-xs md:text-sm mt-2 md:mt-3">
              <p className="font-medium">
                From ₹{parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0')}
              </p>
              <p className="ml-1">per person</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
