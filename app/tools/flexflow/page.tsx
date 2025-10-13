import type { Metadata } from "next"
import FlexFlowHome from "./home"

export const metadata: Metadata = {
  title: "FlexFlow | FlowFactor",
  description: "Smart guidance to stretch, breathe, and refocus — keeping you energized, clear, and resilient.",
}

export default function FlexFlowPage() {
  return <FlexFlowHome />
}
