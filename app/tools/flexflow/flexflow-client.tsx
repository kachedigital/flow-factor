"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Wind,
  Dumbbell,
  Brain,
  Clock,
  Calendar,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

// Types
type Exercise = {
  id: string
  title: string
  description: string
  category: "stretch" | "breathe" | "focus"
  duration: number
  steps: ExerciseStep[]
  benefits: string[]
  level: "beginner" | "intermediate" | "advanced"
}

type ExerciseStep = {
  id: number
  instruction: string
  duration: number
  image?: string
}

type SessionHistory = {
  id: string
  date: string
  exercises: string[]
  duration: number
  category: "stretch" | "breathe" | "focus" | "mixed"
}

export default function FlexFlowClient() {
  const [activeTab, setActiveTab] = useState("exercises")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([])
  const [filter, setFilter] = useState("all")
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(true)
  const [reminderInterval, setReminderInterval] = useState(60)
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
    favoriteCategory: "",
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load session history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("flexflow-history")
    if (savedHistory) {
      setSessionHistory(JSON.parse(savedHistory))
    }

    // Initialize audio
    audioRef.current = new Audio("/sounds/bell.mp3")

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Save session history to localStorage
  useEffect(() => {
    if (sessionHistory.length > 0) {
      localStorage.setItem("flexflow-history", JSON.stringify(sessionHistory))

      // Calculate stats
      const totalSessions = sessionHistory.length
      const totalMinutes = sessionHistory.reduce((sum, session) => sum + session.duration, 0)

      // Calculate streak (simplified)
      const streak = calculateStreak(sessionHistory)

      // Find favorite category
      const categoryCounts: Record<string, number> = {}
      sessionHistory.forEach((session) => {
        categoryCounts[session.category] = (categoryCounts[session.category] || 0) + 1
      })
      const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0]

      setStats({
        totalSessions,
        totalMinutes,
        streak,
        favoriteCategory,
      })
    }
  }, [sessionHistory])

  // Timer logic
  useEffect(() => {
    if (isPlaying && selectedExercise) {
      if (timeRemaining <= 0) {
        // Move to next step or complete exercise
        if (currentStep < selectedExercise.steps.length - 1) {
          playSound()
          setCurrentStep(currentStep + 1)
          setTimeRemaining(selectedExercise.steps[currentStep + 1].duration)
        } else {
          // Exercise completed
          completeExercise()
        }
      } else {
        timerRef.current = setInterval(() => {
          setTimeRemaining((prev) => Math.max(0, prev - 1))
        }, 1000)
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [isPlaying, timeRemaining, currentStep, selectedExercise])

  // Update progress when doing an exercise
  useEffect(() => {
    if (selectedExercise) {
      const totalDuration = selectedExercise.steps.reduce((sum, step) => sum + step.duration, 0)
      const elapsedDuration =
        selectedExercise.steps.slice(0, currentStep).reduce((sum, step) => sum + step.duration, 0) +
        (selectedExercise.steps[currentStep]?.duration - timeRemaining)

      setProgress(Math.round((elapsedDuration / totalDuration) * 100))
    }
  }, [currentStep, timeRemaining, selectedExercise])

  const calculateStreak = (history: SessionHistory[]) => {
    if (history.length === 0) return 0

    const today = new Date().setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Check if there's a session today
    const hasSessionToday = history.some((session) => {
      const sessionDate = new Date(session.date).setHours(0, 0, 0, 0)
      return sessionDate === today
    })

    // Check if there's a session yesterday
    const hasSessionYesterday = history.some((session) => {
      const sessionDate = new Date(session.date).setHours(0, 0, 0, 0)
      return sessionDate === yesterday.getTime()
    })

    // Simple streak calculation
    if (hasSessionToday) {
      return hasSessionYesterday ? Math.min(7, history.length) : 1
    }

    return 0
  }

  const playSound = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.play()
    }
  }

  const exercises: Exercise[] = [
    {
      id: "desk-stretches",
      title: "Desk Stretches",
      description: "Quick stretches you can do at your desk to relieve tension and improve circulation.",
      category: "stretch",
      duration: 300, // 5 minutes
      level: "beginner",
      benefits: ["Reduces muscle tension", "Improves posture", "Increases blood flow"],
      steps: [
        {
          id: 1,
          instruction: "Neck Rolls: Gently roll your head in a circular motion, 5 times in each direction.",
          duration: 30,
          image: "/gentle-neck-stretch.png",
        },
        {
          id: 2,
          instruction: "Shoulder Rolls: Roll your shoulders forward 5 times, then backward 5 times.",
          duration: 30,
          image: "/gentle-shoulder-roll.png",
        },
        {
          id: 3,
          instruction:
            "Wrist Stretches: Extend your arm and gently pull your fingers back, hold for 15 seconds on each hand.",
          duration: 30,
          image: "/wrist-flexion-extension.png",
        },
        {
          id: 4,
          instruction:
            "Seated Spinal Twist: Sit tall, place your right hand on your left knee, and gently twist to the left. Hold for 15 seconds, then switch sides.",
          duration: 60,
          image: "/seated-spinal-twist.png",
        },
        {
          id: 5,
          instruction:
            "Seated Forward Bend: Sit tall, then hinge at your hips to reach toward your feet. Hold for 30 seconds.",
          duration: 30,
          image: "/seated-forward-bend-pose.png",
        },
        {
          id: 6,
          instruction:
            "Chest Opener: Clasp your hands behind your back and gently lift your arms. Hold for 15 seconds.",
          duration: 30,
          image: "/chest-opener-stretch.png",
        },
        {
          id: 7,
          instruction:
            "Ankle Circles: Lift one foot and rotate your ankle 5 times in each direction. Repeat with the other foot.",
          duration: 30,
          image: "/ankle-circles.png",
        },
        {
          id: 8,
          instruction: "Eye Relaxation: Rub your palms together, then place them over your closed eyes for 30 seconds.",
          duration: 30,
          image: "/eye-relaxation.png",
        },
        {
          id: 9,
          instruction: "Final Relaxation: Sit tall, close your eyes, and take 3 deep breaths.",
          duration: 30,
          image: "/seated-relaxation.png",
        },
      ],
    },
    {
      id: "box-breathing",
      title: "Box Breathing",
      description: "A simple breathing technique to reduce stress and improve focus.",
      category: "breathe",
      duration: 300, // 5 minutes
      level: "beginner",
      benefits: ["Reduces stress", "Improves concentration", "Regulates nervous system"],
      steps: [
        {
          id: 1,
          instruction: "Find a comfortable seated position with your back straight.",
          duration: 15,
          image: "/seated-meditation-pose.png",
        },
        {
          id: 2,
          instruction: "Inhale slowly through your nose for 4 seconds.",
          duration: 4,
          image: "/inhale-breathing.png",
        },
        {
          id: 3,
          instruction: "Hold your breath for 4 seconds.",
          duration: 4,
          image: "/hold-breath.png",
        },
        {
          id: 4,
          instruction: "Exhale slowly through your mouth for 4 seconds.",
          duration: 4,
          image: "/exhale-breathing.png",
        },
        {
          id: 5,
          instruction: "Hold your breath for 4 seconds.",
          duration: 4,
          image: "/hold-breath.png",
        },
        // Repeat the cycle multiple times to fill the 5 minutes
        {
          id: 6,
          instruction: "Continue this pattern. Inhale for 4 seconds.",
          duration: 4,
          image: "/inhale-breathing.png",
        },
        {
          id: 7,
          instruction: "Hold for 4 seconds.",
          duration: 4,
          image: "/hold-breath.png",
        },
        {
          id: 8,
          instruction: "Exhale for 4 seconds.",
          duration: 4,
          image: "/exhale-breathing.png",
        },
        // Continue this pattern to fill the 5 minutes
        // ...
        {
          id: 65,
          instruction: "Final breath. Notice how you feel now compared to when you started.",
          duration: 15,
          image: "/mindful-breathing.png",
        },
      ],
    },
    {
      id: "mindful-minute",
      title: "Mindful Minute",
      description: "A quick mindfulness exercise to reset your focus and attention.",
      category: "focus",
      duration: 60, // 1 minute
      level: "beginner",
      benefits: ["Improves focus", "Reduces mental clutter", "Increases present-moment awareness"],
      steps: [
        {
          id: 1,
          instruction: "Sit comfortably and close your eyes or soften your gaze.",
          duration: 5,
          image: "/seated-meditation-pose.png",
        },
        {
          id: 2,
          instruction: "Take a deep breath in through your nose, filling your lungs completely.",
          duration: 5,
          image: "/deep-breathing.png",
        },
        {
          id: 3,
          instruction: "Exhale slowly through your mouth, releasing all tension.",
          duration: 5,
          image: "/exhale-breathing.png",
        },
        {
          id: 4,
          instruction: "Notice five things you can see in your environment.",
          duration: 10,
          image: "/mindful-seeing.png",
        },
        {
          id: 5,
          instruction: "Notice four things you can feel (texture of clothes, air on skin, etc.).",
          duration: 10,
          image: "/mindful-touch.png",
        },
        {
          id: 6,
          instruction: "Notice three things you can hear right now.",
          duration: 10,
          image: "/mindful-listening.png",
        },
        {
          id: 7,
          instruction: "Take one more deep breath and bring your awareness back to the present moment.",
          duration: 15,
          image: "/mindful-breathing.png",
        },
      ],
    },
    {
      id: "energy-boost",
      title: "Energy Boost",
      description: "A combination of movement and breathing to quickly boost your energy levels.",
      category: "stretch",
      duration: 180, // 3 minutes
      level: "intermediate",
      benefits: ["Increases energy", "Improves circulation", "Reduces mental fatigue"],
      steps: [
        {
          id: 1,
          instruction: "Stand up tall with your feet hip-width apart.",
          duration: 5,
          image: "/standing-tall-pose.png",
        },
        {
          id: 2,
          instruction: "Take 3 deep breaths, raising your arms overhead as you inhale and lowering them as you exhale.",
          duration: 15,
          image: "/arms-overhead-breathing.png",
        },
        {
          id: 3,
          instruction: "Gently bounce on your toes, swinging your arms by your sides for 30 seconds.",
          duration: 30,
          image: "/gentle-bouncing.png",
        },
        {
          id: 4,
          instruction: "Roll your shoulders forward 5 times, then backward 5 times.",
          duration: 20,
          image: "/shoulder-rolls.png",
        },
        {
          id: 5,
          instruction: "Gently twist your torso from side to side, letting your arms swing freely.",
          duration: 30,
          image: "/standing-torso-twist.png",
        },
        {
          id: 6,
          instruction: "March in place with high knees for 30 seconds.",
          duration: 30,
          image: "/high-knee-marching.png",
        },
        {
          id: 7,
          instruction:
            "Finish with 3 power breaths: inhale deeply through your nose, then exhale forcefully through your mouth.",
          duration: 15,
          image: "/power-breathing.png",
        },
        {
          id: 8,
          instruction: "Stand tall, take one final deep breath, and notice your renewed energy.",
          duration: 15,
          image: "/energized-standing-pose.png",
        },
      ],
    },
    {
      id: "focus-reset",
      title: "Focus Reset",
      description: "A combination of eye exercises and mental techniques to refresh your focus.",
      category: "focus",
      duration: 120, // 2 minutes
      level: "beginner",
      benefits: ["Reduces eye strain", "Improves mental clarity", "Enhances concentration"],
      steps: [
        {
          id: 1,
          instruction: "Sit comfortably and take 3 deep breaths.",
          duration: 15,
          image: "/seated-deep-breathing.png",
        },
        {
          id: 2,
          instruction: "Eye Exercise: Look up for 5 seconds, then down for 5 seconds.",
          duration: 10,
          image: "/eye-movement-exercise.png",
        },
        {
          id: 3,
          instruction: "Eye Exercise: Look left for 5 seconds, then right for 5 seconds.",
          duration: 10,
          image: "/eye-movement-exercise.png",
        },
        {
          id: 4,
          instruction: "Eye Exercise: Move your eyes in a clockwise circle 3 times, then counterclockwise 3 times.",
          duration: 15,
          image: "/eye-circle-exercise.png",
        },
        {
          id: 5,
          instruction:
            "Palming: Rub your palms together to create warmth, then place them over your closed eyes for 10 seconds.",
          duration: 20,
          image: "/eye-palming-exercise.png",
        },
        {
          id: 6,
          instruction: "Mental Reset: Think of one specific task you need to focus on next.",
          duration: 15,
          image: "/mental-focus.png",
        },
        {
          id: 7,
          instruction: "Set an intention for your next work period in one clear sentence.",
          duration: 15,
          image: "/setting-intention.png",
        },
        {
          id: 8,
          instruction: "Take 3 more deep breaths and prepare to return to your work with renewed focus.",
          duration: 20,
          image: "/deep-breathing-focus.png",
        },
      ],
    },
    {
      id: "4-7-8-breathing",
      title: "4-7-8 Breathing",
      description: "A relaxing breathing pattern to calm your nervous system and reduce stress.",
      category: "breathe",
      duration: 240, // 4 minutes
      level: "intermediate",
      benefits: ["Reduces anxiety", "Promotes relaxation", "Helps with sleep"],
      steps: [
        {
          id: 1,
          instruction: "Sit comfortably with your back straight.",
          duration: 10,
          image: "/seated-meditation-pose.png",
        },
        {
          id: 2,
          instruction: "Place the tip of your tongue against the ridge behind your upper front teeth.",
          duration: 5,
          image: "/tongue-placement-breathing.png",
        },
        {
          id: 3,
          instruction: "Exhale completely through your mouth, making a whoosh sound.",
          duration: 5,
          image: "/exhale-breathing.png",
        },
        {
          id: 4,
          instruction: "Close your mouth and inhale quietly through your nose for 4 seconds.",
          duration: 4,
          image: "/inhale-breathing.png",
        },
        {
          id: 5,
          instruction: "Hold your breath for 7 seconds.",
          duration: 7,
          image: "/hold-breath.png",
        },
        {
          id: 6,
          instruction: "Exhale completely through your mouth for 8 seconds, making a whoosh sound.",
          duration: 8,
          image: "/exhale-breathing.png",
        },
        // Repeat the cycle multiple times
        {
          id: 7,
          instruction: "Inhale quietly through your nose for 4 seconds.",
          duration: 4,
          image: "/inhale-breathing.png",
        },
        // Continue this pattern to fill the 4 minutes
        // ...
        {
          id: 30,
          instruction: "Final breath. Notice the sense of calm in your body.",
          duration: 15,
          image: "/calm-breathing.png",
        },
      ],
    },
  ]

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setCurrentStep(0)
    setTimeRemaining(exercise.steps[0].duration)
    setProgress(0)
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextStep = () => {
    if (selectedExercise && currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setTimeRemaining(selectedExercise.steps[currentStep + 1].duration)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setTimeRemaining(selectedExercise.steps[currentStep - 1].duration)
    }
  }

  const handleReset = () => {
    if (selectedExercise) {
      setCurrentStep(0)
      setTimeRemaining(selectedExercise.steps[0].duration)
      setProgress(0)
      setIsPlaying(false)
    }
  }

  const completeExercise = () => {
    if (selectedExercise) {
      playSound()
      setIsPlaying(false)

      // Add to session history
      const newSession: SessionHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        exercises: [selectedExercise.id],
        duration: selectedExercise.duration / 60, // Convert to minutes
        category: selectedExercise.category,
      }

      setSessionHistory((prev) => [newSession, ...prev])
      setActiveTab("history")
    }
  }

  const handleBackToExercises = () => {
    setSelectedExercise(null)
    setActiveTab("exercises")
    setIsPlaying(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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

  const filteredExercises = filter === "all" ? exercises : exercises.filter((ex) => ex.category === filter)

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-4">
          {!selectedExercise ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">FlexFlow Exercises</h2>
                <div className="flex space-x-2">
                  <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                    All
                  </Button>
                  <Button
                    variant={filter === "stretch" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("stretch")}
                  >
                    <Dumbbell className="mr-1 h-4 w-4" />
                    Stretch
                  </Button>
                  <Button
                    variant={filter === "breathe" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("breathe")}
                  >
                    <Wind className="mr-1 h-4 w-4" />
                    Breathe
                  </Button>
                  <Button
                    variant={filter === "focus" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("focus")}
                  >
                    <Brain className="mr-1 h-4 w-4" />
                    Focus
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{exercise.title}</CardTitle>
                          <CardDescription>{exercise.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {exercise.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{formatTime(exercise.duration)}</span>
                        <Badge variant="secondary" className="ml-2 capitalize">
                          {exercise.level}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Benefits:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {exercise.benefits.map((benefit, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 flex justify-between">
                      <div className="text-sm font-medium">{exercise.steps.length} steps</div>
                      <Button onClick={() => handleStartExercise(exercise)}>
                        Start
                        <ChevronRight className="ml-2 h-4 w-4" />
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
                  <div className="flex flex-col items-center">
                    {selectedExercise.steps[currentStep].image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={selectedExercise.steps[currentStep].image || "/seated-meditation-pose.png"}
                          alt={`Step ${currentStep + 1}`}
                          className="w-full max-w-md mx-auto"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-medium text-center mb-2">
                      {selectedExercise.steps[currentStep].instruction}
                    </h3>
                    <div className="text-3xl font-bold tabular-nums mt-4">{formatTime(timeRemaining)}</div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon" onClick={handlePrevStep} disabled={currentStep === 0}>
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant={isPlaying ? "destructive" : "default"}
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextStep}
                      disabled={currentStep === selectedExercise.steps.length - 1}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  disabled={currentStep === selectedExercise.steps.length - 1}
                >
                  Skip
                  <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Session History</h2>

          {sessionHistory.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-medium">No Sessions Yet</h3>
                <p className="text-muted-foreground">Complete an exercise to start building your history</p>
                <Button onClick={() => setActiveTab("exercises")}>Try an Exercise</Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {sessionHistory.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {exercises.find((ex) => ex.id === session.exercises[0])?.title || "Session"}
                        </CardTitle>
                        <CardDescription>{formatDate(session.date)}</CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {session.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{session.duration} minutes</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {session.exercises.length} exercise{session.exercises.length > 1 ? "s" : ""}
                    </div>
                    <Button variant="ghost" size="sm">
                      Repeat
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
                <CardDescription>Sessions Completed</CardDescription>
                <CardTitle className="text-4xl">{stats.totalSessions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Keep building your wellness routine</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Minutes</CardDescription>
                <CardTitle className="text-4xl">{stats.totalMinutes}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Time invested in your wellbeing</div>
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
                <CardDescription>Favorite Category</CardDescription>
                <CardTitle className="text-xl capitalize">{stats.favoriteCategory || "None yet"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Try different categories for balance</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Wellness Journey</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              {sessionHistory.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Complete exercises to see your progress</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Exercise Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["stretch", "breathe", "focus"].map((category) => {
                        const count = sessionHistory.filter((entry) => entry.category === category).length

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

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your FlexFlow experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audio Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Volume</Label>
                    <div className="text-sm text-muted-foreground">Adjust the volume of notification sounds</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                      disabled={isMuted}
                      value={[volume]}
                      max={100}
                      step={1}
                      className="w-[200px]"
                      onValueChange={(value) => setVolume(value[0])}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Notifications</Label>
                    <div className="text-sm text-muted-foreground">Receive reminders to take breaks</div>
                  </div>
                  <Switch checked={showNotifications} onCheckedChange={setShowNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reminder Interval</Label>
                    <div className="text-sm text-muted-foreground">How often to remind you to take a break</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      disabled={!showNotifications}
                      value={[reminderInterval]}
                      min={30}
                      max={120}
                      step={15}
                      className="w-[200px]"
                      onValueChange={(value) => setReminderInterval(value[0])}
                    />
                    <span className="w-12 text-sm">{reminderInterval} min</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About FlexFlow</CardTitle>
              <CardDescription>Smart guidance to stretch, breathe, and refocus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                FlexFlow helps you stay energized, clear, and resilient throughout your workday with quick,
                evidence-based exercises designed for the modern workplace.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Stretch</h3>
                    <p className="text-sm text-muted-foreground">
                      Quick stretches to relieve tension and improve circulation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Wind className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Breathe</h3>
                    <p className="text-sm text-muted-foreground">
                      Breathing techniques to reduce stress and increase energy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      Mental exercises to sharpen concentration and clarity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">How to Use FlexFlow</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Choose an exercise that addresses your current needs</li>
                  <li>2. Follow the guided instructions for each step</li>
                  <li>3. Complete the exercise to log it in your history</li>
                  <li>4. Build a regular practice to maximize benefits</li>
                  <li>5. Track your progress in the Stats section</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
