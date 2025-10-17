"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add email submission logic
    console.log("[v0] Email submitted:", email)
    setIsSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center px-4 py-12 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            className="flex flex-col items-center text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Coming Soon
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                Something Innovative
                <br />
                <span className="text-primary">Is On The Way</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl text-pretty leading-relaxed">
                We're crafting an experience that will transform how you think about human factors engineering and
                accessibility. Stay tuned for something extraordinary.
              </p>
            </motion.div>

            {/* Email Signup Form */}
            <motion.div
              className="w-full max-w-md space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background border-muted-foreground/20 focus:border-primary"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90">
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <motion.div
                  className="flex items-center justify-center gap-2 text-primary font-medium py-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Thanks! We'll keep you updated.</span>
                </motion.div>
              )}
              <p className="text-sm text-muted-foreground">Join the waitlist to be the first to know when we launch.</p>
            </motion.div>

            {/* Feature Hints */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 w-full max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/30 border border-muted">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold">Innovative Tools</h3>
                <p className="text-sm text-muted-foreground">Cutting-edge solutions for modern challenges</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/30 border border-muted">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="font-semibold">Human-Centered</h3>
                <p className="text-sm text-muted-foreground">Designed with accessibility at the core</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/30 border border-muted">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h3 className="font-semibold">Expert Insights</h3>
                <p className="text-sm text-muted-foreground">Backed by years of professional experience</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted py-6">
        <div className="container px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlowFactor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
