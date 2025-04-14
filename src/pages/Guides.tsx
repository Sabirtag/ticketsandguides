
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ChevronDown, Filter, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Guide {
  id: string;
  name: string;
  languages: string[];
  specialization: string;
  experience: number;
  rating: number;
  halfDayPrice: number;
  fullDayPrice: number;
  avatar: string;
  available: boolean;
  location: string;
}

const guides: Guide[] = [
  {
    id: "g1",
    name: "Rajesh Kumar",
    languages: ["English", "Hindi", "Sanskrit"],
    specialization: "Historical Monuments",
    experience: 12,
    rating: 4.8,
    halfDayPrice: 1500,
    fullDayPrice: 2800,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true,
    location: "Delhi"
  },
  {
    id: "g2",
    name: "Priya Sharma",
    languages: ["English", "Hindi", "French"],
    specialization: "Religious Sites",
    experience: 8,
    rating: 4.7,
    halfDayPrice: 1200,
    fullDayPrice: 2200,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true,
    location: "Jaipur"
  },
  {
    id: "g3",
    name: "Amit Patel",
    languages: ["English", "Hindi", "Gujarati"],
    specialization: "Architecture",
    experience: 15,
    rating: 4.9,
    halfDayPrice: 1800,
    fullDayPrice: 3400,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true,
    location: "Agra"
  },
  {
    id: "g4",
    name: "Neha Singh",
    languages: ["English", "Hindi", "Bengali"],
    specialization: "Cultural Heritage",
    experience: 10,
    rating: 4.6,
    halfDayPrice: 1350,
    fullDayPrice: 2500,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true,
    location: "Kolkata"
  },
  {
    id: "g5",
    name: "Vikram Reddy",
    languages: ["English", "Hindi", "Telugu", "Tamil"],
    specialization: "Historical Monuments",
    experience: 7,
    rating: 4.5,
    halfDayPrice: 1100,
    fullDayPrice: 2000,
    avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: false,
    location: "Chennai"
  },
  {
    id: "g6",
    name: "Meera Iyer",
    languages: ["English", "Hindi", "Malayalam", "Kannada"],
    specialization: "Religious Sites",
    experience: 9,
    rating: 4.7,
    halfDayPrice: 1400,
    fullDayPrice: 2600,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    available: true,
    location: "Bangalore"
  }
];

