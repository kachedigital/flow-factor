"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  bucket?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
  onUploadComplete?: (url: string, fileName: string) => void
  className?: string
}

interface UploadedFile {
  name: string
  url: string
  size: number
  type: string
  uploadedAt: Date
}

export function FileUpload({
  bucket = "pdf-documents",
  maxSize = 10,
  acceptedTypes = ["image/*", "application/pdf", ".doc", ".docx"],
  onUploadComplete,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const validateFile = (file: File | null): string | null => {
    if (!file) {
      return "Invalid file"
    }

    // Ensure file has required properties
    if (typeof file.size !== "number" || typeof file.name !== "string") {
      return "Invalid file object"
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }

    // Check file type with null safety
    const fileType = file.type || ""
    const fileName = file.name || ""

    const isValidType = acceptedTypes.some((type) => {
      if (type.includes("*")) {
        return fileType.startsWith(type.replace("*", ""))
      }
      return fileType === type || fileName.toLowerCase().endsWith(type)
    })

    if (!isValidType) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(", ")}`
    }

    return null
  }

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles: File[] = []
    const errors: string[] = []

    Array.from(selectedFiles).forEach((file, index) => {
      if (!file) {
        errors.push(`File ${index + 1}: Invalid file object`)
        return
      }

      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name || `File ${index + 1}`}: ${error}`)
      } else {
        newFiles.push(file)
      }
    })

    if (errors.length > 0) {
      toast({
        title: "File validation errors",
        description: errors.join("\n"),
        variant: "destructive",
      })
    }

    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    const uploadPromises = files.map(async (file, index) => {
      if (!file || !file.name) {
        console.error(`Invalid file at index ${index}`)
        return null
      }

      try {
        // Upload to Vercel Blob using the upload API
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Upload failed: ${errorText}`)
        }

        const { url } = await response.json()

        const uploadedFile: UploadedFile = {
          name: file.name,
          url,
          size: file.size || 0,
          type: file.type || "unknown",
          uploadedAt: new Date(),
        }

        setUploadProgress((prev) => prev + 100 / files.length)

        if (onUploadComplete) {
          onUploadComplete(url, file.name)
        }

        return uploadedFile
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          variant: "destructive",
        })
        return null
      }
    })

    try {
      const results = await Promise.all(uploadPromises)
      const successfulUploads = results.filter(Boolean) as UploadedFile[]

      setUploadedFiles((prev) => [...prev, ...successfulUploads])
      setFiles([])

      if (successfulUploads.length > 0) {
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${successfulUploads.length} file(s)`,
        })
      }
    } catch (error) {
      console.error("Upload batch error:", error)
      toast({
        title: "Upload failed",
        description: "Some files failed to upload",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            "hover:border-primary hover:bg-primary/5",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Drag and drop files here, or click to select</p>
          <p className="text-sm text-muted-foreground mb-4">
            Max file size: {maxSize}MB. Accepted types: {acceptedTypes.join(", ")}
          </p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            Select Files
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Selected Files:</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span className="text-sm">{file?.name || "Unknown file"}</span>
                  <span className="text-xs text-muted-foreground">({formatFileSize(file?.size || 0)})</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={uploadFiles} disabled={uploading} className="w-full">
              {uploading ? "Uploading..." : `Upload ${files.length} file(s)`}
            </Button>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Uploaded Files:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-green-50">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
