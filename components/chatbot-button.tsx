"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi there! I'm the FlowFactor AI assistant specializing in Human Factors Engineering. I can help you with ergonomics, workplace design, accessibility, and creating human-centered solutions. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input.trim()
      setMessages((prev) => [...prev, { role: "user", content: userMessage }])
      setInput("")
      setIsLoading(true)

      try {
        console.log("[v0] Sending message to chat assistant:", userMessage)
        const response = await fetch("/api/chat-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        })

        console.log("[v0] Response status:", response.status)

        if (!response.ok) {
          const errorData = await response.json()
          console.error("[v0] API error:", errorData)
          throw new Error("Failed to get response")
        }

        const data = await response.json()
        console.log("[v0] Received response:", data)
        setMessages((prev) => [...prev, { role: "bot", content: data.response }])
      } catch (error) {
        console.error("[v0] Chat error:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "I apologize, but I'm having trouble connecting right now. Please try again in a moment or visit our full AI consultant at /ai-consultant for more features.",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-accent hover:bg-accent/90 shadow-lg"
        aria-label="Chat with AI assistant"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 shadow-xl"
          >
            <Card className="overflow-hidden flex flex-col h-96">
              <div className="bg-primary p-3 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <span className="font-medium">FlowFactor AI Assistant</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-8 w-8 text-white hover:bg-primary/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-accent text-white" : "bg-muted"
                      }`}
                    >
                      {message.role === "bot" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about human factors..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">Powered by FlowFactor AI</div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
