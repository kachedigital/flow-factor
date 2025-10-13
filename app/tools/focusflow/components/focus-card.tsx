"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const presetDurations = [15, 25, 45] // minutes

export default function FocusCard() {
  const [duration, setDuration] = useState<number>(25)
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
  }

  const setNewDuration = (min: number) => {
    setDuration(min)
    setTimeLeft(min * 60)
    setIsRunning(false)
  }

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <Card className="flex flex-col justify-between p-6 rounded-lg shadow-md bg-card text-card-foreground">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Focus Session</CardTitle>
        <CardDescription>Choose your focus time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {presetDurations.map((min) => (
            <Button
              key={min}
              variant={duration === min ? "default" : "outline"}
              onClick={() => setNewDuration(min)}
              className="flex-1"
            >
              {min} min
            </Button>
          ))}
        </div>
        <div className="text-5xl text-center font-mono tracking-wider">{formatTime(timeLeft)}</div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {!isRunning ? (
          <Button onClick={startTimer} className="w-28">
            <Play className="w-4 h-4 mr-2" /> Start
          </Button>
        ) : (
          <Button onClick={pauseTimer} variant="secondary" className="w-28">
            <Pause className="w-4 h-4 mr-2" /> Pause
          </Button>
        )}
        <Button onClick={resetTimer} variant="ghost">
          <RotateCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
