
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{booking.destination}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={12} />
              {booking.location}
            </div>
          </div>
          <Badge variant="secondary" className={`${getStatusBadgeStyle(booking.status)} font-medium self-start`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium truncate">{formatDate(booking.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-medium truncate">{booking.time}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Guests</p>
              <p className="text-sm font-medium">{booking.ticketCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Amount</p>
              <p className="text-sm font-bold text-green-600">₹{booking.totalAmount}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md gap-1 sm:gap-0">
          <div className="flex items-center gap-1">
            <Ticket className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">ID: {booking.ticketId}</span>
          </div>
          <span className="truncate">{booking.paymentMethod}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-end gap-2">
        {booking.status === 'upcoming' && (
          <>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Cancel</Button>
            <Button size="sm" className="w-full sm:w-auto">Download</Button>
          </>
        )}
        
        {booking.status === 'completed' && (
          <Button size="sm" className="w-full sm:w-auto">Download</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
