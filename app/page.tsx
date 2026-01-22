"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Accessibility, Activity, Bot } from "lucide-react" // Brain and Timer commented out from imports if not used elsewhere
import { motion, useInView } from "framer-motion"
import { ChatbotButton } from "@/components/chatbot-button"
import { WorkspaceQuiz } from "@/components/workspace-quiz"
import AuthSection from "@/components/auth/auth-section"

export default function HomePage() {
  const heroRef = useRef(null)
  const toolsRef = useRef(null)
  const hfeRef = useRef(null)
  const statsRef = useRef(null)
  const quizRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.2 })
  const toolsInView = useInView(toolsRef, { once: true, amount: 0.2 })
  const hfeInView = useInView(hfeRef, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 })
  const quizInView = useInView(quizRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const stats = [
    { value: "30%", label: "Productivity Increase" },
    { value: "45%", label: "Reduced Workplace Stress" },
    { value: "87%", label: "User Satisfaction" },
    { value: "3", label: "Digital Tools" }, // Updated count
  ]

  const tools = [
    /*
    {
      title: "MindShift CBT",
      description: "Evidence-based cognitive behavioral therapy tools for mental wellness and stress management.",
      icon: <Brain className="h-6 w-6" />, // Brain would cause an error if not imported
      category: "Mental Health",
      status: "Available",
      link: "/tools/mindshift-CBT",
      features: ["Thought Reframing", "Stress Defusion", "Workplace Gratitude", "Values Alignment"],
    },
    */
    /*
    {
      title: "FocusFlow",
      description: "ADHD-friendly productivity dashboard with focus timers and task management tools.",
      icon: <Timer className="h-6 w-6" />, // Timer would cause an error if not imported
      category: "Productivity",
      status: "Available",
      link: "/tools/focusflow",
      features: ["Pomodoro Timer", "Task Chunking", "Progress Tracking", "ADHD Support"],
    },
    */
    {
      title: "FlexFlow",
      description: "Workplace wellness with guided stretches and movement breaks to keep you energized.",
      icon: <Activity className="h-6 w-6" />,
      category: "Wellness",
      status: "Available",
      link: "/tools/flexflow",
      features: ["Guided Stretches", "Movement Breaks", "Posture Reminders", "Energy Boosting"],
    },
    {
      title: "Aligna",
      description: "Analyze your workspace for custom tips on posture, comfort, and productivity.",
      icon: <Bot className="h-6 w-6" />,
      category: "Ergonomics",
      status: "Available",
      link: "/ai-consultant",
      features: ["Workspace Analysis", "Posture Guidance", "Equipment Recs", "Personalized Advice"],
    },
    {
      title: "Axia",
      description: "Complete accessibility suite for testing both web content and PDF documents.",
      icon: <Accessibility className="h-6 w-6" />,
      category: "Accessibility",
      status: "Available",
      link: "/tools/axia",
      features: ["PDF Analysis", "Web Compliance", "WCAG Guidelines", "Remediation Tips"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <ChatbotButton />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <motion.div
          ref={heroRef}
          className="container px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Human Factors Engineering
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Digital Tools for{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Human-Centered Productivity
                </span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Evidence-based digital solutions to enhance focus, wellbeing, and accessibility in your daily work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                  <Link href="#tools">
                    Featured Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[600px]">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <video
                  src="https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/human_factors_hero-9t7jGvl3vZ1bS4XvfSnWs17oh3hle7.mp4"
                  className="w-full h-auto object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={(e) => {
                    // If video fails, replace with fallback image
                    const fallbackImg = document.createElement("img")
                    fallbackImg.src = "/human-centered-workspace.png"
                    fallbackImg.alt = "Human-centered workspace"
                    fallbackImg.className = "w-full h-auto object-cover"
                    e.currentTarget.parentNode?.replaceChild(fallbackImg, e.currentTarget)
                  }}
                >
                  <source
                    src="https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/human_factors_hero-9t7jGvl3vZ1bS4XvfSnWs17oh3hle7.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tools Section */}
      <section ref={toolsRef} id="tools" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Digital Solutions
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Tools</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Comprehensive suite of evidence-based tools designed to enhance productivity, wellbeing, and
                accessibility.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-primary">
                          {tool.icon}
                        </div>
                        <Badge variant="outline">{tool.category}</Badge>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
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
                        {tool.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link href={tool.link} className="block">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Launch Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* What is HFE Section */}
      <section ref={hfeRef} className="w-full py-12 md:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Human Factors Engineering</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                The science of designing systems, products, and environments to optimize human well-being and overall
                system performance.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={hfeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                <div className="absolute inset-2 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Human-Centered</h3>
              <p className="text-muted-foreground">
                Designs that prioritize human needs, capabilities, and limitations
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={hfeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-secondary/10 rounded-full"></div>
                <div className="absolute inset-2 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Evidence-Based</h3>
              <p className="text-muted-foreground">Solutions grounded in scientific research and empirical data</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={hfeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-accent/10 rounded-full"></div>
                <div className="absolute inset-2 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Holistic Approach</h3>
              <p className="text-muted-foreground">Considers physical, cognitive, and organizational factors</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="w-full py-12 md:py-24 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, staggerChildren: 0.1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quiz & Auth Section */}
      <section ref={quizRef} className="w-full py-12 md:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid gap-12 lg:grid-cols-2 items-start"
            initial={{ opacity: 0 }}
            animate={quizInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Workspace Quiz */}
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Interactive Tool
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Is Your Workspace Optimized?</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Take our AI-powered assessment to receive personalized recommendations for improving your workspace
                ergonomics and productivity.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Evidence-based assessment</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Downloadable report</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Implementation guidance</span>
                </li>
              </ul>
              <div className="bg-background rounded-xl shadow-lg p-6">
                <WorkspaceQuiz />
              </div>
            </div>

            {/* Authentication Section */}
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Secure Access
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Account</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Sign in to access file upload features, save your progress, and get personalized recommendations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Secure file uploads</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Personal data protection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Progress tracking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Customized experience</span>
                </li>
              </ul>
              <AuthSection />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="w-full py-12 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Optimizing Your Workflow Today
              </h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Try our AI consultant or explore our collection of specialized tools designed to enhance your
                productivity and wellbeing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/ai-consultant">Try AI Consultant</Link>
              </Button>
              <Button className="bg-transparent border border-white text-white hover:bg-white/10" asChild>
                <Link href="/tools">Explore All Tools</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
