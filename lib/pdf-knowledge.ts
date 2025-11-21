import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface PDFDocument {
  id: string
  filename: string
  blob_url: string
  uploaded_at: string
  file_size: number
  extracted_text: string | null
  category: "knowledge-base" | "analysis-only" | "procurement"
}

export async function savePDFToKnowledge(
  filename: string,
  blobUrl: string,
  fileSize: number,
  extractedText: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const urlPath = new URL(blobUrl).pathname
    const category = urlPath.includes("/knowledge-base/") ? "knowledge-base" : "analysis-only"

    console.log("[v0] Saving PDF with category:", category, "from URL:", blobUrl)

    const { error } = await supabase.from("pdf_documents").insert({
      filename,
      blob_url: blobUrl,
      file_size: fileSize,
      extracted_text: extractedText,
      category,
    })

    if (error) {
      console.error("[v0] Error saving PDF to knowledge base:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] PDF saved to knowledge base:", filename)
    return { success: true }
  } catch (error) {
    console.error("[v0] Exception saving PDF:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getKnowledgeBasePDFs(): Promise<PDFDocument[]> {
  try {
    const { data, error } = await supabase
      .from("pdf_documents")
      .select("*")
      .eq("category", "knowledge-base")
      .order("uploaded_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching knowledge base PDFs:", error)
      return []
    }

    return (data as PDFDocument[]) || []
  } catch (error) {
    console.error("[v0] Exception fetching knowledge base PDFs:", error)
    return []
  }
}

export async function getAllPDFDocuments(): Promise<PDFDocument[]> {
  try {
    const { data, error } = await supabase.from("pdf_documents").select("*").order("uploaded_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching PDFs:", error)
      return []
    }

    return (data as PDFDocument[]) || []
  } catch (error) {
    console.error("[v0] Exception fetching PDFs:", error)
    return []
  }
}

export async function updatePDFCategory(
  id: string,
  category: "knowledge-base" | "analysis-only" | "procurement",
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("pdf_documents").update({ category }).eq("id", id)

    if (error) {
      console.error("[v0] Error updating PDF category:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Exception updating PDF category:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function deletePDFDocument(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("pdf_documents").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting PDF:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Exception deleting PDF:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getProcurementPDFs(): Promise<PDFDocument[]> {
  try {
    const { data, error } = await supabase
      .from("pdf_documents")
      .select("*")
      .eq("category", "procurement")
      .order("uploaded_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching procurement PDFs:", error)
      return []
    }

    return (data as PDFDocument[]) || []
  } catch (error) {
    console.error("[v0] Exception fetching procurement PDFs:", error)
    return []
  }
}
