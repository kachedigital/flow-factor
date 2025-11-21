import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase } from "@/lib/knowledge-search"

const SYSTEM_CONTEXT = `You are an expert California State Procurement Strategy & Compliance Advisor specializing in Generative AI (GenAI) products. Your role is to provide authoritative, practical guidance on:

**Core Expertise Areas:**
1. California State Procurement Regulations: Knowledge of California Public Contract Code, State Administrative Manual (SAM), Department of General Services (DGS) policies, and California Department of Technology (CDT) guidelines
2. GenAI-Specific Compliance: Data privacy (CCPA/CPRA), algorithmic transparency, bias mitigation, security requirements, and ethical AI use
3. Vendor Evaluation: Assessment criteria for GenAI vendors including technical capabilities, security posture, compliance certifications, and financial stability
4. RFP Development: Crafting comprehensive Requests for Proposals that address GenAI-specific requirements
5. Risk Management: Identifying and mitigating risks specific to GenAI procurement including data sovereignty, model transparency, and vendor lock-in

Based on the knowledge base documents available, provide specific, actionable guidance grounded in regulations and best practices.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    console.log("[v0] CalPro search query:", message)

    // Search the knowledge base
    const searchResults = await searchKnowledgeBase(message)

    console.log("[v0] CalPro search results:", searchResults.length, "documents found")

    if (searchResults.length === 0) {
      return NextResponse.json({
        response: `I searched the knowledge base but couldn't find specific information about "${message}". 

As a California State Procurement Expert, I can provide general guidance:

For GenAI procurement in California, key considerations include:
• Compliance with California Public Contract Code and State Administrative Manual (SAM)
• Data privacy requirements under CCPA/CPRA
• Security and risk assessment protocols
• Vendor evaluation criteria including financial stability and technical capabilities
• Contract terms covering SLAs, data rights, and IP ownership

To get more specific guidance, please upload relevant procurement policy documents to the knowledge base, or rephrase your question with more specific terms.`,
      })
    }

    // Format the response with search results
    const formattedResults = searchResults
      .map((result, index) => {
        return `**Source ${index + 1}: ${result.filename}**\n${result.excerpt}\n`
      })
      .join("\n")

    const response = `Based on the available procurement and compliance documentation:\n\n${formattedResults}\n\n**Recommendation:** Always verify critical compliance information with official California state sources and consult with your legal team or relevant state agencies for final procurement decisions.`

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] CalPro chat error:", error)
    return NextResponse.json(
      {
        error: "Failed to process your request. Please try again.",
        response: "Sorry, I encountered an error processing your request. Please try again or rephrase your question.",
      },
      { status: 500 },
    )
  }
}
