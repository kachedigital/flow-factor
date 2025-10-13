import { type NextRequest, NextResponse } from "next/server"
import { generateAIResponse } from "../../lib/ai-service"

// Simple function to log errors with more context
function logError(message: string, error: any) {
  console.error(`[AI-CONSULTANT] ${message}:`, error)
  console.error(`[AI-CONSULTANT] Error type: ${typeof error}`)
  if (error instanceof Error) {
    console.error(`[AI-CONSULTANT] Error name: ${error.name}`)
    console.error(`[AI-CONSULTANT] Error message: ${error.message}`)
    console.error(`[AI-CONSULTANT] Error stack: ${error.stack}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data with robust error handling
    let prompt = ""
    let imageFile: File | null = null

    try {
      const formData = await request.formData()
      prompt = (formData.get("prompt") as string) || ""
      const imageData = formData.get("image")
      imageFile = imageData && typeof imageData === "object" && "type" in imageData ? (imageData as File) : null
    } catch (formError) {
      logError("Error parsing form data", formError)
      return NextResponse.json(
        { text: "I'm having trouble understanding your request. Could you try again?" },
        { status: 400 },
      )
    }

    // Generate response using OpenAI
    try {
      const response = await generateAIResponse(prompt, imageFile || undefined)
      return NextResponse.json(response, { status: 200 })
    } catch (aiError) {
      logError("Error generating AI response", aiError)
      return NextResponse.json(
        {
          text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    logError("Unhandled error in generate route", error)

    return NextResponse.json(
      {
        text: "I apologize for the technical difficulties. Our system is experiencing some issues. Please try again later.",
      },
      { status: 500 },
    )
  }
}

// Set a longer timeout for the function
export const maxDuration = 60
