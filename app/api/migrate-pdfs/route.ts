import { createClient } from "@supabase/supabase-js"
import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function extractTextFromPDF(pdfUrl: string): Promise<string> {
  try {
    const response = await fetch(pdfUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Simple text extraction - get readable characters
    const text = buffer.toString("utf-8")
    const cleanText = text.replace(/[^\x20-\x7E\n]/g, " ").trim()

    return cleanText.substring(0, 100000) // Limit to 100KB of text
  } catch (error) {
    console.error(`Error extracting text from ${pdfUrl}:`, error)
    return ""
  }
}

export async function GET() {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if table exists
    const { error: tableError } = await supabase.from("pdf_documents").select("*").limit(1)

    if (tableError) {
      return NextResponse.json(
        {
          error: "pdf_documents table doesn't exist",
          message: "Please create the table in Supabase dashboard first",
        },
        { status: 400 },
      )
    }

    // List PDFs from Blob storage
    const { blobs } = await list({
      prefix: "Axia/axia_knowledge/",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    const pdfBlobs = blobs.filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))

    if (pdfBlobs.length === 0) {
      return NextResponse.json({
        message: "No PDFs found in Axia/axia_knowledge/ folder",
        found: 0,
        loaded: 0,
        skipped: 0,
        errors: 0,
      })
    }

    let successCount = 0
    let skipCount = 0
    let errorCount = 0
    const results: any[] = []

    for (const blob of pdfBlobs) {
      const filename = blob.pathname.split("/").pop() || blob.pathname

      try {
        // Extract text from PDF
        console.log(`[v0] Processing: ${filename}`)
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
          // Check if it's a duplicate error
          if (error.code === "23505" || error.message.includes("duplicate")) {
            skipCount++
            results.push({ filename, status: "skipped", reason: "already exists" })
          } else {
            errorCount++
            results.push({ filename, status: "error", error: error.message })
          }
        } else {
          successCount++
          results.push({
            filename,
            status: "success",
            size: `${(blob.size / 1024).toFixed(2)} KB`,
          })
        }
      } catch (error: any) {
        errorCount++
        results.push({ filename, status: "error", error: error.message })
      }
    }

    return NextResponse.json({
      message: "Migration complete",
      found: pdfBlobs.length,
      loaded: successCount,
      skipped: skipCount,
      errors: errorCount,
      results,
    })
  } catch (error: any) {
    return NextResponse.json({ error: "Migration failed", message: error.message }, { status: 500 })
  }
}
