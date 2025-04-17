
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { popularDestinations } from "@/components/home/destinations/destinationsData";
import { destinationGalleryImages, additionalDestinations } from "@/components/home/destinations/destinationImages";
import ImageGallery from "@/components/common/ImageGallery";

const AllDestinations = () => {
  const navigate = useNavigate();
  
  // Combine existing destinations with additional ones
  const allDestinations = [
    ...popularDestinations,
    {
      id: 9,
      name: "Victoria Memorial",
      location: "Kolkata, West Bengal",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      popularity: 4.5,
      price: "₹50 - ₹200"
    },
    {
      id: 10,
      name: "Elephanta Caves",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
      popularity: 4.4,
      price: "₹40 - ₹600"
    },
    {
      id: 11,
      name: "Kumbhalgarh Fort",
      location: "Rajsamand, Rajasthan",
      image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0",
      popularity: 4.6,
      price: "₹100 - ₹200"
    },
    {
      id: 12,
      name: "Thiruvananthapuram Palace",
      location: "Kerala",
      image: "https://images.unsplash.com/photo-1573227896778-05db88d4268d",
      popularity: 4.3,
      price: "₹50 - ₹350"
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-gray-600"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-[rgba(100,73,37,255)]" />
          <h1 className="text-2xl md:text-3xl font-bold font-fitzgerald">
            All Popular Destinations in India
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allDestinations.map((destination) => (
            <Link 
              key={destination.id} 
              to={`/destination/${destination.id}`}
              className="block group"
            >
              <div className="relative rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all h-full">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <ImageGallery 
                    images={destinationGalleryImages[destination.id] || additionalDestinations[destination.id] || [destination.image]}
                    alt={destination.name}
                    aspectRatio="portrait"
                  />
                  
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-4 px-4">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{destination.location}</p>
                    
                    <div className="flex items-center text-white/90 text-sm mt-3">
                      <p className="font-medium">From ₹{parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0')}</p>
                      <p className="ml-1">per person</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllDestinations;
