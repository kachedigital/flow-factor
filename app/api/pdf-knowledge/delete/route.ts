import { NextResponse } from "next/server"
import { deletePDFDocument } from "@/lib/pdf-knowledge"

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const result = await deletePDFDocument(id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting PDF:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
