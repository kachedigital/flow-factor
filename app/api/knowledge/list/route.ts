import { NextResponse } from "next/server"
import { listDocuments } from "@/lib/vector-store"

export async function GET() {
  try {
    const documents = await listDocuments()
    return NextResponse.json({ documents })
  } catch (error) {
    console.error("[v0] Error listing documents:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list documents" },
      { status: 500 },
    )
  }
}
