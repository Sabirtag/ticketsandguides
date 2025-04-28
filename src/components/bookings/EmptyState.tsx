
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
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

export default EmptyState;
