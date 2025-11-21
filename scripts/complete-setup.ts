import { createClient } from "@supabase/supabase-js"
import { list } from "@vercel/blob"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials")
  console.log("Required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTable() {
  console.log("\n🔧 Creating pdf_documents table...")

  const { data, error } = await supabase.rpc("exec_sql", {
    query: `
      CREATE TABLE IF NOT EXISTS pdf_documents (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        filename TEXT NOT NULL,
        blob_url TEXT NOT NULL,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
        file_size BIGINT,
        extracted_text TEXT,
        category TEXT DEFAULT 'knowledge-base' CHECK (category IN ('knowledge-base', 'uploads'))
      );

      CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
      CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
    `,
  })

  if (error) {
    console.log("⚠️  Could not create table via RPC. Trying direct query...")

    // Try using the query directly
    const createResult = await supabase.from("pdf_documents").select("*").limit(1)

    if (createResult.error && createResult.error.message.includes("does not exist")) {
      console.log("\n📋 Table doesn't exist. Please run this SQL in your Supabase dashboard:")
      console.log("\n" + "=".repeat(60))
      console.log(`
CREATE TABLE IF NOT EXISTS pdf_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  file_size BIGINT,
  extracted_text TEXT,
  category TEXT DEFAULT 'knowledge-base' CHECK (category IN ('knowledge-base', 'uploads'))
);

CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
      `)
      console.log("=".repeat(60))
      console.log("\n👉 Go to: https://supabase.com/dashboard > SQL Editor")
      console.log("👉 Then run this script again to load the PDFs\n")
      return false
    }

    console.log("✅ Table already exists!")
    return true
  }

  console.log("✅ Table created successfully!")
  return true
}

async function extractTextFromPDF(pdfUrl: string): Promise<string> {
  try {
    const response = await fetch(pdfUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Simple text extraction - just get readable characters
    const text = buffer.toString("utf-8")
    const cleanText = text.replace(/[^\x20-\x7E\n]/g, " ").trim()

    return cleanText.substring(0, 100000) // Limit to 100KB of text
  } catch (error) {
    console.error(`Error extracting text from ${pdfUrl}:`, error)
    return ""
  }
}

async function loadPDFs() {
  console.log("\n📚 Loading PDFs from Axia/axia_knowledge/...")

  try {
    const { blobs } = await list({
      prefix: "Axia/axia_knowledge/",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    const pdfBlobs = blobs.filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))

    console.log(`Found ${pdfBlobs.length} PDFs in Axia/axia_knowledge/`)

    if (pdfBlobs.length === 0) {
      console.log("⚠️  No PDFs found in Axia/axia_knowledge/ folder")
      return
    }

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const blob of pdfBlobs) {
      const filename = blob.pathname.split("/").pop() || blob.pathname

      // Check if already exists
      const { data: existing } = await supabase.from("pdf_documents").select("id").eq("blob_url", blob.url).single()

      if (existing) {
        console.log(`⏭️  Skipping ${filename} (already in database)`)
        skipCount++
        continue
      }

      console.log(`📄 Processing ${filename}...`)

      try {
        // Extract text from PDF
        console.log(`   Extracting text...`)
        const extractedText = await extractTextFromPDF(blob.url)

        // Insert into database
        const { error } = await supabase.from("pdf_documents").insert({
          filename,
          blob_url: blob.url,
          file_size: blob.size,
          extracted_text: extractedText,
          category: "knowledge-base",
        })

        if (error) {
          console.error(`   ❌ Error saving ${filename}:`, error.message)
          errorCount++
        } else {
          console.log(`   ✅ Saved ${filename} (${(blob.size / 1024).toFixed(2)} KB)`)
          successCount++
        }
      } catch (error) {
        console.error(`   ❌ Error processing ${filename}:`, error)
        errorCount++
      }
    }

    console.log("\n" + "=".repeat(60))
    console.log(`📊 Summary:`)
    console.log(`   ✅ Successfully loaded: ${successCount}`)
    console.log(`   ⏭️  Skipped (duplicates): ${skipCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log("=".repeat(60))
  } catch (error) {
    console.error("❌ Error listing blobs:", error)
  }
}

async function main() {
  console.log("🚀 FlowFactor Knowledge Base Setup")
  console.log("=".repeat(60))

  const tableCreated = await createTable()

  if (!tableCreated) {
    console.log("\n⚠️  Please create the table first, then run this script again.")
    return
  }

  await loadPDFs()

  console.log("\n✨ Setup complete! Your chatbot can now access the knowledge base.")
}

main()
