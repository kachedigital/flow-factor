"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, Shield, Users, Sparkles, CheckCircle, BarChart } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function AICollaborationPage() {
  const heroRef = useRef(null)
  const applicationsRef = useRef(null)
  const ethicsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const applicationsInView = useInView(applicationsRef, { once: true, amount: 0.2 })
  const ethicsInView = useInView(ethicsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const applications = [
    {
      title: "Healthcare",
      description: "Enhancing diagnostic tools without replacing clinical judgment",
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    },
    {
      title: "Manufacturing",
      description: "Supporting workers with predictive maintenance and smart robotics",
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
          <rect width="18" height="10" x="3" y="8" rx="2" />
          <path d="M10 8V5c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v3" />
          <path d="M7 8v7" />
          <path d="M17 8v7" />
          <path d="M7 15a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H7z" />
        </svg>
      ),
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Remote Work",
      description: "Personalizing productivity tools to human rhythms and habits",
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
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      title: "Customer Service",
      description: "Blending human empathy with AI efficiency in support systems",
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
          <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6 6 6 0 0 0 6 6" />
          <path d="M10 14a6 6 0 0 0-6 6" />
          <path d="M14 14a6 6 0 0 1 6 6" />
          <path d="M12 14v4" />
          <path d="M12 22h.01" />
        </svg>
      ),
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
  ]

  const designPrinciples = [
    {
      title: "User-friendly interfaces",
      description: "Intuitive AI tools that require minimal training",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Ergonomic integration",
      description: "Seamless incorporation into physical and digital workspaces",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Cognitive load reduction",
      description: "Explainable AI that minimizes mental effort",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Inclusive experiences",
      description: "AI that considers neurodiversity and accessibility",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
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
                AI + Human Collaboration
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Enhancing Performance,{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Preserving Humanity
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The future of work lies in designing systems where humans and AI work together, not in competition.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[600px]">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/synergistic-workspace.png"
                  alt="AI and human collaboration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* A New Era of Work Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                A New Era of Work
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Human-Centered AI Design</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Rather than forcing people to adapt to machines, we help organizations design AI that adapts to people.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {designPrinciples.map((principle, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {principle.icon}
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/30 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <Sparkles className="h-10 w-10 text-secondary" />
                  <h3 className="text-2xl font-bold">The AI-Human Partnership</h3>
                  <p className="text-muted-foreground">
                    The rise of Artificial Intelligence isn't just about automation—it's about collaboration. Our Human
                    Factors Engineering approach ensures this partnership is safe, intuitive, and empowering.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Brain className="h-5 w-5" />
                      <h4 className="font-medium">Augmentation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI enhances human capabilities rather than replacing them
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Lightbulb className="h-5 w-5" />
                      <h4 className="font-medium">Creativity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Humans provide creative direction while AI handles repetitive tasks
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <Shield className="h-5 w-5" />
                      <h4 className="font-medium">Oversight</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Human judgment provides ethical guardrails for AI systems
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-background p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 text-primary">
                      <BarChart className="h-5 w-5" />
                      <h4 className="font-medium">Efficiency</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI handles data processing while humans focus on high-value decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Applications Section */}
      <section ref={applicationsRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={applicationsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Real-World Applications
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">AI Integration Across Industries</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our HFE experts help integrate AI across diverse industries
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Increased efficiency and accuracy</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Reduced cognitive load on human workers</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Enhanced decision-making capabilities</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-background rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Case Study: AI-Human Collaboration in Healthcare</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <img
                  src="/ai-assisted-diagnosis.png"
                  alt="Doctor using AI diagnostic tool"
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
                      A major hospital system needed to integrate AI diagnostic tools without disrupting physician
                      workflows or diminishing the human element of patient care.
                    </p>
                  </TabsContent>
                  <TabsContent value="solution" className="p-4">
                    <p className="text-muted-foreground">
                      FlowFactor designed an AI integration that presented diagnostic suggestions in an intuitive
                      interface, allowing physicians to maintain decision authority while benefiting from AI pattern
                      recognition.
                    </p>
                  </TabsContent>
                  <TabsContent value="results" className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          +28%
                        </Badge>
                        <span>Increase in diagnostic accuracy</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          -35%
                        </Badge>
                        <span>Reduction in diagnostic time</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          92%
                        </Badge>
                        <span>Physician satisfaction with the system</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics & Diversity Section */}
      <section ref={ethicsRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={ethicsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Ethics & Transparency
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Responsible AI Design</h2>
              <p className="text-muted-foreground">
                We advocate for responsible AI by embedding ethical considerations into design.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How decisions are made</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We design AI systems with transparent decision-making processes, ensuring users understand how and
                      why AI reaches specific conclusions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How data is used</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our approach emphasizes data privacy, security, and responsible usage, with clear communication
                      about what data is collected and how it's applied.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How users maintain control</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We ensure humans remain the ultimate decision-makers, with AI systems designed to suggest rather
                      than dictate, and with clear override mechanisms.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Designing for Diversity
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Inclusive AI Systems</h2>
              <p className="text-muted-foreground mb-6">
                Humans are diverse—so AI must be too. Our methodology ensures AI works for everyone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-background to-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Diverse Testing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Testing across varied user populations to ensure AI works for everyone
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-background to-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Universal Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Incorporating principles that make AI accessible to all users
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-background to-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Neurodiversity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Designing for neurodivergent and marginalized users</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Why This Matters</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Collaboration works best when every voice is heard. Inclusive AI design ensures technology serves all
                  users, not just the majority or those who created it.
                </p>
              </div>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Partner With Us</h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Let's build a world where humans and AI don't just coexist—they co-create.
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
