
import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="block group">
      <Card className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium">{destination.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{destination.location}</span>
              </div>
              {destination.distance !== undefined && (
                <p className="text-sm text-muted-foreground mt-1">
                  {destination.distance < 1 
                    ? `${Math.round(destination.distance * 1000)} m away` 
                    : `${destination.distance.toFixed(1)} km away`}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{destination.popularity}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {destination.price}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DestinationCard;
