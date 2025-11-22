import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase, formatSearchResults } from "@/lib/knowledge-search"
import { extractURLsFromMessage, scrapeURL, cacheScrapedContent, determineRelevantURLs } from "@/lib/web-scraper"
import { calproSystemPrompt } from "@/lib/calpro-system-prompt"
import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

const ollama = createOpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
})

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "",
})

export const maxDuration = 30

const buildSystemContext = (knowledgeContext: string, urlContext: string, attachmentContext: string) => {
  return `${calproSystemPrompt}

## Current Context
You have access to a knowledge base containing California state procurement documents, policies, and guidelines. When answering questions, reference specific documents when available.

${knowledgeContext}${urlContext}${attachmentContext}

Remember to:
- Cite specific sources (SCM Vol II sections, Executive Orders, PCC sections, duty statements, job descriptions)
- Provide actionable guidance with clear next steps
- Highlight compliance requirements and potential risks
- Treat the user as a colleague seeking expert advice
- Always remind users to verify critical information with their department's legal/procurement teams`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, messages, modelProvider = "keyword" } = body

    const userMessage = message || (messages && messages[messages.length - 1]?.content) || ""

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    console.log("[v0] CalPro query:", userMessage)

    let attachmentContext = ""
    if (messages && messages[messages.length - 1]?.experimental_attachments) {
      const attachments = messages[messages.length - 1].experimental_attachments

      for (const attachment of attachments) {
        if (attachment.type === "url" && attachment.url) {
          const content = await fetchUrlContent(attachment.url)
          attachmentContext += `\n\n${content}\n`
        } else if (attachment.type === "pdf" && attachment.name) {
          attachmentContext += `\n\n[PDF Document: ${attachment.name}]\n`
        }
      }
    }

    const userProvidedURLs = extractURLsFromMessage(userMessage)
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

    const searchResults = await searchKnowledgeBase(userMessage, "procurement")
    console.log("[v0] CalPro search results:", searchResults.length, "documents found")

    if (searchResults.length === 0 && userProvidedURLs.length === 0) {
      console.log("[v0] No knowledge base results, searching California government websites...")
      const relevantURLs = determineRelevantURLs(userMessage)
      console.log("[v0] Identified relevant California government URLs:", relevantURLs)

      for (const url of relevantURLs) {
        const scraped = await scrapeURL(url)
        if (scraped) {
          const contentLower = scraped.content.toLowerCase()
          const messageLower = userMessage.toLowerCase()
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

    let knowledgeContext = ""
    if (searchResults.length > 0) {
      knowledgeContext = "\n\n## Knowledge Base Documents\n\n"
      searchResults.forEach((result: any) => {
        knowledgeContext += `### ${result.filename}\nRelevance: ${result.relevance.toFixed(2)}\n\n${result.excerpt}\n\n---\n\n`
      })
    }

    let urlContext = ""
    if (scrapedContent.length > 0) {
      urlContext = "\n\n## California Government Resources\n\n" + scrapedContent.join("\n\n---\n\n")
    }

    if (messages && modelProvider !== "keyword") {
      const contextualPrompt = buildSystemContext(knowledgeContext, urlContext, attachmentContext)

      let model
      if (modelProvider === "local") {
        model = ollama("llama3")
      } else if (modelProvider === "groq") {
        if (!process.env.GROQ_API_KEY) {
          return NextResponse.json(
            { error: "Groq API Key missing. Switch to OpenAI or Keyword mode." },
            { status: 400 },
          )
        }
        model = groq("llama-3.3-70b-versatile")
      } else if (modelProvider === "openai") {
        if (!process.env.OPENAI_API_KEY) {
          return NextResponse.json(
            { error: "OpenAI API Key missing. Switch to Groq or Keyword mode." },
            { status: 400 },
          )
        }
        model = openai("gpt-4o-mini")
      } else {
        // Fallback to keyword search
        const response = formatSearchResults(searchResults, userMessage)
        return NextResponse.json({ response })
      }

      const result = streamText({
        model,
        system: contextualPrompt,
        messages: messages.slice(0, -1).concat([{ role: "user", content: userMessage }]),
        maxTokens: 2000,
        temperature: 0.7,
      })

      return result.toTextStreamResponse()
    }

    if (scrapedContent.length > 0) {
      let response = `Based on current California government resources, here's what I found:\n\n${scrapedContent.join("\n\n---\n\n")}`

      if (searchResults.length > 0) {
        const additionalContext = formatSearchResults(searchResults, userMessage)
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
        response: `I searched both the procurement knowledge base and relevant California government websites but couldn't find specific information about "${userMessage}". 

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

    const response = formatSearchResults(searchResults, userMessage)

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

async function fetchUrlContent(url: string): Promise<string> {
  try {
    const scraped = await scrapeURL(url)
    if (scraped) {
      await cacheScrapedContent(scraped)
      return `**Source: ${scraped.title}**\n${scraped.url}\n\n${scraped.content.substring(0, 5000)}`
    }
    return `[Error fetching URL: ${url}]`
  } catch (error) {
    return `[Error fetching URL: ${url}]`
  }
}
