"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatbotContextProps {
  isChatbotOpen: boolean
  toggleChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextProps>({
  isChatbotOpen: false,
  toggleChatbot: () => {},
})

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }

  return <ChatbotContext.Provider value={{ isChatbotOpen, toggleChatbot }}>{children}</ChatbotContext.Provider>
}

export const useChatbot = () => {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}
