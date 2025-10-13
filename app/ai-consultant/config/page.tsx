"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Lock } from "lucide-react"

export default function ConfigPage() {
  const [openaiKey, setOpenaiKey] = useState("")
  const [replicateToken, setReplicateToken] = useState("")
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const { toast } = useToast()

  // Load saved keys on mount
  useEffect(() => {
    const savedOpenaiKey = localStorage.getItem("openai_api_key")
    const savedReplicateToken = localStorage.getItem("replicate_api_token")
    const savedSupabaseUrl = localStorage.getItem("supabase_url")
    const savedSupabaseKey = localStorage.getItem("supabase_service_key")

    if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey)
    if (savedReplicateToken) setReplicateToken(savedReplicateToken)
    if (savedSupabaseUrl) setSupabaseUrl(savedSupabaseUrl)
    if (savedSupabaseKey) setSupabaseKey(savedSupabaseKey)
  }, [])

  const handleSave = () => {
    // Save to localStorage
    if (openaiKey) localStorage.setItem("openai_api_key", openaiKey)
    if (replicateToken) localStorage.setItem("replicate_api_token", replicateToken)
    if (supabaseUrl) localStorage.setItem("supabase_url", supabaseUrl)
    if (supabaseKey) localStorage.setItem("supabase_service_key", supabaseKey)

    toast({
      title: "Configuration saved",
      description: "Your API keys have been saved to browser storage.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" /> API Configuration
          </CardTitle>
          <CardDescription>
            Enter your API keys for the AI consultant. These will be stored in your browser's local storage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai_key">OpenAI API Key</Label>
            <Input
              id="openai_key"
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="replicate_token">Replicate API Token</Label>
            <Input
              id="replicate_token"
              type="password"
              placeholder="r8_..."
              value={replicateToken}
              onChange={(e) => setReplicateToken(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supabase_url">Supabase URL (Optional)</Label>
            <Input
              id="supabase_url"
              placeholder="https://your-project.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supabase_key">Supabase Service Role Key (Optional)</Label>
            <Input
              id="supabase_key"
              type="password"
              placeholder="eyJ..."
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            Save Configuration
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Note: Storing API keys in the browser is not recommended for production environments.</p>
        <p>This is only for testing and development purposes.</p>
      </div>
    </div>
  )
}
