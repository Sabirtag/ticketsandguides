
export const formatPhoneNumber = (value: string) => {
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

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const validatePhoneNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 12 && digits.startsWith('91');
};
