
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PhoneInput from './phone/PhoneInput';
import OtpInput from './phone/OtpInput';
import VerifiedPhoneDisplay from './phone/VerifiedPhoneDisplay';
import { validatePhoneNumber, formatTime } from './phone/phoneUtils';

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
    if (!validatePhoneNumber(phone)) {
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

      // Call the new security function to invalidate the OTP after successful verification
      await supabase.rpc('invalidate_phone_verification_code', { 
        user_id: userId 
      });

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

  const handleChangeNumber = () => {
    setStep('phone');
    setOtp('');
    setTimeLeft(0);
  };

  if (isVerified && currentPhone) {
    return <VerifiedPhoneDisplay phoneNumber={currentPhone} />;
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
            <PhoneInput phone={phone} setPhone={setPhone} loading={loading} />
            <Button 
              onClick={sendOtp} 
              disabled={loading || phone.length < 17}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </>
        ) : (
          <OtpInput
            phone={phone}
            otp={otp}
            setOtp={setOtp}
            timeLeft={timeLeft}
            loading={loading}
            onVerify={verifyOtp}
            onChangeNumber={handleChangeNumber}
            onResend={sendOtp}
            formatTime={formatTime}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
