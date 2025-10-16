import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || typeof url !== "string") {
      return NextResponse.json({ message: "URL is required and must be a string" }, { status: 400 })
    }

    // Normalize URL - add https:// if no protocol
    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl
    }

    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(normalizedUrl)
    } catch (e) {
      return NextResponse.json({ message: "Invalid URL format" }, { status: 400 })
    }

    console.log("Fetching URL:", parsedUrl.toString())

    // Fetch the website with manual redirect handling
    let currentUrl = parsedUrl.toString()
    let response: Response | null = null
    let redirectCount = 0
    const maxRedirects = 5

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      while (redirectCount < maxRedirects) {
        console.log("Attempting fetch:", currentUrl, "Redirect count:", redirectCount)

        response = await fetch(currentUrl, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Upgrade-Insecure-Requests": "1",
          },
          redirect: "manual",
          signal: controller.signal,
        })

        console.log("Response status:", response.status)

        // Handle redirects
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location")
          console.log("Redirect location:", location)

          if (!location) {
            return NextResponse.json({ message: "Redirect response missing Location header" }, { status: 502 })
          }

          // Resolve the redirect URL
          currentUrl = new URL(location, currentUrl).toString()
          redirectCount = redirectCount + 1
          console.log("Following redirect to:", currentUrl)
          continue
        }

        // If not a redirect, break the loop
        break
      }

      clearTimeout(timeoutId)

      if (redirectCount >= maxRedirects) {
        return NextResponse.json({ message: "Too many redirects (more than " + maxRedirects + ")" }, { status: 502 })
      }

      if (!response) {
        return NextResponse.json({ message: "No response received from website" }, { status: 502 })
      }

      if (!response.ok) {
        return NextResponse.json({ message: "Failed to fetch website: HTTP " + response.status }, { status: 502 })
      }

      // Get content type - make it optional
      const contentType = response.headers.get("content-type") || ""
      console.log("Content-Type:", contentType)

      // More lenient check - just warn if not HTML but continue anyway
      if (contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
        console.warn("Warning: Content-Type is not HTML:", contentType)
        // Don't return an error, just continue with analysis
      }

      const html = await response.text()
      console.log("HTML length:", html.length)

      if (!html || html.length === 0) {
        return NextResponse.json({ message: "Received empty response from website" }, { status: 502 })
      }

      // Perform accessibility checks using regex
      const issues: any[] = []
      let issueIdCounter = 1

      // Check 1: Missing alt text on images
      const imgRegex = /<img[^>]*>/gi
      const imgMatches = html.match(imgRegex) || []
      const imagesWithoutAlt = imgMatches.filter((img) => {
        return !img.includes("alt=") || /alt=["']\s*["']/.test(img) || /alt=""/.test(img)
      })

      if (imagesWithoutAlt.length > 0) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Images missing alternative text",
          severity: "serious",
          aiExplanation:
            "Images without alt text are inaccessible to screen reader users and users with images disabled.",
          aiImpact:
            "Screen reader users cannot understand the content or purpose of these images. This violates WCAG 2.1 Level A (1.1.1 Non-text Content).",
          aiFixSuggestion:
            'Add descriptive alt attributes to all images. Example: <img src="photo.jpg" alt="Description of the image">. For decorative images, use alt="".',
          htmlElement: imagesWithoutAlt[0],
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Check 2: Missing form labels
      const inputRegex = /<input[^>]*>/gi
      const inputMatches = html.match(inputRegex) || []
      let inputsWithoutLabels = 0

      inputMatches.forEach((input) => {
        const hasId = /id=["']([^"']+)["']/.test(input)
        const isHidden = /type=["']hidden["']/.test(input)
        const hasAriaLabel = /aria-label=["'][^"']+["']/.test(input)

        if (!isHidden && hasId && !hasAriaLabel) {
          const idMatch = input.match(/id=["']([^"']+)["']/)
          if (idMatch) {
            const inputId = idMatch[1]
            const labelRegex = new RegExp('<label[^>]*for=["' + "'" + "]" + inputId + '["' + "'" + "]", "i")
            if (!labelRegex.test(html)) {
              inputsWithoutLabels = inputsWithoutLabels + 1
            }
          }
        }
      })

      if (inputsWithoutLabels > 0) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Form inputs missing labels",
          severity: "serious",
          aiExplanation:
            "Form controls without proper labels are difficult for screen reader users to understand and interact with.",
          aiImpact:
            "Users with screen readers cannot identify the purpose of form fields. This violates WCAG 2.1 Level A (1.3.1 Info and Relationships, 4.1.2 Name, Role, Value).",
          aiFixSuggestion:
            'Add <label> elements with for attributes matching the input id, or use aria-label. Example: <label for="email">Email:</label><input type="email" id="email">',
          htmlElement: "<input> without associated <label>",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Check 3: Missing language attribute
      const htmlTagRegex = /<html[^>]*>/i
      const htmlTagMatch = html.match(htmlTagRegex)
      const hasLangAttribute = htmlTagMatch && /lang=["'][^"']+["']/.test(htmlTagMatch[0])

      if (!hasLangAttribute) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Page missing language attribute",
          severity: "serious",
          aiExplanation:
            "The html element is missing a lang attribute, which specifies the language of the page content.",
          aiImpact:
            "Screen readers may not pronounce content correctly, and translation tools may not work properly. This violates WCAG 2.1 Level A (3.1.1 Language of Page).",
          aiFixSuggestion: 'Add a lang attribute to the <html> tag. Example: <html lang="en"> for English content.',
          htmlElement: htmlTagMatch ? htmlTagMatch[0] : "<html>",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Check 4: Missing document title
      const titleRegex = /<title[^>]*>([^<]+)<\/title>/i
      const titleMatch = html.match(titleRegex)
      const hasTitle = titleMatch && titleMatch[1] && titleMatch[1].trim().length > 0

      if (!hasTitle) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Missing or empty page title",
          severity: "serious",
          aiExplanation:
            "The page is missing a descriptive title element, which is crucial for navigation and orientation.",
          aiImpact:
            "Users cannot quickly identify the page content or purpose. Screen reader users rely heavily on page titles for navigation. This violates WCAG 2.1 Level A (2.4.2 Page Titled).",
          aiFixSuggestion:
            "Add a descriptive <title> element in the <head> section. Example: <title>Contact Us - Company Name</title>",
          htmlElement: "<title></title> or missing",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Check 5: Empty links
      const linkRegex = /<a[^>]*>([^<]*)<\/a>/gi
      const linkMatches = html.match(linkRegex) || []
      const emptyLinks = linkMatches.filter((link) => {
        const textMatch = link.match(/>([^<]*)</i)
        const text = textMatch ? textMatch[1].trim() : ""
        const hasAriaLabel = /aria-label=["'][^"']+["']/.test(link)
        const hasTitle = /title=["'][^"']+["']/.test(link)
        return text.length === 0 && !hasAriaLabel && !hasTitle
      })

      if (emptyLinks.length > 0) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Empty links without text",
          severity: "serious",
          aiExplanation: "Links without text content are not accessible to screen reader users.",
          aiImpact:
            'Screen reader users hear "link" with no information about the destination. This violates WCAG 2.1 Level A (2.4.4 Link Purpose).',
          aiFixSuggestion:
            'Add descriptive text inside links or use aria-label. Example: <a href="/contact">Contact Us</a> or <a href="/home" aria-label="Home">🏠</a>',
          htmlElement: emptyLinks[0],
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Check 6: Missing heading structure
      const h1Regex = /<h1[^>]*>/gi
      const h1Matches = html.match(h1Regex) || []

      if (h1Matches.length === 0) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Missing main heading (h1)",
          severity: "moderate",
          aiExplanation: "The page is missing an h1 element, which should contain the main heading of the page.",
          aiImpact:
            "Screen reader users rely on heading structure for navigation. Missing h1 makes it harder to understand page hierarchy. This can violate WCAG 2.1 Level AA (1.3.1 Info and Relationships).",
          aiFixSuggestion:
            "Add an <h1> element with the main page heading. Example: <h1>Welcome to Our Website</h1>. There should be exactly one h1 per page.",
          htmlElement: "No <h1> found",
          helpUrl: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
        })
        issueIdCounter = issueIdCounter + 1
      } else if (h1Matches.length > 1) {
        issues.push({
          id: "issue-" + issueIdCounter,
          description: "Multiple h1 headings found",
          severity: "moderate",
          aiExplanation: "The page contains multiple h1 elements. Best practice is to have only one h1 per page.",
          aiImpact: "Multiple h1 elements can confuse screen reader users about the page structure and main topic.",
          aiFixSuggestion:
            "Use only one <h1> for the main page heading. Use <h2>, <h3>, etc. for subheadings to create a logical hierarchy.",
          htmlElement: "Multiple <h1> elements found: " + h1Matches.length,
          helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
        })
        issueIdCounter = issueIdCounter + 1
      }

      // Count issues by severity
      let criticalCount = 0
      let seriousCount = 0
      let moderateCount = 0
      let minorCount = 0

      issues.forEach((issue) => {
        if (issue.severity === "critical") criticalCount = criticalCount + 1
        else if (issue.severity === "serious") seriousCount = seriousCount + 1
        else if (issue.severity === "moderate") moderateCount = moderateCount + 1
        else if (issue.severity === "minor") minorCount = minorCount + 1
      })

      // Generate AI summary
      let aiSummary = ""
      if (issues.length === 0) {
        aiSummary =
          "Great news! Our automated accessibility checks did not find any major issues on this page. However, automated tools can only catch about 30-40% of accessibility issues. We recommend conducting manual testing with screen readers and keyboard navigation for complete WCAG compliance."
      } else {
        aiSummary =
          "Found " +
          issues.length +
          " accessibility " +
          (issues.length === 1 ? "issue" : "issues") +
          " that need attention. "

        if (criticalCount > 0) {
          aiSummary =
            aiSummary +
            criticalCount +
            " critical " +
            (criticalCount === 1 ? "issue" : "issues") +
            " should be addressed immediately. "
        }
        if (seriousCount > 0) {
          aiSummary =
            aiSummary +
            seriousCount +
            " serious " +
            (seriousCount === 1 ? "issue" : "issues") +
            " may significantly impact users with disabilities. "
        }
        if (moderateCount > 0) {
          aiSummary =
            aiSummary +
            moderateCount +
            " moderate " +
            (moderateCount === 1 ? "issue" : "issues") +
            " should be improved for better accessibility. "
        }

        aiSummary =
          aiSummary + "Addressing these issues will help make your website more inclusive and WCAG 2.1 compliant."
      }

      const result = {
        scannedResource: currentUrl,
        aiCoachSummary: aiSummary,
        issues: issues,
        criticalCount: criticalCount,
        seriousCount: seriousCount,
        moderateCount: moderateCount,
        minorCount: minorCount,
        totalIssues: issues.length,
      }

      console.log("Analysis complete. Total issues:", issues.length)

      return NextResponse.json(result, { status: 200 })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error("Fetch error:", fetchError)

      let errorMessage = "Failed to fetch website"

      if (fetchError.name === "AbortError") {
        errorMessage = "Request timeout - website took too long to respond"
      } else if (fetchError.message && fetchError.message.includes("ENOTFOUND")) {
        errorMessage = "DNS error - could not find website"
      } else if (fetchError.message && fetchError.message.includes("ECONNREFUSED")) {
        errorMessage = "Connection refused - website is not responding"
      } else if (fetchError.message && fetchError.message.includes("certificate")) {
        errorMessage = "SSL certificate error"
      } else if (fetchError.message) {
        errorMessage = errorMessage + ": " + fetchError.message
      }

      return NextResponse.json({ message: errorMessage }, { status: 502 })
    }
  } catch (error: any) {
    console.error("API error:", error)
    return NextResponse.json(
      { message: error && error.message ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
