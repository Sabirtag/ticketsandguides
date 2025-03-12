
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import DestinationsList from "./DestinationsList";
import { popularDestinations } from "./destinationsData";
import { Link } from "react-router-dom";

interface PopularDestinationsProps {
  userLocation: GeolocationCoordinates | null;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ userLocation }) => {
  return (
    <section id="popular-destinations" className="py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold font-fitzgerald">
            {userLocation ? "Popular Destination Near You" : "Popular Destination in India"}
          </h2>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center text-[rgba(100,73,37,255)]">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <DestinationsList 
          destinations={popularDestinations} 
          userLocation={userLocation}
        />
        
        <div className="flex justify-center mt-6 md:hidden">
          <Button asChild variant="outline" className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 py-2 text-sm">
            <Link to="/destinations">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
