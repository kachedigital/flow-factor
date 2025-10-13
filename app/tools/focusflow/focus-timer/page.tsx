import type { Metadata } from "next"
import FocusFlowDashboard from "../focus-flow-dashboard"

export const metadata: Metadata = {
  title: "Focus Timer | FocusFlow",
  description: "Stay productive with timed focus sessions using the Pomodoro technique",
}

export default function FocusTimerPage() {
  return <FocusFlowDashboard />
}
