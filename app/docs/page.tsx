import Link from "next/link"
import { FileText, Wrench, BookOpen, Database, MessageSquare } from "lucide-react"

export default function DocsIndexPage() {
  const docs = [
    {
      title: "Application Overview",
      description:
        "Complete development journey including architecture decisions, AI integration challenges, and the evolution from simple API calls to RAG implementation.",
      href: "/docs/application-overview",
      icon: BookOpen,
      category: "Overview",
    },
    {
      title: "PDF Checker Implementation Guide",
      description:
        "Step-by-step implementation guide covering authentication removal, file uploads, PDF parsing, AI integration, and complete troubleshooting process.",
      href: "/docs/pdf-checker-guide",
      icon: FileText,
      category: "Implementation",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">FlowFactor Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive guides, technical documentation, and implementation details for the FlowFactor accessibility
            platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Link
            href="/tools/axia"
            className="p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all"
          >
            <Wrench className="h-8 w-8 mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Axia Tool</h3>
            <p className="text-sm text-muted-foreground">PDF and web accessibility checker</p>
          </Link>
          <Link href="/knowledge" className="p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all">
            <Database className="h-8 w-8 mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
            <p className="text-sm text-muted-foreground">Manage PDF documents for RAG</p>
          </Link>
          <Link href="/" className="p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all">
            <MessageSquare className="h-8 w-8 mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Chat with FlowFactor AI</p>
          </Link>
        </div>

        {/* Documentation Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Documentation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {docs.map((doc) => {
              const Icon = doc.icon
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group p-8 border rounded-lg hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-2">{doc.category}</div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{doc.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 p-8 border rounded-lg bg-muted/30">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">Can't find what you're looking for? Try these resources:</p>
          <div className="space-y-3">
            <Link href="/" className="block text-primary hover:underline">
              → Ask the FlowFactor AI Assistant on the homepage
            </Link>
            <Link href="/about" className="block text-primary hover:underline">
              → Learn more about FlowFactor (Coming Soon)
            </Link>
            <Link href="/tools/axia" className="block text-primary hover:underline">
              → Try the Axia accessibility checker
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
