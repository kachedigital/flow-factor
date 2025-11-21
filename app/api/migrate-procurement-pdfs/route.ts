import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Starting procurement PDF migration...")

    const { blobs } = await list({
      prefix: "CalPro/procurement_knowledge/",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })

    const pdfBlobs = blobs.filter((blob) => blob.pathname.toLowerCase().endsWith(".pdf"))
    console.log(`[v0] Found ${pdfBlobs.length} procurement PDFs to process`)

    const results = {
      totalFound: pdfBlobs.length,
      successfullyLoaded: 0,
      skipped: 0,
      errors: 0,
      details: [] as string[],
    }

    for (const blob of pdfBlobs) {
      const filename = blob.pathname.split("/").pop() || blob.pathname
      console.log(`[v0] Processing procurement PDF: ${filename}`)

      try {
        // Download the PDF
        const response = await fetch(blob.url)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Extract text using simple text extraction
        const text = buffer.toString("utf8")

        // Insert into database with procurement category
        const { error } = await supabase.from("pdf_documents").insert({
          filename,
          blob_url: blob.url,
          file_size: blob.size,
          extracted_text: text,
          category: "procurement", // Procurement-specific category
        })

        if (error) {
          if (error.code === "23505") {
            console.log(`[v0] Skipping duplicate: ${filename}`)
            results.skipped++
            results.details.push(`Skipped (duplicate): ${filename}`)
          } else {
            console.error(`[v0] Error inserting ${filename}:`, error)
            results.errors++
            results.details.push(`Error: ${filename} - ${error.message}`)
          }
        } else {
          console.log(`[v0] Successfully loaded: ${filename}`)
          results.successfullyLoaded++
          results.details.push(`Loaded: ${filename}`)
        }
      } catch (error) {
        console.error(`[v0] Error processing ${filename}:`, error)
        results.errors++
        results.details.push(`Error: ${filename} - ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    console.log("[v0] Procurement migration complete:", results)

    return NextResponse.json({
      success: true,
      message: "Procurement PDF migration completed",
      results,
    })
  } catch (error) {
    console.error("[v0] Migration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
