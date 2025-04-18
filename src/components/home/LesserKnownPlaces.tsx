
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Compass, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LesserKnownPlaces = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const lesserKnownPlaces = [
    {
      id: 101,
      name: "Champaner-Pavagadh Archaeological Park",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1582045253062-f9333f16af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "A UNESCO World Heritage Site with prehistoric chalcolithic sites, a hill fortress, and remains of early Hindu capital."
    },
    {
      id: 102,
      name: "Rani Ki Vav",
      location: "Patan, Gujarat",
      image: "https://images.unsplash.com/photo-1627301517544-daabf68f73ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "An intricately constructed stepwell built in the 11th century as a memorial to King Bhimdev I."
    },
    {
      id: 103,
      name: "Great Living Chola Temples",
      location: "Tamil Nadu",
      image: "https://images.unsplash.com/photo-1610036615665-21c9058de0c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "Ancient temples built by the Chola Dynasty between the 10th and 12th centuries."
    },
    {
      id: 104,
      name: "Hill Forts of Rajasthan",
      location: "Rajasthan",
      image: "https://images.unsplash.com/photo-1544124094-8aea0312204a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "Less visited but spectacular hill forts built between the 5th and 18th centuries."
    },
    {
      id: 105,
      name: "Kailasa Temple, Ellora Caves",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1626191010580-36b194290a5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "The largest monolithic rock excavation in the world, carved from a single rock."
    },
    {
      id: 106,
      name: "Buddhist Monuments at Sanchi",
      location: "Madhya Pradesh",
      image: "https://images.unsplash.com/photo-1558350768-7a5acc6cc520?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
      description: "One of the oldest stone structures in India dating back to the 3rd century BCE."
    }
  ];

  const handlePlaceClick = (id: number) => {
    navigate(`/booking?site=${id}`);
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-6 w-6 text-[rgba(100,73,37,255)]" />
          <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">Hidden Gems of India</h2>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Discover these lesser-known archaeological wonders that offer unique insights into India's rich cultural heritage, 
          away from the usual tourist crowds.
        </p>
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hover:bg-white hidden md:flex"
            onClick={() => scrollContainer('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div 
            ref={scrollContainerRef} 
            className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-x-auto md:overflow-hidden flex-nowrap md:flex-wrap whitespace-nowrap md:whitespace-normal scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          >
            {lesserKnownPlaces.map((place) => (
              <Card 
                key={place.id} 
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col inline-block md:inline whitespace-normal"
                onClick={() => handlePlaceClick(place.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-primary/20 text-primary border-primary/10"
                  >
                    Hidden Gem
                  </Badge>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">{place.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hover:bg-white hidden md:flex"
            onClick={() => scrollContainer('right')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LesserKnownPlaces;
