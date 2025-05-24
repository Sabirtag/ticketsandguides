
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileInformation from '@/components/profile/ProfileInformation';
import PhoneVerification from '@/components/profile/PhoneVerification';
import AccountSettings from '@/components/profile/AccountSettings';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  console.log("Profile page - User:", user);
  console.log("Profile page - Profile data:", profile);
  
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
      setPhoneNumber(profile.phone || '');
      setPhoneVerified(profile.phone_verified || false);
    }
    
    if (user) {
      setEmail(user.email || '');
    }
  }, [profile, user]);
  
  const handleUpdateProfile = async () => {
    try {
      if (!user) {
        toast.error("You must be logged in to update your profile");
        return;
      }
      
      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };
      
      console.log("Updating profile with data:", updates);
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  const handlePhoneVerificationComplete = (verifiedPhone: string) => {
    setPhoneNumber(verifiedPhone);
    setPhoneVerified(true);
  };
  
  return (
    <ProtectedRoute>
      <ProfileLayout title="My Profile" loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileAvatar 
            userId={user?.id}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
          />
          
          <ProfileInformation
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            handleUpdateProfile={handleUpdateProfile}
          />
        </div>
        
        <div className="mt-6">
          <PhoneVerification
            userId={user?.id || ''}
            currentPhone={phoneNumber}
            isVerified={phoneVerified}
            onVerificationComplete={handlePhoneVerificationComplete}
          />
        </div>
        
        <div className="mt-6">
          <AccountSettings />
        </div>
      </ProfileLayout>
    </ProtectedRoute>
  );
};

export default Profile;
