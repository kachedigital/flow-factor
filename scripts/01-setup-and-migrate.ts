import { createClient } from "@supabase/ssr"
import { list } from "@vercel/blob"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  cookies: {
    getAll() {
      return []
    },
    setAll() {},
  },
})

async function setupDatabase() {
  console.log("[v0] Step 1: Creating pdf_documents table...")

  // Create the table using Supabase client
  const { error: createError } = await supabase.rpc("exec_sql", {
    sql: `
      CREATE TABLE IF NOT EXISTS pdf_documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        filename TEXT NOT NULL,
        blob_url TEXT NOT NULL UNIQUE,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        file_size BIGINT,
        extracted_text TEXT,
        category TEXT DEFAULT 'knowledge-base' CHECK (category IN ('knowledge-base', 'uploads'))
      );
      
      CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
      CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
    `,
  })

  if (createError) {
    console.error("[v0] Error creating table:", createError)
    console.log("[v0] Attempting alternative method...")

    // Alternative: Try direct table creation (may work if RPC not available)
    const { error: altError } = await supabase.from("pdf_documents").select("id").limit(1)

    if (altError && altError.code === "42P01") {
      console.error("[v0] Table does not exist and cannot be created automatically.")
      console.log("[v0] Please create the table manually in Supabase SQL Editor:")
      console.log(`
CREATE TABLE IF NOT EXISTS pdf_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL UNIQUE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  file_size BIGINT,
  extracted_text TEXT,
  category TEXT DEFAULT 'knowledge-base' CHECK (category IN ('knowledge-base', 'uploads'))
);

CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
      `)
      return false
    }
  }

  console.log("[v0] ✓ Table setup complete")
  return true
}

async function extractTextFromPDF(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Simple text extraction - looks for readable text in PDF
    const text = buffer.toString("utf-8")
    const cleanText = text
      .replace(/[^\x20-\x7E\n]/g, " ") // Remove non-printable chars
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim()

    return cleanText.substring(0, 50000) // Limit to 50k chars
  } catch (error) {
    console.error("[v0] Error extracting text:", error)
    return ""
  }
}

async function migratePDFs() {
  console.log("[v0] Step 2: Fetching PDFs from Axia/axia_knowledge/...")

  const FOLDER_PREFIX = "Axia/axia_knowledge/"

  try {
    const { blobs } = await list({
      prefix: FOLDER_PREFIX,
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })

    const pdfBlobs = blobs.filter((blob) => blob.pathname.endsWith(".pdf"))
    console.log(`[v0] Found ${pdfBlobs.length} PDFs in ${FOLDER_PREFIX}`)

    if (pdfBlobs.length === 0) {
      console.log("[v0] No PDFs found to migrate")
      return
    }

    let processed = 0
    let skipped = 0
    let errors = 0

    for (const blob of pdfBlobs) {
      const filename = blob.pathname.split("/").pop() || blob.pathname

      // Check if already exists
      const { data: existing } = await supabase.from("pdf_documents").select("id").eq("blob_url", blob.url).single()

      if (existing) {
        console.log(`[v0] ⊘ Skipping ${filename} (already exists)`)
        skipped++
        continue
      }

      console.log(`[v0] Processing ${filename}...`)

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(blob.url)

      // Insert into database
      const { error: insertError } = await supabase.from("pdf_documents").insert({
        filename,
        blob_url: blob.url,
        file_size: blob.size,
        extracted_text: extractedText,
        category: "knowledge-base",
      })

      if (insertError) {
        console.error(`[v0] ✗ Error processing ${filename}:`, insertError)
        errors++
      } else {
        console.log(`[v0] ✓ Added ${filename}`)
        processed++
      }
    }

    console.log("\n[v0] Migration complete:")
    console.log(`[v0]   • Processed: ${processed}`)
    console.log(`[v0]   • Skipped: ${skipped}`)
    console.log(`[v0]   • Errors: ${errors}`)
    console.log(`[v0]   • Total: ${pdfBlobs.length}`)
  } catch (error) {
    console.error("[v0] Error during migration:", error)
  }
}

async function main() {
  console.log("[v0] Starting setup and migration...\n")

  const tableReady = await setupDatabase()

  if (tableReady) {
    await migratePDFs()
  } else {
    console.log("[v0] Please create the table manually and run this script again.")
  }

  console.log("\n[v0] Done!")
}

main()
