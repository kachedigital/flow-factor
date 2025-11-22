import { type NextRequest, NextResponse } from "next/server"
import { searchCalProKnowledgeBase, formatCalProSearchResults } from "@/lib/calpro-knowledge-search"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] CalPro chat API called")

    const { messages } = await request.json()

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
    console.log("[v0] Searching CalPro knowledge base...")

    try {
      const searchResults = await searchCalProKnowledgeBase(userMessage)
      console.log(`[v0] Found ${searchResults.length} relevant procurement documents`)

      const response = formatCalProSearchResults(searchResults, userMessage)

      console.log("[v0] Returning CalPro search results")
      return NextResponse.json({ response })
    } catch (searchError) {
      console.error("[v0] CalPro knowledge base search error:", searchError)

      return NextResponse.json({
        response:
          "I apologize, but I encountered an error searching the procurement knowledge base. Please ensure the calpro_documents table exists and contains procurement data. You can create it by running the SQL script in scripts/create-calpro-table.sql",
      })
    }
  } catch (error) {
    console.error("[v0] CalPro chat error:", error)

    return NextResponse.json(
      {
        response:
          "I apologize, but I encountered an unexpected error. Please ensure the calpro_documents table exists in your database and try again.",
      },
      { status: 200 },
    )
  }
}
