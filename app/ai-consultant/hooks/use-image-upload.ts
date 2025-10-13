"use client"

import { useState } from "react"

export function useImageUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (file: File) => {
setIsUploading(true)
try{
// Set the image file
      setImage(file)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const clearImage = () => {
    setImage(null)
  }

  return {
    image,
    isUploading,
    handleImageUpload,
    clearImage,
  }
}
