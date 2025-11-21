"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Trash2, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PDFDocument {
  id: string
  filename: string
  blob_url: string
  uploaded_at: string
  file_size: number
  category: "knowledge-base" | "analysis-only"
}

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<PDFDocument[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedFolder, setSelectedFolder] = useState<"knowledge-base" | "uploads">("knowledge-base")
  const { toast } = useToast()

  useEffect(() => {
    loadDocuments()
  }, [])

  async function loadDocuments() {
    try {
      const response = await fetch("/api/pdf-knowledge/list")
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", selectedFolder)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file")
      }

      const { url, fileName } = await uploadResponse.json()

      const scanResponse = await fetch("/api/scan-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: url, fileName }),
      })

      if (!scanResponse.ok) {
        throw new Error("Failed to process PDF")
      }

      const folderName = selectedFolder === "knowledge-base" ? "Knowledge Base" : "Uploads"
      toast({
        title: "Success",
        description: `${fileName} added to ${folderName}`,
      })

      loadDocuments()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload document",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string, filename: string) {
    try {
      const response = await fetch("/api/pdf-knowledge/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      toast({
        title: "Success",
        description: `${filename} removed from knowledge base`,
      })

      loadDocuments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Upload PDFs to the knowledge-base folder for AI chatbot access, or to uploads folder for storage only.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Choose a folder and upload your PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={selectedFolder === "knowledge-base" ? "default" : "outline"}
                  onClick={() => setSelectedFolder("knowledge-base")}
                >
                  Knowledge Base (Used by AI)
                </Button>
                <Button
                  variant={selectedFolder === "uploads" ? "default" : "outline"}
                  onClick={() => setSelectedFolder("uploads")}
                >
                  Uploads (Storage Only)
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button asChild disabled={uploading} className="relative">
                  <label className="cursor-pointer">
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload to {selectedFolder === "knowledge-base" ? "Knowledge Base" : "Uploads"}
                      </>
                    )}
                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                </Button>
                <p className="text-sm text-muted-foreground">PDF files only</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents ({documents.length})</CardTitle>
            <CardDescription>View all uploaded documents and their storage location</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded</p>
                <p className="text-sm">Upload a PDF to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium block">{doc.filename}</span>
                        <span className="text-xs text-muted-foreground">
                          {(doc.file_size / 1024).toFixed(2)} KB • {new Date(doc.uploaded_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.category === "knowledge-base" ? "default" : "secondary"}>
                        {doc.category === "knowledge-base" ? "Knowledge Base" : "Uploads"}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id, doc.filename)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
