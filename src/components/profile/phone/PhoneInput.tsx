
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPhoneNumber } from './phoneUtils';

interface PhoneInputProps {
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
}

const PhoneInput = ({ phone, setPhone, loading }: PhoneInputProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // If user tries to delete the +91 prefix, reset it
    if (!inputValue.startsWith('+91')) {
      setPhone('+91 ');
      return;
    }
    
    const formatted = formatPhoneNumber(inputValue);
    setPhone(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input
        id="phone"
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        onKeyDown={handleKeyDown}
        placeholder="+91 XXXXX XXXXX"
        disabled={loading}
        maxLength={17}
      />
    </div>
  );
};

export default PhoneInput;
