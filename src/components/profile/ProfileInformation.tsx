
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Phone, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [phone, setPhone] = useState(currentPhone || '');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits for Indian numbers
    const limitedDigits = digits.slice(0, 10);
    
    // Format as +91 XXXXX XXXXX for Indian numbers
    if (limitedDigits.length > 5) {
      return `+91 ${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5)}`;
    } else if (limitedDigits.length > 0) {
      return `+91 ${limitedDigits}`;
    }
    return '+91 ';
  };

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

  const startCountdown = () => {
    setTimeLeft(300); // 5 minutes
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    // Extract digits from phone number
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 12 || !digits.startsWith('91')) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await supabase.functions.invoke('send-phone-otp', {
        body: { phone: phone, userId },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setStep('otp');
      startCountdown();
      toast.success('OTP sent to your phone number');
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast.error(`Failed to send OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await supabase.functions.invoke('verify-phone-otp', {
        body: { otp, userId },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success('Phone number verified successfully!');
      onPhoneVerificationComplete(phone);
      setStep('phone');
      setOtp('');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast.error(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and verify your phone number</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5" />
            <Label className="text-base font-medium">Phone Verification</Label>
          </div>
          
          {isPhoneVerified && currentPhone ? (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">{currentPhone}</span>
              <span className="text-green-600 text-sm">Verified</span>
            </div>
          ) : (
            <div className="space-y-4">
              {step === 'phone' ? (
                <>
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
                  <Button 
                    onClick={sendOtp} 
                    disabled={loading || phone.length < 17}
                    size="sm"
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Code sent to {phone}
                    </p>
                    {timeLeft > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Expires in {formatTime(timeLeft)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      value={otp} 
                      onChange={setOtp}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setStep('phone');
                        setOtp('');
                        setTimeLeft(0);
                      }}
                      disabled={loading}
                      size="sm"
                      className="flex-1"
                    >
                      Change Number
                    </Button>
                    <Button 
                      onClick={verifyOtp} 
                      disabled={loading || otp.length !== 6}
                      size="sm"
                      className="flex-1"
                    >
                      {loading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                  </div>
                  
                  {timeLeft === 0 && (
                    <Button 
                      variant="link" 
                      onClick={sendOtp}
                      disabled={loading}
                      size="sm"
                      className="w-full text-sm"
                    >
                      Resend Code
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateProfile}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileInformation;
