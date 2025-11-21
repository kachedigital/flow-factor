import { createClient } from "@supabase/supabase-js"

const BLOB_BASE_URL = "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com"
const KNOWLEDGE_FOLDER = "Axia/axia_knowledge"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log("[v0] Supabase URL available:", !!supabaseUrl)
console.log("[v0] Supabase Key available:", !!supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey)

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
}

async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const decoder = new TextDecoder()
    const text = decoder.decode(pdfBuffer)

    // Extract readable text between stream objects
    const textMatches = text.match(/$$(.*?)$$/g) || []
    const extractedText = textMatches
      .map((match) => match.slice(1, -1))
      .join(" ")
      .replace(/\\n/g, "\n")
      .replace(/\\/g, "")
      .trim()

    return extractedText || "No text could be extracted from this PDF."
  } catch (error) {
    console.error("[v0] Error extracting text:", error)
    return "Error extracting text from PDF."
  }
}

async function verifyTableExists() {
  try {
    console.log("[v0] Verifying pdf_documents table exists...")
    const { error } = await supabase.from("pdf_documents").select("id").limit(1)

    if (error) {
      if (error.message.includes("relation") || error.message.includes("does not exist")) {
        console.error("[v0] ❌ ERROR: pdf_documents table does not exist!")
        console.log("[v0] Please run the '01-setup-database.sql' script first to create the table.")
        return false
      }
    }

    console.log("[v0] ✅ Table exists")
    return true
  } catch (error) {
    console.error("[v0] Error verifying table:", error)
    return false
  }
}

async function listBlobFiles(): Promise<BlobFile[]> {
  try {
    const response = await fetch(`/api/blob-list?folder=${encodeURIComponent(KNOWLEDGE_FOLDER)}`)

    if (!response.ok) {
      // If API doesn't exist, try listing with token
      const token = process.env.BLOB_READ_WRITE_TOKEN
      if (!token) {
        console.error("[v0] No BLOB_READ_WRITE_TOKEN found")
        return []
      }

      const listResponse = await fetch(`https://blob.vercel-storage.com/list?prefix=${KNOWLEDGE_FOLDER}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      if (!listResponse.ok) {
        console.error("[v0] Error listing blobs:", await listResponse.text())
        return []
      }

      const data = await listResponse.json()
      return data.blobs || []
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error listing blob files:", error)
    return []
  }
}

async function migratePDF(file: BlobFile): Promise<boolean> {
  try {
    const filename = file.pathname.split("/").pop() || file.pathname

    // Check if already exists
    const { data: existing } = await supabase.from("pdf_documents").select("id").eq("filename", filename).single()

    if (existing) {
      console.log(`[v0] ⏭️  Skipping ${filename} (already in database)`)
      return true
    }

    console.log(`[v0] 📄 Processing ${filename}...`)

    // Download PDF
    const response = await fetch(file.url)
    if (!response.ok) {
      console.error(`[v0] ❌ Failed to download ${filename}`)
      return false
    }

    const pdfBuffer = await response.arrayBuffer()

    // Extract text
    const extractedText = await extractTextFromPDF(pdfBuffer)

    // Save to database
    const { error } = await supabase.from("pdf_documents").insert({
      filename,
      blob_url: file.url,
      file_size: file.size,
      extracted_text: extractedText,
      category: "knowledge-base",
      uploaded_at: new Date().toISOString(),
    })

    if (error) {
      console.error(`[v0] ❌ Error saving ${filename}:`, error.message)
      return false
    }

    console.log(`[v0] ✅ Successfully migrated ${filename}`)
    return true
  } catch (error) {
    console.error(`[v0] ❌ Error processing ${file.pathname}:`, error)
    return false
  }
}

async function main() {
  console.log("[v0] Starting Axia Knowledge Base Migration")
  console.log("[v0] ==========================================")

  const tableExists = await verifyTableExists()
  if (!tableExists) {
    console.log("\n[v0] Migration aborted. Please create the table first.")
    return
  }

  console.log(`[v0] Looking for PDFs in: ${KNOWLEDGE_FOLDER}`)

  const files = await listBlobFiles()
  const pdfFiles = files.filter((f) => f.pathname.toLowerCase().endsWith(".pdf"))

  if (pdfFiles.length === 0) {
    console.log("[v0] ⚠️  No PDFs found in the folder")
    return
  }

  console.log(`[v0] Found ${pdfFiles.length} PDF(s)`)
  console.log("[v0] ==========================================")

  let success = 0
  let skipped = 0
  let failed = 0

  for (const file of pdfFiles) {
    const result = await migratePDF(file)
    if (result) {
      const filename = file.pathname.split("/").pop() || file.pathname
      const { data: existing } = await supabase.from("pdf_documents").select("id").eq("filename", filename).single()

      if (existing) {
        skipped++
      } else {
        success++
      }
    } else {
      failed++
    }
  }

  console.log("\n[v0] ==========================================")
  console.log("[v0] Migration Complete!")
  console.log(`[v0] ✅ Successfully migrated: ${success}`)
  console.log(`[v0] ⏭️  Skipped (already existed): ${skipped}`)
  console.log(`[v0] ❌ Failed: ${failed}`)
  console.log("[v0] ==========================================")
}

main()
