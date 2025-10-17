# Quick Start Guide for Developers

**Build your own Web Accessibility Checker in under 30 minutes!**

This guide will help you replicate FlowFactor's Web Accessibility Checker or build your own version from scratch.

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18.17 or higher ([download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor (VS Code recommended)
- Basic knowledge of React and Next.js
- A Vercel account (optional, for deployment)

---

## Project Setup

### Step 1: Create a New Next.js Project

\`\`\`bash
# Create new Next.js app with TypeScript
npx create-next-app@latest accessibility-checker

# When prompted, choose:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: Yes
# ✅ App Router: Yes
# ✅ Import alias: No (default @/*)

# Navigate to project
cd accessibility-checker
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
# Install required packages
npm install @ai-sdk/openai ai framer-motion lucide-react

# Install shadcn/ui CLI
npx shadcn@latest init

# When prompted, choose:
# ✅ Style: Default
# ✅ Base color: Slate
# ✅ CSS variables: Yes
\`\`\`

### Step 3: Install UI Components

\`\`\`bash
# Install required shadcn components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add textarea
\`\`\`

---

## Project Structure

Create the following file structure:

\`\`\`
accessibility-checker/
├── app/
│   ├── api/
│   │   └── scan-web/
│   │       └── route.ts          # API endpoint
│   ├── tools/
│   │   └── web-accessibility-checker/
│   │       ├── page.tsx          # Server component wrapper
│   │       ├── loading.tsx       # Loading state
│   │       └── web-accessibility-client.tsx  # Client component
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/                        # shadcn components
├── lib/
│   └── utils.ts
├── public/
├── docs/                          # Documentation (optional)
├── .env.local                     # Environment variables
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
\`\`\`

---

## Step-by-Step Implementation

### Step 1: Set Up Environment Variables

Create `.env.local` in your project root:

\`\`\`bash
# OpenAI API Key (for AI explanations - optional)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: If you want to use other AI providers
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

**Note:** The tool works without AI API keys but won't generate AI-powered explanations.

---

### Step 2: Create the API Route

Create `app/api/scan-web/route.ts`:

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server"

// Force Node.js runtime (required for fetch with redirects)
export const runtime = "nodejs"

interface AccessibilityIssue {
  type: string
  severity: "critical" | "serious" | "moderate"
  count: number
  description: string
  impact: string
  howToFix: string
  wcagCriteria: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Normalize URL
    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl
    }

    // Validate URL
    try {
      new URL(normalizedUrl)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Fetch HTML with redirect handling
    let currentUrl = normalizedUrl
    let redirectCount = 0
    const MAX_REDIRECTS = 5
    let response: Response | null = null

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    try {
      while (redirectCount < MAX_REDIRECTS) {
        response = await fetch(currentUrl, {
          method: "GET",
          redirect: "manual",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          signal: controller.signal,
        })

        // Handle redirects
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get("location")
          if (!location) {
            return NextResponse.json(
              { error: "Redirect without location header" },
              { status: 500 }
            )
          }

          // Resolve relative URLs
          currentUrl = location.startsWith("http")
            ? location
            : new URL(location, currentUrl).toString()

          redirectCount++
          continue
        }

        // Success - break out of redirect loop
        break
      }

      clearTimeout(timeoutId)

      if (redirectCount >= MAX_REDIRECTS) {
        return NextResponse.json({ error: "Too many redirects" }, { status: 500 })
      }

      if (!response || !response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch website: HTTP " + (response?.status || "unknown") },
          { status: response?.status || 500 }
        )
      }
    } catch (error: any) {
      clearTimeout(timeoutId)

      if (error.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout after 15 seconds" }, { status: 504 })
      }

      if (error.message.includes("ENOTFOUND")) {
        return NextResponse.json({ error: "Domain not found (DNS error)" }, { status: 404 })
      }

      if (error.message.includes("ECONNREFUSED")) {
        return NextResponse.json({ error: "Connection refused by server" }, { status: 503 })
      }

      if (error.message.includes("certificate")) {
        return NextResponse.json({ error: "SSL certificate error" }, { status: 495 })
      }

      return NextResponse.json({ error: "Network error: " + error.message }, { status: 500 })
    }

    // Get content type
    const contentType = response.headers.get("content-type") || ""

    // Check if response is HTML (lenient check)
    if (contentType && !contentType.includes("text/html")) {
      console.warn("Warning: Content-Type might not be HTML:", contentType)
      // Continue anyway instead of returning error
    }

    // Get HTML content
    const html = await response.text()

    if (!html || html.length < 50) {
      return NextResponse.json({ error: "No HTML content received" }, { status: 500 })
    }

    // Analyze accessibility issues
    const issues: AccessibilityIssue[] = []

    // 1. Check for missing alt text on images
    const imgTags = html.match(/<img[^>]*>/gi) || []
    const missingAlt = imgTags.filter((tag) => !tag.includes("alt="))

    if (missingAlt.length > 0) {
      issues.push({
        type: "Missing Alt Text on Images",
        severity: "critical",
        count: missingAlt.length,
        description: "Images are missing alternative text that describes their content.",
        impact:
          "Screen reader users cannot understand what the images represent. This violates WCAG 2.1 Level A.",
        howToFix:
          'Add descriptive alt text to all images: <img src="photo.jpg" alt="Description of image">. For decorative images, use alt="".',
        wcagCriteria: "1.1.1 Non-text Content (Level A)",
      })
    }

    // 2. Check for empty links
    const linkMatches = html.match(/<a[^>]*>.*?<\/a>/gi) || []
    const emptyLinks = linkMatches.filter((link) => {
      const textContent = link.replace(/<[^>]*>/g, "").trim()
      return textContent.length === 0
    })

    if (emptyLinks.length > 0) {
      issues.push({
        type: "Empty or Missing Link Text",
        severity: "critical",
        count: emptyLinks.length,
        description: "Links have no visible text content.",
        impact:
          "Screen reader users hear 'link' without knowing where it goes. Keyboard users cannot identify the link purpose.",
        howToFix:
          'Ensure all links have descriptive text: <a href="/contact">Contact Us</a> instead of <a href="/contact"></a>.',
        wcagCriteria: "2.4.4 Link Purpose (In Context) (Level A)",
      })
    }

    // 3. Check for missing form labels
    const inputTags = html.match(/<input[^>]*>/gi) || []
    const inputsWithoutLabels = inputTags.filter((tag) => {
      const hasId = tag.match(/id=["']([^"']+)["']/)
      if (!hasId) return true

      const id = hasId[1]
      const labelRegex = new RegExp('<label[^>]*for=["' + "']" + id + '["' + "']", "i")
      return !html.match(labelRegex)
    })

    if (inputsWithoutLabels.length > 0) {
      issues.push({
        type: "Missing Form Labels",
        severity: "serious",
        count: inputsWithoutLabels.length,
        description: "Form input fields do not have associated labels.",
        impact:
          "Screen reader users cannot determine what information to enter. This creates confusion and prevents form completion.",
        howToFix:
          'Associate labels with inputs using the for/id attributes: <label for="email">Email</label><input type="email" id="email">',
        wcagCriteria: "3.3.2 Labels or Instructions (Level A)",
      })
    }

    // 4. Check for heading hierarchy
    const headingTags = html.match(/<h[1-6][^>]*>/gi) || []

    if (headingTags.length < 3) {
      issues.push({
        type: "Low Heading Hierarchy",
        severity: "moderate",
        count: headingTags.length,
        description: "Page has insufficient heading structure.",
        impact:
          "Screen reader users rely on headings to navigate content. Poor heading structure makes navigation difficult.",
        howToFix:
          "Use headings (h1-h6) to create a clear document outline. Start with one h1, then use h2 for sections, h3 for subsections, etc.",
        wcagCriteria: "2.4.6 Headings and Labels (Level AA)",
      })
    }

    // 5. Check for page title
    const titleMatch = html.match(/<title[^>]*>.*?<\/title>/i)
    if (!titleMatch || titleMatch[0].replace(/<[^>]*>/g, "").trim().length === 0) {
      issues.push({
        type: "Missing Page Title",
        severity: "critical",
        count: 1,
        description: "Page is missing a descriptive title element.",
        impact:
          "Screen reader users hear the URL instead of a meaningful page title. Browser tabs and bookmarks show unhelpful information.",
        howToFix:
          'Add a descriptive title to the <head> section: <title>About Us - Company Name</title>',
        wcagCriteria: "2.4.2 Page Titled (Level A)",
      })
    }

    // 6. Check for language attribute
    const htmlTagMatch = html.match(/<html[^>]*>/i)
    if (!htmlTagMatch || !htmlTagMatch[0].includes("lang=")) {
      issues.push({
        type: "Missing Language Attribute",
        severity: "serious",
        count: 1,
        description: "HTML element is missing the lang attribute.",
        impact:
          "Screen readers cannot determine the correct language for pronunciation. Translation tools may not work properly.",
        howToFix: 'Add lang attribute to the html tag: <html lang="en">',
        wcagCriteria: "3.1.1 Language of Page (Level A)",
      })
    }

    // Return results
    return NextResponse.json({
      success: true,
      url: currentUrl,
      issues,
      summary: {
        total: issues.reduce((sum, issue) => sum + issue.count, 0),
        critical: issues.filter((i) => i.severity === "critical").length,
        serious: issues.filter((i) => i.severity === "serious").length,
        moderate: issues.filter((i) => i.severity === "moderate").length,
      },
      scannedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error scanning website:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
\`\`\`

---

### Step 3: Create the Client Component

Create `app/tools/web-accessibility-checker/web-accessibility-client.tsx`:

\`\`\`typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Globe, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

interface AccessibilityIssue {
  type: string
  severity: "critical" | "serious" | "moderate"
  count: number
  description: string
  impact: string
  howToFix: string
  wcagCriteria: string
}

interface ScanResult {
  success: boolean
  url: string
  issues: AccessibilityIssue[]
  summary: {
    total: number
    critical: number
    serious: number
    moderate: number
  }
  scannedAt: string
}

export default function WebAccessibilityClient() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/scan-web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to scan website")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while scanning the website")
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "serious":
        return "default"
      case "moderate":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "serious":
        return <Info className="h-4 w-4" />
      case "moderate":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Web Accessibility Checker</h1>
        <p className="text-muted-foreground">
          Scan any website for common accessibility issues and get AI-powered recommendations
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Website URL</CardTitle>
          <CardDescription>
            Enter the URL of the website you want to scan for accessibility issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScan} className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Scan Website
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                Scanned: {result.url}
                <br />
                {new Date(result.scannedAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">{result.summary.total}</div>
                  <div className="text-sm text-muted-foreground">Total Issues</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-red-500">{result.summary.critical}</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-orange-500">{result.summary.serious}</div>
                  <div className="text-sm text-muted-foreground">Serious</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-yellow-500">
                    {result.summary.moderate}
                  </div>
                  <div className="text-sm text-muted-foreground">Moderate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {result.issues.length === 0 ? (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Great! No accessibility issues were found in this scan. However, automated scans
                can only detect certain types of issues. Manual testing is still recommended.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {result.issues.map((issue, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {getSeverityIcon(issue.severity)}
                          {issue.type}
                        </CardTitle>
                        <CardDescription className="mt-1">{issue.wcagCriteria}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getSeverityColor(issue.severity) as any}>
                          {issue.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {issue.count} {issue.count === 1 ? "instance" : "instances"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">What this means:</h4>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Impact:</h4>
                      <p className="text-sm text-muted-foreground">{issue.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">How to fix:</h4>
                      <p className="text-sm text-muted-foreground">{issue.howToFix}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
\`\`\`

---

### Step 4: Create the Page Wrapper

Create `app/tools/web-accessibility-checker/page.tsx`:

\`\`\`typescript
import WebAccessibilityClient from "./web-accessibility-client"

export const metadata = {
  title: "Web Accessibility Checker | FlowFactor",
  description: "Scan websites for accessibility issues and get AI-powered recommendations",
}

export default function WebAccessibilityCheckerPage() {
  return <WebAccessibilityClient />
}
\`\`\`

---

### Step 5: Create Loading State

Create `app/tools/web-accessibility-checker/loading.tsx`:

\`\`\`typescript
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-12 w-96 mb-2" />
        <Skeleton className="h-6 w-full max-w-lg" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
\`\`\`

---

## Testing Your Implementation

### Step 1: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000/tools/web-accessibility-checker`

### Step 2: Test with Sample URLs

Try scanning these URLs to verify everything works:

\`\`\`
example.com
google.com
github.com
wikipedia.org
\`\`\`

### Step 3: Verify All Features

✅ **URL normalization** - Try with and without `https://`
✅ **Redirect handling** - Test URLs that redirect
✅ **Error handling** - Try invalid URLs
✅ **Results display** - Verify all severity levels show correctly
✅ **Responsive design** - Test on mobile and desktop

---

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

Or use the Vercel Dashboard:
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables on Vercel

In your Vercel project settings, add:
\`\`\`
OPENAI_API_KEY=your_key_here
\`\`\`

---

## Customization Ideas

### Add More Checks

Edit `app/api/scan-web/route.ts` to add new accessibility checks:

\`\`\`typescript
// Example: Check for color contrast
const hasColorIssues = html.includes('style="color:')
if (hasColorIssues) {
  issues.push({
    type: "Potential Color Contrast Issues",
    severity: "moderate",
    count: 1,
    description: "Inline color styles detected that may have contrast issues",
    impact: "Users with low vision may struggle to read content",
    howToFix: "Use a color contrast checker to verify all text meets WCAG AA standards (4.5:1 ratio)",
    wcagCriteria: "1.4.3 Contrast (Minimum) (Level AA)"
  })
}
\`\`\`

### Add Database Storage

To save scan results:

\`\`\`typescript
// Install Supabase
npm install @supabase/supabase-js

// In your API route, after generating results:
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

await supabase.from('scan_results').insert({
  url: currentUrl,
  issues: issues,
  summary: summary,
  scanned_at: new Date().toISOString()
})
\`\`\`

### Add Export Functionality

Add PDF/CSV export to the client component:

\`\`\`typescript
const exportToPDF = () => {
  // Use jsPDF or similar library
  const doc = new jsPDF()
  doc.text(`Accessibility Report: ${result.url}`, 10, 10)
  // Add more content...
  doc.save('accessibility-report.pdf')
}
\`\`\`

---

## Troubleshooting

### Common Issues

**Issue:** "Cannot read properties of undefined"
**Fix:** Ensure all data from API is validated before accessing nested properties

**Issue:** "Template literal syntax error"
**Fix:** Use string concatenation with `+` instead of template literals

**Issue:** "HTTP 307/301 errors"
**Fix:** Implement manual redirect handling as shown in the API route

**Issue:** "JSDOM import error"
**Fix:** Use regex-based parsing instead of JSDOM

**Issue:** "Fetch timeout"
**Fix:** Increase timeout value or optimize the target website

---

## Performance Optimization

### Add Caching

\`\`\`typescript
// In API route
import { unstable_cache } from 'next/cache'

const getCachedScan = unstable_cache(
  async (url: string) => {
    // Your scan logic here
  },
  ['accessibility-scan'],
  { revalidate: 3600 } // Cache for 1 hour
)
\`\`\`

### Add Rate Limiting

\`\`\`typescript
// Using Upstash Rate Limit
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
})

// In your API route:
const identifier = request.headers.get("x-forwarded-for") || "anonymous"
const { success } = await ratelimit.limit(identifier)

if (!success) {
  return NextResponse.json(
    { error: "Rate limit exceeded. Please try again later." },
    { status: 429 }
  )
}
\`\`\`

---

## Next Steps

Now that you have a working accessibility checker:

1. ✅ Add more accessibility checks
2. ✅ Integrate with a database for history
3. ✅ Add user authentication
4. ✅ Implement batch scanning
5. ✅ Add export functionality
6. ✅ Integrate with CI/CD pipelines
7. ✅ Add real-time collaboration
8. ✅ Create a scoring system

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Accessibility Testing Tools](https://www.w3.org/WAI/test-evaluate/tools/)

---

## Support

Need help? Check out:
- **GitHub Issues:** [Report bugs or request features](https://github.com/yourusername/accessibility-checker/issues)
- **Documentation:** Full docs at `/docs`
- **Community:** Join our Discord

---

**Ready to build? Clone the repo and get started!**

\`\`\`bash
git clone https://github.com/yourusername/accessibility-checker.git
cd accessibility-checker
npm install
npm run dev
\`\`\`

Happy coding! 🚀
