
import React from 'react';
import Navbar from '@/components/Navbar';
import LoadingSpinner from './LoadingSpinner';

interface ProfileLayoutProps {
  title: string;
  loading: boolean;
  children: React.ReactNode;
}

const ProfileLayout = ({ title, loading, children }: ProfileLayoutProps) => {
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
