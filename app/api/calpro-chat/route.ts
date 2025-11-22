import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase } from "@/lib/knowledge-search"
import { extractURLsFromMessage, scrapeURL, cacheScrapedContent, determineRelevantURLs } from "@/lib/web-scraper"
import { calproSystemPrompt } from "@/lib/calpro-system-prompt"
import { streamText, convertToModelMessages, type UIMessage } from "ai"
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
You have access to a comprehensive knowledge base of California state procurement documents, policies, and guidelines. I always search this knowledge base automatically to provide you with accurate, sourced information.

${knowledgeContext}${urlContext}${attachmentContext}

## How to Respond
- **Be conversational and engaging**: You're a helpful colleague, not a robot. Use "I" and "we" language naturally.
- **Don't just dump text**: Synthesize information into a clear, structured response with insights and recommendations.
- **Cite sources naturally**: Instead of just listing documents, reference them conversationally (e.g., "According to SCM Vol II Section 3.A, we need to...")
- **Provide actionable guidance**: Always give clear next steps and practical advice.
- **Be proactive**: Anticipate follow-up questions and offer additional insights.
- **Show personality**: Be warm, supportive, and encouraging while maintaining professionalism.
- **Structure your responses**: Use clear sections, bullet points, and formatting for readability.

Remember: You're an assistant helping a colleague succeed, not just returning search results. Be helpful, insightful, and engaging!`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages }: { messages: UIMessage[] } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]
    const userMessage =
      typeof lastMessage.content === "string" ? lastMessage.content : lastMessage.content[0]?.text || ""

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    console.log("[v0] CalPro query:", userMessage)

    const [searchResults, userProvidedURLs] = await Promise.all([
      searchKnowledgeBase(userMessage, "procurement"),
      extractURLsFromMessage(userMessage),
    ])

    console.log("[v0] Searching procurement knowledge base, found", searchResults.length, "PDFs")
    console.log("[v0] Found user-provided California government URLs:", userProvidedURLs)

    let attachmentContext = ""
    if (messages[messages.length - 1]?.experimental_attachments) {
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

    const scrapedContent: string[] = []

    if (userProvidedURLs.length > 0) {
      for (const url of userProvidedURLs) {
        const scraped = await scrapeURL(url)
        if (scraped) {
          scrapedContent.push(`**Source: ${scraped.title}**\n${scraped.url}\n\n${scraped.content}`)
          await cacheScrapedContent(scraped)
        }
      }
    }

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

    const contextualPrompt = buildSystemContext(knowledgeContext, urlContext, attachmentContext)

    let model
    if (process.env.GROQ_API_KEY) {
      model = groq("llama-3.3-70b-versatile")
    } else if (process.env.OPENAI_API_KEY) {
      model = openai("gpt-4o-mini")
    } else {
      return NextResponse.json(
        { error: "No AI API keys configured. Please add GROQ_API_KEY or OPENAI_API_KEY to environment variables." },
        { status: 500 },
      )
    }

    const result = streamText({
      model,
      system: contextualPrompt,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 2000,
      temperature: 0.7,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] CalPro chat error:", error)
    return NextResponse.json(
      {
        error: "Failed to process your request. Please try again.",
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
