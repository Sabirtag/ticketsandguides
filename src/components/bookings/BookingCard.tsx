
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ticket, CreditCard, Calendar, Clock, MapPin, User } from 'lucide-react';

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

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
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
            <h3 className="text-xl font-semibold">{booking.destination}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              {booking.location}
            </div>
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

export default BookingCard;
