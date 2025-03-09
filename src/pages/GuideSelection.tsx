
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface Guide {
  id: string;
  name: string;
  languages: string[];
  specialization: string;
  experience: number;
  rating: number;
  price: number;
  avatar: string;
  available: boolean;
}

const guides: Guide[] = [
  {
    id: "g1",
    name: "Rajesh Kumar",
    languages: ["English", "Hindi", "Sanskrit"],
    specialization: "Historical Monuments",
    experience: 12,
    rating: 4.8,
    price: 1500,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true
  },
  {
    id: "g2",
    name: "Priya Sharma",
    languages: ["English", "Hindi", "French"],
    specialization: "Religious Sites",
    experience: 8,
    rating: 4.7,
    price: 1200,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true
  },
  {
    id: "g3",
    name: "Amit Patel",
    languages: ["English", "Hindi", "Gujarati"],
    specialization: "Architecture",
    experience: 15,
    rating: 4.9,
    price: 1800,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true
  },
  {
    id: "g4",
    name: "Neha Singh",
    languages: ["English", "Hindi", "Bengali"],
    specialization: "Cultural Heritage",
    experience: 10,
    rating: 4.6,
    price: 1350,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true
  },
  {
    id: "g5",
    name: "Vikram Reddy",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    specialization: "Historical Monuments",
    experience: 7,
    rating: 4.5,
    price: 1100,
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: false
  },
  {
    id: "g6",
    name: "Meera Iyer",
    languages: ["English", "Hindi", "Malayalam", "Kannada"],
    specialization: "Religious Sites",
    experience: 9,
    rating: 4.7,
    price: 1400,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true
  }
];

const GuideSelection = () => {
  const navigate = useNavigate();
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
  };

  const handleBookGuide = () => {
    if (!selectedGuideId) {
      toast.error("Please select a guide first");
      return;
    }
    
    // In a real app, you would pass the selected guide ID to the booking page
    toast.success("Guide booked successfully!");
    navigate("/booking-confirmation");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Select a Tour Guide</h1>
        <p className="text-muted-foreground mb-8">
          Choose from our experienced, certified guides to enhance your heritage experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card 
              key={guide.id} 
              className={`cursor-pointer transition-all border-2 ${
                selectedGuideId === guide.id ? "border-primary" : "border-transparent"
              } ${!guide.available ? "opacity-60" : ""}`}
              onClick={() => guide.available && handleSelectGuide(guide.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-muted">
                    <img src={guide.avatar} alt={guide.name} />
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{guide.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.floor(guide.rating) ? "currentColor" : "none"}
                          className={i < Math.floor(guide.rating) ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">{guide.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Specialization</span>
                    <span className="font-medium">{guide.specialization}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="font-medium">{guide.experience} years</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">₹{guide.price}/day</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.languages.map(lang => (
                    <Badge key={lang} variant="outline">{lang}</Badge>
                  ))}
                </div>
                
                {!guide.available && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Not Available
                  </Badge>
                )}
                
                {guide.available && selectedGuideId === guide.id && (
                  <Badge variant="default" className="w-full justify-center bg-primary">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 flex justify-end">
          <Button 
            onClick={handleBookGuide} 
            disabled={!selectedGuideId}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Book Selected Guide
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GuideSelection;
