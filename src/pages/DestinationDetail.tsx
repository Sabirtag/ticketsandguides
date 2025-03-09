
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Calendar, Star, ArrowLeft, Info, 
  ChevronLeft, Users, Check, AlertTriangle, Camera 
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Destination data would typically come from an API
const getDestinationData = (id: string) => {
  const destinations = [
    {
      id: "1",
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
      openingHours: "Sunrise to Sunset (6 AM - 6:30 PM), Closed on Fridays",
      closedOn: "Friday",
      visitDuration: "2-3 hours",
      rating: 4.8,
      price: "₹50",
      foreignerPrice: "₹1,100",
      features: ["UNESCO World Heritage Site", "Marble Architecture", "Persian Gardens"],
      amenities: ["Restrooms", "Wheelchair Access", "Photography Allowed"],
      restrictions: ["No Tripods", "No Food", "No Loud Noise"],
      nearbyAttractions: ["Agra Fort (6 km)", "Fatehpur Sikri (40 km)", "Mehtab Bagh (1 km)"],
      bookingTimeSlots: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523",
        "https://images.unsplash.com/photo-1548013146-72479768bada",
        "https://images.unsplash.com/photo-1506462945968-8cb67c2b6651"
      ],
      facts: [
        "The Taj Mahal was built over a period of 22 years, from 1631 to 1653.",
        "The construction employed around 20,000 artisans and craftsmen.",
        "The main dome is 73 meters tall and is surrounded by four smaller domes."
      ]
    },
    {
      id: "2",
      name: "Red Fort",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e",
      description: "The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.",
      openingHours: "9:30 AM - 4:30 PM, Open all days",
      closedOn: "None",
      visitDuration: "1-2 hours",
      rating: 4.6,
      price: "₹35",
      foreignerPrice: "₹500",
      features: ["UNESCO World Heritage Site", "Mughal Architecture", "Sound and Light Show"],
      amenities: ["Restrooms", "Wheelchair Access", "Museum"],
      restrictions: ["No Drones", "No Professional Photography without permit"],
      nearbyAttractions: ["Jama Masjid (1.5 km)", "Chandni Chowk (0.5 km)", "India Gate (5 km)"],
      bookingTimeSlots: ["9:30 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
        "https://images.unsplash.com/photo-1587135941948-670b381f08ce"
      ],
      facts: [
        "The Red Fort gets its name from the red sandstone used in its construction.",
        "It was the ceremonial and political center of the Mughal government for nearly 200 years.",
        "Every year on Independence Day, the Prime Minister of India hoists the national flag here."
      ]
    },
    {
      id: "3",
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-9d856430d157",
      description: "Hawa Mahal, or the 'Palace of Winds' is a palace in Jaipur, India. It is constructed of red and pink sandstone and has a unique five-story exterior that is similar to the honeycomb of a beehive with its 953 small windows called jharokhas decorated with intricate latticework.",
      openingHours: "9:00 AM - 5:00 PM, Open all days",
      closedOn: "None",
      visitDuration: "1 hour",
      rating: 4.5,
      price: "₹50",
      foreignerPrice: "₹200",
      features: ["Rajput Architecture", "Honeycomb Structure", "Viewing Galleries"],
      amenities: ["Restrooms", "Museum", "Photography Allowed"],
      restrictions: ["No Climbing on Structure"],
      nearbyAttractions: ["City Palace (0.5 km)", "Jantar Mantar (1 km)", "Amber Fort (11 km)"],
      bookingTimeSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1599661046827-9d856430d157",
        "https://images.unsplash.com/photo-1598547544870-bc5b6ea4c34a",
        "https://images.unsplash.com/photo-1624204731525-1b73608cec5d"
      ],
      facts: [
        "Hawa Mahal was built in 1799 by Maharaja Sawai Pratap Singh.",
        "It has 953 small windows or 'jharokhas' that allowed royal ladies to observe street festivals while remaining unseen.",
        "The structure is only one room deep, with the back part directly facing onto a main road."
      ]
    },
    {
      id: "4",
      name: "Qutub Minar",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1566559532215-6671e88ee1f0",
      description: "The Qutub Minar is a minaret and victory tower that forms part of the Qutb complex, which lies at the site of Delhi's oldest fortified city, Lal Kot. The tower is 72.5 meters tall and was built over the course of 28 years by various rulers of the Delhi Sultanate.",
      openingHours: "7:00 AM - 5:00 PM, Open all days",
      closedOn: "None",
      visitDuration: "1-1.5 hours",
      rating: 4.7,
      price: "₹35",
      foreignerPrice: "₹550",
      features: ["UNESCO World Heritage Site", "Indo-Islamic Architecture", "Iron Pillar"],
      amenities: ["Restrooms", "Wheelchair Access", "Gardens"],
      restrictions: ["No Climbing", "No Food Inside Complex"],
      nearbyAttractions: ["Mehrauli Archaeological Park (1 km)", "Garden of Five Senses (3 km)"],
      bookingTimeSlots: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1566559532215-6671e88ee1f0",
        "https://images.unsplash.com/photo-1613503531866-0dac92673be6",
        "https://images.unsplash.com/photo-1622280035820-31715f08eff0"
      ],
      facts: [
        "Qutub Minar is the tallest brick minaret in the world.",
        "Construction began in 1192 by Qutb-ud-din Aibak and was completed by his successor Iltutmish.",
        "The tower has five distinct storeys, each marked by a projecting balcony."
      ]
    }
  ];
  
  return destinations.find(dest => dest.id === id) || null;
};

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visitors, setVisitors] = useState({ indian: 1, foreigner: 0 });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const data = getDestinationData(id);
      setDestination(data);
      setLoading(false);
    }
  }, [id]);
  
  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time for your visit");
      return;
    }
    
    const totalVisitors = visitors.indian + visitors.foreigner;
    if (totalVisitors < 1) {
      toast.error("Please add at least one visitor");
      return;
    }
    
    // Calculate total price
    const indianPrice = parseInt(destination.price.replace("₹", "").replace(",", "")) * visitors.indian;
    const foreignerPrice = parseInt(destination.foreignerPrice.replace("₹", "").replace(",", "")) * visitors.foreigner;
    const totalPrice = indianPrice + foreignerPrice;
    
    // In a real app, this would make an API call to book the tickets
    toast.success(`Booking confirmed for ${destination.name} on ${selectedDate} at ${selectedTime}`);
    
    // Navigate to booking confirmation page
    navigate("/booking-confirmation", { 
      state: {
        destination: destination.name,
        date: selectedDate,
        time: selectedTime,
        visitors,
        totalPrice: `₹${totalPrice}`
      }
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 px-4 flex justify-center items-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the destination you're looking for.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery and Details */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-80 mb-4">
              <img 
                src={destination.images[selectedImageIndex]} 
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">{destination.rating}</span>
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {destination.images.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${destination.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{destination.location}</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {destination.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Opening Hours</h3>
                    <p className="text-sm text-muted-foreground">{destination.openingHours}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Visit Duration</h3>
                    <p className="text-sm text-muted-foreground">{destination.visitDuration}</p>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="features">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities & Rules</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby Attractions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="pt-4">
                  <h3 className="font-medium mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="py-1.5">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mb-3">Interesting Facts</h3>
                  <ul className="space-y-2">
                    {destination.facts.map((fact: string, index: number) => (
                      <li key={index} className="flex items-baseline gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="amenities" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Amenities</h3>
                      <ul className="space-y-2">
                        {destination.amenities.map((amenity: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Restrictions</h3>
                      <ul className="space-y-2">
                        {destination.restrictions.map((restriction: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">{restriction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="nearby" className="pt-4">
                  <h3 className="font-medium mb-3">Nearby Attractions</h3>
                  <ul className="space-y-3">
                    {destination.nearbyAttractions.map((attraction: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Indian Citizens</p>
                    <p className="font-bold">{destination.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Foreign Nationals</p>
                    <p className="font-bold">{destination.foreignerPrice}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Date</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Select a date</option>
                    {[...Array(14)].map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i + 1);
                      return (
                        <option key={i} value={date.toLocaleDateString()}>
                          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.bookingTimeSlots.map((slot: string) => (
                      <div 
                        key={slot}
                        className={`p-2 border rounded-md text-center cursor-pointer ${
                          selectedTime === slot ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Visitors</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Indian Citizens</p>
                      <div className="flex items-center border rounded-md">
                        <button 
                          className="px-3 py-1"
                          onClick={() => setVisitors(prev => ({...prev, indian: Math.max(0, prev.indian - 1)}))}
                        >
                          -
                        </button>
                        <span className="flex-1 text-center">{visitors.indian}</span>
                        <button 
                          className="px-3 py-1"
                          onClick={() => setVisitors(prev => ({...prev, indian: prev.indian + 1}))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Foreign Nationals</p>
                      <div className="flex items-center border rounded-md">
                        <button 
                          className="px-3 py-1"
                          onClick={() => setVisitors(prev => ({...prev, foreigner: Math.max(0, prev.foreigner - 1)}))}
                        >
                          -
                        </button>
                        <span className="flex-1 text-center">{visitors.foreigner}</span>
                        <button 
                          className="px-3 py-1"
                          onClick={() => setVisitors(prev => ({...prev, foreigner: prev.foreigner + 1}))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price Calculation */}
                <div className="bg-gray-50 p-4 rounded-md mt-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Indian Citizens ({visitors.indian})</span>
                    <span>₹{parseInt(destination.price.replace("₹", "").replace(",", "")) * visitors.indian}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Foreign Nationals ({visitors.foreigner})</span>
                    <span>₹{parseInt(destination.foreignerPrice.replace("₹", "").replace(",", "")) * visitors.foreigner}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{
                      (parseInt(destination.price.replace("₹", "").replace(",", "")) * visitors.indian) +
                      (parseInt(destination.foreignerPrice.replace("₹", "").replace(",", "")) * visitors.foreigner)
                    }</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!destination.available || !selectedDate || !selectedTime || (visitors.indian + visitors.foreigner) < 1}
                  onClick={handleBook}
                >
                  Book Now
                </Button>
                
                <div className="text-xs text-muted-foreground mt-2">
                  <div className="flex items-start gap-1 mb-1">
                    <Info className="h-3 w-3 mt-0.5" />
                    <span>All visitors must carry a valid ID proof</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <Camera className="h-3 w-3 mt-0.5" />
                    <span>Special photography permits available at the site</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
