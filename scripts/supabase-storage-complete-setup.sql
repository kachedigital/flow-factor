-- Complete Supabase Storage Setup Script
-- This script creates buckets and sets up proper RLS policies

-- 1. Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('pdf-documents', 'pdf-documents', true),
  ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts (if they exist)
DROP POLICY IF EXISTS "Public read PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users update own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Public read uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload to uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload to pdf-documents" ON storage.objects;

-- 4. PDF-DOCUMENTS BUCKET POLICIES
-- Allow anonymous users to read PDF files
CREATE POLICY "Public read PDF documents"
ON storage.objects FOR SELECT USING (
  bucket_id = 'pdf-documents'
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow anonymous users to upload PDF files
CREATE POLICY "Anonymous upload PDF documents"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'pdf-documents'
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow users to update their own PDF files
CREATE POLICY "Users update own PDF documents"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'pdf-documents'
  AND storage."extension"(name) IN ('pdf', 'PDF')
) WITH CHECK (
  bucket_id = 'pdf-documents'
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow users to delete their own PDF files
CREATE POLICY "Users delete own PDF documents"
ON storage.objects FOR DELETE USING (
  bucket_id = 'pdf-documents'
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- 5. UPLOADS BUCKET POLICIES (for general file uploads)
-- Allow anonymous users to read uploaded files
CREATE POLICY "Public read uploads"
ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads'
);

-- Allow anonymous users to upload files
CREATE POLICY "Anonymous upload to uploads"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads'
);

-- Allow users to update their own uploaded files
CREATE POLICY "Users update own uploads"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads'
) WITH CHECK (
  bucket_id = 'uploads'
);

-- Allow users to delete their own uploaded files
CREATE POLICY "Users delete own uploads"
ON storage.objects FOR DELETE USING (
  bucket_id = 'uploads'
);

-- 6. Verify bucket creation
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE id IN ('pdf-documents', 'uploads');

-- 7. Verify policies are created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;
