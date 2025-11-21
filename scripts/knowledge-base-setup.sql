-- Create a simple table to track uploaded PDF documents
CREATE TABLE IF NOT EXISTS pdf_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  file_size INTEGER,
  extracted_text TEXT,
  -- Added category field to filter which PDFs Axia should access
  category TEXT DEFAULT 'analysis-only' CHECK (category IN ('knowledge-base', 'analysis-only'))
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
-- Added index for category filtering
CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
