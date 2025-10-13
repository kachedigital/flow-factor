"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TaskChunkerCard() {
  const [task, setTask] = useState("")
  const [subtasks, setSubtasks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleChunkTask = async () => {
    if (!task.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/task-chunker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      })

      const data = await response.json()
      setSubtasks(data.subtasks)
    } catch (error) {
      console.error("Error chunking task:", error)
      setSubtasks(["Failed to chunk task. Please try again."])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 rounded-lg shadow-md bg-card text-card-foreground flex flex-col justify-between">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Task Chunking Assistant</CardTitle>
        <CardDescription>Break down overwhelming tasks into manageable steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter a task to break down..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="resize-none min-h-[100px]"
        />
        {subtasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Subtasks:</h4>
            <ul className="list-disc pl-5">
              {subtasks.map((subtask, index) => (
                <li key={index}>{subtask}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleChunkTask} disabled={isLoading} className="w-full">
          {isLoading ? "Chunking..." : "Chunk Task"}
        </Button>
      </CardFooter>
    </Card>
  )
}
