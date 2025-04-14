import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin, Calendar, User, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock data for the booking
  const bookingData = {
    monument: {
      name: "Taj Mahal",
      address: "Agra, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523"
    },
    date: "April 20, 2025",
    time: "10:00 AM",
    visitors: {
      indian: 2,
      foreigner: 1
    },
    prices: {
      indian: 50,
      foreigner: 1100
    },
    guide: {
      name: "Rahul Sharma",
      fee: 1500,
      duration: "Half Day (4 Hours)"
    }
  };
  
  const subtotal = (bookingData.visitors.indian * bookingData.prices.indian) + 
                 (bookingData.visitors.foreigner * bookingData.prices.foreigner);
  const guideFee = bookingData.guide ? bookingData.guide.fee : 0;
  const serviceFee = 150;
  const total = subtotal + guideFee + serviceFee;
  
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Your booking is confirmed.");
      navigate("/confirmation");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-6xl py-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" className="p-0 mb-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Review your booking details and complete payment</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Your visit to {bookingData.monument.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 h-36 rounded-md overflow-hidden">
                    <img 
                      src={bookingData.monument.image} 
                      alt={bookingData.monument.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{bookingData.monument.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1 mb-3">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {bookingData.monument.address}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">{bookingData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">{bookingData.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Visitors</p>
                          <p className="text-sm text-muted-foreground">
                            {bookingData.visitors.indian} Indian, {bookingData.visitors.foreigner} Foreign
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Guide Details */}
            {bookingData.guide && (
              <Card>
                <CardHeader>
                  <CardTitle>Guide Details</CardTitle>
                  <CardDescription>Your personal heritage guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{bookingData.guide.name}</h3>
                      <p className="text-sm text-muted-foreground">{bookingData.guide.duration}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-medium">₹{bookingData.guide.fee}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Secure payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                    </div>
                    <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                  </div>
                  
                  {/* Other payment methods could be added here */}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Indian Visitors ({bookingData.visitors.indian} × ₹{bookingData.prices.indian})</span>
                    <span>₹{bookingData.visitors.indian * bookingData.prices.indian}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Foreign Visitors ({bookingData.visitors.foreigner} × ₹{bookingData.prices.foreigner})</span>
                    <span>₹{bookingData.visitors.foreigner * bookingData.prices.foreigner}</span>
                  </div>
                  {bookingData.guide && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guide Fee</span>
                      <span>₹{guideFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Payment'}
                </Button>
              </CardFooter>
              <div className="px-6 pb-4 text-xs text-center text-muted-foreground">
                By proceeding, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
