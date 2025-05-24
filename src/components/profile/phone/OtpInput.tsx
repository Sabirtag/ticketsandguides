
import React from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Clock } from 'lucide-react';

interface OtpInputProps {
  phone: string;
  otp: string;
  setOtp: (otp: string) => void;
  timeLeft: number;
  loading: boolean;
  onVerify: () => void;
  onChangeNumber: () => void;
  onResend: () => void;
  formatTime: (seconds: number) => string;
}

const OtpInput = ({ 
  phone, 
  otp, 
  setOtp, 
  timeLeft, 
  loading, 
  onVerify, 
  onChangeNumber, 
  onResend, 
  formatTime 
}: OtpInputProps) => {
  return (
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
          onClick={onChangeNumber}
          disabled={loading}
          className="flex-1"
        >
          Change Number
        </Button>
        <Button 
          onClick={onVerify} 
          disabled={loading || otp.length !== 6}
          className="flex-1"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </Button>
      </div>
      
      {timeLeft === 0 && (
        <Button 
          variant="link" 
          onClick={onResend}
          disabled={loading}
          className="w-full text-sm"
        >
          Resend Code
        </Button>
      )}
    </div>
  );
};

export default OtpInput;
