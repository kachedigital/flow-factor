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
    } catch (groqError) {
      console.error("[v0] Groq API error:", groqError)
      text =
        "I apologize, but I'm experiencing technical difficulties connecting to my AI service. Please try again in a moment. If the issue persists, the knowledge base may not be fully set up yet."
    }

    if (!text || text.trim().length === 0) {
      console.error("[v0] No text in result!")
      return NextResponse.json({
        response:
          "I apologize, but I wasn't able to generate a response. This might be because the knowledge base is still being set up. Please try again in a moment.",
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
          "I apologize, but I encountered an error processing your request. Please try again. If the issue persists, the knowledge base may need to be set up.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 200 }, // Return 200 so client displays the message instead of generic error
    )
  }
}
