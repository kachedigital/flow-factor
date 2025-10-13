import type { Metadata } from "next"
import FocusFlowDashboard from "./focus-flow-dashboard"

export const metadata: Metadata = {
  title: "FocusFlow | FlowFactor",
  description:
    "Mission control for all your tools, tasks, and timelines — a smart, focus-first dashboard for calmer, smarter workdays.",
}

export default function FocusFlowPage() {
  return <FocusFlowDashboard />
}
