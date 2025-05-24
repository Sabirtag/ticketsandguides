
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, User, Trash2 } from 'lucide-react';

interface ProfileAvatarProps {
  userId: string | undefined;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
}

const ProfileAvatar = ({ userId, avatarUrl, setAvatarUrl }: ProfileAvatarProps) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!userId) {
        throw new Error('You must be logged in to upload an avatar.');
      }
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;
      
      console.log("Uploading avatar to path:", filePath);
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true
        });
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      if (data) {
        setAvatarUrl(data.publicUrl);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: data.publicUrl })
          .eq('id', userId);
          
        if (updateError) throw updateError;
        
        toast.success('Avatar uploaded successfully!');
      }
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast.error(`Error uploading avatar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteAvatar = async () => {
    try {
      setDeleting(true);
      
      if (!userId) {
        throw new Error('You must be logged in to delete an avatar.');
      }
      
      if (!avatarUrl) {
        toast.error('No avatar to delete');
        return;
      }
      
      console.log("Deleting avatar:", avatarUrl);
      
      // Extract the file path from the URL
      const urlParts = avatarUrl.split('/');
      const bucketIndex = urlParts.findIndex(part => part === 'avatars');
      if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
        const filePath = urlParts.slice(bucketIndex + 1).join('/');
        
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([filePath]);
          
        if (deleteError) throw deleteError;
      }
      
      // Update the profile to remove the avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      setAvatarUrl('');
      toast.success('Avatar deleted successfully!');
    } catch (error: any) {
      console.error("Avatar delete error:", error);
      toast.error(`Error deleting avatar: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-32 h-32 mb-4">
          <AvatarImage 
            src={avatarUrl} 
            className="object-cover"
          />
          <AvatarFallback>
            <User className="h-16 w-16 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="avatar" className="cursor-pointer">
            <div className="flex items-center justify-center gap-2 text-sm text-primary bg-secondary/20 hover:bg-secondary/40 transition-colors rounded-md py-2 px-4">
              <Upload size={16} />
              <span>{uploading ? 'Uploading...' : 'Upload new picture'}</span>
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
          
          {avatarUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={deleteAvatar}
              disabled={deleting}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
              <span>{deleting ? 'Deleting...' : 'Delete picture'}</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAvatar;
