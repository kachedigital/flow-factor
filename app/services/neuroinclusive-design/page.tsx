"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, Lightbulb, Settings, Users, Sparkles, LayoutGrid } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function NeuroinclusivenessPage() {
  const heroRef = useRef(null)
  const strategiesRef = useRef(null)
  const applicationsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const strategiesInView = useInView(strategiesRef, { once: true, amount: 0.2 })
  const applicationsInView = useInView(applicationsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const strategies = [
    {
      title: "User research with neurodivergent individuals",
      description: "Gathering insights directly from people with diverse cognitive styles",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Accessibility-first UX practices",
      description: "Building inclusivity into the foundation of every design",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Clear navigation, visual hierarchies, and feedback loops",
      description: "Creating intuitive systems that reduce cognitive load",
      icon: <LayoutGrid className="h-5 w-5 text-primary" />,
    },
    {
      title: "Customization & flexibility in interaction models",
      description: "Allowing users to adapt interfaces to their unique needs",
      icon: <Settings className="h-5 w-5 text-primary" />,
    },
  ]

  const applications = [
    {
      title: "Workplace Tools",
      description: "Digital and physical tools that support diverse cognitive needs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3 7V5c0-1.1.9-2 2-2h2" />
          <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
          <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
          <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
          <rect width="7" height="5" x="7" y="7" rx="1" />
          <rect width="7" height="5" x="10" y="12" rx="1" />
        </svg>
      ),
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "AI Systems",
      description: "Intuitive AI interfaces that work for everyone",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      ),
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Training Platforms",
      description: "Learning systems that engage all cognitive styles",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      title: "Digital Environments",
      description: "Interfaces that minimize distraction and anxiety",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
      ),
      color: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
  ]

  const benefits = [
    {
      title: "Reduced sensory overload",
      description: "Creating environments that minimize overwhelming stimuli",
      icon: <Brain className="h-5 w-5 text-primary" />,
    },
    {
      title: "Support for executive functioning",
      description: "Tools that assist with planning, organization, and task management",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Customizable interfaces and workflows",
      description: "Adaptable systems that meet individual needs",
      icon: <Settings className="h-5 w-5 text-primary" />,
    },
    {
      title: "Psychological safety and usability",
      description: "Designs that reduce anxiety and cognitive friction",
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <motion.div
          ref={heroRef}
          className="container px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Neuroinclusive Design
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Designing for{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Every Mind
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Creating environments and technologies that embrace the full spectrum of human cognition.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[600px]">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/collaborative-innovation-hub.png"
                  alt="Neuroinclusive workspace design"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Understanding Neurodiversity Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Understanding Neurodiversity
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Spectrum of Human Cognition</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Neurodiversity recognizes that neurological differences—such as ADHD, autism, dyslexia, and anxiety—are
                natural variations of the human brain. At FlowFactor, we see these differences not as challenges to
                overcome, but as opportunities to design better systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {benefit.icon}
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/30 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <Brain className="h-10 w-10 text-secondary" />
                  <h3 className="text-2xl font-bold">Why Neuroinclusive Design Matters</h3>
                  <p className="text-muted-foreground">
                    When we design for neurodiversity, we create better experiences for everyone. Neuroinclusive design
                    principles lead to clearer, more intuitive, and more adaptable systems that benefit all users,
                    regardless of their cognitive style.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Users className="h-5 w-5" />
                      <h4 className="font-medium">Broader Reach</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Inclusive design expands your audience and customer base
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Sparkles className="h-5 w-5" />
                      <h4 className="font-medium">Innovation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Diverse cognitive styles bring unique perspectives and ideas
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                      <h4 className="font-medium">Productivity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supportive environments enable everyone to work at their best
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Lightbulb className="h-5 w-5" />
                      <h4 className="font-medium">Ethical Practice</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Inclusive design reflects a commitment to equity and accessibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section ref={strategiesRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={strategiesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Neuroinclusive Design Strategies</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our evidence-based methodologies create environments and technologies that work for diverse cognitive
                styles
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={strategiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      {strategy.icon}
                    </div>
                    <CardTitle>{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{strategy.description}</p>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Improved usability for all users</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Reduced cognitive load and frustration</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Enhanced engagement and productivity</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-background rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Case Study: Neuroinclusive Workplace Transformation</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <img
                  src="/collaborative-flexible-workspace.png"
                  alt="Neuroinclusive workplace design"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="lg:col-span-2">
                <Tabs defaultValue="challenge">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="challenge">Challenge</TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>
                  <TabsContent value="challenge" className="p-4">
                    <p className="text-muted-foreground">
                      A technology company was struggling with high turnover and low engagement among their
                      neurodivergent employees, who reported feeling overwhelmed by the open office environment and
                      digital tools that weren't designed with their needs in mind.
                    </p>
                  </TabsContent>
                  <TabsContent value="solution" className="p-4">
                    <p className="text-muted-foreground">
                      FlowFactor conducted a comprehensive assessment and redesigned both physical and digital
                      workspaces. We created sensory zones, implemented customizable interfaces, and developed clear
                      visual systems for navigation and task management.
                    </p>
                  </TabsContent>
                  <TabsContent value="results" className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          +42%
                        </Badge>
                        <span>Increase in reported workplace satisfaction</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          -35%
                        </Badge>
                        <span>Reduction in reported cognitive fatigue</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          28%
                        </Badge>
                        <span>Increase in team productivity metrics</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section ref={applicationsRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={applicationsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Where It Matters
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Applications & Impact</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our neuroinclusive design principles create meaningful improvements across various environments
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={applicationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-full ${app.color} flex items-center justify-center mb-2`}>
                      {app.icon}
                    </div>
                    <CardTitle>{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{app.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-muted/30 rounded-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">The Universal Design Principle</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                When we design for neurodiversity, we create better experiences for everyone. Features that help
                neurodivergent users often improve usability for all.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <Brain className="h-6 w-6" />
                  <h4 className="text-lg font-medium">Cognitive Clarity</h4>
                </div>
                <p className="text-muted-foreground">
                  Clear instructions and intuitive navigation help everyone, not just those with processing differences.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <Settings className="h-6 w-6" />
                  <h4 className="text-lg font-medium">Personalization</h4>
                </div>
                <p className="text-muted-foreground">
                  Customizable interfaces allow all users to create their optimal working environment.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <Lightbulb className="h-6 w-6" />
                  <h4 className="text-lg font-medium">Reduced Complexity</h4>
                </div>
                <p className="text-muted-foreground">
                  Simplified workflows and reduced cognitive load benefit everyone in our information-rich world.
                </p>
              </div>
            </div>
          </div>
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
                Let's Build Systems That Work With All Minds
              </h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Get in touch to start your neuroinclusive journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-primary hover:bg-white/90">Schedule a Consultation</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
