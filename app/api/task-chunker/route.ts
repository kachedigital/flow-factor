import { openai } from "@ai-sdk/openai"

// Route: /api/task-chunker
export const runtime = "edge"

export async function POST(req: Request) {
  const { task } = await req.json()

  const prompt = `
Break the following task into 3 to 6 small, clear subtasks.
Make each subtask short and ADHD-friendly — one clear action per step.

Task: ${task}

Subtasks:
`

  const response = await openai.complete({
    model: "gpt-4",
    prompt,
    maxTokens: 300,
    temperature: 0.6,
  })

  const text = await response.text()

  const subtasks = text
    .split(/\n+/)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)

  return new Response(JSON.stringify({ subtasks }), {
    headers: { "Content-Type": "application/json" },
  })
}
