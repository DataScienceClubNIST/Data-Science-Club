import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Uploads an image file to Supabase Storage bucket 'club-assets'.
 * If Supabase is not configured or upload fails, falls back to Base64 Data URL.
 * 
 * @param file The image File object to upload
 * @param folder Optional subfolder name in the storage bucket (e.g., 'events', 'team', 'projects')
 * @returns Promise<string> Resolves to the public image URL or Base64 Data URL
 */
export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  // If Supabase is configured, attempt uploading to Supabase Storage Bucket
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const bucketName = 'club-assets';

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('[Supabase Storage]: Upload note:', error.message);
        console.warn('Falling back to Base64 Data URL for local presentation.');
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('[Supabase Storage Error]: Falling back to local Base64 URL', err);
    }
  }

  // Fallback: Convert file to Base64 Data URL for immediate local preview / storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
