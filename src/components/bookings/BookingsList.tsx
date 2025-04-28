
import React from 'react';
import BookingCard from './BookingCard';
import EmptyState from './EmptyState';
import LoadingSpinner from '../profile/LoadingSpinner';

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

interface BookingsListProps {
  bookings: Booking[];
  isLoading: boolean;
  filterStatus?: 'upcoming' | 'completed' | 'all';
  emptyMessage: string;
}

const BookingsList = ({ bookings, isLoading, filterStatus = 'all', emptyMessage }: BookingsListProps) => {
  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filterStatus);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredBookings.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="space-y-4">
      {filteredBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingsList;
