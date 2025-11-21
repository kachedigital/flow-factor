"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, FileText, AlertCircle } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const SUGGESTED_PROMPTS = [
  "What are the key compliance requirements for GenAI procurement in California?",
  "How do I evaluate GenAI vendors for state contracts?",
  "What are the data privacy considerations for GenAI products?",
  "Help me draft an RFP for a GenAI solution",
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function CalProClient() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/calpro-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || data.error || "No response received",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
            <div className="text-center space-y-2 max-w-2xl">
              <h2 className="text-2xl font-semibold text-balance">Welcome to Your Procurement Expert</h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                I specialize in California state procurement strategy and compliance for Generative AI products. Ask me
                about regulations, vendor evaluation, RFPs, data privacy, or best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSuggestedPrompt(prompt)}
                >
                  <p className="text-sm text-pretty">{prompt}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <div className="flex items-start justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0 mt-1">
                    <FileText className="w-5 h-5 mt-1.5" />
                  </div>
                )}

                <div
                  className={cn(
                    "rounded-lg px-4 py-3 max-w-[80%]",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border",
                  )}
                >
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap leading-relaxed m-0">{message.content}</p>
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="flex items-start justify-center w-8 h-8 rounded-lg bg-accent text-accent-foreground shrink-0 mt-1">
                    <span className="text-sm font-semibold mt-1.5">You</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex items-start justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0 mt-1">
                  <FileText className="w-5 h-5 mt-1.5" />
                </div>
                <div className="rounded-lg px-4 py-3 bg-card border">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about procurement strategy, compliance, or GenAI best practices..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="shrink-0 h-[60px] w-[60px]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3" />
          <span>This is an AI assistant. Always verify critical compliance information with official sources.</span>
        </div>
      </Card>
    </div>
  )
}
