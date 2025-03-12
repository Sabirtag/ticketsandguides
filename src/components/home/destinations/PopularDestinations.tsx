
import React from "react";
import { Button } from "@/components/ui/button";
import DestinationsList from "./DestinationsList";
import { popularDestinations } from "./destinationsData";
import { Link } from "react-router-dom";

interface PopularDestinationsProps {
  userLocation: GeolocationCoordinates | null;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ userLocation }) => {
  return (
    <section id="popular-destinations" className="py-8 md:py-12 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-fitzgerald text-center">
          {userLocation ? "Attractions Near You" : "Popular Attractions"}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 text-center">
          {userLocation 
            ? "Discover heritage sites close to your current location" 
            : "Explore the most visited heritage sites across India"}
        </p>
        
        <DestinationsList 
          destinations={popularDestinations} 
          userLocation={userLocation}
        />
        
        <div className="flex justify-center mt-6 md:mt-8">
          <Button asChild variant="outline" className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 md:px-8 py-2 text-sm md:text-base">
            <Link to="/destinations">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
