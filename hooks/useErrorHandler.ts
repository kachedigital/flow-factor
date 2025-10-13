"use client"

import { useToast } from "@/components/ui/use-toast"

export function useErrorHandler() {
  const { toast } = useToast()

  const handleError = (error: unknown, customMessage?: string) => {
    console.error("Error:", error)

    let errorMessage = customMessage || "An unexpected error occurred"

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === "string") {
      errorMessage = error
    }

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    })

    return errorMessage
  }

  return { handleError }
}
