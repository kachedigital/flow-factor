"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! I'm the FlowFactor AI assistant. How can I help you with Human Factors Engineering today?",
    },
  ])
  const [input, setInput] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { role: "user", content: input }])

      // Simulate bot response (in a real app, this would call an API)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Thanks for your message! This is a demo chatbot. In the real implementation, this would connect to an AI service like OpenAI to provide helpful responses about Human Factors Engineering.",
          },
        ])
      }, 1000)

      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4" />
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
