
import React from "react";
import { Star } from "lucide-react";
import { Experience } from "./types";
import ImageGallery from "@/components/common/ImageGallery";
import { experienceGalleryImages } from "./experienceImages";

interface ExperienceCardProps {
  experience: Experience;
  onClick: (id: number) => void;
}

const ExperienceCard = ({ experience, onClick }: ExperienceCardProps) => {
  const images = experienceGalleryImages[experience.id] || [experience.image];
  
  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer card-hover aspect-[3/4] touch-manipulation group"
      onClick={() => onClick(experience.id)}
    >
      <ImageGallery 
        images={images} 
        alt={experience.title}
        aspectRatio="portrait"
      />
      
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 bg-white/90 text-black px-2 py-1 rounded-full text-xs font-medium">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span>{experience.rating}</span>
          <span className="text-muted-foreground">({experience.reviews})</span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
        <h3 className="text-lg font-bold text-white mb-1">{experience.title}</h3>
        <p className="text-white/80 text-sm mb-1">{experience.location}</p>
        <p className="text-white/90 text-sm">{experience.duration}</p>
        
        <div className="flex items-center text-white/90 text-sm mt-2 font-medium">
          <span>{experience.price} per person</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
