
import React, { useState } from "react";
import { supabaseUploadImage } from "@/utils/supabaseStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ImageUploaderProps {
  userId: string;
  onUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ userId, onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const url = await supabaseUploadImage(userId, file);
      onUpload(url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label htmlFor="img-upload" className="block mb-1">Upload Card Image</Label>
      <Input
        id="img-upload"
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={handleFileChange}
      />
      {uploading && <div className="mt-2 text-xs text-muted-foreground">Uploading...</div>}
    </div>
  );
};

export default ImageUploader;
