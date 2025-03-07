
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock, Calendar as CalendarIcon2, Star, ChevronLeft, Info, CheckCircle, AlertCircle } from "lucide-react";

const BookingSite = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const siteId = parseInt(params.get("site") || "0");
  const { toast } = useToast();
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [visitors, setVisitors] = useState({ indian: 1, foreigner: 0 });
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // For demo purposes, we'll use the searchResults context to get the site data
  // In a real app, you might want to fetch this specific site data directly
  const { searchResults } = useSearch();
  const site = searchResults.find(s => s.id === siteId) || null;

  if (!site) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-6xl py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Site Not Found</h1>
            <p className="mb-6">We couldn't find the heritage site you're looking for.</p>
            <Button asChild>
              <Link to="/explore">Explore Sites</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!bookingDate || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot for your visit.",
        variant: "destructive",
      });
      return;
    }

    const totalVisitors = visitors.indian + visitors.foreigner;
    if (totalVisitors < 1) {
      toast({
        title: "Invalid Visitors",
        description: "Please add at least one visitor for the booking.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this data to your backend
    const bookingData = {
      siteId: site.id,
      siteName: site.name,
      date: format(bookingDate, "yyyy-MM-dd"),
      timeSlot,
      visitors,
      indianPrice: parseInt(site.price.replace("₹", "").replace(",", "")),
      foreignerPrice: parseInt(site.foreignerPrice.replace("₹", "").replace(",", "")),
    };

    console.log("Booking data:", bookingData);

    toast({
      title: "Booking Successful!",
      description: `Your visit to ${site.name} has been booked for ${format(bookingDate, "MMMM d, yyyy")} at ${timeSlot}.`,
      variant: "default",
    });

    // In a real app, you would navigate to a confirmation page or show a receipt
  };

  const calculateTotal = () => {
    const indianPrice = parseInt(site.price.replace("₹", "").replace(",", "")) * visitors.indian;
    const foreignerPrice = parseInt(site.foreignerPrice.replace("₹", "").replace(",", "")) * visitors.foreigner;
    return `₹${(indianPrice + foreignerPrice).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl py-8 px-4">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/explore" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Back to Explore
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Site Details Section */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-64 md:h-96 mb-6">
              <img 
                src={site.image} 
                alt={site.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="flex items-center bg-primary/90 text-white px-3 py-2 rounded-full">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  <span className="font-bold">{site.rating}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h1 className="text-3xl font-bold">{site.name}</h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {site.address}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {site.available ? (
                    <div className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Unavailable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities & Rules</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Opening Hours</h3>
                      <p className="text-muted-foreground">{site.openingHours}</p>
                      <p className="text-muted-foreground text-sm">
                        {site.closedOn === "None" ? "Open every day" : `Closed on ${site.closedOn}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarIcon2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Visit Duration</h3>
                      <p className="text-muted-foreground">{site.visitDuration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{site.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Indian Citizens</h3>
                    <p className="text-xl font-bold">{site.price}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Foreign Nationals</h3>
                    <p className="text-xl font-bold">{site.foreignerPrice}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Amenities</h3>
                    <ul className="space-y-2">
                      {site.amenities && site.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Restrictions</h3>
                    <ul className="space-y-2">
                      {site.restrictions && site.restrictions.map((restriction, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nearby" className="py-4">
                <h3 className="font-medium mb-3">Nearby Attractions</h3>
                <ul className="space-y-3">
                  {site.nearbyAttractions && site.nearbyAttractions.map((attraction, index) => (
                    <li key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">{attraction}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Visit</CardTitle>
                <CardDescription>Select date, time and number of visitors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDate ? format(bookingDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingDate}
                        onSelect={(date) => {
                          setBookingDate(date);
                          setIsDateOpen(false);
                        }}
                        initialFocus
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                          (site.closedOn !== "None" && new Date(date).getDay() === 
                            ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                              .indexOf(site.closedOn))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slot Selection */}
                <div className="space-y-2">
                  <Label>Select Time Slot</Label>
                  <RadioGroup 
                    value={timeSlot} 
                    onValueChange={setTimeSlot}
                    className="grid grid-cols-2 gap-2"
                  >
                    {site.bookingTimeSlots && site.bookingTimeSlots.map((slot) => (
                      <div key={slot} className="flex items-center space-x-2">
                        <RadioGroupItem value={slot} id={`slot-${slot}`} />
                        <Label htmlFor={`slot-${slot}`} className="cursor-pointer">{slot}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Visitors */}
                <div className="space-y-2">
                  <Label>Number of Visitors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="indian-visitors" className="text-sm">Indian Citizens</Label>
                      <Input
                        id="indian-visitors"
                        type="number"
                        min="0"
                        value={visitors.indian}
                        onChange={(e) => setVisitors({...visitors, indian: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="foreign-visitors" className="text-sm">Foreign Nationals</Label>
                      <Input
                        id="foreign-visitors"
                        type="number"
                        min="0"
                        value={visitors.foreigner}
                        onChange={(e) => setVisitors({...visitors, foreigner: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Calculation */}
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex justify-between mb-1">
                    <span>Indian Visitors ({visitors.indian})</span>
                    <span>₹{(parseInt(site.price.replace("₹", "").replace(",", "")) * visitors.indian).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Foreign Visitors ({visitors.foreigner})</span>
                    <span>₹{(parseInt(site.foreignerPrice.replace("₹", "").replace(",", "")) * visitors.foreigner).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleBooking}
                  disabled={!site.available || !bookingDate || !timeSlot || (visitors.indian + visitors.foreigner) === 0}
                >
                  {site.available ? "Book Now" : "Site Unavailable"}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Please carry valid ID proof for all visitors</li>
                    <li>• Arrive 15 minutes before your scheduled time</li>
                    <li>• Cancellations allowed up to 24 hours before visit</li>
                    <li>• Photography may require additional permits</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSite;
