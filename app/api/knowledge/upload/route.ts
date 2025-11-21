import { type NextRequest, NextResponse } from "next/server"
import { chunkText, generateEmbedding, storeDocumentChunks } from "@/lib/vector-store"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Knowledge upload request received")

    const body = await request.json()
    const { fileUrl, fileName, text } = body

    if (!text || !fileName) {
      return NextResponse.json({ error: "Missing required fields: text, fileName" }, { status: 400 })
    }

    console.log("[v0] Processing document:", fileName)
    console.log("[v0] Text length:", text.length)

    // Split text into chunks
    const textChunks = chunkText(text, 1000, 200)
    console.log("[v0] Created", textChunks.length, "chunks")

    // Generate embeddings and prepare document chunks
    const documentChunks = []
    for (let i = 0; i < textChunks.length; i++) {
      console.log(`[v0] Generating embedding for chunk ${i + 1}/${textChunks.length}`)
      const embedding = await generateEmbedding(textChunks[i])

      documentChunks.push({
        text: textChunks[i],
        metadata: {
          fileName,
          chunkIndex: i,
          uploadedAt: new Date().toISOString(),
        },
        embedding,
      })
    }

    // Store in vector database
    console.log("[v0] Storing document chunks in vector database")
    await storeDocumentChunks(documentChunks)

    console.log("[v0] Document successfully added to knowledge base")

    return NextResponse.json({
      success: true,
      message: `Successfully added ${fileName} to knowledge base`,
      chunksCreated: textChunks.length,
    })
  } catch (error) {
    console.error("[v0] Knowledge upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process document" },
      { status: 500 },
    )
  }
}
