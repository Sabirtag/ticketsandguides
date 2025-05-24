
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

interface ProfileInformationProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  handleUpdateProfile: () => Promise<void>;
}

const ProfileInformation = ({ 
  fullName, 
  setFullName, 
  email, 
  handleUpdateProfile 
}: ProfileInformationProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400" />
            <Input 
              id="email" 
              value={email} 
              readOnly 
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateProfile}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileInformation;
