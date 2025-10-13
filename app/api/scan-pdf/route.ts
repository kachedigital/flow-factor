import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("POST request received at /api/scan-pdf")

    // Get the form data from the request
    const formData = await request.formData()
    console.log("FormData parsed successfully")

    // Get the file - try different field names that might be used
    let file = formData.get("pdf") as File
    if (!file) {
      file = formData.get("file") as File
    }

    console.log("File from formData:", file ? "Found" : "Not found")

    if (!file) {
      console.log("No file provided in request")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Safely get the filename with fallback
    const filename =
      file && typeof file === "object" && "name" in file ? file.name || "uploaded-file.pdf" : "uploaded-file.pdf"

    console.log(`Processing file: ${filename}`)

    // Simulate a successful response structure with actual filename
    const dummyResults = {
      scannedResource: `${filename} (minimal)`,
      aiCoachSummary: `This is a minimal test for ${filename}. PDF processing was bypassed.`,
      issues: [],
      criticalCount: 0,
      seriousCount: 0,
      moderateCount: 0,
      minorCount: 0,
      totalIssues: 0,
    }

    console.log("Returning successful response")
    return NextResponse.json(dummyResults, { status: 200 })
  } catch (error) {
    console.error("Error in scan-pdf API:", error)
    return NextResponse.json(
      {
        error: "Processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  console.log("GET request received at /api/scan-pdf")
  return NextResponse.json({ message: "This is the scan-pdf GET endpoint. Use POST to scan files." })
}
