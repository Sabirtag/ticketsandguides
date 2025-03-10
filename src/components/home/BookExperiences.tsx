
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  languages: string[];
  guide: {
    name: string;
    image: string;
    experience: string;
    certified: boolean;
  };
  image: string;
}

const BookExperiences = () => {
  const navigate = useNavigate();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  const experiences: Experience[] = [
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
      image: "https://images.unsplash.com/photo-1611572789411-6bd554d9f4a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
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
    },
    {
      id: 205,
      title: "Ajanta & Ellora Caves Tour",
      location: "Maharashtra",
      duration: "Full day",
      price: "₹3,200",
      rating: 4.8,
      reviews: 95,
      languages: ["English", "Hindi", "Marathi"],
      guide: {
        name: "Vikram Patil",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "12 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1609766418204-a45ddba24c87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 206,
      title: "Kerala Backwaters Experience",
      location: "Alleppey",
      duration: "6 hours",
      price: "₹2,800",
      rating: 4.9,
      reviews: 128,
      languages: ["English", "Malayalam", "Hindi"],
      guide: {
        name: "Thomas Kurien",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "9 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1602153508753-4aa3f0ecb4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 207,
      title: "Hampi Ancient Ruins Tour",
      location: "Karnataka",
      duration: "5 hours",
      price: "₹1,900",
      rating: 4.7,
      reviews: 103,
      languages: ["English", "Kannada", "Hindi"],
      guide: {
        name: "Meena Rao",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "8 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1531081476640-03c5ec1bc4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 208,
      title: "Golden Temple Night Walk",
      location: "Amritsar",
      duration: "2 hours",
      price: "₹1,200",
      rating: 4.9,
      reviews: 176,
      languages: ["English", "Punjabi", "Hindi"],
      guide: {
        name: "Gurpreet Singh",
        image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        experience: "11 years",
        certified: true
      },
      image: "https://images.unsplash.com/photo-1608021264394-83Origins%20of%20Sikhism?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const handleExperienceClick = (id: number) => {
    navigate(`/guide-selection?experience=${id}`);
  };

  const visibleExperiences = showAllExperiences 
    ? experiences 
    : experiences.slice(0, 4);

  return (
    <section className="py-12 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-2 font-fitzgerald text-center">
          Book Unique Experiences
        </h2>
        <p className="text-muted-foreground mb-8 text-center">
          Explore India's heritage through authentic experiences led by certified local guides
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleExperiences.map((exp) => (
            <div 
              key={exp.id} 
              className="relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow group h-96"
              onClick={() => handleExperienceClick(exp.id)}
            >
              <img 
                src={exp.image} 
                alt={exp.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
              
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-white/90 text-black px-2 py-1 rounded-full text-sm">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{exp.rating}</span>
                  <span className="text-muted-foreground">({exp.reviews})</span>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-white/80 text-sm">{exp.location}</p>
                
                <div className="flex items-center text-white/90 text-sm mt-2">
                  <span>{exp.price} per person</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {experiences.length > 4 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-8"
              onClick={() => setShowAllExperiences(!showAllExperiences)}
            >
              {showAllExperiences ? "Show Less" : "Explore More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookExperiences;
