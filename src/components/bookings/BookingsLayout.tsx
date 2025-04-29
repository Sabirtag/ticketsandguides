
import React from 'react';
import Navbar from '@/components/Navbar';

interface BookingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Layout component for bookings pages
 * Provides consistent header and container structure
 */
const BookingsLayout = ({ title, children }: BookingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8 text-primary">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default BookingsLayout;
