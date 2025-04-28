
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsList from './BookingsList';

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

interface BookingsTabsProps {
  bookings: Booking[];
  isLoading: boolean;
}

const BookingsTabs = ({ bookings, isLoading }: BookingsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="all">All Bookings</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <BookingsList
          bookings={bookings}
          isLoading={isLoading}
          filterStatus="all"
          emptyMessage="You don't have any bookings yet."
        />
      </TabsContent>
      
      <TabsContent value="upcoming">
        <BookingsList
          bookings={bookings}
          isLoading={isLoading}
          filterStatus="upcoming"
          emptyMessage="You don't have any upcoming bookings."
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <BookingsList
          bookings={bookings}
          isLoading={isLoading}
          filterStatus="completed"
          emptyMessage="You don't have any completed bookings."
        />
      </TabsContent>
    </Tabs>
  );
};

export default BookingsTabs;
