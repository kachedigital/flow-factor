import { type NextRequest, NextResponse } from "next/server"
import { deleteDocument } from "@/lib/vector-store"

export async function DELETE(request: NextRequest) {
  try {
    const { fileName } = await request.json()

    if (!fileName) {
      return NextResponse.json({ error: "Missing fileName" }, { status: 400 })
    }

    await deleteDocument(fileName)

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${fileName} from knowledge base`,
    })
  } catch (error) {
    console.error("[v0] Error deleting document:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete document" },
      { status: 500 },
    )
  }
}
