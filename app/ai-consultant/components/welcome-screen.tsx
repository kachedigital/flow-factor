"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileImage, } from "lucide-react"

// Export as named export to match the import in page.tsx
export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
          <div className="space-y-2">
        <h2 className="text-2xl font-bold">Welcome to Aligna</h2>
        <p className="text-muted-foreground">
          Your AI ergonomic consultant is ready to help you create a healthier, more comfortable workspace.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
<h3 className="font-medium">Ask for Advice</h3>
              <p className="text-sm text-muted-foreground text-center">
                Describe your workspace or ask specific questions about ergonomics.
              </p>
<div className="w-full mt-2">
                <Button variant="outline" className="w-full text-sm" onClick={() => {}}>
                  "How should I position my monitor?"
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

<Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Upload a Photo</h3>
              <p className="text-sm text-muted-foreground text-center">
                Share an image of your workspace for personalized recommendations.
              </p>
              <div className="w-full mt-2">
                <Button variant="outline" className="w-full text-sm" onClick={() => {}}>
                  Upload Workspace Image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-4 rounded-lg max-w-2xl">
        <h3 className="font-medium mb-2">Example Questions:</h3>
        <ul className="text-sm space-y-1 text-muted-foreground text-left">
          <li>• "What's the ideal height for my standing desk?"</li>
          <li>• "I have neck pain after working. What could be causing it?"</li>
          <li>• "Can you recommend ergonomic equipment for someone with carpal tunnel?"</li>
          <li>• "What are good stretches for people who sit all day?"</li>
        </ul>
      </div>
    </div>
  )
}
