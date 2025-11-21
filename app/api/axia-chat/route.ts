import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { getKnowledgeBasePDFs } from "@/lib/pdf-knowledge"

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

const FALLBACK_RESPONSES: Record<string, string> = {
  aria: `ARIA (Accessible Rich Internet Applications) labels provide additional context to assistive technologies like screen readers. Use ARIA labels when:

• The visible text doesn't fully describe an element's purpose (e.g., icon-only buttons)
• You need to provide additional context (aria-describedby)
• Labeling form inputs where visible labels aren't possible
• Creating custom interactive widgets

Key ARIA attributes:
- aria-label: Provides a label directly on the element
- aria-labelledby: References another element's text as the label
- aria-describedby: Provides additional descriptive text
- aria-hidden: Hides decorative elements from screen readers

Best practice: Always prefer visible text labels over ARIA when possible. ARIA should enhance, not replace, semantic HTML.`,

  contrast: `Color contrast ensures text is readable for users with low vision or color blindness. WCAG requirements:

• Level AA (minimum): 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)
• Level AAA (enhanced): 7:1 for normal text, 4.5:1 for large text

Use tools like WebAIM's Contrast Checker or browser DevTools to verify. Consider:
- Text on backgrounds (including images)
- UI component states (hover, focus, active)
- Meaningful graphics and icons

Tip: Don't rely on color alone to convey information - use text, patterns, or icons alongside color.`,
}

function getFallbackResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("aria") && (lowerMessage.includes("label") || lowerMessage.includes("when"))) {
    return FALLBACK_RESPONSES.aria
  }

  if (lowerMessage.includes("contrast") || lowerMessage.includes("color")) {
    return FALLBACK_RESPONSES.contrast
  }

  return null
}

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
    let pdfCount = 0

    try {
      const pdfs = await getKnowledgeBasePDFs()
      pdfCount = pdfs.length
      console.log(`[v0] Found ${pdfCount} knowledge base PDFs`)

      if (pdfs.length > 0) {
        contextText = "\n\nKNOWLEDGE BASE (PDF Documents):\n\n"
        for (const pdf of pdfs) {
          if (pdf.extracted_text) {
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
    console.log("[v0] Knowledge base PDFs loaded:", pdfCount)

    let text: string | undefined
    try {
      const result = await generateText({
        model: "groq/llama-3.3-70b-versatile",
        prompt: prompt,
        maxTokens: 1000,
        temperature: 0.7,
      })

      text = result.text
      console.log("[v0] generateText completed")
      console.log("[v0] Response text length:", text?.length || 0)

      if (!text || text.trim().length === 0) {
        console.log("[v0] Groq returned empty response, trying fallback...")
        const fallback = getFallbackResponse(message)

        if (fallback) {
          console.log("[v0] Using fallback response")
          return NextResponse.json({
            response:
              fallback +
              "\n\n_Note: This is a cached response. The AI service returned an empty result. For more detailed answers, please ensure your knowledge base is populated and the Groq API is functioning properly._",
          })
        }

        return NextResponse.json({
          response: `I received your question about accessibility, but I'm currently unable to generate a detailed response. This could be due to:

• The Groq API returning an empty response (possibly rate limited)
• The knowledge base is empty (${pdfCount} PDFs loaded)

To fix this:
1. Run the migration script to load PDFs from your Blob storage into the database
2. Verify your Groq API key is valid and has remaining credits
3. Try rephrasing your question

In the meantime, I recommend checking the WCAG documentation at w3.org/WAI for accessibility guidance.`,
        })
      }
    } catch (groqError) {
      console.error("[v0] Groq API error:", groqError)

      const fallback = getFallbackResponse(message)
      if (fallback) {
        return NextResponse.json({
          response: fallback + "\n\n_Note: This is a cached response due to an AI service error._",
        })
      }

      return NextResponse.json({
        response:
          "I apologize, but I'm experiencing technical difficulties with my AI service. This could be due to API rate limits or connectivity issues. Please try again in a moment, or check that your Groq API key is configured correctly.",
      })
    }

    console.log("[v0] Returning successful response")
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Axia chat error:", error)

    return NextResponse.json(
      {
        response:
          "I apologize, but I encountered an unexpected error. Please ensure the pdf_documents table exists in your database and try again.",
      },
      { status: 200 },
    )
  }
}
