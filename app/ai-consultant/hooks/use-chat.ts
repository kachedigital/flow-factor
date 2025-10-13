"use client"

import { useState } from "react"
import type { Message } from "../types"
import { useToast } from "@/components/ui/use-toast"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sendMessage = async (content: string, image?: File) => {
    if (content.trim() === "" && !image) return

    try {
      setIsLoading(true)

      // Add user message to chat
      const userMessage: Message = {
        role: "user",
        content: content,
        image: image ? URL.createObjectURL(image) : undefined,
      }

      setMessages((prev) => [...prev, userMessage])

      // Create form data for API request
      const formData = new FormData()
      formData.append("prompt", content)
      if (image) {
        formData.append("image", image)
      }

      // Call the API with timeout
      let responseText = ""
      let responseImage = null

      try {
        // Set up timeout for fetch
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

        const response = await fetch("/ai-consultant/api/generate", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId))

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        responseText = data.text || "I'm sorry, I couldn't generate a response."
        responseImage = data.image
      } catch (apiError) {
        console.error("API call failed:", apiError)

        // Show toast notification
        toast({
          title: "Connection issue",
          description: "There was a problem connecting to the AI service. Please try again.",
          variant: "destructive",
          duration: 5000,
        })

        throw apiError
      }

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText,
          generatedImage: responseImage,
        },
      ])
    } catch (error) {
      console.error("Error in chat process:", error)

      // Add a fallback message so the user isn't left hanging
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having technical difficulties right now. Please try again in a moment.",
        },
      ])

      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetChat = () => {
    setMessages([])
  }

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
  }
}
