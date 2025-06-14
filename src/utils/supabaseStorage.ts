
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload an image to Supabase card-images bucket.
 *
 * @param {string} userId - Unique ID for folder organization (e.g., user or admin ID).
 * @param {File} file - File object (image).
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
export const supabaseUploadImage = async (userId: string, file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload to storage
  const { error } = await supabase.storage
    .from("card-images")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  // Get the public URL
  const { data } = supabase.storage.from("card-images").getPublicUrl(filePath);
  if (!data?.publicUrl) throw new Error("Could not get public URL of image.");
  return data.publicUrl;
};
