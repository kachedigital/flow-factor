"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function PDFCheckerClient() {
  const [file, setFile] = useState<File | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setScanResults(null)
    setError(null)
  }

  const handleScan = async () => {
    if (!file) {
      setError("Please select a PDF file to scan")
      return
    }

    setIsScanning(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("pdf", file)

      console.log("Making request to /api/scan-pdf with file:", file.name)

      const response = await fetch("/api/scan-pdf", {
        method: "POST",
        body: formData,
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Response data:", data)
      setScanResults(data)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("An error occurred while scanning the PDF. Please try again.")
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">PDF Accessibility Checker</h1>
          <p className="text-xl text-muted-foreground">
            Scan your PDF documents for accessibility issues and get recommendations for improvement.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload PDF
            </CardTitle>
            <CardDescription>Select a PDF file to check for accessibility issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: <span className="font-medium">{file.name}</span> (
                    {(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
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
            <Button onClick={handleScan} disabled={!file || isScanning} className="w-full">
              {isScanning ? "Scanning..." : "Scan PDF for Accessibility Issues"}
            </Button>
          </CardFooter>
        </Card>

        {scanResults && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Scan Results</h2>

            {/* Show AI Coach Summary if it exists */}
            {scanResults.aiCoachSummary && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    AI Coach Summary
                  </CardTitle>
                  <CardDescription>For: {scanResults.scannedResource}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{scanResults.aiCoachSummary}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Document Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Document Title</p>
                      <p className="text-sm text-muted-foreground">
                        {scanResults.documentInfo?.title || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pages</p>
                      <p className="text-sm text-muted-foreground">{scanResults.documentInfo?.pages}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">PDF Version</p>
                      <p className="text-sm text-muted-foreground">{scanResults.documentInfo?.pdfVersion}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tagged PDF</p>
                      <p className="text-sm text-muted-foreground">{scanResults.documentInfo?.tagged ? "Yes" : "No"}</p>
                    </div>
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
                  {scanResults.issues?.map((issue: any, index: number) => (
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
                              Location: Page {issue.location.page}, {issue.location.element}
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
                  <FileText className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanResults.recommendations?.map((recommendation: any, index: number) => (
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
