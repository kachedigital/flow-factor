import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { searchSimilarDocuments } from "@/lib/vector-store"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_CONTEXT = `You are a FlowFactor AI assistant specializing in Human Factors Engineering (HFE). 

Your expertise includes:
- Ergonomics and workplace design
- Cognitive ergonomics and mental workload
- Accessibility and inclusive design (WCAG, ADA compliance)
- User experience (UX) and usability
- Safety and error prevention
- Neuroinclusive design for neurodivergent individuals
- Human-computer interaction
- Workplace wellness and productivity

Provide concise, practical, evidence-based advice. Keep responses brief (2-3 paragraphs max) since this is a quick chat interface.

Be friendly, professional, and educational. Focus on actionable recommendations that improve human well-being and system performance.`

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Chat assistant API called")

    const { message } = await request.json()
    console.log("[v0] Received message:", message)

    if (!message || typeof message !== "string") {
      console.error("[v0] Invalid message format")
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    let knowledgeContext = ""
    try {
      console.log("[v0] Searching knowledge base...")
      const relevantDocs = await searchSimilarDocuments(message, 3)

      if (relevantDocs.length > 0) {
        console.log(`[v0] Found ${relevantDocs.length} relevant documents`)
        knowledgeContext = "\n\nRelevant information from knowledge base:\n"
        relevantDocs.forEach((doc, index) => {
          knowledgeContext += `\n[Source ${index + 1}: ${doc.metadata.fileName}]\n${doc.text}\n`
        })
      } else {
        console.log("[v0] No relevant documents found in knowledge base")
      }
    } catch (searchError) {
      console.error("[v0] Knowledge base search error:", searchError)
      // Continue without knowledge base context
    }

    const fullPrompt = `${SYSTEM_CONTEXT}${knowledgeContext}\n\nUser question: ${message}\n\nYour response:`

    console.log("[v0] Calling generateText with Groq...")

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: fullPrompt,
      maxTokens: 500,
    })

    console.log("[v0] generateText completed")
    console.log("[v0] Response text length:", text?.length || 0)

    if (!text || text.trim().length === 0) {
      console.error("[v0] No text in result!")
      return NextResponse.json({ error: "No response generated" }, { status: 500 })
    }

    console.log("[v0] Returning successful response")
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Chat assistant error:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
