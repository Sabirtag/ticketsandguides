
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Upload, Phone, Mail } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
    
    if (user) {
      setEmail(user.email || '');
    }
  }, [profile, user]);
  
  const handleUpdateProfile = async () => {
    try {
      const updates = {
        id: user?.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date()
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };
  
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      if (data) {
        setAvatarUrl(data.publicUrl);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: data.publicUrl })
          .eq('id', user?.id);
          
        if (updateError) throw updateError;
        
        toast.success('Avatar uploaded successfully!');
      }
    } catch (error: any) {
      toast.error(`Error uploading avatar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>
                    <User className="h-16 w-16 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Upload size={16} />
                    <span>Upload new picture</span>
                  </div>
                </Label>
                <Input 
                  id="avatar" 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  disabled={uploading}
                  onChange={uploadAvatar}
                />
              </CardContent>
            </Card>
            
            {/* Personal Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdateProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-base">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your password for security</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-base">Notifications</h3>
                    <p className="text-sm text-gray-500">Manage your notification preferences</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
