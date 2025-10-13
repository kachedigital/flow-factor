"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Smile, Meh, Frown, Angry, ThumbsUp, Heart, Zap, Coffee, CloudRain, Sun, Moon, Wind } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

const moods = [
  { id: "happy", icon: Smile, label: "Happy", color: "bg-green-100 text-green-600 border-green-200" },
  { id: "content", icon: ThumbsUp, label: "Content", color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "neutral", icon: Meh, label: "Neutral", color: "bg-gray-100 text-gray-600 border-gray-200" },
  { id: "sad", icon: Frown, label: "Sad", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { id: "angry", icon: Angry, label: "Angry", color: "bg-red-100 text-red-600 border-red-200" },
  { id: "loving", icon: Heart, label: "Loving", color: "bg-pink-100 text-pink-600 border-pink-200" },
  { id: "energetic", icon: Zap, label: "Energetic", color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "tired", icon: Coffee, label: "Tired", color: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: "gloomy", icon: CloudRain, label: "Gloomy", color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { id: "peaceful", icon: Sun, label: "Peaceful", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "reflective", icon: Moon, label: "Reflective", color: "bg-violet-100 text-violet-600 border-violet-200" },
  { id: "anxious", icon: Wind, label: "Anxious", color: "bg-teal-100 text-teal-600 border-teal-200" },
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [customMood, setCustomMood] = useState("")
  const [moodContext, setMoodContext] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.from("mood_entries").insert([
        {
          mood: selectedMood || customMood,
          context: moodContext,
        },
      ])
      if (error) throw error
      toast({
        title: "Mood entry saved",
        description: "Your mood has been recorded successfully.",
      })
      // Reset form
      setSelectedMood(null)
      setCustomMood("")
      setMoodContext("")
    } catch (error) {
      console.error("Error saving mood entry:", error)
      toast({
        title: "Error",
        description: "Failed to save mood entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <form onSubmit={handleSubmit}>
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">How are you feeling today?</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <motion.div key={mood.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full h-auto flex flex-col items-center py-3 px-2 gap-2 ${
                      selectedMood === mood.id ? "ring-2 ring-primary" : ""
                    } ${mood.color}`}
                    onClick={() => setSelectedMood(mood.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-mood">Or describe your mood in your own words:</Label>
              <input
                id="custom-mood"
                type="text"
                value={customMood}
                onChange={(e) => setCustomMood(e.target.value)}
                className="w-full p-2 mt-1 border border-input bg-background text-foreground rounded-md"
                placeholder="e.g., Overwhelmed, Inspired, Curious..."
                disabled={!!selectedMood}
              />
            </div>

            <div>
              <Label htmlFor="mood-context">What's influencing your mood right now?</Label>
              <Textarea
                id="mood-context"
                value={moodContext}
                onChange={(e) => setMoodContext(e.target.value)}
                placeholder="Describe what might be affecting how you feel..."
                className="w-full p-2 mt-1 border border-input bg-background text-foreground rounded-md"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full" disabled={isLoading || (!selectedMood && !customMood)}>
                {isLoading ? "Saving..." : "Save Mood Entry"}
              </Button>
            </motion.div>
          </div>
        </Card>
      </form>
    </motion.div>
  )
}
