
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { Phone, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PhoneVerificationProps {
  userId: string;
  currentPhone: string;
  isVerified: boolean;
  onVerificationComplete: (phone: string) => void;
}

const PhoneVerification = ({ userId, currentPhone, isVerified, onVerificationComplete }: PhoneVerificationProps) => {
  const [phone, setPhone] = useState(currentPhone || '');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX for Indian numbers
    if (digits.length <= 10) {
      if (digits.length > 5) {
        return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
      } else if (digits.length > 0) {
        return `+91 ${digits}`;
      }
    }
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
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
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
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
      onVerificationComplete(phone);
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

  if (isVerified && currentPhone) {
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
            <span className="text-green-800 font-medium">{currentPhone}</span>
            <span className="text-green-600 text-sm">Verified</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Phone Verification
        </CardTitle>
        <CardDescription>
          {step === 'phone' 
            ? 'Enter your phone number to receive a verification code' 
            : 'Enter the 6-digit code sent to your phone'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'phone' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+91 XXXXX XXXXX"
                disabled={loading}
              />
            </div>
            <Button 
              onClick={sendOtp} 
              disabled={loading || !phone}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </>
        ) : (
          <>
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
                  className="flex-1"
                >
                  Change Number
                </Button>
                <Button 
                  onClick={verifyOtp} 
                  disabled={loading || otp.length !== 6}
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
                  className="w-full text-sm"
                >
                  Resend Code
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
