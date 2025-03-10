
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  latitude?: number;
  longitude?: number;
  popularity: number;
  price?: string;
}

const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

interface PopularDestinationsProps {
  userLocation?: GeolocationCoordinates | null;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ userLocation }) => {
  const navigate = useNavigate();
  const [sortedDestinations, setSortedDestinations] = useState<Destination[]>([]);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  
  const allDestinations: Destination[] = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 27.1751,
      longitude: 78.0421,
      popularity: 100,
      price: "₹150"
    },
    {
      id: 2,
      name: "Red Fort",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwZm9ydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 28.6562,
      longitude: 77.2410,
      popularity: 95,
      price: "₹150"
    },
    {
      id: 3,
      name: "Qutub Minar",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1566559532215-6671e88ee1f0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cXV0dWIlMjBtaW5hcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 28.5245,
      longitude: 77.1855,
      popularity: 85,
      price: "₹150"
    },
    {
      id: 4,
      name: "India Gate",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      latitude: 28.6129,
      longitude: 77.2295,
      popularity: 88,
      price: "₹150"
    },
    {
      id: 5,
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-9d856430d157?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF3YSUyMG1haGFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 26.9239,
      longitude: 75.8267,
      popularity: 90,
      price: "₹150"
    },
    {
      id: 6,
      name: "Konark Sun Temple",
      location: "Odisha",
      image: "https://images.unsplash.com/photo-1605649461784-ebd4cc5c5234?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29uYXJrJTIwc3VuJTIwdGVtcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 19.8876,
      longitude: 86.0945,
      popularity: 80,
      price: "₹150"
    },
    {
      id: 7,
      name: "Ajanta Caves",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1609766418204-a45ddba24c87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWphbnRhJTIwY2F2ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 20.5526,
      longitude: 75.7033,
      popularity: 75,
      price: "₹150"
    },
    {
      id: 8,
      name: "Hampi",
      location: "Karnataka",
      image: "https://images.unsplash.com/photo-1531081476640-03c5ec1bc4c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 15.3350,
      longitude: 76.4600,
      popularity: 65,
      price: "₹150"
    }
  ];

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
    <section className="py-12 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-2 font-fitzgerald text-center">
          {userLocation ? "Popular Destination Near You" : "Popular Destinations"}
        </h2>
        <p className="text-muted-foreground mb-8 text-center">
          {userLocation 
            ? "Archaeological Survey of India monuments closest to your location" 
            : "Most visited Archaeological Survey of India monuments across the country"}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDestinations.map((destination) => (
            <div 
              key={destination.id} 
              className="relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow group h-96"
              onClick={() => handleDestinationClick(destination.id)}
            >
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                
                {destination.price && (
                  <div className="flex items-center text-white/90 text-sm mt-1">
                    <span>From {destination.price} per person</span>
                  </div>
                )}
              </div>
              
              {destination.id === 3 && (
                <div className="absolute top-4 left-4 right-4 flex flex-col text-white">
                  <span className="text-2xl font-bold">Qutub Minar</span>
                  <span className="text-sm">Open from Monday to Friday</span>
                  <span className="text-sm">Closes at 10PM</span>
                  
                  <div className="mt-4">
                    <span className="text-sm">Tickets:</span>
                    <div className="flex items-center gap-2">
                      <span>From ₹150 per person</span>
                      <Button variant="ghost" size="sm" className="text-white p-0 h-auto hover:bg-transparent">
                        <span className="underline text-sm">Know More</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {sortedDestinations.length > 4 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-8"
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
