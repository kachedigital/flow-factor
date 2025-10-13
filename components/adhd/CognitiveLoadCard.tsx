"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function CognitiveLoadCard() {
  const [loadLevel, setLoadLevel] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const getFeedback = (value: number) => {
    if (value <= 3) return "You seem focused and steady. Keep riding that flow! 💪"
    if (value <= 6) return "You're doing okay — consider a short stretch or microbreak soon. 🧘‍♀️"
    return "You're mentally overloaded. Try a sensory reset or task switch. 🌀"
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between h-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Cognitive Load Check-In</CardTitle>
        <CardDescription>How mentally loaded do you feel right now?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Slider
          defaultValue={[loadLevel]}
          max={10}
          step={1}
          onValueChange={([val]) => {
            setLoadLevel(val)
            setSubmitted(false)
          }}
        />
        <div className="text-center text-sm text-muted-foreground">Current Level: {loadLevel}/10</div>
        {submitted && <div className="text-center text-base font-medium">{getFeedback(loadLevel)}</div>}
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button onClick={handleSubmit} className="w-full" variant="default">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
