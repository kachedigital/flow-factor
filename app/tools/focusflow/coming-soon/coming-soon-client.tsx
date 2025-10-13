"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function ComingSoonClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail("")

    toast({
      title: "Success!",
      description: "You'll be notified when FocusFlow launches.",
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col">
        <Button variant="ghost" className="w-fit mb-8" onClick={() => router.push("/tools")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Button>

        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <div className="mb-8 relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Bell className="h-12 w-12 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">FocusFlow is Coming Soon</h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Our revolutionary productivity tool designed for neurodivergent minds is almost ready. Be the first to know
            when we launch!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Focus Timer</h3>
                <p className="text-muted-foreground text-center">
                  Customizable timers designed for optimal focus sessions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Task Management</h3>
                <p className="text-muted-foreground text-center">ADHD-friendly task breakdown and organization</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Body Doubling</h3>
                <p className="text-muted-foreground text-center">Virtual accountability partner to keep you on track</p>
              </CardContent>
            </Card>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Notify Me"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We'll only email you when FocusFlow launches. No spam, promise!
              </p>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>You're on the list! We'll notify you when we launch.</span>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t py-6">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FlowFactor. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
