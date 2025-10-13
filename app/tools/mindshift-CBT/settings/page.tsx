import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Settings | MindShift CBT",
  description: "Customize your MindShift CBT experience",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p className="text-muted-foreground mb-8">Customize your MindShift CBT experience to suit your preferences.</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how MindShift CBT looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <Switch id="reduce-motion" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-reminder">Daily Practice Reminder</Label>
                <Switch id="daily-reminder" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="progress-updates">Progress Updates</Label>
                <Switch id="progress-updates" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="local-storage">Store Data Locally Only</Label>
                <Switch id="local-storage" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Data</Button>
              <Button variant="destructive">Clear All Data</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
