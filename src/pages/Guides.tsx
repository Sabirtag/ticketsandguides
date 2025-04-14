
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, MapPin, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface GuideProfile {
  id: string;
  name: string;
  languages: string[];
  halfDayRate: number;
  fullDayRate: number;
  specialties: string[];
  rating: number;
  responseTime: string;
  experience: string;
  about: string;
  image: string;
  location: string;
}

const Guides = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<GuideProfile[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<GuideProfile | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Create mock guide data
  useEffect(() => {
    const mockGuides: GuideProfile[] = [
      {
        id: "g123",
        name: "Rahul Sharma",
        languages: ["English", "Hindi"],
        halfDayRate: 1200,
        fullDayRate: 2200,
        specialties: ["Red Fort", "Qutub Minar"],
        rating: 4.8,
        responseTime: "5 min",
        experience: "5 years",
        about: "History enthusiast with deep knowledge of Delhi monuments. I specialize in Mughal architecture and can provide insights about the historical significance of monuments.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        location: "Delhi"
      },
      {
        id: "g124",
        name: "Priya Singh",
        languages: ["English", "Hindi", "French"],
        halfDayRate: 1500,
        fullDayRate: 2800,
        specialties: ["Taj Mahal", "Agra Fort"],
        rating: 4.9,
        responseTime: "3 min",
        experience: "7 years",
        about: "Passionate about Indian history and architecture. I've been guiding tourists at the Taj Mahal for 7 years and know all the fascinating stories and hidden details.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        location: "Agra"
      },
      {
        id: "g125",
        name: "Arjun Patel",
        languages: ["English", "Gujarati", "Hindi"],
        halfDayRate: 1000,
        fullDayRate: 1800,
        specialties: ["Rani ki Vav", "Sun Temple"],
        rating: 4.7,
        responseTime: "10 min",
        experience: "4 years",
        about: "Born and raised in Gujarat, I have an intimate knowledge of the cultural heritage of the region. I can show you the architectural marvels and explain their historical context.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        location: "Gujarat"
      },
      {
        id: "g126",
        name: "Maya Reddy",
        languages: ["English", "Telugu", "Tamil"],
        halfDayRate: 1100,
        fullDayRate: 2000,
        specialties: ["Hampi", "Mysore Palace"],
        rating: 4.6,
        responseTime: "8 min",
        experience: "3 years",
        about: "Specialist in South Indian heritage sites. I've studied archaeology and can provide academic insights into the ancient ruins and living traditions of Karnataka.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        location: "Karnataka"
      },
      {
        id: "g127",
        name: "Vikram Naidu",
        languages: ["English", "Malayalam", "Tamil"],
        halfDayRate: 1300,
        fullDayRate: 2400,
        specialties: ["Fort Kochi", "Mattancherry Palace"],
        rating: 4.9,
        responseTime: "4 min",
        experience: "6 years",
        about: "Expert in the multicultural heritage of Kerala. I can show you the influences of Portuguese, Dutch, British, and local cultures in the architecture and lifestyle of Kochi.",
        image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop",
        location: "Kerala"
      }
    ];
    
    setGuides(mockGuides);
    setFilteredGuides(mockGuides);
  }, []);

  // Filter guides based on search term and filters
  useEffect(() => {
    let filtered = guides.filter(guide => 
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (selectedLanguage) {
      filtered = filtered.filter(guide => 
        guide.languages.includes(selectedLanguage)
      );
    }
    
    filtered = filtered.filter(guide => 
      guide.halfDayRate >= priceRange[0] && guide.halfDayRate <= priceRange[1]
    );
    
    setFilteredGuides(filtered);
  }, [searchTerm, selectedLanguage, priceRange, guides]);

  const handleBookGuide = (guide: GuideProfile) => {
    toast.success(`You've booked a tour with ${guide.name}!`);
    navigate(-1); // Go back to previous page
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLanguage("");
    setPriceRange([0, 5000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Guide</h1>
            <p className="text-muted-foreground">Browse expert guides for your heritage experience</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <X className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="hidden md:block space-y-6">
            <div>
              <h3 className="font-medium mb-3">Filters</h3>
              <div className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Language</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Malayalam">Malayalam</SelectItem>
                      <SelectItem value="Gujarati">Gujarati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Price Range (Half Day)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-24"
                    />
                    <span>to</span>
                    <Input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                      className="w-24"
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search guides, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(true)}
                className="flex-shrink-0"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Guides List */}
          <div className="md:col-span-3">
            <div className="hidden md:flex mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search guides, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No guides found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGuides.map(guide => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={guide.image} 
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-[rgba(100,73,37,0.8)] text-white px-3 py-1 rounded-full text-sm">
                          ₹{guide.halfDayRate}+
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                          {guide.rating}
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{guide.name}</CardTitle>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {guide.location} • {guide.experience}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {guide.languages.slice(0, 3).map(lang => (
                          <Badge key={lang} variant="outline" className="bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,0.9)] border-[rgba(100,73,37,0.2)]">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm line-clamp-2 text-muted-foreground">{guide.about}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedGuide(guide)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          className="w-full bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]"
                          onClick={() => handleBookGuide(guide)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription>Refine your guide search</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Language</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Malayalam">Malayalam</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price Range (Half Day)</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span>to</span>
                <Input 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Guide Details Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
        {selectedGuide && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedGuide.name}</DialogTitle>
              <DialogDescription>Heritage guide profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={selectedGuide.image} 
                  alt={selectedGuide.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center text-sm mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                    <span className="font-medium">{selectedGuide.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedGuide.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedGuide.location}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedGuide.languages.map(lang => (
                      <Badge key={lang} variant="outline" className="bg-[rgba(100,73,37,0.1)] text-[rgba(100,73,37,0.9)] border-[rgba(100,73,37,0.2)]">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">About</h4>
                <p className="text-sm text-muted-foreground">{selectedGuide.about}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedGuide.specialties.map(specialty => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Rates</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm text-muted-foreground">Half Day (4 hrs)</p>
                    <p className="text-lg font-bold">₹{selectedGuide.halfDayRate}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm text-muted-foreground">Full Day (8 hrs)</p>
                    <p className="text-lg font-bold">₹{selectedGuide.fullDayRate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleBookGuide(selectedGuide)} className="bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)]">
                Book This Guide
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Guides;
