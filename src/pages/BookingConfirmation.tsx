
import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, MapPin, Users, Download, Share2 } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = location.state;
  
  // Redirect if there's no booking data
  if (!bookingData) {
    return <Navigate to="/" replace />;
  }
  
  // Generate a random booking reference
  const bookingReference = `TAG-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-3xl py-12 px-4">
        <Card className="border-green-200 shadow-md">
          <CardHeader className="text-center pb-4 border-b">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-700">Booking Confirmed!</CardTitle>
            <p className="text-muted-foreground">Your tickets have been booked successfully</p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">{bookingData.destination}</h2>
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Location details available on your ticket</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="font-mono font-bold">{bookingReference}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Visit Date</span>
                </div>
                <p>{bookingData.date}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Time Slot</span>
                </div>
                <p>{bookingData.time}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Visitors</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Indian</p>
                    <p>{bookingData.visitors.indian}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Foreign</p>
                    <p>{bookingData.visitors.foreigner}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Total Amount</span>
                </div>
                <p className="text-xl font-bold">{bookingData.totalPrice}</p>
                <p className="text-xs text-green-600">Payment Successful</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md mb-6 border border-amber-200">
              <h3 className="font-medium mb-2">Important Instructions</h3>
              <ul className="text-sm space-y-1">
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>• Carry a valid photo ID for all visitors</li>
                <li>• Show this confirmation or your e-ticket at the entrance</li>
                <li>• Follow all site guidelines and restrictions</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" /> Download Ticket
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" /> Share Details
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-primary hover:underline">Back to Home</Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
