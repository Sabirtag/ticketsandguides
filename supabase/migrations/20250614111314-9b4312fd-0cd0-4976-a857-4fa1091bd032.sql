
-- Create a new public bucket for destination/card images
insert into storage.buckets (id, name, public) values ('card-images', 'card-images', true);

-- Allow anyone to view images in the bucket
create policy "Public read for card-images"
  on storage.objects for select
  using (bucket_id = 'card-images');

-- Allow authenticated users to upload files (WITH CHECK)
create policy "Authenticated upload for card-images"
  on storage.objects for insert
  with check (bucket_id = 'card-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files (USING)
create policy "Authenticated delete for card-images"
  on storage.objects for delete
  using (bucket_id = 'card-images' AND auth.role() = 'authenticated');
