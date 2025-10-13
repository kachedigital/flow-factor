-- Authenticated Storage Setup Script
-- This script creates buckets and sets up authenticated-only RLS policies

-- 1. Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('pdf-documents', 'pdf-documents', true),
  ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users update own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own PDF documents" ON storage.objects;
DROP POLICY IF EXISTS "Public read uploads" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload to uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own uploads" ON storage.objects;

-- 4. PDF-DOCUMENTS BUCKET POLICIES (Authenticated Only)
-- Allow authenticated users to read their own PDF files
CREATE POLICY "Authenticated read own PDF documents"
ON storage.objects FOR SELECT USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() = owner
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow authenticated users to upload PDF files
CREATE POLICY "Authenticated upload PDF documents"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'pdf-documents'
  AND auth.uid() IS NOT NULL
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow users to update their own PDF files
CREATE POLICY "Users update own PDF documents"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() = owner
  AND storage."extension"(name) IN ('pdf', 'PDF')
) WITH CHECK (
  bucket_id = 'pdf-documents'
  AND auth.uid() = owner
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- Allow users to delete their own PDF files
CREATE POLICY "Users delete own PDF documents"
ON storage.objects FOR DELETE USING (
  bucket_id = 'pdf-documents'
  AND auth.uid() = owner
  AND storage."extension"(name) IN ('pdf', 'PDF')
);

-- 5. UPLOADS BUCKET POLICIES (Authenticated Only)
-- Allow authenticated users to read their own uploaded files
CREATE POLICY "Authenticated read own uploads"
ON storage.objects FOR SELECT USING (
  bucket_id = 'uploads'
  AND auth.uid() = owner
);

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated upload to uploads"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'uploads'
  AND auth.uid() IS NOT NULL
);

-- Allow users to update their own uploaded files
CREATE POLICY "Users update own uploads"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'uploads'
  AND auth.uid() = owner
) WITH CHECK (
  bucket_id = 'uploads'
  AND auth.uid() = owner
);

-- Allow users to delete their own uploaded files
CREATE POLICY "Users delete own uploads"
ON storage.objects FOR DELETE USING (
  bucket_id = 'uploads'
  AND auth.uid() = owner
);

-- 6. Create users table if it doesn't exist (for user management)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
