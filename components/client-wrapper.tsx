"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { MotionConfig } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import PageTransition from "@/components/page-transition"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Prevent MetaMask auto-connection errors
    if (typeof window !== "undefined") {
      // Disable automatic web3 provider detection
      window.addEventListener("error", (event) => {
        if (event.error?.message?.includes("MetaMask") || event.error?.message?.includes("ChromeTransport")) {
          event.preventDefault()
          console.warn("MetaMask connection error suppressed:", event.error.message)
        }
      })
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSkeleton />}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </MotionConfig>
  )
}
