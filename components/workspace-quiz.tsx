"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  {
    id: 1,
    question: "How many hours do you typically spend at your workstation each day?",
    options: [
      { value: "a", label: "Less than 4 hours" },
      { value: "b", label: "4-6 hours" },
      { value: "c", label: "6-8 hours" },
      { value: "d", label: "More than 8 hours" },
    ],
  },
  {
    id: 2,
    question: "Do you experience any discomfort or pain while working?",
    options: [
      { value: "a", label: "No discomfort" },
      { value: "b", label: "Occasional mild discomfort" },
      { value: "c", label: "Regular discomfort" },
      { value: "d", label: "Frequent pain" },
    ],
  },
  {
    id: 3,
    question: "How would you describe your current chair?",
    options: [
      { value: "a", label: "Ergonomic with multiple adjustments" },
      { value: "b", label: "Office chair with some adjustments" },
      { value: "c", label: "Basic chair with limited adjustments" },
      { value: "d", label: "Non-adjustable or improvised seating" },
    ],
  },
  {
    id: 4,
    question: "Is your monitor positioned at eye level?",
    options: [
      { value: "a", label: "Yes, perfectly at eye level" },
      { value: "b", label: "Slightly above or below eye level" },
      { value: "c", label: "Significantly above or below eye level" },
      { value: "d", label: "I use a laptop without an external monitor" },
    ],
  },
  {
    id: 5,
    question: "How often do you take breaks during your work day?",
    options: [
      { value: "a", label: "Every 30 minutes" },
      { value: "b", label: "Every hour" },
      { value: "c", label: "Every few hours" },
      { value: "d", label: "Rarely or only for lunch" },
    ],
  },
]

export function WorkspaceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedOption })

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[questions[currentQuestion - 1].id] || null)
    }
  }

  const handleOptionChange = (value: string) => {
    setSelectedOption(value)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setSelectedOption(null)
  }

  const calculateScore = () => {
    // Simple scoring system for demo purposes
    const scoreMap: Record<string, number> = { a: 3, b: 2, c: 1, d: 0 }
    let total = 0

    Object.values(answers).forEach((answer) => {
      total += scoreMap[answer] || 0
    })

    return Math.round((total / (questions.length * 3)) * 100)
  }

  const getRecommendations = () => {
    const score = calculateScore()

    if (score >= 80) {
      return "Your workspace is well-optimized! Consider fine-tuning with advanced ergonomic accessories and regular movement breaks."
    } else if (score >= 60) {
      return "Your workspace has good elements but could use improvements. Focus on monitor positioning and taking more frequent breaks."
    } else if (score >= 40) {
      return "Your workspace needs significant improvements. Consider investing in an ergonomic chair and proper monitor setup."
    } else {
      return "Your workspace requires immediate attention. We recommend a complete ergonomic assessment and redesign."
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <AnimatePresence mode="wait">
      {!showResults ? (
        <motion.div
          key="question"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <h3 className="text-lg font-medium mt-4">{questions[currentQuestion].question}</h3>

            <RadioGroup value={selectedOption || ""} onValueChange={handleOptionChange} className="space-y-3 mt-4">
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`option-${option.value}`}
                    className="border-primary text-primary"
                  />
                  <Label htmlFor={`option-${option.value}`} className="cursor-pointer w-full py-2">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="bg-primary hover:bg-primary/90 flex items-center"
              >
                {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center rounded-full p-2 bg-primary/10 text-primary mb-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold">Your Workspace Score</h3>

            <div className="relative h-32 w-32 mx-auto">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${calculateScore() * 2.51} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                <text x="50" y="50" dy="0.35em" textAnchor="middle" className="text-2xl font-bold fill-current">
                  {calculateScore()}%
                </text>
              </svg>
            </div>

            <div className="bg-muted/40 p-4 rounded-lg text-left mt-4">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <p className="text-sm text-muted-foreground">{getRecommendations()}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Button variant="outline" className="flex items-center" onClick={handleRestart}>
                Take Quiz Again
              </Button>

              <Button className="bg-primary hover:bg-primary/90 flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Want a detailed assessment?{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact us
              </a>{" "}
              for a professional consultation.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
