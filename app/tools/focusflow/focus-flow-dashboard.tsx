"use client"
import { useState } from "react"
import {
  Activity,
  Download,
  CheckCircle2,
  Clock,
  BarChartIcon,
  Layers,
  ListTodo,
  Zap,
  Award,
  Brain,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"
import { Search } from "./components/search"
import { UserNav } from "./components/user-nav"
import { TeamSwitcher } from "./components/team-switcher"
import { PageTitle } from "./components/page-title"
import FocusCard from "./components/focus-card"
import CognitiveLoadCard from "@/components/adhd/CognitiveLoadCard"
import TaskChunkerCard from "@/components/adhd/TaskChunkerCard"
import RewardCard from "@/components/adhd/RewardCard"
import BodyDoublingCard from "@/components/adhd/BodyDoublingCard"
import RuminationInterruptCard from "@/components/adhd/RuminationInterruptCard"
import ProgressCelebratorCard from "@/components/adhd/ProgressCelebratorCard"

// Sample data for the charts
const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export default function FocusFlowDashboard() {
  const [isTaskBuilderOpen, setIsTaskBuilderOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <PageTitle title="FocusFlow Dashboard" subtitle="Mission control for your productivity" />
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="focus-timer">Focus Timer</TabsTrigger>
            <TabsTrigger value="cognitive-load">Cognitive Load</TabsTrigger>
            <TabsTrigger value="task-assistant">Task Assistant</TabsTrigger>
            <TabsTrigger value="body-doubling">Body Doubling</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-end gap-2 mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Brain className="mr-2 h-4 w-4" />
                    Easy
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Rumination Interrupt</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <RuminationInterruptCard />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Task Builder
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Task Builder</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <TaskChunkerCard />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Focus Hours</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42.5h</div>
                  <p className="text-xs text-muted-foreground">+7% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Layers className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 due this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Weekly Productivity</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>You completed 12 tasks this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
                <div className="px-6 pb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Award className="mr-2 h-4 w-4" />
                        Completed Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Celebrate Your Win</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <RewardCard />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracker</CardTitle>
                  <CardDescription>Track and celebrate your weekly accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressCelebratorCard />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>View and manage your tasks across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">To Do</CardTitle>
                        <ListTodo className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">24</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Zap className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                        <BarChartIcon className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">6</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">127</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-medium">Task list coming soon</h3>
                      <p className="text-sm text-muted-foreground">
                        We're working on a comprehensive task management system
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Track and manage your active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Project management coming soon</h3>
                    <p className="text-sm text-muted-foreground">
                      We're working on a comprehensive project management system
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Analytics</CardTitle>
                <CardDescription>Detailed insights into your productivity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Analytics dashboard coming soon</h3>
                    <p className="text-sm text-muted-foreground">
                      We're working on comprehensive analytics and reporting features
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="focus-timer" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Focus Timer</CardTitle>
                  <CardDescription>Stay productive with timed focus sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-6">
                    <FocusCard />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Focus Tips</CardTitle>
                  <CardDescription>Maximize your productivity during focus sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">The Pomodoro Technique</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute
                        break.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Minimize Distractions</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Close unnecessary tabs, put your phone on silent, and consider using noise-cancelling
                        headphones.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Set Clear Goals</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Before starting a focus session, write down exactly what you want to accomplish.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="cognitive-load" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cognitive Load Monitor</CardTitle>
                  <CardDescription>Track and manage your mental capacity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-6">
                    <CognitiveLoadCard />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Managing Cognitive Load</CardTitle>
                  <CardDescription>Strategies to optimize your mental resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Task Switching</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Frequent task switching increases cognitive load. Try to complete one task before moving to
                        another.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">External Memory</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use notes, lists, and reminders as "external memory" to reduce the mental burden of remembering
                        everything.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Environment Design</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Create a workspace that minimizes distractions and supports your attention needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="task-assistant" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Chunker</CardTitle>
                  <CardDescription>Break down overwhelming tasks into manageable steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-6">
                    <TaskChunkerCard />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Task Management Strategies</CardTitle>
                  <CardDescription>ADHD-friendly approaches to task management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Body Doubling</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Work alongside someone else (in person or virtually) to increase accountability and focus.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Task Batching</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Group similar tasks together to reduce context switching and maintain momentum.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">The 2-Minute Rule</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        If a task takes less than 2 minutes, do it immediately rather than adding it to your list.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="body-doubling" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Body Doubling</CardTitle>
                  <CardDescription>Work alongside a virtual co-working buddy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-6">
                    <BodyDoublingCard />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>About Body Doubling</CardTitle>
                  <CardDescription>How it helps with focus and productivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">What is Body Doubling?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Body doubling is when another person works alongside you, creating accountability and reducing
                        the activation energy needed to start and maintain focus on tasks.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">Why It Works</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        For many people with ADHD, the presence of another person (even virtual) creates just enough
                        external accountability to help maintain focus and reduce procrastination.
                      </p>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium">How to Use It</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter what you're working on, start the session, and your virtual co-pilot will check in
                        periodically to help you stay on track with gentle reminders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
