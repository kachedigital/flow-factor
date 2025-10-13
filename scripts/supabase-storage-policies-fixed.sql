-- Fixed Authenticated Storage Setup Script
-- This script creates buckets and sets up correct RLS policies for Supabase storage

-- 1. Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('pdf-documents', 'pdf-documents', true),
  ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public read PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users update own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Public read uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload to uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to uploads" ON storage.objects;

-- 4. PDF-DOCUMENTS BUCKET POLICIES (Fixed)
-- Allow authenticated users to read PDF files in their folder
CREATE POLICY "Authenticated read PDF documents"
ON storage.objects FOR SELECT USING (
  bucket_id = 'pdf-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to upload PDF files
CREATE POLICY "Authenticated upload PDF documents"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own PDF files
CREATE POLICY "Users update own PDF documents"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own PDF files
CREATE POLICY "Users delete own PDF documents"
ON storage.objects FOR DELETE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 5. UPLOADS BUCKET POLICIES (Fixed)
-- Allow authenticated users to read files in their folder
CREATE POLICY "Authenticated read uploads"
ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated upload to uploads"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own uploaded files
CREATE POLICY "Users update own uploads"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own uploaded files
CREATE POLICY "Users delete own uploads"
ON storage.objects FOR DELETE USING (
  bucket_id = 'uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 6. Alternative: More permissive policies (if the above doesn't work)
-- Uncomment these if you want to allow all authenticated users to access all files

-- CREATE POLICY "Allow authenticated read all PDF documents"
-- ON storage.objects FOR SELECT USING (
--   bucket_id = 'pdf-documents'
--   AND auth.uid() IS NOT NULL
-- );

-- CREATE POLICY "Allow authenticated upload all PDF documents"
-- ON storage.objects FOR INSERT WITH CHECK (
--   bucket_id = 'pdf-documents'
--   AND auth.uid() IS NOT NULL
-- );

-- CREATE POLICY "Allow authenticated read all uploads"
-- ON storage.objects FOR SELECT USING (
--   bucket_id = 'uploads'
--   AND auth.uid() IS NOT NULL
-- );

-- CREATE POLICY "Allow authenticated upload all uploads"
-- ON storage.objects FOR INSERT WITH CHECK (
--   bucket_id = 'uploads'
--   AND auth.uid() IS NOT NULL
-- );
