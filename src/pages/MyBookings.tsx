
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BookingsLayout from '@/components/bookings/BookingsLayout';
import BookingsTabs from '@/components/bookings/BookingsTabs';

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
      // For now we use mock data, later this would be replaced with a Supabase query
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
      <BookingsLayout title="My Bookings">
        <BookingsTabs bookings={bookings} isLoading={isLoading} />
      </BookingsLayout>
    </ProtectedRoute>
  );
};

export default MyBookings;
