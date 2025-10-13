// STEP 2: Ensure this file is COMPLETELY replaced with the code below.
// Ensure NO 'import { StreamingTextResponse } from 'ai'' here.

import Groq from "groq-sdk"

const groqApiKey = process.env.GROQ_API_KEY

if (!groqApiKey) {
  console.warn("GROQ_API_KEY is not set. AI features will not work.")
}

const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null

export interface AIResponse {
  aiExplanation: string
  aiImpact: string
  aiFixSuggestion: string
}

export interface AISuggestionPayload {
  description: string
  htmlSnippet?: string
  context?: string
  help?: string
}

export interface AISummaryPayload {
  description: string
  severity: string
}

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

async function getGroqCompletion(prompt: string, systemMessage?: string): Promise<string> {
  if (!groq) {
    return "AI service is not available (GROQ_API_KEY not configured)."
  }
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          ...(systemMessage ? [{ role: "system", content: systemMessage }] : []),
          { role: "user", content: prompt },
        ],
        model: "llama3-8b-8192",
        temperature: 0.3,
        max_tokens: 700,
      })
      return chatCompletion.choices[0]?.message?.content || "No content from AI."
    } catch (error: any) {
      console.error(`Groq API error (attempt ${attempt}/${MAX_RETRIES}):`, error.message)
      if (
        attempt === MAX_RETRIES ||
        (error.status && error.status >= 400 && error.status < 500 && error.status !== 429)
      ) {
        return `AI service error: ${error.message}. Check server logs.`
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt))
    }
  }
  return "AI service failed after multiple retries."
}

export async function getAICopilotSuggestions(payload: AISuggestionPayload): Promise<AIResponse> {
  const { description, htmlSnippet, context, help } = payload
  const systemMessage =
    'You are an expert accessibility assistant. Provide clear, concise, and actionable advice. Format your response as a valid JSON object with three keys: "aiExplanation", "aiImpact", and "aiFixSuggestion". For fix suggestions involving code, wrap the code in markdown triple backticks (e.g., ```html ... ```).'
  const prompt = `
    Accessibility Issue Analysis Request:
    Description: "${description}"
    ${htmlSnippet ? `HTML Element/Snippet: \`\`\`html\n${htmlSnippet}\n\`\`\`` : ""}
    ${context ? `Context: "${context}"` : ""}
    ${help ? `Relevant WCAG/Help: ${help}` : ""}
    Please provide:
    1. aiExplanation: A brief explanation of what this accessibility issue means in simple terms.
    2. aiImpact: How this issue impacts users, especially those with disabilities.
    3. aiFixSuggestion: Specific guidance on how to fix this issue. If it's a web issue, provide a concise code snippet. If it's a PDF issue, explain how to fix it generally or in common tools. Focus on WCAG Level A compliance.
    Return ONLY the JSON object.
  `
  const responseJsonString = await getGroqCompletion(prompt, systemMessage)
  try {
    const parsedResponse = JSON.parse(responseJsonString)
    return {
      aiExplanation: parsedResponse.aiExplanation || "AI could not provide an explanation.",
      aiImpact: parsedResponse.aiImpact || "AI could not provide impact information.",
      aiFixSuggestion: parsedResponse.aiFixSuggestion || "AI could not provide a fix suggestion.",
    }
  } catch (e) {
    console.error("Failed to parse AI Copilot JSON response:", responseJsonString, e)
    return {
      aiExplanation: "AI explanation unavailable (parsing error).",
      aiImpact: "AI impact unavailable (parsing error).",
      aiFixSuggestion: `AI fix suggestion unavailable (parsing error). Raw: ${responseJsonString.substring(0, 150)}...`,
    }
  }
}

export async function getAICoachSummary(
  issues: AISummaryPayload[],
  scannedResource: string,
  resourceType: "Web Page" | "PDF Document",
): Promise<string> {
  const systemMessage =
    "You are an expert accessibility analyst. Provide a concise, encouraging, and high-level summary of the accessibility scan results. Focus on overall status and key areas for improvement for WCAG Level A compliance. Do not list individual issues here."
  if (issues.length === 0) {
    return `Great news! Our automated scan of the ${resourceType} "${scannedResource}" found no immediate accessibility issues according to WCAG Level A automated checks. Remember, manual testing is always recommended to ensure full compliance and a truly inclusive experience.`
  }
  const criticalIssues = issues.filter((i) => i.severity === "critical").length
  const seriousIssues = issues.filter((i) => i.severity === "serious").length
  const prompt = `
    Scan Results Summary Request for ${resourceType}: "${scannedResource}"
    Total Issues Found: ${issues.length}
    Critical Issues: ${criticalIssues}
    Serious Issues: ${seriousIssues}
    Based on these results, provide a brief (2-3 sentences) AI Coach Summary.
    Be encouraging and highlight the importance of addressing the most critical issues first to improve accessibility towards WCAG Level A.
  `
  return getGroqCompletion(prompt, systemMessage)
}
