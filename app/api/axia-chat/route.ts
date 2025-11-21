import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { getKnowledgeBasePDFs } from "@/lib/pdf-knowledge"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const AXIA_SYSTEM_CONTEXT = `You are Axia, an expert web accessibility consultant and WCAG specialist.

Your expertise includes:
- WCAG 2.1/2.2 guidelines (A, AA, AAA levels)
- ADA compliance and Section 508 standards
- Accessible HTML/ARIA best practices
- Screen reader compatibility
- Keyboard navigation patterns
- Color contrast and visual design
- Accessible forms and interactive elements
- Testing tools and techniques
- Accessible PDF documents
- Mobile accessibility

When provided with relevant documentation from the knowledge base, reference it in your answers.
Provide clear, actionable advice with specific examples. Reference WCAG success criteria when applicable.
Keep responses concise (2-4 paragraphs) but thorough. Use bullet points for lists when appropriate.

Be encouraging and constructive. Focus on practical solutions that can be implemented immediately.`

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Axia chat API called")

    const { message } = await request.json()
    console.log("[v0] Received message:", message)

    if (!message || typeof message !== "string") {
      console.error("[v0] Invalid message format")
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    console.log("[v0] Fetching PDFs from knowledge base...")
    let contextText = ""

    try {
      const pdfs = await getKnowledgeBasePDFs()
      console.log(`[v0] Found ${pdfs.length} knowledge base PDFs`)

      if (pdfs.length > 0) {
        contextText = "\n\nKNOWLEDGE BASE (PDF Documents):\n\n"
        for (const pdf of pdfs) {
          if (pdf.extracted_text) {
            // Limit text to first 2000 chars per PDF to avoid token limits
            const textPreview = pdf.extracted_text.substring(0, 2000)
            contextText += `Document: ${pdf.filename}\n${textPreview}\n\n---\n\n`
          }
        }
      }
    } catch (error) {
      console.error("[v0] Error fetching knowledge base PDFs:", error)
    }

    const prompt = `${AXIA_SYSTEM_CONTEXT}${contextText}

User Question: ${message}

Provide a helpful, actionable answer. If relevant information is available in the knowledge base documents above, reference it in your response.`

    console.log("[v0] Calling generateText with Groq...")
    console.log("[v0] Prompt length:", prompt.length)

    let text: string | undefined
    try {
      const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: prompt,
        maxTokens: 1000,
        temperature: 0.7,
      })
      text = result.text
      console.log("[v0] generateText completed")
      console.log("[v0] Response text length:", text?.length || 0)
      console.log("[v0] Full result object:", JSON.stringify(result, null, 2))
    } catch (groqError) {
      console.error("[v0] Groq API error:", groqError)
      return NextResponse.json({
        response:
          "I apologize, but I'm experiencing technical difficulties with my AI service. This could be due to API rate limits or connectivity issues. Please try again in a moment.",
      })
    }

    if (!text || text.trim().length === 0) {
      console.error("[v0] Empty response from Groq API")
      return NextResponse.json({
        response:
          "I received your question but wasn't able to generate a complete response. The knowledge base shows 0 PDFs loaded. Please ensure the pdf_documents table is populated by running the migration script, then try again.",
      })
    }

    console.log("[v0] Returning successful response")
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Axia chat error:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      {
        response:
          "I apologize, but I encountered an error. The knowledge base is currently empty (0 PDFs loaded). Please run the migration script to load your PDFs from the Blob storage into the database.",
      },
      { status: 200 },
    )
  }
}
