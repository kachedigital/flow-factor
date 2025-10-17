import { NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"
// @ts-ignore - pdf-parse doesn't have types
import pdf from "pdf-parse"

export const runtime = "nodejs"
export const maxDuration = 60

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

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

    if (contentType.includes("multipart/form-data")) {
      // Direct file upload
      const formData = await request.formData()
      const file = formData.get("pdf") as File | null

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      fileName = file.name
      const arrayBuffer = await file.arrayBuffer()
      pdfBuffer = Buffer.from(arrayBuffer)
    } else if (contentType.includes("application/json")) {
      // Supabase URL
      const body = await request.json()
      const { fileUrl, fileName: providedFileName } = body

      if (!fileUrl) {
        return NextResponse.json({ error: "No file URL provided" }, { status: 400 })
      }

      fileName = providedFileName || "document.pdf"

      // Fetch the PDF from Supabase
      const response = await fetch(fileUrl)
      if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch PDF from URL" }, { status: 400 })
      }

      const arrayBuffer = await response.arrayBuffer()
      pdfBuffer = Buffer.from(arrayBuffer)
    } else {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    console.log(`[v0] Processing PDF: ${fileName}, size: ${pdfBuffer.length} bytes`)

    let pdfData: any
    try {
      pdfData = await pdf(pdfBuffer)
      console.log(`[v0] PDF parsed successfully: ${pdfData.numpages} pages, ${pdfData.text.length} characters`)
    } catch (parseError) {
      console.error("[v0] PDF parsing error:", parseError)
      return NextResponse.json({ error: "Failed to parse PDF file" }, { status: 400 })
    }

    const issues: AccessibilityIssue[] = []
    let issueIdCounter = 1

    // Check 1: Document has text content
    const hasText = pdfData.text && pdfData.text.trim().length > 0
    if (!hasText) {
      issues.push({
        id: `issue-${issueIdCounter++}`,
        description: "PDF appears to be image-only (no extractable text)",
        severity: "critical",
        aiExplanation:
          "This PDF contains no extractable text, which means it's likely a scanned document or image-based PDF without OCR.",
        aiImpact:
          "Screen reader users cannot access any content in this document. This violates WCAG 2.1 Level A (1.1.1 Non-text Content).",
        aiFixSuggestion:
          "Run OCR (Optical Character Recognition) on the PDF to make text searchable and accessible. Use Adobe Acrobat Pro or similar tools to add a text layer.",
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
      })
    }

    // Check 2: Document metadata
    const hasTitle = pdfData.info && pdfData.info.Title && pdfData.info.Title.trim().length > 0
    if (!hasTitle) {
      issues.push({
        id: `issue-${issueIdCounter++}`,
        description: "PDF missing document title in metadata",
        severity: "serious",
        aiExplanation: "The PDF document properties do not include a title, making it harder to identify the document.",
        aiImpact:
          "Screen reader users and document management systems cannot easily identify the document. This affects WCAG 2.1 Level A (2.4.2 Page Titled).",
        aiFixSuggestion:
          "Add a descriptive title in the PDF document properties. In Adobe Acrobat: File > Properties > Description > Title.",
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html",
      })
    }

    // Check 3: Document language
    const hasLanguage = pdfData.info && pdfData.info.Language
    if (!hasLanguage) {
      issues.push({
        id: `issue-${issueIdCounter++}`,
        description: "PDF missing language specification",
        severity: "serious",
        aiExplanation: "The PDF does not specify the language of its content in the document properties.",
        aiImpact:
          "Screen readers may not pronounce content correctly. This violates WCAG 2.1 Level A (3.1.1 Language of Page).",
        aiFixSuggestion:
          "Set the document language in PDF properties. In Adobe Acrobat: File > Properties > Advanced > Language.",
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html",
      })
    }

    // Check 4: Analyze text content for potential issues
    if (hasText) {
      const text = pdfData.text.toLowerCase()

      // Check for URLs without context
      const urlPattern = /(https?:\/\/[^\s]+)/gi
      const urls = pdfData.text.match(urlPattern) || []
      if (urls.length > 5) {
        issues.push({
          id: `issue-${issueIdCounter++}`,
          description: "Multiple bare URLs found in text",
          severity: "moderate",
          aiExplanation:
            "The document contains many raw URLs that may not have descriptive link text when converted to accessible formats.",
          aiImpact:
            "Screen reader users hear the full URL instead of descriptive link text, making navigation difficult.",
          aiFixSuggestion:
            "Use descriptive hyperlinks instead of bare URLs. For example, use 'Visit our website' instead of 'https://example.com'.",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html",
        })
      }

      // Check for potential table content without structure
      const hasTableIndicators =
        text.includes("table") || text.includes("row") || text.includes("column") || /\t.*\t/.test(pdfData.text)
      if (hasTableIndicators) {
        issues.push({
          id: `issue-${issueIdCounter++}`,
          description: "Potential table content detected",
          severity: "moderate",
          aiExplanation:
            "The document appears to contain tabular data. Without proper table tags, this content may not be accessible.",
          aiImpact:
            "Screen reader users cannot navigate table data properly without table structure tags (headers, rows, cells).",
          aiFixSuggestion:
            "Ensure tables are properly tagged in the PDF. Use Adobe Acrobat Pro to add table tags and define header rows/columns.",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
        })
      }

      // Check for potential list content
      const listPattern = /^\s*[\d•\-*]\s+/gm
      const listMatches = pdfData.text.match(listPattern) || []
      if (listMatches.length > 5) {
        issues.push({
          id: `issue-${issueIdCounter++}`,
          description: "Potential list content detected",
          severity: "minor",
          aiExplanation:
            "The document appears to contain lists. Without proper list tags, screen readers cannot announce list structure.",
          aiImpact: "Screen reader users miss important structural information about lists and their items.",
          aiFixSuggestion:
            "Ensure lists are properly tagged in the PDF. Use Adobe Acrobat Pro to add list tags (L, LI, Lbl, LBody).",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
        })
      }
    }

    // Check 5: Document length and reading order
    if (pdfData.numpages > 10) {
      issues.push({
        id: `issue-${issueIdCounter++}`,
        description: "Multi-page document - verify reading order",
        severity: "minor",
        aiExplanation:
          "This is a multi-page document. Reading order must be properly defined for screen readers to navigate correctly.",
        aiImpact:
          "If reading order is incorrect, screen readers will read content in the wrong sequence, confusing users.",
        aiFixSuggestion:
          "Verify and correct reading order in Adobe Acrobat Pro: Tools > Accessibility > Reading Order. Ensure logical flow from page to page.",
        helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html",
      })
    }

    let aiCoachSummary = ""
    try {
      const summaryPrompt = `You are an accessibility expert analyzing a PDF document. 

Document: ${fileName}
Pages: ${pdfData.numpages}
Has Text: ${hasText ? "Yes" : "No"}
Has Title: ${hasTitle ? "Yes" : "No"}
Issues Found: ${issues.length}

Provide a brief, encouraging summary (2-3 sentences) about the document's accessibility status. If there are issues, prioritize the most important ones. Be specific and actionable.`

      const { text: summary } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: summaryPrompt,
        maxTokens: 200,
      })

      aiCoachSummary = summary
    } catch (aiError) {
      console.error("[v0] AI summary generation failed:", aiError)
      // Fallback summary
      if (issues.length === 0) {
        aiCoachSummary = `Great work! This ${pdfData.numpages}-page PDF has no major accessibility issues detected by our automated checks. However, manual testing with screen readers is recommended for complete WCAG compliance.`
      } else {
        aiCoachSummary = `Found ${issues.length} accessibility ${issues.length === 1 ? "issue" : "issues"} in this ${pdfData.numpages}-page PDF. Focus on the critical and serious issues first to make the biggest impact on accessibility.`
      }
    }

    // Count issues by severity
    const criticalCount = issues.filter((i) => i.severity === "critical").length
    const seriousCount = issues.filter((i) => i.severity === "serious").length
    const moderateCount = issues.filter((i) => i.severity === "moderate").length
    const minorCount = issues.filter((i) => i.severity === "minor").length

    let accessibilityScore = 100
    accessibilityScore -= criticalCount * 25
    accessibilityScore -= seriousCount * 15
    accessibilityScore -= moderateCount * 10
    accessibilityScore -= minorCount * 5
    accessibilityScore = Math.max(0, accessibilityScore)

    const result = {
      scannedResource: fileName,
      aiCoachSummary,
      documentInfo: {
        title: pdfData.info?.Title || "Untitled",
        pages: pdfData.numpages,
        pdfVersion: pdfData.version || "Unknown",
        tagged: false, // pdf-parse doesn't provide this info easily
        hasText,
        author: pdfData.info?.Author || "Unknown",
        subject: pdfData.info?.Subject || "Not specified",
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
          title: "Use Adobe Acrobat Pro for Remediation",
          description:
            "Adobe Acrobat Pro provides comprehensive tools for making PDFs accessible, including tag editing, reading order adjustment, and accessibility checking.",
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
