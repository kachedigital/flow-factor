"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "../types"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("flex items-start gap-3", message.role === "user" ? "flex-row-reverse" : "")}
        >
          {message.role === "assistant" ? (
            <Avatar className="h-8 w-8 border border-primary">
              <AvatarImage src="/aligna-avatar.png" alt="Aligna" />
              <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          )}

          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%]",
              message.role === "assistant" ? "bg-muted ai-message" : "bg-primary text-primary-foreground user-message",
            )}
          >
            {message.role === "assistant" ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="chat-message">{message.content}</div>
            )}

            {message.image && (
              <div className="mt-2">
                <img
                  src={message.image || "/placeholder.svg"}
                  alt="Workspace image"
                  className="rounded-md max-h-60 object-contain"
                />
              </div>
            )}

            {message.generatedImage && (
              <div className="mt-2">
                <img
                  src={message.generatedImage || "/placeholder.svg"}
                  alt="Generated visualization"
                  className="rounded-md max-h-60 object-contain"
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
