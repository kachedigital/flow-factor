import { createClient } from "@/lib/supabase"

interface ScrapedContent {
  url: string
  title: string
  content: string
  scrapedAt: Date
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
