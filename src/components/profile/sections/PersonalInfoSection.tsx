
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

interface PersonalInfoSectionProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
}

const PersonalInfoSection = ({ fullName, setFullName, email }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default PersonalInfoSection;
