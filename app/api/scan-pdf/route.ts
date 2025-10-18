import { NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

export const runtime = "nodejs"
export const maxDuration = 60

interface AccessibilityIssue {
  id: string
  description: string
  severity: "critical" | "serious" | "moderate" | "minor"
  aiExplanation: string
  aiImpact: string
  aiFixSuggestion: string
  location?: {
    page?: number
    element?: string
  }
  helpUrl?: string
}

export async function POST(request: Request) {
  try {
    console.log("[v0] POST request received at /api/scan-pdf")

    const contentType = request.headers.get("content-type") || ""
    let pdfBuffer: Buffer
    let fileName = "document.pdf"
    let fileSize = 0

    if (contentType.includes("multipart/form-data")) {
      console.log("[v0] Processing multipart/form-data upload")
      const formData = await request.formData()
      const file = formData.get("pdf") as File | null

      if (!file) {
        console.error("[v0] No file provided in form data")
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      fileName = file.name
      fileSize = file.size
      const arrayBuffer = await file.arrayBuffer()
      pdfBuffer = Buffer.from(arrayBuffer)
      console.log(`[v0] File uploaded: ${fileName}, size: ${fileSize} bytes`)
    } else if (contentType.includes("application/json")) {
      console.log("[v0] Processing JSON with file URL")
      const body = await request.json()
      const { fileUrl, fileName: providedFileName } = body

      console.log("[v0] Received fileUrl:", fileUrl)
      console.log("[v0] Received fileName:", providedFileName)

      if (!fileUrl) {
        console.error("[v0] No file URL provided")
        return NextResponse.json({ error: "No file URL provided" }, { status: 400 })
      }

      fileName = providedFileName || "document.pdf"

      console.log("[v0] Fetching PDF from Blob URL...")
      try {
        const response = await fetch(fileUrl)

        console.log("[v0] Blob fetch response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Failed to fetch PDF from Blob URL:", response.status, errorText)
          return NextResponse.json(
            {
              error: "Failed to fetch PDF from storage",
              details: `HTTP ${response.status}: ${errorText}`,
            },
            { status: 400 },
          )
        }

        const arrayBuffer = await response.arrayBuffer()
        pdfBuffer = Buffer.from(arrayBuffer)
        fileSize = pdfBuffer.length
        console.log(`[v0] PDF fetched successfully: ${fileSize} bytes`)
      } catch (fetchError) {
        console.error("[v0] Error fetching PDF from Blob:", fetchError)
        return NextResponse.json(
          {
            error: "Failed to download PDF from storage",
            details: fetchError instanceof Error ? fetchError.message : "Unknown fetch error",
          },
          { status: 500 },
        )
      }
    } else {
      console.error("[v0] Invalid content type:", contentType)
      return NextResponse.json(
        { error: "Invalid content type. Use multipart/form-data or application/json" },
        { status: 400 },
      )
    }

    console.log(`[v0] Processing PDF: ${fileName}, size: ${fileSize} bytes`)

    // Validate that we have a PDF
    if (fileSize < 100) {
      console.error("[v0] File too small to be a valid PDF")
      return NextResponse.json({ error: "File is too small to be a valid PDF" }, { status: 400 })
    }

    // Check PDF magic number
    const pdfHeader = pdfBuffer.toString("utf8", 0, 5)
    if (!pdfHeader.startsWith("%PDF")) {
      console.error("[v0] File does not appear to be a PDF. Header:", pdfHeader)
      return NextResponse.json({ error: "File does not appear to be a valid PDF" }, { status: 400 })
    }

    const issues: AccessibilityIssue[] = []
    let issueIdCounter = 1

    // Common PDF accessibility issues
    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify document has proper title in metadata",
      severity: "serious",
      aiExplanation: "PDF documents should have a descriptive title in their metadata properties.",
      aiImpact:
        "Screen reader users and document management systems cannot easily identify the document. This affects WCAG 2.1 Level A (2.4.2 Page Titled).",
      aiFixSuggestion:
        "Add a descriptive title in the PDF document properties. In Adobe Acrobat: File > Properties > Description > Title.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify document language is specified",
      severity: "serious",
      aiExplanation: "PDFs should specify the language of their content in the document properties.",
      aiImpact:
        "Screen readers may not pronounce content correctly. This violates WCAG 2.1 Level A (3.1.1 Language of Page).",
      aiFixSuggestion:
        "Set the document language in PDF properties. In Adobe Acrobat: File > Properties > Advanced > Language.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify PDF is tagged for accessibility",
      severity: "critical",
      aiExplanation:
        "Tagged PDFs include structural information that screen readers need to navigate the document properly.",
      aiImpact:
        "Without tags, screen readers cannot identify headings, lists, tables, or reading order. This violates WCAG 2.1 Level A (1.3.1 Info and Relationships).",
      aiFixSuggestion:
        "Use Adobe Acrobat Pro to add tags: Tools > Accessibility > Add Tags to Document. Then verify and correct the tag structure.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify images have alternative text",
      severity: "critical",
      aiExplanation: "All images in PDFs must have alternative text descriptions for screen reader users.",
      aiImpact:
        "Screen reader users cannot access image content without alt text. This violates WCAG 2.1 Level A (1.1.1 Non-text Content).",
      aiFixSuggestion:
        "In Adobe Acrobat Pro, right-click each image and select 'Edit Alternate Text'. Provide descriptive text for meaningful images, mark decorative images as artifacts.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify reading order is logical",
      severity: "serious",
      aiExplanation: "Content must be read in a logical order by screen readers.",
      aiImpact:
        "If reading order is incorrect, screen readers will read content in the wrong sequence, confusing users.",
      aiFixSuggestion:
        "Verify and correct reading order in Adobe Acrobat Pro: Tools > Accessibility > Reading Order. Ensure logical flow from page to page.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify tables have proper structure",
      severity: "moderate",
      aiExplanation: "Tables must be properly tagged with headers to be accessible.",
      aiImpact:
        "Screen reader users cannot navigate table data properly without table structure tags (headers, rows, cells).",
      aiFixSuggestion:
        "Ensure tables are properly tagged in the PDF. Use Adobe Acrobat Pro to add table tags and define header rows/columns.",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
    })

    issues.push({
      id: `issue-${issueIdCounter++}`,
      description: "Verify color contrast meets WCAG standards",
      severity: "serious",
      aiExplanation: "Text must have sufficient contrast against its background (4.5:1 for normal text).",
      aiImpact: "Users with low vision or color blindness cannot read low-contrast text.",
      aiFixSuggestion:
        "Check color contrast using tools like the Colour Contrast Analyser. Adjust text or background colors to meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
    })

    // Generate AI summary
    let aiCoachSummary = ""
    try {
      console.log("[v0] Generating AI summary...")

      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      })

      const summaryPrompt = `You are an accessibility expert analyzing a PDF document.

Document: ${fileName}
File Size: ${(fileSize / 1024).toFixed(2)} KB

Provide a brief, encouraging summary (2-3 sentences) about PDF accessibility best practices and what the user should check. Be specific and actionable.`

      const { text: summary } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: summaryPrompt,
        maxTokens: 200,
      })

      aiCoachSummary = summary
      console.log("[v0] AI summary generated successfully")
    } catch (aiError) {
      console.error("[v0] AI summary generation failed:", aiError)
      aiCoachSummary = `This PDF requires manual accessibility testing. Use Adobe Acrobat Pro's Accessibility Checker (Tools > Accessibility > Full Check) to identify specific issues. Focus on ensuring the document is tagged, has alt text for images, and maintains proper reading order.`
    }

    // Count issues by severity
    const criticalCount = issues.filter((i) => i.severity === "critical").length
    const seriousCount = issues.filter((i) => i.severity === "serious").length
    const moderateCount = issues.filter((i) => i.severity === "moderate").length
    const minorCount = issues.filter((i) => i.severity === "minor").length

    // Calculate score based on file size and structure (simplified for MVP)
    const accessibilityScore = 50 // Start at 50 since we can't verify these items automatically

    const result = {
      scannedResource: fileName,
      aiCoachSummary,
      documentInfo: {
        title: fileName,
        pages: "Unknown (requires manual check)",
        pdfVersion: "Unknown",
        tagged: "Unknown (requires manual check)",
        hasText: "Unknown (requires manual check)",
        author: "Unknown",
        subject: "Not specified",
        fileSize: `${(fileSize / 1024).toFixed(2)} KB`,
      },
      accessibilityScore,
      issues,
      criticalCount,
      seriousCount,
      moderateCount,
      minorCount,
      totalIssues: issues.length,
      recommendations: [
        {
          title: "Use Adobe Acrobat Pro for Full Analysis",
          description:
            "Run Adobe Acrobat Pro's Accessibility Checker (Tools > Accessibility > Full Check) to get a comprehensive report of all accessibility issues in your PDF.",
        },
        {
          title: "Test with Screen Readers",
          description:
            "Automated tools catch only 30-40% of accessibility issues. Test your PDF with NVDA (Windows) or VoiceOver (Mac) to ensure real-world usability.",
        },
        {
          title: "Consider HTML Alternatives",
          description:
            "For complex documents, consider providing an HTML version alongside the PDF for better accessibility and mobile compatibility.",
        },
      ],
    }

    console.log(`[v0] Analysis complete. Score: ${accessibilityScore}, Issues: ${issues.length}`)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in scan-pdf API:", error)
    return NextResponse.json(
      {
        error: "Processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PDF Accessibility Checker API",
    usage: "POST a PDF file using multipart/form-data with field name 'pdf', or POST JSON with {fileUrl, fileName}",
  })
}
