import { createClient } from "@/lib/supabase"

interface ScrapedContent {
  url: string
  title: string
  content: string
  scrapedAt: Date
}

const CA_PROCUREMENT_URLS: Record<string, string[]> = {
  // General procurement resources
  general: [
    "https://www.dgs.ca.gov/PD",
    "https://www.dgs.ca.gov/PD/Resources/Page-Content/Procurement-Division-Resources-List-Folder/Buying-Manuals",
  ],
  // GenAI and technology-specific
  genai: [
    "https://cdt.ca.gov/policy/",
    "https://cdt.ca.gov/technology-innovation/",
    "https://www.dgs.ca.gov/PD/Resources/Page-Content/Procurement-Division-Resources-List-Folder/IT-Procurement",
  ],
  // Compliance and policy
  compliance: [
    "https://www.dgs.ca.gov/PD/Resources/Page-Content/Procurement-Division-Resources-List-Folder/Statutes-Policies-Regs",
    "https://www.documents.dgs.ca.gov/dgs/fmc/gs/sam/SamPrint.pdf",
  ],
  // RFP and contracts
  rfp: [
    "https://www.dgs.ca.gov/PD/Resources/Page-Content/Procurement-Division-Resources-List-Folder/Forms",
    "https://www.dgs.ca.gov/PD/Resources/Page-Content/Procurement-Division-Resources-List-Folder/Standard-Contracts",
  ],
  // Data privacy and security
  privacy: ["https://cdt.ca.gov/security/", "https://oag.ca.gov/privacy/ccpa"],
}

export async function scrapeURL(url: string): Promise<ScrapedContent | null> {
  try {
    console.log("[v0] Scraping URL:", url)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "CalPro-Bot/1.0 (California State Procurement Assistant)",
      },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch URL:", response.status, response.statusText)
      return null
    }

    const html = await response.text()

    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    const title = titleMatch ? titleMatch[1] : url

    // Extract text content (remove HTML tags and scripts)
    let content = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    // Limit content size to prevent database issues
    if (content.length > 50000) {
      content = content.substring(0, 50000) + "... (content truncated)"
    }

    return {
      url,
      title,
      content,
      scrapedAt: new Date(),
    }
  } catch (error) {
    console.error("[v0] Error scraping URL:", error)
    return null
  }
}

export async function cacheScrapedContent(scraped: ScrapedContent): Promise<boolean> {
  try {
    const supabase = createClient()

    // Check if URL already exists
    const { data: existing } = await supabase.from("pdf_documents").select("id").eq("blob_url", scraped.url).limit(1)

    if (existing && existing.length > 0) {
      console.log("[v0] URL already cached:", scraped.url)
      return true
    }

    // Insert scraped content as a document
    const { error } = await supabase.from("pdf_documents").insert({
      filename: scraped.title || scraped.url,
      blob_url: scraped.url,
      extracted_text: scraped.content,
      category: "procurement",
      file_size: scraped.content.length,
    })

    if (error) {
      console.error("[v0] Error caching scraped content:", error)
      return false
    }

    console.log("[v0] Successfully cached URL:", scraped.url)
    return true
  } catch (error) {
    console.error("[v0] Error caching scraped content:", error)
    return false
  }
}

export function extractURLsFromMessage(message: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const urls = message.match(urlRegex) || []

  // Filter for California government URLs
  return urls.filter((url) => {
    const lowerUrl = url.toLowerCase()
    return (
      lowerUrl.includes("ca.gov") ||
      lowerUrl.includes("california.gov") ||
      lowerUrl.includes("dgs.ca.gov") ||
      lowerUrl.includes("cdt.ca.gov")
    )
  })
}

export function determineRelevantURLs(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const relevantURLs: string[] = []

  // GenAI-related queries
  if (
    lowerMessage.includes("genai") ||
    lowerMessage.includes("generative ai") ||
    lowerMessage.includes("artificial intelligence") ||
    lowerMessage.includes("ai") ||
    lowerMessage.includes("technology")
  ) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.genai)
  }

  // RFP-related queries
  if (
    lowerMessage.includes("rfp") ||
    lowerMessage.includes("request for proposal") ||
    lowerMessage.includes("contract") ||
    lowerMessage.includes("draft")
  ) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.rfp)
  }

  // Compliance-related queries
  if (
    lowerMessage.includes("compliance") ||
    lowerMessage.includes("regulation") ||
    lowerMessage.includes("policy") ||
    lowerMessage.includes("requirement") ||
    lowerMessage.includes("law")
  ) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.compliance)
  }

  // Privacy/security-related queries
  if (
    lowerMessage.includes("privacy") ||
    lowerMessage.includes("data") ||
    lowerMessage.includes("security") ||
    lowerMessage.includes("ccpa") ||
    lowerMessage.includes("cpra")
  ) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.privacy)
  }

  // Vendor evaluation
  if (
    lowerMessage.includes("vendor") ||
    lowerMessage.includes("evaluate") ||
    lowerMessage.includes("assessment") ||
    lowerMessage.includes("selection")
  ) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.general)
  }

  // Default: add general procurement resources
  if (relevantURLs.length === 0) {
    relevantURLs.push(...CA_PROCUREMENT_URLS.general.slice(0, 2))
  }

  // Remove duplicates and limit to top 3 URLs
  return [...new Set(relevantURLs)].slice(0, 3)
}
