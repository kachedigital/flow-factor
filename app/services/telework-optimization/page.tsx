"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, CheckCircle, Clock, Users, Laptop, Video, Calendar, LayoutGrid } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function TeleworkOptimizationPage() {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const toolsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const toolsInView = useInView(toolsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const services = [
    {
      title: "Ergonomic assessments for home and hybrid setups",
      description: "Ensuring physical comfort and health in any work environment",
      icon: <Home className="h-5 w-5 text-primary" />,
    },
    {
      title: "Digital UX audits for virtual platforms",
      description: "Optimizing digital interfaces for remote collaboration",
      icon: <Laptop className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI-powered productivity tools tuned to human behavior",
      description: "Leveraging technology that works with human rhythms",
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      title: "Guides and training for sustainable remote work culture",
      description: "Building practices that support long-term remote success",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
  ]

  const tools = [
    {
      title: "Collaboration Platforms",
      description: "Optimizing Slack, Teams, and Notion for human-centered workflows",
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
          <path d="M17 6.1H3" />
          <path d="M21 12.1H3" />
          <path d="M15.1 18H3" />
        </svg>
      ),
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Project Management Systems",
      description: "Enhancing Asana, ClickUp, and Trello for better team coordination",
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
          <rect width="6" height="6" x="4" y="4" rx="1" />
          <rect width="6" height="6" x="14" y="4" rx="1" />
          <rect width="6" height="6" x="4" y="14" rx="1" />
          <rect width="6" height="6" x="14" y="14" rx="1" />
        </svg>
      ),
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Virtual Onboarding & Training",
      description: "Creating engaging remote learning experiences for new team members",
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
      title: "AI Assistants & Time Management",
      description: "Implementing tools that enhance focus and productivity",
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
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    },
  ]

  const challenges = [
    {
      title: "Reduce Zoom fatigue and digital burnout",
      description: "Creating sustainable virtual meeting practices",
      icon: <Video className="h-5 w-5 text-primary" />,
    },
    {
      title: "Create inclusive, engaging virtual meetings",
      description: "Ensuring everyone can participate effectively",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Balance autonomy with collaboration",
      description: "Finding the right mix of independent and team work",
      icon: <LayoutGrid className="h-5 w-5 text-primary" />,
    },
    {
      title: "Design interfaces for focus, flow, and accessibility",
      description: "Creating digital environments that enhance productivity",
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
                Telework Optimization
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Human-Centered{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Remote Work
                </span>{" "}
                Solutions
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Creating remote work environments that enhance productivity, wellbeing, and work-life balance.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[600px]">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/remote-work-optimization.png"
                  alt="Optimized remote work environment"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Remote Work Reimagined Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Remote Work, Reimagined
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Future of Work</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                The shift to telework is more than a trend—it's a fundamental change in how we live and work. FlowFactor
                ensures your remote systems are ergonomic, engaging, and effective.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {challenge.icon}
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/30 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <Home className="h-10 w-10 text-secondary" />
                  <h3 className="text-2xl font-bold">Why Telework Optimization Matters</h3>
                  <p className="text-muted-foreground">
                    Remote work offers unprecedented flexibility, but it also presents unique challenges. Our
                    human-centered approach ensures that technology serves people, not the other way around, creating
                    sustainable and productive remote work environments.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                      <h4 className="font-medium">Increased Productivity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimized remote setups can boost productivity by 13-22%
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Users className="h-5 w-5" />
                      <h4 className="font-medium">Better Talent Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Effective remote work expands your talent pool globally
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Home className="h-5 w-5" />
                      <h4 className="font-medium">Work-Life Balance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Well-designed remote work improves employee wellbeing
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Calendar className="h-5 w-5" />
                      <h4 className="font-medium">Reduced Turnover</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Companies with optimized remote work see 25% less turnover
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Our Telework Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Remote Solutions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We provide specialized services designed to optimize remote work environments for productivity and
                wellbeing
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Enhanced employee experience</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Improved team collaboration</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Sustainable remote work practices</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-background rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Case Study: Remote Team Transformation</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <img
                  src="/remote-team-collaboration.png"
                  alt="Remote team collaboration"
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
                      A global marketing agency with 200+ employees struggled with collaboration after transitioning to
                      remote work. Team members reported feeling disconnected, meetings were inefficient, and digital
                      tools were creating more friction than flow.
                    </p>
                  </TabsContent>
                  <TabsContent value="solution" className="p-4">
                    <p className="text-muted-foreground">
                      FlowFactor conducted a comprehensive assessment of their digital ecosystem and work patterns. We
                      redesigned their virtual meeting protocols, optimized their collaboration tools, and created
                      custom training for sustainable remote work practices.
                    </p>
                  </TabsContent>
                  <TabsContent value="results" className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          +38%
                        </Badge>
                        <span>Increase in team collaboration satisfaction</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          -45%
                        </Badge>
                        <span>Reduction in meeting time while improving outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          32%
                        </Badge>
                        <span>Increase in reported work-life balance</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section ref={toolsRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Tools We Optimize
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Enhancing Your Digital Ecosystem</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We optimize the tools your team uses every day to create seamless, human-centered workflows
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-2`}>
                      {tool.icon}
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-muted/30 rounded-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">Our Optimization Process</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                We take a systematic approach to enhancing your remote work tools and practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <h4 className="text-lg font-medium">Assessment</h4>
                </div>
                <p className="text-muted-foreground">
                  Evaluate current tools, workflows, and team experiences to identify pain points
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <h4 className="text-lg font-medium">Design</h4>
                </div>
                <p className="text-muted-foreground">
                  Create optimized workflows and interfaces based on human factors principles
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <h4 className="text-lg font-medium">Implementation</h4>
                </div>
                <p className="text-muted-foreground">
                  Deploy changes with comprehensive training and support for your team
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4 text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    4
                  </div>
                  <h4 className="text-lg font-medium">Refinement</h4>
                </div>
                <p className="text-muted-foreground">
                  Continuously measure outcomes and refine based on real-world usage
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
                The Future of Work Isn't Just Online—It's Optimized for Humans
              </h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Ready to elevate your remote experience?
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
