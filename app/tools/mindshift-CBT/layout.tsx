import type React from "react"
import type { Metadata } from "next"
import MindShiftClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "MindShift CBT | FlowFactor",
  description: "A comprehensive platform for self-administered Cognitive Behavioral Therapy",
}

export default function MindShiftLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MindShiftClientLayout>{children}</MindShiftClientLayout>
}
