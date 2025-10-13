"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { uploadFile, getFileUrl, supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, Check, LogIn, UserIcon, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import LoginForm from "@/components/auth/login-form"

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

interface CurrentUser {
  id: string
  email?: string
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
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!supabase) {
          console.error("Supabase client not available")
          setLoading(false)
          return
        }

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("Auth check failed:", error)
        } else {
          setCurrentUser(user)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setCurrentUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      if (!supabase) {
        toast({
          title: "Error",
          description: "Authentication service not available",
          variant: "destructive",
        })
        return
      }

      await supabase.auth.signOut()
      setCurrentUser(null)
      setFiles([])
      setUploadedFiles([])
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

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

    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload files",
        variant: "destructive",
      })
      return
    }

    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload files",
        variant: "destructive",
      })
      setShowLogin(true)
      return
    }

    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    const uploadPromises = files.map(async (file, index) => {
      if (!file || !file.name) {
        console.error(`Invalid file at index ${index}`)
        return null
      }

      const fileName = `${currentUser.id}/${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`

      try {
        const { data, error } = await uploadFile(bucket, fileName, file)

        if (error) throw error

        const url = getFileUrl(bucket, fileName)
        const uploadedFile: UploadedFile = {
          name: file.name,
          url,
          size: file.size || 0,
          type: file.type || "unknown",
          uploadedAt: new Date(),
        }

        setUploadProgress((prev) => prev + 100 / files.length)

        if (onUploadComplete) {
          onUploadComplete(url, fileName)
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

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${successfulUploads.length} file(s)`,
      })
    } catch (error) {
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

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentUser) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Authentication Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showLogin ? (
            <div className="space-y-4">
              <LoginForm />
              <Button variant="outline" onClick={() => setShowLogin(false)} className="w-full">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Please sign in to upload files. Your files will be securely stored and only accessible to you.
              </p>
              <Button onClick={() => setShowLogin(true)} className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In to Upload Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload
          </div>
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4" />
            <span className="text-muted-foreground">{currentUser.email || "User"}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
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
