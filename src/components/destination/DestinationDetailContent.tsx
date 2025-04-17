
import React from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Destination } from "../home/destinations/types";
import ImageGallery from "@/components/common/ImageGallery";
import { destinationGalleryImages } from "../home/destinations/destinationImages";

interface DestinationDetailContentProps {
  destination: Destination;
}

const DestinationDetailContent: React.FC<DestinationDetailContentProps> = ({ destination }) => {
  const navigate = useNavigate();
  const images = destinationGalleryImages[destination.id] || [destination.image];
  
  // Extract price as a number for calculations
  const basePrice = parseInt(destination.price?.split(' ')[0].replace(/[^\d]/g, '') || '0');
  
  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-fitzgerald">{destination.name}</h1>
          
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{destination.location}</span>
          </div>
          
          <div className="rounded-xl overflow-hidden mb-6">
            <ImageGallery 
              images={images} 
              alt={destination.name}
              aspectRatio="video"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">About {destination.name}</h2>
              <p className="text-muted-foreground">
                {destination.name} is a magnificent heritage site located in {destination.location}. 
                It stands as a testament to India's rich cultural history and architectural prowess.
                Visitors can explore the intricate details of this architectural marvel while learning
                about its historical significance.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">Highlights</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Guided tours available in multiple languages</li>
                <li>UNESCO World Heritage Site</li>
                <li>Architectural marvel showcasing {destination.location.split(',')[1]?.trim()} style</li>
                <li>Photography allowed (extra fee may apply for professional equipment)</li>
                <li>Souvenir shops and local crafts available</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">Opening Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[rgba(100,73,37,255)] mt-0.5" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-muted-foreground">9:00 AM - 5:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[rgba(100,73,37,255)] mt-0.5" />
                  <div>
                    <p className="font-medium">Weekends & Holidays</p>
                    <p className="text-muted-foreground">8:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Book Your Visit</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Standard Entry</span>
                <span className="font-medium">₹{basePrice} per person</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">With Audio Guide</span>
                <span className="font-medium">₹{basePrice + 200} per person</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">With Personal Guide</span>
                <span className="font-medium">₹{basePrice + 500} per person</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[rgba(100,73,37,255)] mr-3" />
                <div>
                  <p className="font-medium">Select Date</p>
                  <p className="text-sm text-muted-foreground">Choose your preferred visit date</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-[rgba(100,73,37,255)] mr-3" />
                <div>
                  <p className="font-medium">Number of Visitors</p>
                  <p className="text-sm text-muted-foreground">How many people are coming?</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]"
            >
              Proceed to Checkout
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              No payment required now. Reserve your spot and pay at the venue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailContent;
