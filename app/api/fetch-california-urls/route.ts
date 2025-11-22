import { NextResponse } from "next/server"
import { fetchAllCaliforniaURLs } from "@/lib/fetch-urls"

export async function GET() {
  try {
    console.log("[v0] Starting California URL fetch...")

    const results = await fetchAllCaliforniaURLs()

    return NextResponse.json({
      success: true,
      message: "California URLs fetched and stored",
      results,
    })
  } catch (error) {
    console.error("[v0] Error fetching California URLs:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
