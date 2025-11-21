import { getKnowledgeBasePDFs, getProcurementPDFs } from "./pdf-knowledge"

export interface SearchResult {
  filename: string
  relevance: number
  excerpts: string[]
  pdfId: string
}

export async function searchKnowledgeBase(
  query: string,
  category: "accessibility" | "procurement" = "accessibility",
): Promise<SearchResult[]> {
  const pdfs = category === "procurement" ? await getProcurementPDFs() : await getKnowledgeBasePDFs()

  console.log(`[v0] Searching ${category} knowledge base, found ${pdfs.length} PDFs`)

  if (pdfs.length === 0) {
    return []
  }

  // Extract keywords from query
  const keywords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3) // Filter out short words like "the", "and", etc.

  if (keywords.length === 0) {
    return []
  }

  const results: SearchResult[] = []

  for (const pdf of pdfs) {
    if (!pdf.extracted_text) continue

    const text = pdf.extracted_text.toLowerCase()
    let relevance = 0
    const excerpts: string[] = []

    // Count keyword matches for relevance scoring
    for (const keyword of keywords) {
      const matches = (text.match(new RegExp(keyword, "g")) || []).length
      relevance += matches
    }

    if (relevance > 0) {
      // Extract relevant excerpts (context around keywords)
      const sentences = pdf.extracted_text.match(/[^.!?]+[.!?]+/g) || []

      for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase()
        const hasKeyword = keywords.some((kw) => lowerSentence.includes(kw))

        if (hasKeyword && excerpts.length < 3) {
          excerpts.push(sentence.trim())
        }
      }

      results.push({
        filename: pdf.filename,
        relevance,
        excerpts,
        pdfId: pdf.id,
      })
    }
  }

  // Sort by relevance (highest first)
  results.sort((a, b) => b.relevance - a.relevance)

  return results.slice(0, 5) // Return top 5 results
}

export function formatSearchResults(results: SearchResult[], query: string): string {
  if (results.length === 0) {
    return `I searched the knowledge base but couldn't find specific information about "${query}". 

The knowledge base currently has PDFs loaded, but none contain matching information. You may want to:
• Try different keywords or rephrasing your question
• Check if the relevant PDFs have been uploaded to the knowledge base
• Verify the PDF text extraction was successful`
  }

  let response = `Based on the knowledge base, here's what I found about "${query}":\n\n`

  for (const result of results) {
    response += `**${result.filename}**\n\n`

    for (const excerpt of result.excerpts) {
      response += `• ${excerpt}\n\n`
    }

    response += `---\n\n`
  }

  response += `\n_This information was found by searching ${results.length} relevant document(s) from the knowledge base._`

  return response
}
