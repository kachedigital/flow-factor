"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, SnowflakeIcon as Confetti } from "lucide-react"

export default function ProgressCelebratorCard() {
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => {
    if (celebrated) {
      // Simulate confetti animation or other celebratory effects
      console.log("Celebrating progress!")
    }
  }, [celebrated])

  const handleCelebrate = () => {
    setCelebrated(true)
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl flex items-center">
          {celebrated ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Progress Celebrated!
            </>
          ) : (
            <>
              <Confetti className="mr-2 h-5 w-5 text-yellow-500" />
              Progress Tracker
            </>
          )}
        </CardTitle>
        <CardDescription>Acknowledge and celebrate your accomplishments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {celebrated ? (
          <p className="text-center text-lg">You're doing great! Keep up the momentum.</p>
        ) : (
          <>
            <p className="text-center text-lg">Acknowledge your progress and celebrate your wins.</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Recognize your achievements</li>
              <li>Acknowledge your effort</li>
              <li>Build positive momentum</li>
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!celebrated ? (
          <Button onClick={handleCelebrate} className="w-full">
            Celebrate Progress
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            Progress Celebrated
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
