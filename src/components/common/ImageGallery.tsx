import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait" | "custom";
}
const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt,
  className,
  aspectRatio = "portrait"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images || images.length === 0) {
    return null;
  }
  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    custom: ""
  }[aspectRatio];
  return <div className={cn("relative overflow-hidden rounded-lg", className, aspectRatioClass)}>
      <div className="flex transition-transform duration-300 ease-out h-full" style={{
      transform: `translateX(-${currentIndex * 100}%)`
    }}>
        {images.map((image, index) => <div key={index} className="w-full h-full flex-shrink-0">
            <img src={image} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
          </div>)}
      </div>
      
      {images.length > 1 && <>
          
          
          
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => <button key={index} className={`h-1.5 rounded-full transition-all ${currentIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} onClick={() => setCurrentIndex(index)} />)}
          </div>
        </>}
    </div>;
};
export default ImageGallery;