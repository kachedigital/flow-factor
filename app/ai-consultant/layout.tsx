import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Ergonomic Consultant | FlowFactor",
  description: "Get personalized ergonomic assessments and recommendations from Aligna, your AI ergonomic consultant",
}

export default function AiConsultantLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-background">{children}</div>
}
