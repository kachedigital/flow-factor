-- Simple Storage Policies (More Permissive)
-- Run this if you want to allow all authenticated users to upload

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated read PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users update own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own uploads" ON storage.objects;

-- Simple policies - allow all authenticated users
CREATE POLICY "Allow authenticated users to read PDF documents"
ON storage.objects FOR SELECT USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to upload PDF documents"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to update PDF documents"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to delete PDF documents"
ON storage.objects FOR DELETE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
);

-- Same for uploads bucket
CREATE POLICY "Allow authenticated users to read uploads"
ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to upload to uploads"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to update uploads"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to delete uploads"
ON storage.objects FOR DELETE USING (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
);
