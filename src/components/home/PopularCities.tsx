
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface City {
  id: number;
  name: string;
  attractions: number;
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

interface PopularCitiesProps {
  userLocation?: GeolocationCoordinates | null;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ userLocation }) => {
  const navigate = useNavigate();
  const [sortedCities, setSortedCities] = useState<City[]>([]);
  const [activeTab, setActiveTab] = useState("Mumbai");
  
  const allCities: City[] = [
    {
      id: 1,
      name: "Delhi",
      attractions: 48,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 28.6139,
      longitude: 77.2090,
      popularity: 100
    },
    {
      id: 2,
      name: "Agra",
      attractions: 23,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWdyYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 27.1767,
      longitude: 78.0081,
      popularity: 95
    },
    {
      id: 3,
      name: "Jaipur",
      attractions: 35,
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 26.9124,
      longitude: 75.7873,
      popularity: 90
    },
    {
      id: 4,
      name: "Mumbai",
      attractions: 42,
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 19.0760,
      longitude: 72.8777,
      popularity: 88
    },
    {
      id: 5,
      name: "Kolkata",
      attractions: 29,
      image: "https://images.unsplash.com/photo-1536421629999-7048f1d6926f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 22.5726,
      longitude: 88.3639,
      popularity: 85
    },
    {
      id: 6,
      name: "Chennai",
      attractions: 27,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlbm5haXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 13.0827,
      longitude: 80.2707,
      popularity: 82
    },
    {
      id: 7,
      name: "Hyderabad",
      attractions: 31,
      image: "https://images.unsplash.com/photo-1572435555976-724cee616872?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHlkZXJhYmFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 17.3850,
      longitude: 78.4867,
      popularity: 80
    },
    {
      id: 8,
      name: "Varanasi",
      attractions: 26,
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFyYW5hc2l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      latitude: 25.3176,
      longitude: 82.9739,
      popularity: 78
    }
  ];

  useEffect(() => {
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      const citiesWithDistance = allCities.map(city => ({
        ...city,
        distance: city.latitude && city.longitude ? 
          calculateDistance(
            userLocation.latitude, 
            userLocation.longitude, 
            city.latitude, 
            city.longitude
          ) : Infinity
      }));
      
      const sorted = citiesWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      setSortedCities(sorted);
    } else {
      const sorted = [...allCities].sort((a, b) => b.popularity - a.popularity);
      setSortedCities(sorted);
    }
  }, [userLocation]);

  const handleCityClick = (cityId: number) => {
    navigate(`/city/${cityId}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 font-fitzgerald">
          Popular Cities in India
        </h2>
        
        <Tabs defaultValue="Mumbai" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto space-x-2 bg-transparent h-auto pb-2 mb-6 border-b">
            {sortedCities.slice(0, 6).map((city) => (
              <TabsTrigger 
                key={city.id} 
                value={city.name}
                className={`px-4 py-2 rounded-full data-[state=active]:bg-[rgba(100,73,37,255)] data-[state=active]:text-white`}
                onClick={() => setActiveTab(city.name)}
              >
                {city.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedCities.map((city) => (
              city.name === activeTab && (
                <div 
                  key={city.id} 
                  className="cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                  onClick={() => handleCityClick(city.id)}
                >
                  <div className="relative aspect-[16/9]">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-xl">{city.name}</h3>
                      <div className="flex items-center text-white/90 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{city.attractions} attractions</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default PopularCities;
