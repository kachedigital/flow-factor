import { NextResponse } from "next/server"
import { getAllPDFDocuments } from "@/lib/pdf-knowledge"

export async function GET() {
  try {
    const documents = await getAllPDFDocuments()
    return NextResponse.json({ documents })
  } catch (error) {
    console.error("[v0] Error listing PDFs:", error)
    return NextResponse.json({ error: "Failed to list documents", documents: [] }, { status: 500 })
  }
}
