import { createServerClient } from "@/lib/supabase"

export interface CalProDocument {
  id: string
  filename: string
  extracted_text: string
  category: string
}

export async function searchCalProKnowledgeBase(query: string): Promise<CalProDocument[]> {
  try {
    const supabase = createServerClient()

    // Search using PostgreSQL full-text search
    const { data, error } = await supabase
      .from("calpro_documents")
      .select("id, filename, extracted_text, category")
      .textSearch("extracted_text", query, {
        type: "websearch",
        config: "english",
      })
      .limit(5)

    if (error) {
      console.error("[v0] CalPro search error:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] CalPro search exception:", error)
    return []
  }
}

export function formatCalProSearchResults(results: CalProDocument[], query: string): string {
  if (results.length === 0) {
    return `I searched the California procurement knowledge base but couldn't find specific information about "${query}". 

Here's what I can help you with:
- California State Administrative Manual (SAM) guidance
- State Contracting Manual (SCM) procedures
- State Information Management Manual (SIMM) for IT procurement
- GenAI procurement compliance and data privacy
- Contract templates and RFP development

Try rephrasing your question or ask about a specific procurement topic. For example, ask about "IT procurement processes" or "GenAI vendor evaluation criteria".`
  }

  let response = `Based on California procurement documents, here's what I found regarding "${query}":\n\n`

  results.forEach((doc, index) => {
    const snippet = doc.extracted_text.substring(0, 500).trim()
    response += `**${index + 1}. From ${doc.filename}:**\n\n${snippet}...\n\n`
  })

  response += `\n💡 **Next Steps:** Review these sections for detailed guidance, or ask me to clarify specific requirements.\n\n`
  response += `_Found in ${results.length} procurement document(s)_`

  return response
}
