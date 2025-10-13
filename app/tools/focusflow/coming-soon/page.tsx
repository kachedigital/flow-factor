import type { Metadata } from "next"
import ComingSoonClient from "./coming-soon-client"

export const metadata: Metadata = {
  title: "FocusFlow Coming Soon | FlowFactor",
  description: "Be the first to know when our revolutionary focus and productivity tool launches.",
}

export default function ComingSoonPage() {
  return <ComingSoonClient />
}
