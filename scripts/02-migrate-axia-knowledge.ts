import { createClient } from "@supabase/supabase-js"

const BLOB_BASE_URL = "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com"
const KNOWLEDGE_FOLDER = "Axia/axia_knowledge"
const supabaseUrl = "your_supabase_url"
const supabaseKey = "your_supabase_key"
const supabase = createClient(supabaseUrl, supabaseKey)

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
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
      // Other errors might be OK (like empty table)
    }

    console.log("[v0] ✅ Table exists")
    return true
  } catch (error) {
    console.error("[v0] Error verifying table:", error)
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
}

main()
