
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, CheckCircle } from 'lucide-react';

interface VerifiedPhoneDisplayProps {
  phoneNumber: string;
}

const VerifiedPhoneDisplay = ({ phoneNumber }: VerifiedPhoneDisplayProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Phone Number
        </CardTitle>
        <CardDescription>Your phone number is verified</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">{phoneNumber}</span>
          <span className="text-green-600 text-sm">Verified</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifiedPhoneDisplay;
