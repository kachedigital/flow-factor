/**
 * URL Fetching Tool for CalPro
 * Fetches content from California government URLs and stores in Supabase knowledge base
 */

import * as cheerio from "cheerio"
import { createClient } from "@supabase/supabase-js"

interface URLConfig {
  url: string
  title: string
  category: string
}

const CALIFORNIA_URLS: URLConfig[] = [
  {
    url: "https://www.dgs.ca.gov/PD",
    title: "DGS Procurement Division",
    category: "procurement",
  },
  {
    url: "https://cdt.ca.gov/policy/",
    title: "CDT Policies",
    category: "procurement",
  },
  {
    url: "https://cdt.ca.gov/policy/simm/",
    title: "State Information Management Manual (SIMM)",
    category: "procurement",
  },
  {
    url: "https://www.dgs.ca.gov/PD/Resources",
    title: "DGS Procurement Resources",
    category: "procurement",
  },
  {
    url: "https://caleprocure.ca.gov/",
    title: "Cal eProcure Portal",
    category: "procurement",
  },
]

/**
 * Fetch and parse HTML content
 */
export async function fetchHTML(url: string): Promise<string> {
  console.log(`[v0] Fetching HTML: ${url}`)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style tags
    $("script, style, nav, footer, header").remove()

    // Extract main content
    let content = ""
    const mainSelectors = ["main", "article", ".content", "#content", ".main-content", "body"]

    for (const selector of mainSelectors) {
      const element = $(selector)
      if (element.length > 0) {
        content = element.text()
        break
      }
    }

    // Clean up whitespace
    content = content.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim()

    // Limit length
    if (content.length > 50000) {
      content = content.slice(0, 50000) + "\n\n[Content truncated due to length]"
    }

    console.log(`[v0] Fetched ${content.length} characters from ${url}`)
    return content
  } catch (error) {
    console.error(`[v0] Error fetching ${url}:`, error)
    throw error
  }
}

/**
 * Fetch content and store in Supabase
 */
export async function fetchAndStoreURL(config: URLConfig): Promise<boolean> {
  console.log(`[v0] Processing: ${config.title}`)
  console.log(`[v0] URL: ${config.url}`)

  try {
    // Fetch content
    const content = await fetchHTML(config.url)

    if (!content || content.length < 100) {
      console.error(`[v0] Content too short or empty for ${config.url}`)
      return false
    }

    // Initialize Supabase client
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Check if URL already exists
    const { data: existing } = await supabase.from("pdf_documents").select("id").eq("blob_url", config.url).limit(1)

    if (existing && existing.length > 0) {
      console.log(`[v0] URL already exists in knowledge base: ${config.url}`)
      return true
    }

    // Store in Supabase
    const { error } = await supabase.from("pdf_documents").insert({
      filename: config.title,
      blob_url: config.url,
      file_size: content.length,
      extracted_text: content,
      category: config.category,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error(`[v0] Error storing in Supabase:`, error)
      return false
    }

    console.log(`[v0] Successfully stored: ${config.title}`)
    return true
  } catch (error) {
    console.error(`[v0] Error processing ${config.url}:`, error)
    return false
  }
}

/**
 * Fetch all California government URLs
 */
export async function fetchAllCaliforniaURLs(): Promise<{
  success: number
  failed: number
  total: number
}> {
  console.log("[v0] Starting to fetch California government URLs...")

  let success = 0
  let failed = 0

  for (const config of CALIFORNIA_URLS) {
    console.log("-".repeat(60))

    const result = await fetchAndStoreURL(config)

    if (result) {
      success++
    } else {
      failed++
    }

    // Rate limiting: wait 2 seconds between requests
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  console.log("=".repeat(60))
  console.log(`[v0] Fetch complete: ${success} success, ${failed} failed, ${CALIFORNIA_URLS.length} total`)
  console.log("=".repeat(60))

  return {
    success,
    failed,
    total: CALIFORNIA_URLS.length,
  }
}
