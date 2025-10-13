"use server"

interface AnalysisResult {
  success: boolean
  error?: string
  summary?: string
  issues?: string[]
  wcagCompliance?: string
  potentialImprovements?: string[]
}

export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  try {
    // Validate URL
    if (!url || !url.startsWith("http")) {
      return {
        success: false,
        error: "Please provide a valid URL starting with http:// or https://",
      }
    }

    // Call the existing API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/scan-web`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      summary: data.aiCoachSummary || "Analysis completed successfully",
      issues: data.issues?.map((issue: any) => issue.description) || [],
      wcagCompliance: `Found ${data.totalIssues || 0} accessibility issues`,
      potentialImprovements: data.issues?.map((issue: any) => issue.aiFixSuggestion) || [],
    }
  } catch (error) {
    console.error("Website analysis error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze website",
    }
  }
}
