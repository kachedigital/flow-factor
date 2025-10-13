"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, LogOut, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function AuthSection() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      // Check if supabase client is available
      if (!supabase) {
        console.error("Supabase client not available")
        setLoading(false)
        return
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      // Don't treat "no user" as an error - it's normal when not logged in
      if (error && error.message !== "Auth session missing!") {
        console.error("Error getting user:", error)
      }

      // Set user to null if no user or if auth session is missing
      setUser(user || null)
    } catch (error) {
      // Only log actual errors, not missing sessions
      if (error instanceof Error && !error.message.includes("Auth session missing")) {
        console.error("Error checking user:", error)
      }
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      if (!supabase) {
        console.error("Supabase client not available")
        return
      }

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Welcome back!</CardTitle>
          <CardDescription>
            Signed in as <span className="font-medium">{user?.email || "User"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Your files are secure and private</span>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">Secure Access Required</CardTitle>
        <CardDescription>Sign in to upload files and access personalized tools</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-4">
            <LoginForm onSuccess={checkUser} />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignupForm onSuccess={checkUser} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
