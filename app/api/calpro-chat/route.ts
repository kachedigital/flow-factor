import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase, formatSearchResults } from "@/lib/knowledge-search"
import {
  extractURLsFromMessage,
  scrapeURL,
  cacheScrapedContent,
  determineRelevantURLs, // Import new function
} from "@/lib/web-scraper"

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

    const userProvidedURLs = extractURLsFromMessage(message)
    const scrapedContent: string[] = []

    if (userProvidedURLs.length > 0) {
      console.log("[v0] Found user-provided California government URLs:", userProvidedURLs)

      for (const url of userProvidedURLs) {
        const scraped = await scrapeURL(url)
        if (scraped) {
          scrapedContent.push(`**Source: ${scraped.title}**\n${scraped.url}\n\n${scraped.content}`)
          await cacheScrapedContent(scraped)
        }
      }
    }

    const searchResults = await searchKnowledgeBase(message, "procurement")
    console.log("[v0] CalPro search results:", searchResults.length, "documents found")

    if (searchResults.length === 0 && userProvidedURLs.length === 0) {
      console.log("[v0] No knowledge base results, searching California government websites...")
      const relevantURLs = determineRelevantURLs(message)
      console.log("[v0] Identified relevant California government URLs:", relevantURLs)

      for (const url of relevantURLs) {
        const scraped = await scrapeURL(url)
        if (scraped) {
          // Check if the scraped content is relevant to the query
          const contentLower = scraped.content.toLowerCase()
          const messageLower = message.toLowerCase()
          const keywords = messageLower.split(/\s+/).filter((word) => word.length > 3)
          const relevanceScore = keywords.filter((keyword) => contentLower.includes(keyword)).length

          if (relevanceScore > 0) {
            scrapedContent.push(
              `**Source: ${scraped.title}**\n${scraped.url}\n\n${scraped.content.substring(0, 2000)}...`,
            )
            await cacheScrapedContent(scraped)
          }
        }
      }
    }

    if (scrapedContent.length > 0) {
      let response = `Based on current California government resources, here's what I found:\n\n${scrapedContent.join("\n\n---\n\n")}`

      if (searchResults.length > 0) {
        const additionalContext = formatSearchResults(searchResults, message)
        response +=
          "\n\n**Additional context from procurement knowledge base:**\n\n" +
          additionalContext +
          "\n\n**Note:** This information has been cached and will be available for future searches. Always verify critical compliance information with official California state sources."
      } else {
        response +=
          "\n\n**Note:** This information has been scraped from official California government websites and cached for future reference. Always verify critical compliance information with the original sources."
      }

      return NextResponse.json({ response })
    }

    if (searchResults.length === 0) {
      return NextResponse.json({
        response: `I searched both the procurement knowledge base and relevant California government websites but couldn't find specific information about "${message}". 

As a California State Procurement Expert, I can provide general guidance:

For GenAI procurement in California, key considerations include:
• Compliance with California Public Contract Code and State Administrative Manual (SAM)
• Data privacy requirements under CCPA/CPRA
• Security and risk assessment protocols
• Vendor evaluation criteria including financial stability and technical capabilities
• Contract terms covering SLAs, data rights, and IP ownership

**To get more specific guidance:** Upload California procurement policy documents to the knowledge base, or try rephrasing your question with more specific terms.`,
      })
    }

    const response = formatSearchResults(searchResults, message)

    return NextResponse.json({
      response:
        response +
        "\n\n**Recommendation:** Always verify critical compliance information with official California state sources and consult with your legal team or relevant state agencies for final procurement decisions.",
    })
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
