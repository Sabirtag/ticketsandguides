
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight } from "lucide-react";
import DestinationsList from "./DestinationsList";
import { popularDestinations } from "./destinationsData";
import { Link } from "react-router-dom";

interface PopularDestinationsProps {
  userLocation: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  userLocation
}) => {
  console.log("🎨 Rendering PopularDestinations with theme colors");
  
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">
            {userLocation ? "Popular Destinations Near You" : "Popular Destinations in India"}
          </h2>
          <Button 
            variant="cta" 
            size="sm" 
            className="hidden md:flex items-center ml-auto" 
            asChild
          >
            <Link to="/destinations">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <DestinationsList destinations={popularDestinations} userLocation={userLocation} />
        
        <div className="flex justify-center mt-5 md:hidden">
          <Button 
            variant="cta" 
            className="px-6 py-2 text-sm"
            asChild
          >
            <Link to="/destinations">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
