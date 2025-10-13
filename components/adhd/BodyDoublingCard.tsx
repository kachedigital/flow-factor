"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"

export default function BodyDoublingCard() {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [task, setTask] = useState("")
  const [minutesRemaining, setMinutesRemaining] = useState(25)

  const startSession = () => {
    setIsSessionActive(true)
    // Simulate a timer or connection to a virtual co-working space
  }

  const endSession = () => {
    setIsSessionActive(false)
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Virtual Body Doubling</CardTitle>
        <CardDescription>Work alongside a virtual co-working buddy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">What are you working on?</h4>
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border border-input bg-background text-foreground rounded-md"
          />
        </div>

        {isSessionActive ? (
          <div className="text-center">
            <p className="text-lg font-medium">Focusing on: {task}</p>
            <p className="text-sm text-muted-foreground">
              <Clock className="inline-block h-4 w-4 mr-1" />
              {minutesRemaining} minutes remaining
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Connect with a virtual co-working buddy to stay focused and motivated.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!isSessionActive ? (
          <Button onClick={startSession} className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Start Session
          </Button>
        ) : (
          <Button variant="destructive" onClick={endSession} className="w-full">
            End Session
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
