import type { AIResponse } from "../types"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"

// System prompt for the AI assistant
const ALIGNA_SYSTEM_PROMPT = `You are Aligna, an AI ergonomics consultant for FlowFactor.
Your role is to provide personalized workspace ergonomics advice to help users create healthier, more comfortable work environments.
Focus on practical, evidence-based recommendations for improving posture, reducing strain, and optimizing workspace setup.
Be friendly, supportive, and educational in your responses.
When users share images of their workspace, analyze the setup and provide specific suggestions for improvement.
Always prioritize health and comfort while acknowledging budget constraints and practical limitations.
Avoid medical diagnoses or treatment recommendations - suggest consulting healthcare professionals when appropriate.
Keep responses concise, practical, and actionable.`

function isValidOpenAIKey(key: string): boolean {
  return key.startsWith("sk-") && key.length > 20
}

async function getOpenAIModel() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || !isValidOpenAIKey(apiKey)) {
    throw new Error("Invalid or missing OpenAI API key")
  }

  const modelName = process.env.OPENAI_MODEL || "gpt-4o"
  return openai(modelName)
}

async function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) return null

  return createClient(url, key)
}

async function uploadImageToStorage(file: File): Promise<string | null> {
  if (!file || !file.type || !file.name) {
    console.error("Invalid file object provided")
    return null
  }

  try {
    const supabase = await getSupabaseClient()
    if (!supabase) return null

    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `ergonomic-assessments/${fileName}`

    const { error } = await supabase.storage.from("user-uploads").upload(filePath, file)
    if (error) {
      console.error("Supabase upload error:", error)
      return null
    }

    const { data: urlData } = supabase.storage.from("user-uploads").getPublicUrl(filePath)
    return urlData.publicUrl
  } catch (err) {
    console.error("Upload error:", err)
    return null
  }
}

export async function generateAIResponse(prompt: string, image?: File): Promise<AIResponse> {
  try {
    let imageUrl: string | null = null

    if (image && image.type && image.size) {
      try {
        imageUrl = await uploadImageToStorage(image)
      } catch (uploadError) {
        console.warn("Continuing without image upload:", uploadError)
      }
    }

    const model = await getOpenAIModel()

    const messages = [
      { role: "system", content: ALIGNA_SYSTEM_PROMPT },
      { role: "user", content: imageUrl ? `${prompt}\n\nHere is my workspace image: ${imageUrl}` : prompt },
    ]

    const { text } = await generateText({
      model,
      messages,
      maxTokens: 800,
    })

    return {
      text: text || "I'm sorry, I couldn't generate a response at this time.",
      image: null,
    }
  } catch (error) {
    console.error("OpenAI call failed:", error)
    throw error
  }
}
