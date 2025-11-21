-- Update the pdf_documents table to support procurement category
ALTER TABLE pdf_documents 
DROP CONSTRAINT IF EXISTS pdf_documents_category_check;

ALTER TABLE pdf_documents
ADD CONSTRAINT pdf_documents_category_check 
CHECK (category IN ('knowledge-base', 'analysis-only', 'procurement'));

-- Create index for procurement queries
CREATE INDEX IF NOT EXISTS idx_pdf_documents_procurement ON pdf_documents(category) WHERE category = 'procurement';
