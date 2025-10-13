export interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

export interface AIResponse {
  text: string
  image?: string | null
}
