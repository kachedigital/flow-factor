import { list } from "@vercel/blob"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const BLOB_FOLDER = "Axia/axia_knowledge"

interface PDFDocument {
  filename: string
  blob_url: string
  file_size: number
  extracted_text: string
  category: string
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Simple text extraction - look for text between stream objects
    const pdfContent = buffer.toString("latin1")
    const textMatches = pdfContent.match(/$$([^)]+)$$/g)

    if (textMatches) {
      const extractedText = textMatches
        .map((match) => match.slice(1, -1))
        .join(" ")
        .replace(/\\n/g, " ")
        .replace(/\s+/g, " ")
        .trim()

      return extractedText
    }

    return ""
  } catch (error) {
    console.error("Error extracting text:", error)
    return ""
  }
}

async function checkIfExists(filename: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/pdf_documents?filename=eq.${encodeURIComponent(filename)}&select=id`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    )

    if (!response.ok) {
      console.error(`Failed to check if ${filename} exists:`, response.status)
      return false
    }

    const data = await response.json()
    return data.length > 0
  } catch (error) {
    console.error(`Error checking if ${filename} exists:`, error)
    return false
  }
}

async function savePDFToDatabase(doc: PDFDocument): Promise<boolean> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/pdf_documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        filename: doc.filename,
        blob_url: doc.blob_url,
        file_size: doc.file_size,
        extracted_text: doc.extracted_text,
        category: doc.category,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Failed to save ${doc.filename}:`, response.status, errorText)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error saving ${doc.filename}:`, error)
    return false
  }
}

async function migrateAxiaKnowledge() {
  console.log("🚀 Starting migration of Axia knowledge PDFs...\n")

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("❌ Missing Supabase credentials")
    return
  }

  try {
    // List all blobs in the Axia/axia_knowledge folder
    console.log(`📂 Listing PDFs in ${BLOB_FOLDER}...`)
    const { blobs } = await list({
      prefix: BLOB_FOLDER,
    })

    const pdfBlobs = blobs.filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))
    console.log(`Found ${pdfBlobs.length} PDF(s)\n`)

    if (pdfBlobs.length === 0) {
      console.log("⚠️  No PDFs found in the specified folder")
      return
    }

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const blob of pdfBlobs) {
      const filename = blob.pathname.split("/").pop() || blob.pathname
      console.log(`📄 Processing: ${filename}`)

      // Check if already exists
      const exists = await checkIfExists(filename)
      if (exists) {
        console.log(`   ⏭️  Already exists, skipping\n`)
        skipCount++
        continue
      }

      try {
        // Fetch the PDF from Blob storage
        console.log(`   ⬇️  Downloading...`)
        const response = await fetch(blob.url)
        if (!response.ok) {
          console.error(`   ❌ Failed to download: ${response.status}\n`)
          errorCount++
          continue
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Extract text
        console.log(`   📖 Extracting text...`)
        const extractedText = await extractTextFromPDF(buffer)
        console.log(`   ✓ Extracted ${extractedText.length} characters`)

        // Save to database
        console.log(`   💾 Saving to database...`)
        const saved = await savePDFToDatabase({
          filename,
          blob_url: blob.url,
          file_size: blob.size,
          extracted_text: extractedText,
          category: "knowledge-base",
        })

        if (saved) {
          console.log(`   ✅ Successfully migrated!\n`)
          successCount++
        } else {
          console.log(`   ❌ Failed to save\n`)
          errorCount++
        }
      } catch (error) {
        console.error(`   ❌ Error processing:`, error)
        errorCount++
      }
    }

    console.log("\n" + "=".repeat(50))
    console.log("📊 Migration Summary:")
    console.log("=".repeat(50))
    console.log(`✅ Successfully migrated: ${successCount}`)
    console.log(`⏭️  Skipped (already exists): ${skipCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📁 Total PDFs found: ${pdfBlobs.length}`)
    console.log("=".repeat(50))

    if (successCount > 0) {
      console.log("\n🎉 Your chatbot can now access these documents for Q&A!")
    }
  } catch (error) {
    console.error("\n❌ Migration failed:", error)
  }
}

// Run the migration
migrateAxiaKnowledge()
