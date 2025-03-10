
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Languages, ThumbsUp } from "lucide-react";

const BookExperiences = () => {
  const navigate = useNavigate();
  
  const experiences = [
    {
      id: 201,
      title: "Mughal Heritage Food Tour",
      location: "Old Delhi",
      duration: "3 hours",
      price: "₹1,500",
      rating: 4.9,
      reviews: 124,
      languages: ["English", "Hindi"],
      guide: {
        name: "Rahul Sharma",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "8 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 202,
      title: "Secret Monuments of Delhi",
      location: "South Delhi",
      duration: "4 hours",
      price: "₹2,000",
      rating: 4.8,
      reviews: 87,
      languages: ["English", "French", "Hindi"],
      guide: {
        name: "Priya Gupta",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "6 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1611572789411-6bd554d9f4a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 203,
      title: "Traditional Crafts Workshop",
      location: "Jaipur",
      duration: "5 hours",
      price: "₹2,500",
      rating: 4.7,
      reviews: 62,
      languages: ["English", "Hindi"],
      guide: {
        name: "Ravi Kumar",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "10 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 204,
      title: "Mystic Varanasi Evening Tour",
      location: "Varanasi",
      duration: "3 hours",
      price: "₹1,800",
      rating: 4.9,
      reviews: 142,
      languages: ["English", "Hindi", "German"],
      guide: {
        name: "Ananya Joshi",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "7 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1659133969099-3cca8d659cd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const handleExperienceClick = (id: number) => {
    navigate(`/guide-selection?experience=${id}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-2">Book Unique Experiences</h2>
        <p className="text-muted-foreground mb-8">
          Explore India's heritage through authentic experiences led by certified local guides
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              className="overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-white/90 text-black">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span>{exp.rating}</span>
                    <span className="text-muted-foreground">({exp.reviews})</span>
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 border border-muted">
                    <AvatarImage src={exp.guide.image} alt={exp.guide.name} />
                    <AvatarFallback>{exp.guide.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{exp.guide.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {exp.guide.experience} experience
                      {exp.guide.certified && (
                        <Badge variant="outline" className="ml-1 text-[10px] h-4 px-1 border-green-500 text-green-600">
                          Certified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{exp.title}</h3>
                
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Languages className="h-3.5 w-3.5 mr-1" />
                    <span>{exp.languages.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex items-center justify-between border-t">
                <div className="font-medium">{exp.price}<span className="text-xs text-muted-foreground">/person</span></div>
                <Button size="sm" onClick={() => handleExperienceClick(exp.id)}>
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookExperiences;
