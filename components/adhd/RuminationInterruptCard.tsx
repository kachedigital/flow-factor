"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RuminationInterruptCard() {
  const [interrupted, setInterrupted] = useState(false)

  const handleInterrupt = () => {
    setInterrupted(true)
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Rumination Interrupt</CardTitle>
        <CardDescription>Break the cycle of negative thoughts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {interrupted ? (
          <div className="text-center">
            <p className="text-lg font-medium">Focus on the present moment.</p>
            <p className="text-sm text-muted-foreground">
              Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1
              thing you can taste.
            </p>
          </div>
        ) : (
          <p className="text-center text-lg">
            Feeling stuck in a loop of negative thoughts? Interrupt the cycle with a sensory reset.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!interrupted ? (
          <Button onClick={handleInterrupt} className="w-full">
            Interrupt Thoughts
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            Resetting Focus
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
