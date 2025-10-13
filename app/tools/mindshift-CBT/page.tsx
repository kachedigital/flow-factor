import type { Metadata } from "next"
import MindShiftHome from "./home"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "MindShift CBT | FlowFactor",
  description: "Evidence-based cognitive behavioral therapy tools to improve workplace wellbeing and productivity",
}

export default function MindShiftPage() {
  return <MindShiftHome />
}
