import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase, formatSearchResults } from "@/lib/knowledge-search"

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

    console.log("[v0] Searching knowledge base directly...")

    try {
      const searchResults = await searchKnowledgeBase(message)
      console.log(`[v0] Found ${searchResults.length} relevant documents`)

      const response = formatSearchResults(searchResults, message)

      console.log("[v0] Returning search results")
      return NextResponse.json({ response })
    } catch (searchError) {
      console.error("[v0] Knowledge base search error:", searchError)

      const fallback = getFallbackResponse(message)
      if (fallback) {
        return NextResponse.json({
          response: fallback + "\n\n_Note: This is a cached response due to a search error._",
        })
      }

      return NextResponse.json({
        response:
          "I apologize, but I encountered an error searching the knowledge base. Please ensure the pdf_documents table exists and contains data.",
      })
    }
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
