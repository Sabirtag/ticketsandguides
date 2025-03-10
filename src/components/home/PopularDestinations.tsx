import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  latitude?: number;
  longitude?: number;
  popularity: number;
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
  
  const allDestinations: Destination[] = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 27.1751,
      longitude: 78.0421,
      popularity: 100
    },
    {
      id: 2,
      name: "Red Fort",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwZm9ydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 28.6562,
      longitude: 77.2410,
      popularity: 95
    },
    {
      id: 3,
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-9d856430d157?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF3YSUyMG1haGFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 26.9239,
      longitude: 75.8267,
      popularity: 90
    },
    {
      id: 4,
      name: "Qutub Minar",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1566559532215-6671e88ee1f0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cXV0dWIlMjBtaW5hcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 28.5245,
      longitude: 77.1855,
      popularity: 85
    },
    {
      id: 5,
      name: "Konark Sun Temple",
      location: "Odisha",
      image: "https://images.unsplash.com/photo-1605649461784-ebd4cc5c5234?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29uYXJrJTIwc3VuJTIwdGVtcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 19.8876,
      longitude: 86.0945,
      popularity: 80
    },
    {
      id: 6,
      name: "Ajanta Caves",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1609766418204-a45ddba24c87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWphbnRhJTIwY2F2ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 20.5526,
      longitude: 75.7033,
      popularity: 75
    },
    {
      id: 7,
      name: "Khajuraho Temples",
      location: "Madhya Pradesh",
      image: "https://images.unsplash.com/photo-1518309580767-d63c8b3f6492?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2hhanVyYWhvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 24.8318,
      longitude: 79.9199,
      popularity: 70
    },
    {
      id: 8,
      name: "Hampi",
      location: "Karnataka",
      image: "https://images.unsplash.com/photo-1531081476640-03c5ec1bc4c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 15.3350,
      longitude: 76.4600,
      popularity: 65
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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-2">
          {userLocation ? "Monuments Near You" : "Popular Destinations"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {userLocation 
            ? "Archaeological Survey of India monuments closest to your location" 
            : "Most visited Archaeological Survey of India monuments across the country"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sortedDestinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleDestinationClick(destination.id)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold">{destination.name}</h3>
                <div className="flex items-center text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
