import { CalProClient } from "./calpro-client"
import { Shield, FileText, Scale, Sparkles } from "lucide-react"

export const metadata = {
  title: "CalPro - California State Procurement Expert | FlowFactor",
  description: "GenAI Product Strategy & Compliance Advisor for California State Procurement",
}

export default function CalProPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-balance">California State Procurement Expert</h1>
              <p className="text-sm text-muted-foreground">GenAI Product Strategy & Compliance Advisor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <CalProClient />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Policy Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>Compliance Review</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>GenAI Expertise</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
