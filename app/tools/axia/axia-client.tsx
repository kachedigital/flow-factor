"use client"

import type React from "react"
import { useState, type ChangeEvent } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Globe, CheckCircle2, AlertCircle, Info, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUpload } from "@/components/file-upload"

interface AccessibilityIssue {
  id: string
  description: string
  helpUrl?: string
  severity: "critical" | "serious" | "moderate" | "minor" | "info"
  aiExplanation: string
  aiImpact: string
  aiFixSuggestion: string
  htmlElement?: string
}

interface AnalysisResults {
  scannedResource: string
  aiCoachSummary: string
  issues: AccessibilityIssue[]
  criticalCount: number
  seriousCount: number
  moderateCount: number
  minorCount: number
  totalIssues: number
}

export default function AxiaClient() {
  const [activeTab, setActiveTab] = useState("web")
  const [url, setUrl] = useState("")
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleWebAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError("Please enter a website URL.")
      return
    }
    setIsAnalyzing(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/scan-web", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      const data: AnalysisResults = await response.json()
      setResults(data)
    } catch (err: any) {
      setError(err.message || "Failed to analyze website.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePDFAnalysis = async () => {
    if (!uploadedFileUrl || !uploadedFileName) {
      setError("Please upload a PDF file first.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/scan-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl: uploadedFileUrl,
          fileName: uploadedFileName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      const data: AnalysisResults = await response.json()
      setResults(data)
    } catch (err: any) {
      setError(err.message || "Failed to analyze PDF.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileUploadComplete = (url: string, fileName: string) => {
    setUploadedFileUrl(url)
    setUploadedFileName(fileName)
    setError(null)
    console.log("PDF uploaded successfully:", fileName)
  }

  const getSeverityColor = (severity: AccessibilityIssue["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-600 dark:text-red-400 border-red-500 dark:border-red-400"
      case "serious":
        return "text-orange-600 dark:text-orange-400 border-orange-500 dark:border-orange-400"
      case "moderate":
        return "text-yellow-600 dark:text-yellow-400 border-yellow-500 dark:border-yellow-400"
      case "minor":
        return "text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400"
      default:
        return "text-gray-600 dark:text-gray-400 border-gray-500 dark:border-gray-400"
    }
  }

  const getSeverityIcon = (severity: AccessibilityIssue["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "serious":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "moderate":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "minor":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center justify-center mb-4">
          <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-purple-500 mr-2 md:mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AXIA Accessibility Checker</h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Instantly analyze web pages and PDF documents for accessibility issues. Get AI-powered insights and actionable
          guidance to help you achieve WCAG Level A-AAA compliance and create more inclusive digital experiences.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">
          Powered by <Sparkles className="inline h-3 w-3 md:h-4 md:w-4 text-purple-400" /> AI and industry-standard
          checking engines.
        </p>
      </motion.div>

      <Tabs defaultValue="web" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="web" className="flex items-center gap-2 py-2.5 md:py-3 text-sm md:text-base">
            <Globe className="h-4 w-4 md:h-5 md:w-5" />
            Web Page Analysis
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-2 py-2.5 md:py-3 text-sm md:text-base">
            <FileText className="h-4 w-4 md:h-5 md:w-5" />
            PDF Document Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="web" className="mt-8">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Analyze Website Accessibility</CardTitle>
              <CardDescription>Enter a URL to check for WCAG compliance and accessibility issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWebAnalysis} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="url" className="text-sm md:text-base font-medium">
                    Website URL
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={handleUrlChange}
                    required
                    className="py-2.5 px-3 md:py-3 md:px-4 text-sm md:text-base"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full py-2.5 md:py-3 text-sm md:text-base font-semibold"
                >
                  {isAnalyzing ? "Analyzing Web Page..." : "Analyze Website"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdf" className="mt-8">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Analyze PDF Accessibility</CardTitle>
              <CardDescription>
                Upload a PDF document to check for accessibility features and compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label className="text-sm md:text-base font-medium">PDF Document</Label>
                <FileUpload
                  bucket="pdf-documents"
                  maxSize={10}
                  acceptedTypes={["application/pdf"]}
                  onUploadComplete={handleFileUploadComplete}
                  className="w-full"
                />
              </div>

              {uploadedFileName && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      File uploaded: {uploadedFileName}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePDFAnalysis}
                disabled={isAnalyzing || !uploadedFileUrl}
                className="w-full py-2.5 md:py-3 text-sm md:text-base font-semibold"
              >
                {isAnalyzing ? "Analyzing PDF..." : "Analyze PDF"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAnalyzing && (
        <div className="text-center my-10">
          <div role="status" className="inline-flex flex-col items-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 md:w-10 md:w-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-base md:text-lg font-medium text-muted-foreground mt-3 md:mt-4">
              Analyzing, please wait...
            </span>
          </div>
        </div>
      )}

      {error && !isAnalyzing && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="my-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {results && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-10 mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 md:gap-3">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-300" />
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">AI Coach Summary</CardTitle>
              </div>
              <CardDescription className="text-purple-200 pt-1">
                For: <span className="font-semibold">{results.scannedResource}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-base md:text-lg leading-relaxed pt-0">
              <p>{results.aiCoachSummary}</p>
              {results.totalIssues > 0 && (
                <div className="mt-4 text-sm grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {results.criticalCount > 0 && <span>Critical: {results.criticalCount}</span>}
                  {results.seriousCount > 0 && <span>Serious: {results.seriousCount}</span>}
                  {results.moderateCount > 0 && <span>Moderate: {results.moderateCount}</span>}
                  {results.minorCount > 0 && <span>Minor: {results.minorCount}</span>}
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Detailed Findings ({results.totalIssues})
            </h2>
            {results.issues.length === 0 ? (
              <Alert className="max-w-xl mx-auto bg-green-50 dark:bg-green-900/30 border-green-500">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-700 dark:text-green-400">No Automated Issues Found!</AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-500">
                  Congratulations! Our automated checks did not find any accessibility issues. Manual review is always
                  recommended for full compliance.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                {results.issues.map((issue) => (
                  <Card
                    key={issue.id}
                    className={`shadow-md hover:shadow-lg transition-shadow border-l-4 ${getSeverityColor(issue.severity)}`}
                  >
                    <CardHeader
                      className={`pb-3 ${
                        issue.severity === "critical"
                          ? "bg-red-50 dark:bg-red-900/20"
                          : issue.severity === "serious"
                            ? "bg-orange-50 dark:bg-orange-900/20"
                            : issue.severity === "moderate"
                              ? "bg-yellow-50 dark:bg-yellow-900/20"
                              : "bg-gray-50 dark:bg-gray-800/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(issue.severity)}
                          <CardTitle
                            className={`text-lg md:text-xl ${getSeverityColor(issue.severity).replace("border-", "text-")}`}
                          >
                            {issue.description}
                          </CardTitle>
                        </div>
                        <span
                          className={`px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full capitalize ${
                            issue.severity === "critical"
                              ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                              : issue.severity === "serious"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100"
                                : issue.severity === "moderate"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      {issue.htmlElement && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto">
                            {issue.htmlElement.length > 200
                              ? `${issue.htmlElement.substring(0, 200)}...`
                              : issue.htmlElement}
                          </p>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3 md:space-y-4 text-sm md:text-base">
                      <div>
                        <h4 className="font-semibold text-muted-foreground mb-1">What this means:</h4>
                        <p>{issue.aiExplanation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-muted-foreground mb-1">Impact on users:</h4>
                        <p>{issue.aiImpact}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-muted-foreground mb-1">How to fix:</h4>
                        {issue.aiFixSuggestion.includes("```") ? (
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 md:p-3 rounded-md text-xs md:text-sm overflow-x-auto">
                            <code>
                              {issue.aiFixSuggestion
                                .replace(/```(html|css|javascript|plaintext)?\n?([\s\S]*?)\n?```/g, "$2")
                                .trim()}
                            </code>
                          </pre>
                        ) : (
                          <p>{issue.aiFixSuggestion}</p>
                        )}
                      </div>
                      {issue.helpUrl && (
                        <a
                          href={issue.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline inline-flex items-center gap-1"
                        >
                          Learn more <ExternalLink size={14} />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
