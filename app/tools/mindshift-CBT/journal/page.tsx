import type { Metadata } from "next"
import GuidedJournal from "../components/GuidedJournal"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Guided Journal | MindShift CBT",
  description: "Reflect on your thoughts and experiences with guided prompts",
}

export default function JournalPage() {
  return <GuidedJournal />
}
