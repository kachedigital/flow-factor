import type { Metadata } from "next"
import MoodTracker from "../components/MoodTracker"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Mood Tracker | MindShift CBT",
  description: "Track your mood and identify patterns over time",
}

export default function MoodTrackerPage() {
  return <MoodTracker />
}
