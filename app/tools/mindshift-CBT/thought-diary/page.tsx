import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Thought Diary | MindShift CBT",
  description: "Identify and challenge negative thinking patterns with CBT techniques",
}

export default function ThoughtDiaryPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Thought Diary</h1>
        <p className="text-muted-foreground mb-8">
          Identify, analyze, and challenge negative thinking patterns using cognitive behavioral techniques.
        </p>

        <div className="p-8 text-center bg-muted/50 rounded-lg">
          <p>Thought diary feature coming soon!</p>
        </div>
      </div>
    </div>
  )
}
