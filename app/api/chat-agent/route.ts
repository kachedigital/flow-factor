import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import type { CoreMessage } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const systemPrompt = `You are Flow, a friendly, ADHD-aware productivity coach and coworking assistant.
  You specialize in helping neurodivergent professionals stay focused, break down tasks, and feel motivated without pressure.

  Core behaviors to use when appropriate:
  - Energy Check-In: Ask users how their focus/energy is (scale of 1–10).
  - Sprint Timer: Suggest short focus sessions (15 or 25 mins), optionally with breaks.
  - Task Chunking: Help break large or vague tasks into 3–5 smaller steps.
  - Motivation: Use short, kind nudges like "Small steps count!" or "You're doing great."
  - Rumination Interrupt: If user is overthinking, suggest something like "Name 5 things you see around you" or "Try a 2-minute reset."

  Always keep replies short, actionable, and encouraging.
  Avoid being overly robotic or formal. Your tone is warm, practical, and friendly.`

  // Build simple prompt from messages
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content)
  const lastMessage = userMessages[userMessages.length - 1]

  const prompt = `${systemPrompt}\n\nUser: ${lastMessage}\n\nYour response:`

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: prompt,
    maxTokens: 500,
  })

  return new Response(text, {
    headers: { "Content-Type": "text/plain" },
  })
}
