-- Anonymous Upload Setup for MVP
-- This script allows anyone to upload files without authentication

-- 1. Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('pdf-documents', 'pdf-documents', true),
  ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous update PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous delete PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Public read uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload to uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous update uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous delete uploads" ON storage.objects;

-- 4. PDF-DOCUMENTS BUCKET POLICIES (Anonymous Access)
-- Allow anyone to read PDF files
CREATE POLICY "Public read PDF documents"
ON storage.objects FOR SELECT USING (
  bucket_id = 'pdf-documents'
);

-- Allow anyone to upload PDF files
CREATE POLICY "Anonymous upload PDF documents"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'pdf-documents'
);

-- Allow anyone to update files
CREATE POLICY "Anonymous update PDF documents"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'pdf-documents'
) WITH CHECK (
  bucket_id = 'pdf-documents'
);

-- Allow anyone to delete files
CREATE POLICY "Anonymous delete PDF documents"
ON storage.objects FOR DELETE USING (
  bucket_id = 'pdf-documents'
);

-- 5. UPLOADS BUCKET POLICIES (Anonymous Access)
-- Allow anyone to read uploaded files
CREATE POLICY "Public read uploads"
ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads'
);

-- Allow anyone to upload files
CREATE POLICY "Anonymous upload to uploads"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads'
);

-- Allow anyone to update files
CREATE POLICY "Anonymous update uploads"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads'
) WITH CHECK (
  bucket_id = 'uploads'
);

-- Allow anyone to delete files
CREATE POLICY "Anonymous delete uploads"
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
  cmd
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;
