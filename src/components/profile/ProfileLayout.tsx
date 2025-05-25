
import React from 'react';
import Navbar from '@/components/Navbar';
import LoadingSpinner from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileLayoutProps {
  title: string;
  loading: boolean;
  children: React.ReactNode;
}

const ProfileLayout = ({ title, loading, children }: ProfileLayoutProps) => {
  const navigate = useNavigate();
  console.log("🎨 Rendering ProfileLayout with theme colors");
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground font-fitzgerald">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
