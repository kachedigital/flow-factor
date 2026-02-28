"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const projects = [
  {
    title: "Axia Accessibility Suite",
    category: "Web Accessibility",
    description:
      "A comprehensive accessibility testing tool for web content and PDF documents, built to streamline WCAG compliance audits.",
    tags: ["WCAG 2.2", "PDF Analysis", "Compliance"],
    color: "bg-kd-teal",
  },
  {
    title: "FlexFlow CSS Playground",
    category: "Developer Tools",
    description:
      "An interactive visual flexbox playground that helps developers and designers rapidly prototype CSS layouts with real-time feedback.",
    tags: ["CSS", "Interactive", "Education"],
    color: "bg-kd-cyan",
  },
  {
    title: "FocusFlow Productivity Timer",
    category: "Neuroinclusive Tools",
    description:
      "A focus timer and task management tool designed with ADHD-friendly patterns, including reduced cognitive load and flexible intervals.",
    tags: ["ADHD-Friendly", "Productivity", "Timer"],
    color: "bg-kd-magenta",
  },
  {
    title: "AI Collaboration Workflow Design",
    category: "Consulting",
    description:
      "Human-in-the-loop AI workflow consulting for enterprise clients navigating the integration of AI into existing team structures.",
    tags: ["AI Strategy", "Enterprise", "Workflows"],
    color: "bg-kd-violet",
  },
]

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--kd-cyan)/0.06),_transparent_50%)]" />
        <div className="container mx-auto px-6 py-20 md:py-28 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-cyan mb-3"
            >
              Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              Our <span className="kd-gradient-text">Work</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              A selection of tools, audits, and consulting projects that
              showcase our approach to inclusive, human-centered digital
              solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {projects.map((project) => (
              <motion.div key={project.title} variants={fadeUp}>
                <Card className="h-full border border-border/60 hover:border-kd-cyan/40 transition-all duration-300 hover:shadow-lg bg-background">
                  <CardContent className="p-6">
                    <div
                      className={`w-full h-32 rounded-lg ${project.color}/10 mb-4 flex items-center justify-center`}
                    >
                      <span className="text-sm font-accent text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-14 max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              More case studies and project showcases coming soon. Interested
              in working together?
            </p>
            <Button
              asChild
              className="bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
            >
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
