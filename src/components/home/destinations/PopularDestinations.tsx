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
  return <section className="py-8 md:py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-[rgba(100,73,37,255)]" />
          <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">
            {userLocation ? "Popular Destinations Near You" : "Popular Destinations in India"}
          </h2>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center text-white bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] ml-auto" asChild>
            <Link to="/destinations" className="bg-[#006d5b]">View All <ChevronRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
        
        <DestinationsList destinations={popularDestinations} userLocation={userLocation} />
        
        <div className="flex justify-center mt-5 md:hidden">
          <Button asChild variant="outline" className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 py-2 text-sm">
            <Link to="/destinations">View All</Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default PopularDestinations;