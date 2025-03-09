
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const PopularDestinations = () => {
  const navigate = useNavigate();
  
  const destinations = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Red Fort",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwZm9ydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-9d856430d157?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGF3YSUyMG1haGFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Qutub Minar",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1566559532215-6671e88ee1f0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cXV0dWIlMjBtaW5hcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const handleDestinationClick = (id: number) => {
    navigate(`/destination/${id}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Popular Destinations Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((destination) => (
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
