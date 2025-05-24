
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoSection from './sections/PersonalInfoSection';
import PhoneVerificationSection from './sections/PhoneVerificationSection';

interface ProfileInformationProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  handleUpdateProfile: () => Promise<void>;
  userId: string;
  currentPhone: string;
  isPhoneVerified: boolean;
  onPhoneVerificationComplete: (phone: string) => void;
}

const ProfileInformation = ({ 
  fullName, 
  setFullName, 
  email, 
  handleUpdateProfile,
  userId,
  currentPhone,
  isPhoneVerified,
  onPhoneVerificationComplete
}: ProfileInformationProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and verify your phone number</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PersonalInfoSection 
          fullName={fullName}
          setFullName={setFullName}
          email={email}
        />

        <PhoneVerificationSection
          userId={userId}
          currentPhone={currentPhone}
          isPhoneVerified={isPhoneVerified}
          onPhoneVerificationComplete={onPhoneVerificationComplete}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateProfile}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileInformation;
