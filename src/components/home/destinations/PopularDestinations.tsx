
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
    <section id="popular-destinations" className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-fitzgerald font-bold mb-2">
              {userLocation ? "Attractions Near You" : "Popular Attractions"}
            </h2>
            <p className="text-muted-foreground">
              {userLocation 
                ? "Discover heritage sites close to your current location" 
                : "Explore the most visited heritage sites across India"}
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/destinations">View All</Link>
          </Button>
        </div>
        
        <DestinationsList 
          destinations={popularDestinations} 
          userLocation={userLocation}
        />
      </div>
    </section>
  );
};

export default PopularDestinations;
