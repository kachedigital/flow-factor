import { NextResponse } from "next/server"
import { updatePDFCategory } from "@/lib/pdf-knowledge"

export async function POST(request: Request) {
  try {
    const { id, category } = await request.json()

    if (!id || !category) {
      return NextResponse.json({ error: "ID and category are required" }, { status: 400 })
    }

    if (category !== "knowledge-base" && category !== "analysis-only") {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    const result = await updatePDFCategory(id, category)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in update category route:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}
