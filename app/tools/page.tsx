import { FeaturedTools } from "./featured-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tools | KacheDigital",
  description:
    "Open-source tools for accessibility testing, CSS prototyping, and neuroinclusive productivity -- built by KacheDigital.",
}

export default function ToolsPage() {
  return (
    <main className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="font-accent text-sm uppercase tracking-widest text-kd-cyan mb-3">
            Our Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-balance">
            Built for Developers, Designers & All Brains
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Free and open-source tools we built to make web development more
            accessible, inclusive, and efficient. More tools launching soon.
          </p>
        </div>

        <FeaturedTools />
      </div>
    </main>
  )
}
