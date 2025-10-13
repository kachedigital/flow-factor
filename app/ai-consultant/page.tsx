"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendHorizonal, Loader2, RefreshCw, Info, MessageSquare, FileImage, Sparkles } from "lucide-react"
import { useChat } from "./hooks/use-chat"
import { ImageUploader } from "./components/image-uploader"
import { MessageList } from "./components/message-list"
import { WelcomeScreen } from "./components/welcome-screen"
import { useImageUpload } from "./hooks/use-image-upload"

export default function AiConsultantPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "about">("chat")
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { messages, isLoading, sendMessage, resetChat } = useChat()
  const { image, isUploading, handleImageUpload, clearImage } = useImageUpload()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "" && !image) return

    await sendMessage(input, image)
    setInput("")
    if (clearImage) clearImage() // Add a check to ensure clearImage exists

    // Auto-resize textarea back to default
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter key press without Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault() // Prevent default to avoid new line
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src="/aligna-avatar.png" alt="Aligna" />
              <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Aligna</h1>
              <p className="text-muted-foreground">Your Ergonomic Consultant AI</p>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "about")}>
            <TabsList>
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="about">
                <Info className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "about")}>
            <TabsList>
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="about">
                <Info className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-0 space-y-4">
              <Card className="border-2">
                <CardContent className="p-0">
                  <div className="h-[60vh] flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      {messages.length === 0 ? <WelcomeScreen /> : <MessageList messages={messages} />}
                    </ScrollArea>

                    <Separator />

                    <div className="p-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {image && (
                          <div className="relative w-32 h-32 rounded-md overflow-hidden group">
                            <img
                              src={URL.createObjectURL(image) || "/placeholder.svg"}
                              alt="Uploaded workspace"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => clearImage && clearImage()}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Textarea
                              ref={textareaRef}
                              value={input}
                              onChange={handleTextareaChange}
                              onKeyDown={handleKeyDown}
                              placeholder="Describe your workspace or ask for ergonomic advice..."
                              className="resize-none min-h-[80px]"
                              disabled={isLoading}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <ImageUploader
                              onImageUpload={handleImageUpload}
                              isUploading={isUploading}
                              disabled={isLoading || !!image}
                            />
                            <Button type="submit" size="icon" disabled={isLoading || (input.trim() === "" && !image)}>
                              {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <SendHorizonal className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={resetChat}
                  className="text-sm"
                  disabled={messages.length === 0 || isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Conversation
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src="/aligna-avatar.png" alt="Aligna" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">Meet Aligna</h2>
                        <p className="text-muted-foreground">Your AI Ergonomic Consultant</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Experience & Expertise</h3>
                      <p>
                        Aligna draws from over 20 years of experience in workplace ergonomics across office,
                        occupational, industrial, and human factors engineering settings. With specialized knowledge in
                        ergonomics for neurodivergent individuals, Aligna is a Certified Professional Ergonomist (CPE)
                        and Certified Industrial Ergonomist (CIE).
                      </p>

                      <h3 className="text-lg font-semibold">How Aligna Can Help</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Perform remote ergonomic assessments via text descriptions or images</span>
                        </li>
                        <li className="flex items-start">
                          <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Provide tailored equipment recommendations based on your specific needs</span>
                        </li>
                        <li className="flex items-start">
                          <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Suggest appropriate stretches and exercises for your workspace</span>
                        </li>
                        <li className="flex items-start">
                          <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Offer solutions for common ergonomic issues and discomfort</span>
                        </li>
                      </ul>

                      <h3 className="text-lg font-semibold">Getting the Most from Your Consultation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <h4 className="font-medium flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                              Text Description
                            </h4>
                            <p className="text-sm mt-2">
                              Provide details about your workspace setup, including desk height, chair type, monitor
                              position, and any discomfort you're experiencing.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <h4 className="font-medium flex items-center">
                              <FileImage className="h-4 w-4 mr-2 text-primary" />
                              Image Upload
                            </h4>
                            <p className="text-sm mt-2">
                              Upload a photo of your workspace for a more accurate assessment. Try to capture your
                              typical working posture and setup.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
