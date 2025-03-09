
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const PopularCities = () => {
  const navigate = useNavigate();
  
  const cities = [
    {
      id: 1,
      name: "Delhi",
      attractions: 48,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Agra",
      attractions: 23,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWdyYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Jaipur",
      attractions: 35,
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Mumbai",
      attractions: 42,
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "Kolkata",
      attractions: 29,
      image: "https://images.unsplash.com/photo-1536421629999-7048f1d6926f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "Chennai",
      attractions: 27,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlbm5haXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      name: "Hyderabad",
      attractions: 31,
      image: "https://images.unsplash.com/photo-1572435555976-724cee616872?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHlkZXJhYmFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      name: "Varanasi",
      attractions: 26,
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFyYW5hc2l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const handleCityClick = (cityId: number) => {
    // In a real app, this would navigate to a city-specific page
    // For now, we'll navigate to a placeholder
    navigate(`/city/${cityId}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Popular Cities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <div 
              key={city.id} 
              className="group relative cursor-pointer rounded-lg overflow-hidden h-48"
              onClick={() => handleCityClick(city.id)}
            >
              <img 
                src={city.image} 
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-bold text-lg">{city.name}</h3>
                <div className="flex items-center text-white/80 mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">{city.attractions} attractions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
