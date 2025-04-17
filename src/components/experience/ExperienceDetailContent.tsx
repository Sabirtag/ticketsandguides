
import React, { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Languages, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Experience } from "../home/experiences/types";
import ImageGallery from "@/components/common/ImageGallery";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { experienceGalleryImages } from "../home/experiences/experienceImages";

interface ExperienceDetailContentProps {
  experience: Experience;
}

const ExperienceDetailContent: React.FC<ExperienceDetailContentProps> = ({ experience }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visitors, setVisitors] = useState(2);
  const images = experienceGalleryImages[experience.id] || [experience.image];
  
  // Extract price as a number for calculations
  const basePrice = parseInt(experience.price.replace(/[^\d]/g, '') || '0');
  const totalPrice = basePrice * visitors;
  
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
          <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-fitzgerald">{experience.title}</h1>
            <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-medium">{experience.rating}</span>
              <span className="text-muted-foreground">({experience.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{experience.location}</span>
          </div>
          
          <div className="rounded-xl overflow-hidden mb-6">
            <ImageGallery 
              images={images}
              alt={experience.title}
              aspectRatio="video"
            />
          </div>
          
          <Tabs defaultValue="about" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="includes">What's Included</TabsTrigger>
              <TabsTrigger value="guide">Your Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">About This Experience</h2>
                  <p className="text-muted-foreground">
                    Join us for a unique {experience.title} in {experience.location} and immerse 
                    yourself in the authentic cultural heritage of India. This {experience.duration} 
                    experience is designed to give you an unforgettable taste of local traditions, 
                    stories, and hidden gems that most tourists never discover.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">Highlights</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Small groups (maximum 8 people) for a personalized experience</li>
                    <li>Led by a certified local guide with deep knowledge of the area</li>
                    <li>Explore hidden spots that most visitors never see</li>
                    <li>Learn about the rich history and cultural significance</li>
                    <li>Support local communities and authentic experiences</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">Duration & Language</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-[rgba(100,73,37,255)] mt-0.5" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">{experience.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Languages className="h-5 w-5 text-[rgba(100,73,37,255)] mt-0.5" />
                      <div>
                        <p className="font-medium">Available Languages</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {experience.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="includes" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">What's Included</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Expert guide throughout the experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Food and beverage tastings as specified in the itinerary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>All entry fees to mentioned sites and attractions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Small group size for personalized attention</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">What to Bring</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Comfortable walking shoes</li>
                    <li>Camera</li>
                    <li>Water bottle</li>
                    <li>Sun protection (hat, sunscreen)</li>
                    <li>Small backpack for personal items</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="guide" className="pt-4">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={experience.guide.image} alt={experience.guide.name} />
                    <AvatarFallback>{experience.guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-1">{experience.guide.name}</h2>
                    <p className="text-muted-foreground mb-2">
                      {experience.guide.certified && (
                        <span className="inline-flex items-center mr-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                          Certified Guide
                        </span>
                      )}
                      <span>{experience.guide.experience} of experience</span>
                    </p>
                    <p className="text-sm">
                      Languages: {experience.languages.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">About Your Guide</h3>
                  <p className="text-muted-foreground">
                    {experience.guide.name} is a passionate local guide with {experience.guide.experience} 
                    of experience sharing the cultural heritage of {experience.location}. Having grown up 
                    in the area, they offer authentic insights and stories that you won't find in guidebooks. 
                    They specialize in creating meaningful connections between visitors and local culture.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-2">Book This Experience</h2>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold">{experience.price}</span>
              <span className="text-muted-foreground">per person</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[rgba(100,73,37,255)] mr-3" />
                <div>
                  <p className="font-medium">Select Date</p>
                  <p className="text-sm text-muted-foreground">Choose your preferred date</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-[rgba(100,73,37,255)] mr-3" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{experience.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-[rgba(100,73,37,255)] mr-3" />
                <div className="flex justify-between w-full">
                  <div>
                    <p className="font-medium">Visitors</p>
                    <p className="text-sm text-muted-foreground">Number of people</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setVisitors(Math.max(1, visitors - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{visitors}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setVisitors(visitors + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{experience.price} × {visitors} visitors</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]"
              onClick={() => navigate('/checkout')}
            >
              Reserve Now
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              No payment required now. Reserve your spot and pay before the experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailContent;
