import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface DocumentChunk {
  id: string
  text: string
  metadata: {
    fileName: string
    pageNumber?: number
    chunkIndex: number
    uploadedAt: string
  }
  embedding: number[]
}

export async function generateEmbedding(text: string): Promise<number[]> {
  throw new Error("Embeddings temporarily disabled - OpenAI quota exceeded")
}

export async function storeDocumentChunks(chunks: Omit<DocumentChunk, "id">[]): Promise<void> {
  throw new Error("Document storage temporarily disabled - OpenAI quota exceeded")
}

export async function searchSimilarDocuments(query: string, limit = 5): Promise<DocumentChunk[]> {
  console.log("[v0] Knowledge base search disabled - no embeddings available")
  return []
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

export function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap
  }

  return chunks
}

export async function listDocuments(): Promise<string[]> {
  const documentIds = await redis.zrange("documents:all", 0, -1)
  const uniqueFileNames = new Set<string>()

  for (const id of documentIds) {
    const doc = await redis.hgetall(id as string)
    if (doc && doc.metadata) {
      const metadata = JSON.parse(doc.metadata as string)
      uniqueFileNames.add(metadata.fileName)
    }
  }

  return Array.from(uniqueFileNames)
}

export async function deleteDocument(fileName: string): Promise<void> {
  const documentIds = await redis.zrange("documents:all", 0, -1)
  const pipeline = redis.pipeline()

  for (const id of documentIds) {
    if ((id as string).includes(fileName)) {
      pipeline.del(id as string)
      pipeline.zrem("documents:all", id as string)
    }
  }

  await pipeline.exec()
}
