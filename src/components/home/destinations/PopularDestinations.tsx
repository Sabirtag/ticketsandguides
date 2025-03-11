
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DestinationsList from "./DestinationsList";
import { Destination } from "./types";
import { calculateDistance } from "./utils";
import { allDestinations } from "./destinationsData";

interface PopularDestinationsProps {
  userLocation?: GeolocationCoordinates | null;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ userLocation }) => {
  const navigate = useNavigate();
  const [sortedDestinations, setSortedDestinations] = useState<Destination[]>([]);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  
  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      const destinationsWithDistance = allDestinations.map(dest => ({
        ...dest,
        distance: dest.latitude && dest.longitude ? 
          calculateDistance(
            userLocation.latitude, 
            userLocation.longitude, 
            dest.latitude, 
            dest.longitude
          ) : Infinity
      }));
      
      const sorted = destinationsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      setSortedDestinations(sorted);
    } else {
      const sorted = [...allDestinations].sort((a, b) => b.popularity - a.popularity);
      setSortedDestinations(sorted);
    }
  }, [userLocation]);

  const handleDestinationClick = (id: number) => {
    navigate(`/booking?site=${id}`);
  };

  const visibleDestinations = showAllDestinations 
    ? sortedDestinations 
    : sortedDestinations.slice(0, 4);

  return (
    <section className="py-8 md:py-12 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-fitzgerald text-center">
          {userLocation ? "Popular Destination Near You" : "Popular Destinations"}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 text-center">
          {userLocation 
            ? "Archaeological Survey of India monuments closest to your location" 
            : "Most visited Archaeological Survey of India monuments across the country"}
        </p>
        
        <DestinationsList 
          destinations={visibleDestinations} 
          onDestinationClick={handleDestinationClick} 
        />
        
        {sortedDestinations.length > 4 && (
          <div className="flex justify-center mt-6 md:mt-8">
            <Button 
              variant="outline" 
              className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 md:px-8 py-2 text-sm md:text-base"
              onClick={() => setShowAllDestinations(!showAllDestinations)}
            >
              {showAllDestinations ? "Show Less" : "Explore More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;
