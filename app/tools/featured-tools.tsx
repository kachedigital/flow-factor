"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Focus, Zap, Timer, Bot } from "lucide-react"
import { motion } from "framer-motion"
import { CalProFeatureCard } from "@/components/calpro-feature-card"
import { AxiaFeatureCard } from "@/components/axia-feature-card"
import { MindShiftFeatureCard } from "@/components/mindshift-feature-card"
import { AlignaFeatureCard } from "@/components/aligna-feature-card"

export function FeaturedTools() {
  const featuredTools = [
    /*
    {
      title: "MindShift CBT",
      description: "Cognitive Behavioral Therapy tools for mental wellness and stress management.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      category: "Mental Health",
      status: "Available",
      link: "/tools/mindshift-CBT",
      features: ["Mood Tracking", "Thought Diary", "CBT Techniques", "Guided Exercises"],
    },
    */
    {
      title: "FocusFlow",
      description: "ADHD-friendly productivity dashboard with focus timers and task management.",
      icon: <Focus className="h-8 w-8 text-secondary" />,
      category: "Productivity",
      status: "Coming Soon",
      link: "/tools/focusflow",
      features: ["Focus Timer", "Task Chunking", "Progress Tracking", "Cognitive Load Management"],
    },
    {
      title: "FlexFlow",
      description: "Workplace wellness with guided stretches and movement breaks.",
      icon: <Zap className="h-8 w-8 text-accent" />,
      category: "Wellness",
      status: "Available",
      link: "/tools/flexflow",
      features: ["Guided Stretches", "Movement Reminders", "Posture Breaks", "Energy Boosters"],
    },
    {
      title: "Aligna",
      description: "Analyze your workspace for custom tips on posture, comfort, and productivity.",
      icon: <Bot className="h-8 w-8 text-teal-500" />,
      category: "Ergonomics",
      status: "Available",
      link: "/ai-consultant",
      features: ["Workspace Analysis", "Posture Guidance", "Equipment Recs", "Personalized Advice"],
    },
    {
      title: "Axia",
      // Updated description with your new text
      description:
        "Instantly analyze web pages and PDF documents for accessibility issues. Get AI-powered insights and actionable guidance to help you achieve WCAG Level A-AA compliance and create more inclusive digital experiences.",
      icon: <Timer className="h-8 w-8 text-purple-600" />,
      category: "Accessibility",
      status: "Available",
      link: "/tools/axia",
      features: ["Web/PDF Analysis", "WCAG Reports", "AI Remediation Tips", "Usability Checks"],
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlignaFeatureCard />
          <MindShiftFeatureCard />
          <AxiaFeatureCard />
          <CalProFeatureCard />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map(
            (tool, index) =>
              tool.status === "Coming Soon" && (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200 group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {tool.icon}
                          <Badge variant="outline">{tool.category}</Badge>
                        </div>
                        <Badge
                          className={
                            tool.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full" disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
