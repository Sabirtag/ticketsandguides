
import React from 'react';
import Navbar from '@/components/Navbar';

interface BookingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const BookingsLayout = ({ title, children }: BookingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default BookingsLayout;
