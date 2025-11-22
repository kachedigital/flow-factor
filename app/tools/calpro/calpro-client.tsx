"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Paperclip, Link2, X, File, Sparkles } from "lucide-react"
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

type Attachment = {
  name: string
  type: "pdf" | "url"
  data?: string
  url?: string
}

export function CalProClient() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      if (file.type === "application/pdf") {
        const reader = new FileReader()
        reader.onload = (event) => {
          const base64 = event.target?.result as string
          setAttachments((prev) => [
            ...prev,
            {
              name: file.name,
              type: "pdf",
              data: base64.split(",")[1],
            },
          ])
        }
        reader.readAsDataURL(file)
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddUrl = () => {
    if (!urlInput.trim()) return

    setAttachments((prev) => [
      ...prev,
      {
        name: urlInput,
        type: "url",
        url: urlInput,
      },
    ])
    setUrlInput("")
    setShowUrlInput(false)
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/calpro-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: "user",
              content: currentInput,
              experimental_attachments: attachments.length > 0 ? attachments : undefined,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        accumulatedContent += chunk

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg)),
        )
      }

      setAttachments([])
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
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
            <div className="text-center space-y-3 max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold text-balance">Hi! I'm CalPro, your AI procurement assistant</h2>
              <p className="text-muted-foreground text-balance leading-relaxed text-lg">
                I'm here to help you navigate California state GenAI procurement with confidence. Think of me as your
                knowledgeable colleague who's always available to discuss regulations, review contracts, or brainstorm
                strategies. Let's work together!
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
                    <Sparkles className="w-5 h-5 mt-1.5" />
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
                  <Sparkles className="w-5 h-5 mt-1.5" />
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

      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
                {attachment.type === "pdf" ? <File className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                <span className="max-w-[200px] truncate">{attachment.name}</span>
                <button onClick={() => removeAttachment(index)} className="hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showUrlInput && (
        <div className="px-4 py-2 border-t">
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL (e.g., https://dgs.ca.gov/...)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddUrl()
                }
              }}
            />
            <Button onClick={handleAddUrl} size="sm">
              Add
            </Button>
            <Button onClick={() => setShowUrlInput(false)} size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <Card className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFileUpload} className="hidden" />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowUrlInput(!showUrlInput)}
            disabled={isLoading}
          >
            <Link2 className="w-5 h-5" />
          </Button>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about GenAI procurement, compliance, or strategy..."
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
          <Sparkles className="w-3 h-3" />
          <span>AI-powered assistant ready to help. I'll reference PDFs in the knowledge base automatically.</span>
        </div>
      </Card>
    </div>
  )
}
