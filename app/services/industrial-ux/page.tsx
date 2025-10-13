"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Factory, CheckCircle, Shield, AlertTriangle, Laptop, Gauge, BotIcon as Robot, Lightbulb } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function IndustrialUXPage() {
  const heroRef = useRef(null)
  const focusAreasRef = useRef(null)
  const industriesRef = useRef(null)
  const innovationRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const focusAreasInView = useInView(focusAreasRef, { once: true, amount: 0.2 })
  const industriesInView = useInView(industriesRef, { once: true, amount: 0.2 })
  const innovationInView = useInView(innovationRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const focusAreas = [
    {
      title: "Operator interface design",
      description: "Creating intuitive machinery and dashboard interfaces that reduce errors and training time",
      icon: <Laptop className="h-5 w-5 text-primary" />,
    },
    {
      title: "Cognitive load reduction",
      description: "Simplifying complex environments to prevent mental fatigue and improve decision-making",
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
    },
    {
      title: "Visual and auditory signaling",
      description: "Designing clear, consistent signals that work in noisy, high-stress environments",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Human-robot interaction (HRI)",
      description: "Optimizing collaboration between humans and robotic systems for safety and efficiency",
      icon: <Robot className="h-5 w-5 text-primary" />,
    },
    {
      title: "Safety systems and alerts",
      description: "Creating safety mechanisms that protect without disrupting workflow",
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
  ]

  const industries = [
    {
      title: "Manufacturing & Robotics",
      description: "Optimizing production lines, control systems, and human-robot collaboration",
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
          <path d="M7 7h10v10H7z" />
          <path d="M17 7h3v3" />
          <path d="M17 17h3v-3" />
          <path d="M7 7H4v3" />
          <path d="M7 17H4v-3" />
        </svg>
      ),
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Transportation & Logistics",
      description: "Enhancing vehicle interfaces, warehouse systems, and logistics operations",
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
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <path d="M9 4v16" />
          <path d="M15 4v16" />
          <path d="M4 9h16" />
          <path d="M4 15h16" />
        </svg>
      ),
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Energy & Utilities",
      description: "Improving control rooms, field operations, and monitoring systems",
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
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m8 6 4-4 4 4" />
          <path d="M16 18a4 4 0 0 0-8 0" />
        </svg>
      ),
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      title: "Defense & Aerospace",
      description: "Designing mission-critical interfaces where error tolerance is minimal",
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
          <path d="M12 2L2 7l10 5 10-5-10-5Z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      color: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
  ]

  const innovations = [
    {
      title: "Real-time decision support",
      description: "Systems that provide contextual information when and where it's needed",
      icon: <Gauge className="h-5 w-5 text-primary" />,
    },
    {
      title: "Usable automation",
      description: "Automated systems that remain transparent and predictable to operators",
      icon: <Robot className="h-5 w-5 text-primary" />,
    },
    {
      title: "Empowered human oversight",
      description: "Interfaces that keep humans meaningfully in control of automated processes",
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
    },
    {
      title: "Ergonomic task and interface design",
      description: "Physical and digital designs that reduce strain and enhance performance",
      icon: <Laptop className="h-5 w-5 text-primary" />,
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
                Industrial UX
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Designing Seamless{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Human-Machine
                </span>{" "}
                Interaction
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Applying UX design to industrial environments to create safer, more efficient, and intuitive systems.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[600px]">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img src="/industrial-ux-hero.png" alt="Industrial UX design" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* UX Meets Factory Floor Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                UX Meets the Factory Floor
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Industrial Human Factors</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Industrial environments are increasingly high-tech—but without Human Factors, these systems risk
                becoming high-friction. FlowFactor applies UX design to machines, tools, interfaces, and workflows to
                ensure industrial settings are safe, efficient, and intuitive.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-muted/30 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <Factory className="h-10 w-10 text-secondary" />
                  <h3 className="text-2xl font-bold">Why Industrial UX Matters</h3>
                  <p className="text-muted-foreground">
                    In industrial settings, poor UX isn't just frustrating—it can be dangerous and costly. Our
                    human-centered approach ensures that technology serves workers, enhancing safety, efficiency, and
                    job satisfaction.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Shield className="h-5 w-5" />
                      <h4 className="font-medium">Enhanced Safety</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Well-designed interfaces can reduce accidents by up to 35%
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Gauge className="h-5 w-5" />
                      <h4 className="font-medium">Increased Efficiency</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimized UX can improve operational efficiency by 15-40%
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Lightbulb className="h-5 w-5" />
                      <h4 className="font-medium">Reduced Training Time</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Intuitive interfaces can cut training requirements by 50%
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Robot className="h-5 w-5" />
                      <h4 className="font-medium">Better Human-Machine Teams</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Effective HRI design creates more productive collaborative systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section ref={focusAreasRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={focusAreasInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Our Focus Areas
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Specialized Industrial UX Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We provide expert services designed to optimize human-machine interaction in industrial environments
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={focusAreasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      {area.icon}
                    </div>
                    <CardTitle>{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{area.description}</p>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Improved operational efficiency</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Enhanced safety and error reduction</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Reduced cognitive load and fatigue</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-background rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Case Study: Manufacturing Control System Redesign</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <img
                  src="/industrial-control-system.png"
                  alt="Industrial control system interface"
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
                      A manufacturing company was struggling with a complex control system interface that led to
                      frequent errors, extensive training requirements, and operator frustration. The legacy system had
                      grown organically over years, resulting in inconsistent design patterns and workflows.
                    </p>
                  </TabsContent>
                  <TabsContent value="solution" className="p-4">
                    <p className="text-muted-foreground">
                      FlowFactor conducted comprehensive user research with operators, analyzing their workflows, pain
                      points, and mental models. We redesigned the interface with consistent patterns, clear information
                      hierarchy, and contextual help systems. The new design reduced visual complexity while maintaining
                      all necessary functionality.
                    </p>
                  </TabsContent>
                  <TabsContent value="results" className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          -45%
                        </Badge>
                        <span>Reduction in operator errors</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          -60%
                        </Badge>
                        <span>Decrease in training time for new operators</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          +22%
                        </Badge>
                        <span>Increase in production throughput</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={industriesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Industries We Serve
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Specialized Sector Expertise</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our industrial UX solutions are tailored to the unique challenges of various sectors
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={industriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-full ${industry.color} flex items-center justify-center mb-2`}>
                      {industry.icon}
                    </div>
                    <CardTitle>{industry.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Human-in-the-Loop Innovation Section */}
      <section ref={innovationRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={innovationInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Human-in-the-Loop Innovation
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                We Don't Replace Humans—We Enhance Them
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our approach keeps humans at the center of industrial technology, creating systems that augment human
                capabilities
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {innovations.map((innovation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={innovationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {innovation.icon}
                      <CardTitle className="text-lg">{innovation.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{innovation.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-background rounded-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">Our Design Philosophy</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Great UX isn't just for apps. It belongs in the field, on the floor, and in the hands of every worker.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <h4 className="text-lg font-medium">Human-Centered</h4>
                </div>
                <p className="text-muted-foreground">
                  We design for the people who use the systems, not just for the technical requirements
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <h4 className="text-lg font-medium">Context-Aware</h4>
                </div>
                <p className="text-muted-foreground">
                  Our solutions account for the unique challenges of industrial environments
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <h4 className="text-lg font-medium">Evidence-Based</h4>
                </div>
                <p className="text-muted-foreground">
                  We rely on research, testing, and measurement to validate our design decisions
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bring UX to the Frontline</h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Talk to our team about your industrial design challenge.
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