const Guides = () => {
  const navigate = useNavigate();
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 5000]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [tourDuration, setTourDuration] = useState<"halfDay" | "fullDay">("halfDay");
  
  const [detailedGuide, setDetailedGuide] = useState<Guide | null>(null);
  const [showGuideDetail, setShowGuideDetail] = useState(false);
  
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'declined' | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(120);

  // Get unique languages and specializations for filters
  const allLanguages = Array.from(new Set(guides.flatMap(guide => guide.languages)));
  const allSpecializations = Array.from(new Set(guides.map(guide => guide.specialization)));

  const filteredGuides = guides.filter(guide => {
    const priceToCheck = tourDuration === "halfDay" ? guide.halfDayPrice : guide.fullDayPrice;
    const meetsPrice = priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];
    const meetsLanguage = selectedLanguages.length === 0 || 
      selectedLanguages.some(lang => guide.languages.includes(lang));
    const meetsSpecialization = selectedSpecializations.length === 0 || 
      selectedSpecializations.includes(guide.specialization);
    const meetsRating = guide.rating >= minRating;

    return meetsPrice && meetsLanguage && meetsSpecialization && meetsRating;
  });

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
  };

  const handleViewGuideDetails = (guide: Guide) => {
    setDetailedGuide(guide);
    setShowGuideDetail(true);
  };

  const handleBookGuide = () => {
    if (!selectedGuideId) {
      toast.error("Please select a guide first");
      return;
    }
    
    const selectedGuide = guides.find(g => g.id === selectedGuideId);
    if (selectedGuide) {
      setDetailedGuide(selectedGuide);
      setShowRequestDialog(true);
      simulateGuideResponse();
    }
  };

  const simulateGuideResponse = () => {
    setRequestStatus('pending');
    
    // Start a countdown timer
    let countdown = 120;
    const timer = setInterval(() => {
      countdown -= 1;
      setTimeRemaining(countdown);
      
      if (countdown <= 0) {
        clearInterval(timer);
        if (requestStatus === 'pending') {
          setRequestStatus(null);
          toast.error("No response from guide. Please try another guide.");
          setShowRequestDialog(false);
        }
      }
      
      // Simulate guide accepting after 10 seconds
      if (countdown === 110) {
        setRequestStatus('accepted');
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleConfirmBooking = () => {
    toast.success(`Guide ${detailedGuide?.name} has been booked for your trip!`);
    setShowRequestDialog(false);
    setRequestStatus(null);
    navigate("/checkout");
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language) 
        : [...prev, language]
    );
  };

  const toggleSpecialization = (specialization: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization) 
        ? prev.filter(s => s !== specialization) 
        : [...prev, specialization]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Select a Tour Guide</h1>
        <p className="text-muted-foreground mb-8">
          Choose from our experienced, certified guides to enhance your heritage experience.
        </p>
        
        {/* Filters Section */}
        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-[rgba(100,73,37,255)]" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tour Duration */}
            <div>
              <Label className="mb-2 block">Tour Duration</Label>
              <Select value={tourDuration} onValueChange={(val: "halfDay" | "fullDay") => setTourDuration(val)}>
                <SelectTrigger className="text-foreground">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="halfDay">Half Day (4 Hours)</SelectItem>
                  <SelectItem value="fullDay">Full Day (8 Hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range */}
            <div>
              <div className="flex justify-between mb-2">
                <Label>Price Range (₹)</Label>
                <span className="text-sm">₹{priceRange[0]} - ₹{priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={priceRange}
                min={500}
                max={5000}
                step={100}
                onValueChange={(values) => setPriceRange([values[0], values[1]])}
              />
            </div>
            
            {/* Minimum Rating */}
            <div>
              <Label className="mb-2 block">Minimum Rating</Label>
              <Select
                value={minRating.toString()}
                onValueChange={(val) => setMinRating(Number(val))}
              >
                <SelectTrigger className="text-foreground">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any rating</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Languages */}
            <div>
              <Label className="mb-2 block">Languages</Label>
              <div className="flex flex-wrap gap-2">
                {allLanguages.map(language => (
                  <Badge
                    key={language}
                    variant={selectedLanguages.includes(language) ? "default" : "outline"}
                    className={`cursor-pointer py-1 px-3 ${
                      selectedLanguages.includes(language)
                        ? "bg-[rgba(100,73,37,255)] text-white"
                        : "bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.2)]"
                    }`}
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Specializations */}
            <div>
              <Label className="mb-2 block">Specializations</Label>
              <div className="flex flex-wrap gap-2">
                {allSpecializations.map(specialization => (
                  <Badge
                    key={specialization}
                    variant={selectedSpecializations.includes(specialization) ? "default" : "outline"}
                    className={`cursor-pointer py-1 px-3 ${
                      selectedSpecializations.includes(specialization)
                        ? "bg-[rgba(100,73,37,255)] text-white"
                        : "bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.2)]"
                    }`}
                    onClick={() => toggleSpecialization(specialization)}
                  >
                    {specialization}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card 
              key={guide.id} 
              className={`cursor-pointer transition-all border-2 ${
                selectedGuideId === guide.id ? "border-[rgba(100,73,37,255)]" : "border-transparent"
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
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {guide.location}
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
                    <span className="text-sm text-muted-foreground">
                      {tourDuration === "halfDay" ? "Half Day Rate" : "Full Day Rate"}
                    </span>
                    <span className="font-medium">₹{tourDuration === "halfDay" ? guide.halfDayPrice : guide.fullDayPrice}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,255)]">{lang}</Badge>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    className="text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewGuideDetails(guide);
                    }}
                  >
                    View Details
                  </Button>
                  
                  {!guide.available && (
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                      Not Available
                    </Badge>
                  )}
                  
                  {guide.available && selectedGuideId === guide.id && (
                    <Badge variant="default" className="bg-[rgba(100,73,37,255)]">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-bold mb-2">No guides match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more guides</p>
          </div>
        )}
        
        <div className="mt-10 flex justify-end">
          <Button 
            onClick={handleBookGuide} 
            disabled={!selectedGuideId}
            className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
          >
            Book Selected Guide
          </Button>
        </div>
      </div>
      
      {/* Guide Detail Dialog */}
      <Dialog open={showGuideDetail} onOpenChange={setShowGuideDetail}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Guide Profile</DialogTitle>
          </DialogHeader>
          
          {detailedGuide && (
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Avatar className="h-20 w-20 border-2 border-muted">
                  <img src={detailedGuide.avatar} alt={detailedGuide.name} />
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{detailedGuide.name}</h2>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(detailedGuide.rating) ? "currentColor" : "none"}
                        className={i < Math.floor(detailedGuide.rating) ? "text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">{detailedGuide.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {detailedGuide.location}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Specialization</p>
                  <p className="font-medium">{detailedGuide.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{detailedGuide.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Half Day Rate</p>
                  <p className="font-medium">₹{detailedGuide.halfDayPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Day Rate</p>
                  <p className="font-medium">₹{detailedGuide.fullDayPrice}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {detailedGuide.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,255)]">{lang}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Guide Introduction</p>
                <p>
                  Hello! I'm {detailedGuide.name}, a passionate guide with {detailedGuide.experience} years 
                  of experience specializing in {detailedGuide.specialization}. I love sharing the rich 
                  cultural heritage and historical significance of these magnificent sites. I can communicate 
                  fluently in {detailedGuide.languages.join(", ")} and can customize the tour based on your 
                  interests. Looking forward to making your visit memorable!
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowGuideDetail(false)}
                >
                  Close
                </Button>
                <Button 
                  className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
                  onClick={() => {
                    setShowGuideDetail(false);
                    setSelectedGuideId(detailedGuide.id);
                    setShowRequestDialog(true);
                    simulateGuideResponse();
                  }}
                >
                  Book This Guide
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Guide Request Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Guide Request</DialogTitle>
            <DialogDescription>
              {requestStatus === 'pending' 
                ? "Waiting for guide to confirm your booking request" 
                : requestStatus === 'accepted'
                ? "Guide has accepted your booking request"
                : ""}
            </DialogDescription>
          </DialogHeader>
          
          {detailedGuide && requestStatus === 'pending' && (
            <div className="py-4">
              <div className="flex flex-col items-center justify-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(100,73,37,0.1)] flex items-center justify-center mb-2">
                  <img src={detailedGuide.avatar} alt={detailedGuide.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-lg font-semibold">{detailedGuide.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-1">⭐ {detailedGuide.rating}</span>
                  <span>• {detailedGuide.experience} years experience</span>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-4 mb-4">
                <p className="text-center mb-2">Guide has been notified of your request</p>
                <div className="flex justify-center items-center gap-2">
                  <div className="animate-pulse w-2 h-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm">Waiting for confirmation ({timeRemaining}s)</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mb-4">
                The guide will confirm your booking shortly. You can wait or cancel and try again.
              </p>
              
              <Button variant="outline" onClick={() => setShowRequestDialog(false)} className="w-full">
                Cancel Request
              </Button>
            </div>
          )}
          
          {detailedGuide && requestStatus === 'accepted' && (
            <div className="py-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-center text-green-700 font-medium">Guide has accepted your request!</p>
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(100,73,37,0.1)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={detailedGuide.avatar} alt={detailedGuide.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{detailedGuide.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <span className="mr-1">⭐ {detailedGuide.rating}</span>
                    <span>• {detailedGuide.experience} years experience</span>
                  </div>
                  <p className="text-sm mb-2">
                    Languages: {detailedGuide.languages.join(", ")}
                  </p>
                  <div className="text-sm font-medium">
                    {tourDuration === "halfDay" ? "Half Day Rate" : "Full Day Rate"}: 
                    ₹{tourDuration === "halfDay" ? detailedGuide.halfDayPrice : detailedGuide.fullDayPrice}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowRequestDialog(false)}
                >
                  Decline
                </Button>
                <Button 
                  onClick={handleConfirmBooking}
                  className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] text-white"
                >
                  Confirm Booking
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Guides;
