"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, signOut } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await getCurrentUser()
      setUser(data.user)
      setLoading(false)
    }

    loadUser()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  if (loading) return <div>Loading...</div>

  if (!user) return <div>Not logged in</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email: {user.email}</p>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}
