"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Globe, Search, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function WebAccessibilityClient() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setScanResults(null)
    setError(null)
  }

  const handleScan = async () => {
    if (!url) {
      setError("Please enter a URL to scan")
      return
    }

    // Simple URL validation
    let finalUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      finalUrl = "https://" + url
    }

    setIsScanning(true)
    setError(null)

    try {
      const response = await fetch("/api/scan-web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: finalUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to scan website")
      }

      const data = await response.json()
      setScanResults(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while scanning the website. Please try again.")
      console.error(err)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Web Accessibility Checker</h1>
          <p className="text-xl text-muted-foreground">
            Analyze websites for accessibility compliance and get detailed recommendations.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Enter Website URL
            </CardTitle>
            <CardDescription>Enter the URL of the website you want to check for accessibility issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={handleUrlChange}
                />
                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleScan} disabled={!url || isScanning} className="w-full">
              {isScanning ? "Scanning..." : "Scan Website for Accessibility Issues"}
            </Button>
          </CardFooter>
        </Card>

        {scanResults && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Scan Results</h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Website Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <p className="text-sm font-medium">URL</p>
                    <p className="text-sm text-muted-foreground">{scanResults.url}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Scan Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(scanResults.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Accessibility Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold">{scanResults.accessibilityScore}/100</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scanResults.accessibilityScore >= 90
                        ? "Excellent"
                        : scanResults.accessibilityScore >= 70
                          ? "Good"
                          : scanResults.accessibilityScore >= 50
                            ? "Needs Improvement"
                            : "Poor"}
                    </p>
                  </div>
                  <div className="w-32 h-32 relative">
                    {/* This would be a circular progress indicator in a real implementation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{scanResults.accessibilityScore}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanResults.issues.map((issue: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <div
                          className={`p-1 rounded-full ${
                            issue.severity === "critical"
                              ? "bg-red-100 text-red-600"
                              : issue.severity === "warning"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {issue.severity === "critical" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : issue.severity === "warning" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <Info className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{issue.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                          {issue.location && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Location: {issue.location.element} (found {issue.location.count} instances)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Standards Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">WCAG 2.1 Level A</p>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        scanResults.standardsCompliance.wcag21A
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {scanResults.standardsCompliance.wcag21A ? "Pass" : "Fail"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">WCAG 2.1 Level AA</p>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        scanResults.standardsCompliance.wcag21AA
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {scanResults.standardsCompliance.wcag21AA ? "Pass" : "Fail"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Section 508</p>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        scanResults.standardsCompliance.section508
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {scanResults.standardsCompliance.section508 ? "Pass" : "Fail"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanResults.recommendations.map((recommendation: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p className="font-medium">{recommendation.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Download Full Report</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
