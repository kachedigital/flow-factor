"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, Brain, CheckCircle, Clock, Lightbulb, Star, ThumbsUp } from "lucide-react"

// Types
type Exercise = {
  id: string
  title: string
  description: string
  category: string
  steps: ExerciseStep[]
  estimatedTime: string
}

type ExerciseStep = {
  id: number
  title: string
  instruction: string
  inputType: "text" | "multipleChoice" | "rating" | "reflection"
  options?: string[]
  placeholder?: string
}

type JournalEntry = {
  id: string
  exerciseId: string
  title: string
  date: string
  responses: Record<number, string>
  mood: number
  insights: string
}

export default function MindShiftClient() {
  const [activeTab, setActiveTab] = useState("exercises")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [mood, setMood] = useState(3)
  const [insights, setInsights] = useState("")
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [filter, setFilter] = useState("all")
  const [progress, setProgress] = useState(0)
  const [stats, setStats] = useState({
    completed: 0,
    streak: 0,
    mostUsed: "",
    averageMood: 0,
  })

  // Load journal entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("mindshift-journal")
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries))
    }

    // Calculate stats
    if (journalEntries.length > 0) {
      const completed = journalEntries.length

      // Calculate streak (simplified)
      const streak = Math.min(7, completed)

      // Find most used exercise
      const exerciseCounts: Record<string, number> = {}
      journalEntries.forEach((entry) => {
        exerciseCounts[entry.title] = (exerciseCounts[entry.title] || 0) + 1
      })
      const mostUsed = Object.entries(exerciseCounts).sort((a, b) => b[1] - a[1])[0][0]

      // Calculate average mood
      const totalMood = journalEntries.reduce((sum, entry) => sum + entry.mood, 0)
      const averageMood = Math.round((totalMood / journalEntries.length) * 10) / 10

      setStats({
        completed,
        streak,
        mostUsed,
        averageMood,
      })
    }
  }, [journalEntries])

  // Save journal entries to localStorage
  useEffect(() => {
    if (journalEntries.length > 0) {
      localStorage.setItem("mindshift-journal", JSON.stringify(journalEntries))
    }
  }, [journalEntries])

  // Update progress when doing an exercise
  useEffect(() => {
    if (selectedExercise) {
      setProgress(Math.round((currentStep / selectedExercise.steps.length) * 100))
    }
  }, [currentStep, selectedExercise])

  const exercises: Exercise[] = [
    {
      id: "thought-reframing",
      title: "Thought Reframing",
      description: "Identify and challenge negative thought patterns to develop more balanced perspectives.",
      category: "cognitive",
      estimatedTime: "10 min",
      steps: [
        {
          id: 1,
          title: "Identify the Situation",
          instruction: "Describe a work situation that triggered negative emotions or stress.",
          inputType: "text",
          placeholder: "What happened? Be specific about the situation...",
        },
        {
          id: 2,
          title: "Capture Your Thoughts",
          instruction: "What thoughts went through your mind in this situation?",
          inputType: "text",
          placeholder: "Write down your automatic thoughts...",
        },
        {
          id: 3,
          title: "Identify Cognitive Distortions",
          instruction: "Which thinking patterns might be present in your thoughts?",
          inputType: "multipleChoice",
          options: [
            "All-or-nothing thinking",
            "Overgeneralization",
            "Mental filtering",
            "Jumping to conclusions",
            "Catastrophizing",
            "Emotional reasoning",
            "Labeling",
            "Personalization",
          ],
        },
        {
          id: 4,
          title: "Challenge Your Thoughts",
          instruction: "What evidence contradicts your negative thoughts? Is there another way to view this situation?",
          inputType: "text",
          placeholder: "Consider alternative perspectives...",
        },
        {
          id: 5,
          title: "Develop a Balanced Thought",
          instruction: "Create a more balanced, realistic thought about the situation.",
          inputType: "text",
          placeholder: "A more balanced perspective might be...",
        },
      ],
    },
    {
      id: "workplace-gratitude",
      title: "Workplace Gratitude",
      description: "Cultivate appreciation for positive aspects of your work environment.",
      category: "positive",
      estimatedTime: "5 min",
      steps: [
        {
          id: 1,
          title: "Daily Accomplishments",
          instruction: "List three things you accomplished today, no matter how small.",
          inputType: "text",
          placeholder: "Today I accomplished...",
        },
        {
          id: 2,
          title: "Colleague Appreciation",
          instruction: "Identify someone at work who helped you recently and how they made a difference.",
          inputType: "text",
          placeholder: "I appreciate...",
        },
        {
          id: 3,
          title: "Learning Opportunities",
          instruction: "What have you learned recently at work that you're grateful for?",
          inputType: "text",
          placeholder: "I've learned...",
        },
        {
          id: 4,
          title: "Workplace Benefits",
          instruction: "What aspects of your workplace environment do you appreciate?",
          inputType: "text",
          placeholder: "I appreciate these aspects of my workplace...",
        },
      ],
    },
    {
      id: "stress-defusion",
      title: "Stress Defusion",
      description: "Learn to separate yourself from stressful thoughts to reduce their impact.",
      category: "mindfulness",
      estimatedTime: "7 min",
      steps: [
        {
          id: 1,
          title: "Identify Stressful Thought",
          instruction: "Write down a recurring stressful thought about work.",
          inputType: "text",
          placeholder: "The stressful thought is...",
        },
        {
          id: 2,
          title: "Observe the Thought",
          instruction:
            "Imagine placing this thought on a leaf and watching it float down a stream. Describe how it feels to observe the thought rather than be caught up in it.",
          inputType: "text",
          placeholder: "As I observe this thought...",
        },
        {
          id: 3,
          title: "Add Distance",
          instruction: "Rewrite your thought with the prefix: 'I'm having the thought that...'",
          inputType: "text",
          placeholder: "I'm having the thought that...",
        },
        {
          id: 4,
          title: "Thank Your Mind",
          instruction:
            "Thank your mind for trying to protect you, even if the thought isn't helpful. What would you say?",
          inputType: "text",
          placeholder: "Thank you mind for...",
        },
      ],
    },
    {
      id: "values-alignment",
      title: "Values Alignment",
      description: "Identify core values and align daily work activities with what matters most to you.",
      category: "purpose",
      estimatedTime: "15 min",
      steps: [
        {
          id: 1,
          title: "Identify Core Values",
          instruction: "Select 3-5 values that are most important to you in your work life.",
          inputType: "multipleChoice",
          options: [
            "Achievement",
            "Balance",
            "Collaboration",
            "Creativity",
            "Growth",
            "Helping Others",
            "Independence",
            "Innovation",
            "Integrity",
            "Leadership",
            "Recognition",
            "Security",
          ],
        },
        {
          id: 2,
          title: "Current Alignment",
          instruction: "How well does your current work align with these values? Rate from 1-10.",
          inputType: "rating",
        },
        {
          id: 3,
          title: "Value Expression",
          instruction: "Describe one way you expressed one of your core values at work recently.",
          inputType: "text",
          placeholder: "I expressed my value of...",
        },
        {
          id: 4,
          title: "Future Alignment",
          instruction: "What is one small step you could take tomorrow to better align your work with your values?",
          inputType: "text",
          placeholder: "Tomorrow I could...",
        },
      ],
    },
  ]

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setCurrentStep(0)
    setResponses({})
    setProgress(0)
  }

  const handleResponseChange = (stepId: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [stepId]: value,
    }))
  }

  const handleNextStep = () => {
    if (selectedExercise && currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last step completed
      setActiveTab("reflection")
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSaveJournal = () => {
    if (selectedExercise) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        exerciseId: selectedExercise.id,
        title: selectedExercise.title,
        date: new Date().toISOString(),
        responses,
        mood,
        insights,
      }

      setJournalEntries((prev) => [newEntry, ...prev])
      setActiveTab("journal")
      setSelectedExercise(null)
      setResponses({})
      setInsights("")
    }
  }

  const handleBackToExercises = () => {
    setSelectedExercise(null)
    setActiveTab("exercises")
    setResponses({})
    setInsights("")
  }

  const filteredExercises = filter === "all" ? exercises : exercises.filter((ex) => ex.category === filter)

  const renderExerciseStep = (step: ExerciseStep) => {
    switch (step.inputType) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={`step-${step.id}`}>{step.instruction}</Label>
            <Textarea
              id={`step-${step.id}`}
              placeholder={step.placeholder}
              value={responses[step.id] || ""}
              onChange={(e) => handleResponseChange(step.id, e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        )
      case "multipleChoice":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{step.instruction}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {step.options?.map((option, i) => (
                <div key={i} className="flex items-center">
                  <Button
                    variant={responses[step.id]?.includes(option) ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => {
                      const currentSelections = responses[step.id]?.split(",").filter(Boolean) || []
                      const isSelected = currentSelections.includes(option)

                      let newSelections
                      if (isSelected) {
                        newSelections = currentSelections.filter((item) => item !== option)
                      } else {
                        newSelections = [...currentSelections, option]
                      }

                      handleResponseChange(step.id, newSelections.join(","))
                    }}
                  >
                    {responses[step.id]?.includes(option) && <CheckCircle className="mr-2 h-4 w-4" />}
                    {!responses[step.id]?.includes(option) && <div className="w-4 h-4 mr-2" />}
                    {option}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )
      case "rating":
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{step.instruction}</p>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Button
                  key={num}
                  variant={responses[step.id] === num.toString() ? "default" : "outline"}
                  className="w-8 h-8 p-0"
                  onClick={() => handleResponseChange(step.id, num.toString())}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Not at all</span>
              <span>Completely</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-4">
          {!selectedExercise ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">CBT Exercises</h2>
                <div className="flex space-x-2">
                  <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                    All
                  </Button>
                  <Button
                    variant={filter === "cognitive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("cognitive")}
                  >
                    Cognitive
                  </Button>
                  <Button
                    variant={filter === "positive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("positive")}
                  >
                    Positive
                  </Button>
                  <Button
                    variant={filter === "mindfulness" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("mindfulness")}
                  >
                    Mindfulness
                  </Button>
                  <Button
                    variant={filter === "purpose" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("purpose")}
                  >
                    Purpose
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{exercise.estimatedTime}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex justify-between">
                      <div className="text-sm font-medium">{exercise.steps.length} steps</div>
                      <Button onClick={() => handleStartExercise(exercise)}>
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedExercise.title}</CardTitle>
                    <CardDescription>
                      Step {currentStep + 1} of {selectedExercise.steps.length}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleBackToExercises}>
                    Exit
                  </Button>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{selectedExercise.steps[currentStep].title}</h3>
                    {renderExerciseStep(selectedExercise.steps[currentStep])}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button onClick={handleNextStep} disabled={!responses[selectedExercise.steps[currentStep].id]}>
                  {currentStep < selectedExercise.steps.length - 1 ? "Next" : "Complete"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Reflection Tab (shown after completing an exercise) */}
        <TabsContent value="reflection">
          {selectedExercise && (
            <Card>
              <CardHeader>
                <CardTitle>Reflect on Your Experience</CardTitle>
                <CardDescription>Take a moment to reflect on what you learned from this exercise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>How are you feeling now?</Label>
                  <div className="flex justify-between items-center py-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        variant={mood === value ? "default" : "outline"}
                        className="w-12 h-12 rounded-full p-0"
                        onClick={() => setMood(value)}
                      >
                        {value === 1 && "😔"}
                        {value === 2 && "😐"}
                        {value === 3 && "🙂"}
                        {value === 4 && "😊"}
                        {value === 5 && "😄"}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Not great</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insights">What insights did you gain from this exercise?</Label>
                  <Textarea
                    id="insights"
                    placeholder="I realized that..."
                    value={insights}
                    onChange={(e) => setInsights(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={handleBackToExercises}>
                  Exit Without Saving
                </Button>
                <Button onClick={handleSaveJournal}>Save to Journal</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Journal Tab */}
        <TabsContent value="journal" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Journal</h2>

          {journalEntries.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Brain className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-medium">No Journal Entries Yet</h3>
                <p className="text-muted-foreground">Complete an exercise to start building your journal</p>
                <Button onClick={() => setActiveTab("exercises")}>Try an Exercise</Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{entry.title}</CardTitle>
                        <CardDescription>{formatDate(entry.date)}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg">
                          {entry.mood === 1 && "😔"}
                          {entry.mood === 2 && "😐"}
                          {entry.mood === 3 && "🙂"}
                          {entry.mood === 4 && "😊"}
                          {entry.mood === 5 && "😄"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Insights:</h4>
                      <p className="text-muted-foreground">{entry.insights || "No insights recorded"}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {exercises.find((ex) => ex.id === entry.exerciseId)?.category || "Exercise"}
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Exercises Completed</CardDescription>
                <CardTitle className="text-4xl">{stats.completed}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Keep building your mental fitness</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Current Streak</CardDescription>
                <CardTitle className="text-4xl">{stats.streak} days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {stats.streak > 0 ? "Keep it going!" : "Start your streak today"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Most Used Exercise</CardDescription>
                <CardTitle className="text-xl truncate">{stats.mostUsed || "None yet"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Try different exercises for balance</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Mood</CardDescription>
                <CardTitle className="text-4xl">{stats.averageMood || "-"}/5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {stats.averageMood >= 4
                    ? "Excellent progress!"
                    : stats.averageMood >= 3
                      ? "Good progress"
                      : stats.averageMood > 0
                        ? "Building resilience"
                        : "Complete an exercise"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your CBT Journey</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              {journalEntries.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Complete exercises to see your progress</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Exercise Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["cognitive", "positive", "mindfulness", "purpose"].map((category) => {
                        const count = journalEntries.filter(
                          (entry) => exercises.find((ex) => ex.id === entry.exerciseId)?.category === category,
                        ).length

                        return (
                          <Card key={category} className="overflow-hidden">
                            <div className="h-2 bg-primary" />
                            <CardContent className="pt-4">
                              <div className="text-sm font-medium capitalize">{category}</div>
                              <div className="text-2xl font-bold">{count}</div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About MindShift CBT</CardTitle>
              <CardDescription>Evidence-based tools to improve mental wellbeing at work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MindShift CBT uses principles from Cognitive Behavioral Therapy (CBT) to help you identify and change
                thought patterns that negatively affect your work experience and productivity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Evidence-Based</h3>
                    <p className="text-sm text-muted-foreground">
                      All exercises are based on proven CBT techniques used by therapists worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Workplace Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      Specifically designed to address common workplace stressors and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ThumbsUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Private & Secure</h3>
                    <p className="text-sm text-muted-foreground">
                      Your journal entries are stored locally on your device and are not shared with anyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Track Your Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor your improvement over time with detailed statistics and insights.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">How to Use MindShift CBT</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Choose an exercise that addresses your current needs</li>
                  <li>2. Follow the step-by-step prompts, answering honestly</li>
                  <li>3. Reflect on your experience and save it to your journal</li>
                  <li>4. Review your journal entries to track patterns and progress</li>
                  <li>5. Practice regularly for the best results</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("exercises")} className="w-full">
                Start Your First Exercise
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>MindShift CBT is not a replacement for professional mental health care.</p>
            <p>If you're experiencing severe distress, please seek help from a qualified professional.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
