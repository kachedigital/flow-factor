import { FeaturedTools } from "./featured-tools" // Ensure FeaturedTools is imported
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Tools | FlowFactor",
  description: "Explore FlowFactor's suite of tools designed for neurodiversity, productivity, and wellness.",
}

export default function ToolsPage() {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Explore Our Suite of Tools</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover innovative solutions designed to enhance productivity, wellness, and accessibility for
            neurodivergent individuals and beyond.
          </p>
        </div>

        {/* This is where the list of tool cards is rendered */}
        <FeaturedTools />

        {/* 
          The <ComingSoonClient /> was here incorrectly. 
          It's specific to the /tools/focusflow/coming-soon page.
          It has been removed.
        */}
      </div>
    </div>
  )
}
