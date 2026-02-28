"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Focus, Zap, Bot, Shield, Wrench } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const featuredTools = [
  {
    title: "Axia",
    description:
      "Analyze web pages and PDF documents for accessibility issues. Get AI-powered insights and actionable guidance for WCAG compliance.",
    icon: Shield,
    category: "Accessibility",
    status: "Available" as const,
    link: "/tools/axia",
    color: "text-kd-teal",
    bgColor: "bg-kd-teal/10",
    features: ["Web/PDF Analysis", "WCAG Reports", "AI Remediation Tips"],
  },
  {
    title: "FlexFlow",
    description:
      "An interactive visual flexbox playground for rapid CSS layout prototyping with real-time visual feedback.",
    icon: Zap,
    category: "Developer Tools",
    status: "Available" as const,
    link: "/tools/flexflow",
    color: "text-kd-cyan",
    bgColor: "bg-kd-cyan/10",
    features: ["Visual Flexbox", "Live Preview", "Code Export"],
  },
  {
    title: "FocusFlow",
    description:
      "ADHD-friendly productivity timer with task chunking, focus tracking, and cognitive load management.",
    icon: Focus,
    category: "Neuroinclusive",
    status: "Coming Soon" as const,
    link: "/tools/focusflow",
    color: "text-kd-magenta",
    bgColor: "bg-kd-magenta/10",
    features: ["Focus Timer", "Task Chunking", "Progress Tracking"],
  },
  {
    title: "Aligna",
    description:
      "AI-powered workspace ergonomics analysis. Get personalized tips on posture, comfort, and productivity.",
    icon: Bot,
    category: "Ergonomics",
    status: "Available" as const,
    link: "/ai-consultant",
    color: "text-kd-violet",
    bgColor: "bg-kd-violet/10",
    features: ["Workspace Analysis", "Posture Guidance", "Personalized Advice"],
  },
]

export function FeaturedTools() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      {featuredTools.map((tool) => (
        <motion.div key={tool.title} variants={fadeUp}>
          <Card className="h-full border border-border/60 hover:border-kd-cyan/40 transition-all duration-300 hover:shadow-lg bg-background group">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center`}
                  >
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className="font-accent text-xs uppercase tracking-wider"
                  >
                    {tool.category}
                  </Badge>
                </div>
                {tool.status === "Coming Soon" && (
                  <Badge variant="secondary" className="text-xs">
                    Coming Soon
                  </Badge>
                )}
              </div>

              <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-kd-cyan transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {tool.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="text-xs"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>

              {tool.status === "Available" ? (
                <Link href={tool.link} className="block mt-auto">
                  <Button className="w-full bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-medium">
                    <Wrench className="mr-2 h-4 w-4" />
                    Launch Tool
                  </Button>
                </Link>
              ) : (
                <Button
                  className="w-full mt-auto font-heading font-medium"
                  disabled
                >
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
