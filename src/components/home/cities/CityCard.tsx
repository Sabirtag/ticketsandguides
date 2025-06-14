import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { CityDisplayProps } from "./types";
import { getRandomImage } from "@/utils/pexels";

/**
 * Displays a city card with image and basic information
 */
const CityCard: React.FC<CityDisplayProps> = ({ city, onCityClick }) => {
  const [cityImage, setCityImage] = useState<string>(city.image);

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const image = await getRandomImage(`${city.name} city India landmarks`);
        if (image?.src.medium) {
          setCityImage(image.src.medium);
        }
      } catch (error) {
        console.error(`Error fetching image for ${city.name}:`, error);
        // Keep the original image as fallback
      }
    };

    fetchCityImage();
  }, [city.name]);

  // Handle city selection
  const handleClick = React.useCallback(() => {
    onCityClick(city.id);
  }, [city.id, onCityClick]);
  
  return (
    <div 
      className="cursor-pointer rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9]">
        <img 
          src={cityImage} 
          alt={`${city.name} city`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-xl">{city.name}</h3>
          <div className="flex items-center text-white/90 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {city.attractions} {city.attractions === 1 ? 'attraction' : 'attractions'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
