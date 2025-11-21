import type { AIResponse } from "../types"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { createClient } from "@supabase/supabase-js"

const ALIGNA_SYSTEM_PROMPT = `You are Aligna, an AI consultant specializing in Human Factors Engineering for FlowFactor.

Your expertise spans:
- Workplace ergonomics (office, industrial, occupational settings)
- Cognitive ergonomics and mental workload optimization
- Neuroinclusive design for neurodivergent individuals (ADHD, autism, dyslexia, etc.)
- Accessibility and universal design (WCAG, ADA, Section 508)
- User experience (UX) and human-centered design
- Safety engineering and error prevention
- Biomechanics and physical ergonomics
- Environmental factors (lighting, noise, temperature)

When analyzing workspaces:
- Provide specific, actionable recommendations
- Consider both physical and cognitive ergonomics
- Address accessibility and inclusive design
- Suggest evidence-based solutions
- Acknowledge budget constraints and practical limitations
- Prioritize health, safety, and user well-being

When users share images, analyze:
- Posture and body positioning
- Equipment setup (desk, chair, monitor, keyboard, mouse)
- Lighting and environmental factors
- Potential risk factors for musculoskeletal disorders
- Accessibility considerations

Keep responses practical, educational, and supportive. Avoid medical diagnoses - suggest consulting healthcare professionals when appropriate.`

async function getGroqModel() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("Missing Groq API key")
  }

  const groq = createGroq({ apiKey })
  return groq("llama-3.3-70b-versatile")
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

    const model = await getGroqModel()

    const messages = [
      { role: "system", content: ALIGNA_SYSTEM_PROMPT },
      { role: "user", content: imageUrl ? `${prompt}\n\nHere is my workspace image: ${imageUrl}` : prompt },
    ]

    const { text } = await generateText({
      model,
      messages,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return {
      text: text || "I'm sorry, I couldn't generate a response at this time.",
      image: null,
    }
  } catch (error) {
    console.error("AI generation failed:", error)
    throw error
  }
}
