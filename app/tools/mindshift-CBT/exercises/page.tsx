import type { Metadata } from "next"
import MindShiftClient from "../mindshift-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "CBT Exercises | MindShift CBT",
  description: "Interactive cognitive behavioral therapy exercises to improve mental wellbeing",
}

export default function ExercisesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">CBT Exercises</h1>
          <p className="mt-2 text-muted-foreground">
            Interactive exercises based on cognitive behavioral therapy principles
          </p>
        </div>

        <MindShiftClient />
      </div>
    </div>
  )
}
