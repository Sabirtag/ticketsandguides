
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LesserKnownPlaces = () => {
  const navigate = useNavigate();
  
  // Use a fixed high-quality archaeological site image from Pexels
  const defaultImage = "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800";
  
  const lesserKnownPlaces = [{
    id: 101,
    name: "Champaner-Pavagadh Archaeological Park",
    location: "Gujarat",
    image: defaultImage,
    description: "A UNESCO World Heritage Site with prehistoric chalcolithic sites, a hill fortress, and remains of early Hindu capital."
  }, {
    id: 102,
    name: "Rani Ki Vav",
    location: "Patan, Gujarat",
    image: defaultImage,
    description: "An intricately constructed stepwell built in the 11th century as a memorial to King Bhimdev I."
  }, {
    id: 103,
    name: "Great Living Chola Temples",
    location: "Tamil Nadu",
    image: defaultImage,
    description: "Ancient temples built by the Chola Dynasty between the 10th and 12th centuries."
  }, {
    id: 104,
    name: "Hill Forts of Rajasthan",
    location: "Rajasthan",
    image: defaultImage,
    description: "Less visited but spectacular hill forts built between the 5th and 18th centuries."
  }, {
    id: 105,
    name: "Kailasa Temple, Ellora Caves",
    location: "Maharashtra",
    image: defaultImage,
    description: "The largest monolithic rock excavation in the world, carved from a single rock."
  }, {
    id: 106,
    name: "Buddhist Monuments at Sanchi",
    location: "Madhya Pradesh",
    image: defaultImage,
    description: "One of the oldest stone structures in India dating back to the 3rd century BCE."
  }];

  const handlePlaceClick = (id: number) => {
    navigate(`/booking?site=${id}`);
  };
  
  return <section className="py-8 md:py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">Hidden Gems of India</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Discover these lesser-known archaeological wonders that offer unique insights into India's rich cultural heritage, 
          away from the usual tourist crowds.
        </p>
        
        {/* Mobile horizontal scrollable layout */}
        <div className="md:hidden overflow-x-auto scrollbar-none pb-4">
          <div className="flex gap-3 min-w-max">
            {lesserKnownPlaces.map(place => <Card key={place.id} className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-52 flex-shrink-0" onClick={() => handlePlaceClick(place.id)}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-primary/20 text-primary border-primary/10 text-xs">
                    Hidden Gem
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-bold text-sm mb-1 line-clamp-2">{place.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs">{place.location}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3">{place.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lesserKnownPlaces.map(place => <Card key={place.id} className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]" onClick={() => handlePlaceClick(place.id)}>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  loading="lazy" 
                  className="w-full h-full object-cover" 
                />
                <Badge variant="secondary" className="absolute top-3 right-3 bg-primary/20 text-primary border-primary/10">
                  Hidden Gem
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{place.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{place.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default LesserKnownPlaces;
