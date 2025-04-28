import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ticket, CreditCard, Calendar, Clock, MapPin, User } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

type Booking = {
  id: string;
  destination: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  ticketCount: number;
  totalAmount: number;
  paymentMethod: string;
  ticketId: string;
  location: string;
};

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching bookings for user:", user?.id);
      const mockBookings: Booking[] = [
        {
          id: '1',
          destination: 'Taj Mahal',
          date: '2025-05-15',
          time: '10:00 AM',
          status: 'upcoming',
          ticketCount: 2,
          totalAmount: 3000,
          paymentMethod: 'Credit Card',
          ticketId: 'TAJ20250515',
          location: 'Agra, India'
        },
        {
          id: '2',
          destination: 'Qutub Minar',
          date: '2025-04-10',
          time: '11:30 AM',
          status: 'completed',
          ticketCount: 3,
          totalAmount: 1500,
          paymentMethod: 'Debit Card',
          ticketId: 'QM20250410',
          location: 'Delhi, India'
        },
        {
          id: '3',
          destination: 'Red Fort',
          date: '2025-06-22',
          time: '09:00 AM',
          status: 'upcoming',
          ticketCount: 4,
          totalAmount: 2000,
          paymentMethod: 'UPI',
          ticketId: 'RF20250622',
          location: 'Delhi, India'
        }
      ];
      
      console.log("Mock bookings loaded:", mockBookings.length);
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  console.log("MyBookings rendering, loading state:", isLoading);
  console.log("Number of bookings:", bookings.length);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <EmptyState message="You don't have any bookings yet." />
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                bookings
                  .filter(b => b.status === 'upcoming')
                  .map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
              ) : (
                <EmptyState message="You don't have any upcoming bookings." />
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : bookings.filter(b => b.status === 'completed').length > 0 ? (
                bookings
                  .filter(b => b.status === 'completed')
                  .map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
              ) : (
                <EmptyState message="You don't have any completed bookings." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{booking.destination}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin size={14} />
              {booking.location}
            </CardDescription>
          </div>
          <Badge className={`${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{formatDate(booking.date)}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{booking.time}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Tickets</p>
            <p className="font-medium">{booking.ticketCount} {booking.ticketCount === 1 ? 'person' : 'people'}</p>
          </div>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardContent className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Ticket className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Ticket ID</p>
              <p className="font-medium">{booking.ticketId}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{booking.paymentMethod}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-medium">₹{booking.totalAmount}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 border-t py-4 bg-gray-50">
        {booking.status === 'upcoming' && (
          <>
            <Button variant="outline">Cancel Booking</Button>
            <Button>Download Ticket</Button>
          </>
        )}
        
        {booking.status === 'completed' && (
          <Button>Download Ticket</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Ticket className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900">{message}</h3>
        <p className="text-center text-gray-500 mt-2 mb-4">
          Browse our amazing destinations and experiences to book your next adventure.
        </p>
        <Button asChild>
          <a href="/destinations">Explore Destinations</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyBookings;
