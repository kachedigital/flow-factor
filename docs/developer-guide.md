# Web Accessibility Checker - Developer Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Setting Up Development Environment](#setting-up-development-environment)
3. [Code Structure](#code-structure)
4. [API Development](#api-development)
5. [Adding New Checks](#adding-new-checks)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

---

## Architecture Overview

### High-Level Architecture

\`\`\`
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS POST /api/scan-web
       │ { url: "example.com" }
       ▼
┌─────────────────────────────────┐
│   Next.js API Route             │
│   (Node.js Runtime)             │
│                                 │
│  1. URL Normalization           │
│  2. Redirect Handler (max 5)    │
│  3. HTML Fetch (15s timeout)    │
│  4. Regex-based Parser          │
│  5. Accessibility Checks (6)    │
│  6. AI Explanation Generator    │
└─────────────┬───────────────────┘
              │
              ▼
       ┌──────────────┐
       │  Response    │
       │  { issues }  │
       └──────────────┘
\`\`\`

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Next.js 14 | UI and routing |
| UI Components | shadcn/ui | Component library |
| Styling | Tailwind CSS v3 | Utility-first CSS |
| Animation | Framer Motion | Page transitions |
| API | Next.js API Routes | Backend endpoints |
| Runtime | Node.js | Server-side execution |
| Parsing | RegEx | HTML analysis |
| HTTP Client | Native fetch | Website fetching |

---

## Setting Up Development Environment

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Installation Steps

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/your-org/flowfactor.git
cd flowfactor
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables (optional):**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Run development server:**
\`\`\`bash
npm run dev
\`\`\`

5. **Open in browser:**
Navigate to `http://localhost:3000/tools/web-accessibility-checker`

### Development Tools

**Recommended VS Code Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens

**Useful npm scripts:**
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
\`\`\`

---

## Code Structure

### File Organization

\`\`\`
flowfactor/
├── app/
│   ├── api/
│   │   └── scan-web/
│   │       └── route.ts          # Main API endpoint
│   └── tools/
│       └── web-accessibility-checker/
│           ├── page.tsx           # Server component wrapper
│           ├── web-accessibility-client.tsx  # Client component
│           └── loading.tsx        # Loading state
├── components/
│   └── ui/                        # shadcn/ui components
├── docs/
│   ├── web-accessibility-checker-case-study.md
│   ├── api-documentation.yaml
│   ├── user-guide.md
│   └── developer-guide.md         # This file
├── lib/
│   └── utils.ts                   # Utility functions
└── public/
    └── images/                    # Static assets
\`\`\`

### Key Files

#### `/app/api/scan-web/route.ts`
Main API endpoint. Handles:
- URL validation and normalization
- HTTP redirect following
- HTML fetching with timeout
- Regex-based parsing
- Accessibility checks
- Response formatting

#### `/app/tools/web-accessibility-checker/web-accessibility-client.tsx`
Client-side component. Handles:
- Form input and validation
- API communication
- Loading states
- Results display
- Error handling

---

## API Development

### Creating the API Route

Next.js API routes are server-side functions in the `app/api` directory. Here's the basic structure:

\`\`\`typescript
// app/api/scan-web/route.ts

// Specify runtime environment
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    const body = await request.json()
    const { url } = body

    // 2. Validate input
    if (!url) {
      return NextResponse.json(
        { message: "URL is required" },
        { status: 400 }
      )
    }

    // 3. Process request
    const result = await scanWebsite(url)

    // 4. Return response
    return NextResponse.json(result)
    
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
\`\`\`

### URL Normalization

Always normalize URLs before processing:

\`\`\`typescript
function normalizeUrl(url: string): string {
  let normalized = url.trim()
  
  // Add protocol if missing
  if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
    normalized = "https://" + normalized
  }
  
  // Validate URL format
  try {
    const urlObj = new URL(normalized)
    return urlObj.toString()
  } catch {
    throw new Error("Invalid URL format")
  }
}
\`\`\`

### Handling Redirects

Manually follow redirects for better control:

\`\`\`typescript
async function fetchWithRedirects(url: string, maxRedirects = 5) {
  let currentUrl = url
  let redirectCount = 0

  while (redirectCount < maxRedirects) {
    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual", // Don't follow automatically
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FlowFactorBot/1.0)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(15000), // 15 second timeout
    })

    // Check if it's a redirect
    const status = response.status
    if ([301, 302, 303, 307, 308].includes(status)) {
      const location = response.headers.get("location")
      if (!location) break
      
      // Handle relative URLs
      currentUrl = location.startsWith("http")
        ? location
        : new URL(location, currentUrl).toString()
      
      redirectCount++
      continue
    }

    return response
  }

  throw new Error("Too many redirects")
}
\`\`\`

### Error Handling

Provide specific, helpful error messages:

\`\`\`typescript
try {
  const response = await fetch(url, options)
} catch (error: any) {
  if (error.name === "AbortError") {
    throw new Error("Connection timeout after 15 seconds")
  }
  if (error.code === "ENOTFOUND") {
    throw new Error("DNS resolution failed for domain")
  }
  if (error.code === "ECONNREFUSED") {
    throw new Error("Connection refused by server")
  }
  if (error.message.includes("certificate")) {
    throw new Error("SSL certificate verification failed")
  }
  throw new Error("Failed to fetch website: " + error.message)
}
\`\`\`

---

## Adding New Checks

### Check Structure

Each accessibility check follows this pattern:

\`\`\`typescript
interface AccessibilityCheck {
  pattern: RegExp           // Regex to find elements
  validate: (element: string) => boolean  // Check if valid
  severity: "critical" | "serious" | "moderate" | "minor"
  description: string
  wcagUrl: string
  generateExplanation: (element: string) => string
  generateImpact: (element: string) => string
  generateFix: (element: string) => string
}
\`\`\`

### Example: Adding a New Check

Let's add a check for missing `<main>` landmark:

\`\`\`typescript
// 1. Define the check function
function checkMissingMainLandmark(html: string) {
  const issues: AccessibilityIssue[] = []
  
  // Check if <main> exists
  const hasMain = /<main[^>]*>/i.test(html)
  
  if (!hasMain) {
    issues.push({
      id: "missing-main-landmark",
      description: "Page missing main landmark",
      helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html",
      severity: "serious",
      aiExplanation: "The <main> element helps screen reader users skip navigation and go directly to the main content.",
      aiImpact: "Users must tab through all navigation links to reach the main content, wasting time and effort.",
      aiFixSuggestion: "Wrap your main content in a <main> element: <main> page content </main>",
      htmlElement: "<body> (missing <main>)"
    })
  }
  
  return issues
}

// 2. Add to the main scan function
export async function POST(request: Request) {
  // ... existing code ...
  
  const issues = [
    ...checkMissingAltText(html),
    ...checkEmptyLinks(html),
    ...checkMissingFormLabels(html),
    ...checkLowHeadingHierarchy(html),
    ...checkMissingPageTitle(html),
    ...checkMissingLangAttribute(html),
    ...checkMissingMainLandmark(html), // Add new check
  ]
  
  // ... rest of code ...
}
\`\`\`

### Regex Patterns

Common patterns for HTML parsing:

\`\`\`typescript
// Images
const imgTags = html.match(/<img[^>]*>/gi) || []

// Links
const linkTags = html.match(/<a[^>]*>.*?<\/a>/gi) || []

// Form inputs
const inputTags = html.match(/<input[^>]*>/gi) || []

// Headings
const headings = html.match(/<h[1-6][^>]*>/gi) || []

// Check for attribute
const hasAlt = /<img[^>]*alt\s*=\s*["'][^"']*["']/i.test(tag)

// Extract attribute value
const altMatch = tag.match(/alt\s*=\s*["']([^"']*)["']/i)
const altText = altMatch ? altMatch[1] : ""

// Check for id attribute
const idMatch = tag.match(/id\s*=\s*["']([^"']*)["']/i)
const id = idMatch ? idMatch[1] : null
\`\`\`

### WCAG References

Always link to official WCAG documentation:

\`\`\`typescript
const wcagLinks = {
  nonTextContent: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
  linkPurpose: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html",
  labelsOrInstructions: "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html",
  infoAndRelationships: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
  pageTitled: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html",
  languageOfPage: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html",
}
\`\`\`

---

## Testing

### Manual Testing

1. **Test with known good sites:**
\`\`\`bash
curl -X POST http://localhost:3000/api/scan-web \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.w3.org"}'
\`\`\`

2. **Test with known problematic sites:**
- Sites with many redirects
- Sites without Content-Type headers
- Sites with accessibility issues

3. **Test error cases:**
\`\`\`bash
# Missing URL
curl -X POST http://localhost:3000/api/scan-web \
  -H "Content-Type: application/json" \
  -d '{}'

# Invalid URL
curl -X POST http://localhost:3000/api/scan-web \
  -H "Content-Type: application/json" \
  -d '{"url":"not-a-url"}'

# Non-existent domain
curl -X POST http://localhost:3000/api/scan-web \
  -H "Content-Type: application/json" \
  -d '{"url":"https://this-domain-does-not-exist-12345.com"}'
\`\`\`

### Automated Testing (Future Enhancement)

Create test files in `__tests__/`:

\`\`\`typescript
// __tests__/api/scan-web.test.ts
import { POST } from '@/app/api/scan-web/route'

describe('POST /api/scan-web', () => {
  it('should return 400 if URL is missing', async () => {
    const request = new Request('http://localhost:3000/api/scan-web', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
  
  it('should scan a valid URL', async () => {
    const request = new Request('http://localhost:3000/api/scan-web', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    })
    
    const response = await POST(request)
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('issues')
    expect(data).toHaveProperty('totalIssues')
  })
})
\`\`\`

Run tests:
\`\`\`bash
npm test
\`\`\`

---

## Deployment

### Vercel Deployment

1. **Configure Vercel:**
\`\`\`json
// vercel.json
{
  "functions": {
    "app/api/scan-web/route.ts": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
\`\`\`

2. **Deploy:**
\`\`\`bash
vercel --prod
\`\`\`

### Environment Variables

Set in Vercel dashboard or `.env.local`:

\`\`\`bash
# Optional: For future enhancements
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token
\`\`\`

### Production Checklist

- [ ] Test all endpoints
- [ ] Verify error handling
- [ ] Check CORS settings
- [ ] Monitor performance metrics
- [ ] Set up logging
- [ ] Configure rate limiting (if needed)
- [ ] Test with production URLs
- [ ] Verify SSL certificates

---

## Contributing

### Code Style

Follow these conventions:

\`\`\`typescript
// Use TypeScript strict mode
"strict": true

// Use meaningful variable names
const missingAltImages = [] // Good
const arr = [] // Bad

// Use string concatenation (not template literals)
const url = "https://" + domain + "/path" // Good
const url = \`https://\${domain}/path\` // Avoid

// Add comments for complex logic
// Check if image has alt attribute (case-insensitive)
const hasAlt = tag.toLowerCase().includes('alt=')

// Use early returns
if (!url) {
  return NextResponse.json({ message: "URL required" }, { status: 400 })
}
\`\`\`

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch:**
\`\`\`bash
git checkout -b feature/add-color-contrast-check
\`\`\`

3. **Make your changes**
4. **Write tests (if applicable)**
5. **Update documentation**
6. **Commit with clear messages:**
\`\`\`bash
git commit -m "feat: add color contrast accessibility check"
\`\`\`

7. **Push to your fork:**
\`\`\`bash
git push origin feature/add-color-contrast-check
\`\`\`

8. **Open a Pull Request**

### Commit Message Format

Follow conventional commits:

\`\`\`
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code restructuring
test: adding tests
chore: updating build tasks, etc
\`\`\`

Examples:
\`\`\`
feat: add ARIA attribute validation check
fix: handle websites without Content-Type header
docs: update API documentation with new endpoint
refactor: extract redirect logic into separate function
\`\`\`

---

## Advanced Topics

### Adding Database Integration

To store scan results in Supabase:

\`\`\`typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function saveScanResult(url: string, result: ScanResult) {
  const { data, error } = await supabase
    .from('scan_results')
    .insert({
      url,
      scanned_at: new Date().toISOString(),
      total_issues: result.totalIssues,
      critical_count: result.criticalCount,
      issues: result.issues,
    })
  
  if (error) throw error
  return data
}
\`\`\`

### Adding Rate Limiting

Using Upstash Redis:

\`\`\`typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown"
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { message: "Too many requests" },
      { status: 429 }
    )
  }
  
  // ... rest of code
}
\`\`\`

### Adding Caching

Cache scan results to improve performance:

\`\`\`typescript
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

async function getCachedResult(url: string) {
  const cached = await redis.get("scan:" + url)
  return cached
}

async function cacheResult(url: string, result: any) {
  // Cache for 1 hour
  await redis.set("scan:" + url, result, { ex: 3600 })
}
\`\`\`

---

## Troubleshooting

### Common Development Issues

**Issue: TypeScript errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

**Issue: Port already in use**
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
\`\`\`

**Issue: Module not found**
\`\`\`bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Debugging Tips

1. **Use console.log strategically:**
\`\`\`typescript
console.log("Fetching URL:", url)
console.log("Response status:", response.status)
console.log("Issues found:", issues.length)
\`\`\`

2. **Check network requests:**
- Open browser DevTools
- Go to Network tab
- Look for `/api/scan-web` requests
- Check request/response payloads

3. **Use VS Code debugger:**
\`\`\`json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
\`\`\`

---

## Resources

### Official Documentation
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Learning Resources
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Google's audit tool

---

**Need Help?**

- Open an issue on GitHub
- Contact: [dev@flowfactor.io](mailto:dev@flowfactor.io)
- Join our Discord: [discord.gg/flowfactor](https://discord.gg/flowfactor)

---

**Last Updated:** January 16, 2025  
**Version:** 1.0.0
