-- Create a dedicated table for CalPro procurement documents
CREATE TABLE IF NOT EXISTS calpro_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  blob_url TEXT,
  extracted_text TEXT NOT NULL,
  category TEXT DEFAULT 'procurement',
  file_size BIGINT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster text searches
CREATE INDEX IF NOT EXISTS idx_calpro_documents_text ON calpro_documents USING gin(to_tsvector('english', extracted_text));

-- Create an index for category filtering
CREATE INDEX IF NOT EXISTS idx_calpro_documents_category ON calpro_documents(category);
