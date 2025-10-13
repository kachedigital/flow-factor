"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Camera, Loader2 } from "lucide-react"
import { useRef } from "react"

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  isUploading: boolean
  disabled?: boolean
}

// Export as default to match the import in page.tsx
export function ImageUploader({ onImageUpload, isUploading, disabled }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageUpload(file)
    }
  }

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      <Button type="button" size="icon" variant="outline" onClick={handleClick} disabled={disabled || isUploading}>
        {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
      </Button>
    </>
  )
}
