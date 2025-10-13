import { FeaturedTools } from "./featured-tools"

export default function ToolsPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Human-Centered{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Digital Tools
                </span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Evidence-based tools designed to enhance productivity, wellbeing, and accessibility in your daily work
                and life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Featured Tools
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready-to-Use Solutions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Start improving your workflow immediately with our collection of specialized tools.
              </p>
            </div>
          </div>
          <FeaturedTools /> {/* This line renders the tools from app/tools/featured-tools.tsx */}
        </div>
      </section>
    </>
  )
}
