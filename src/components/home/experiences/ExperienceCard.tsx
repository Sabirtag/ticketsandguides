
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Experience } from "./types";
import ImageGallery from "@/components/common/ImageGallery";
import { experienceGalleryImages } from "./experienceImages";
import { getRandomImage } from "@/utils/pexels";

interface ExperienceCardProps {
  experience: Experience;
  onClick: (id: number) => void;
}

const ExperienceCard = ({ experience, onClick }: ExperienceCardProps) => {
  const [experienceImages, setExperienceImages] = useState<string[]>([experience.image]);

  useEffect(() => {
    const fetchExperienceImages = async () => {
      try {
        const image = await getRandomImage(`${experience.title} ${experience.location} tourism activity`);
        if (image?.src.medium) {
          setExperienceImages([image.src.medium]);
        } else {
          // Fallback to original gallery images
          const images = experienceGalleryImages[experience.id] || [experience.image];
          setExperienceImages(images);
        }
      } catch (error) {
        console.error(`Error fetching image for ${experience.title}:`, error);
        // Fallback to original gallery images
        const images = experienceGalleryImages[experience.id] || [experience.image];
        setExperienceImages(images);
      }
    };

    fetchExperienceImages();
  }, [experience.id, experience.title, experience.location, experience.image]);
  
  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer card-hover aspect-[3/4] touch-manipulation group"
      onClick={() => onClick(experience.id)}
    >
      <ImageGallery 
        images={experienceImages} 
        alt={experience.title}
        aspectRatio="portrait"
      />
      
      <div className="absolute top-2 md:top-3 right-2 md:right-3">
        <div className="flex items-center gap-1 bg-white/90 text-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium">
          <Star className="h-2.5 md:h-3 w-2.5 md:w-3 fill-amber-500 text-amber-500" />
          <span>{experience.rating}</span>
          <span className="text-muted-foreground">({experience.reviews})</span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2 md:p-3 lg:p-4">
        <h3 className="text-sm md:text-lg font-bold text-white mb-1 line-clamp-2">{experience.title}</h3>
        <p className="text-white/80 text-xs md:text-sm mb-1">{experience.location}</p>
        <p className="text-white/90 text-xs md:text-sm">{experience.duration}</p>
        
        <div className="flex items-center text-white/90 text-xs md:text-sm mt-1 md:mt-2 font-medium">
          <span>{experience.price} per person</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
