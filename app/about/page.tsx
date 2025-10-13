"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, GraduationCap, Briefcase, Award, Users, Brain, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function AboutPage() {
  const headerRef = useRef(null)
  const bioRef = useRef(null)
  const expertiseRef = useRef(null)
  const approachRef = useRef(null)
  const ctaRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const bioInView = useInView(bioRef, { once: true, amount: 0.2 })
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 })
  const approachInView = useInView(approachRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const credentials = [
    {
      title: "BCPE",
      description: "Board Certified Professional Ergonomist",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "CHFP",
      description: "Certified Human Factors Professional",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "CUXP",
      description: "Certified User Experience Professional",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
  ]

  const expertise = [
    "Ergonomic Workplace Design",
    "Cognitive Engineering",
    "AI-Human Interaction",
    "Neurodiversity Inclusion",
    "Telework Optimization",
    "Robotics Integration",
    "User Experience Research",
    "Human-Centered Design",
  ]

  const approach = [
    {
      title: "Assess",
      description: "Comprehensive evaluation of current systems, environments, and user needs",
      icon: <CheckCircle className="h-10 w-10 text-secondary" />,
    },
    {
      title: "Design",
      description: "Evidence-based solutions tailored to specific organizational contexts",
      icon: <Sparkles className="h-10 w-10 text-secondary" />,
    },
    {
      title: "Implement",
      description: "Strategic execution with ongoing measurement and refinement",
      icon: <ArrowRight className="h-10 w-10 text-secondary" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Bio Section */}
      <section ref={bioRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={bioInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Niki Bosomefemi, <span className="text-primary"></span>
                </h2>
                <p className="text-xl font-medium text-muted-foreground">Human Factors Engineering Consultant</p>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Niki Bosomefemi is a board-certified Human Factors Engineering (HFE) consultant with over a decade
                    of experience designing safer, smarter, and more inclusive human-centered systems. Holding
                    credentials as a Board Certified Professional Ergonomist (BCPE), Certified Human Factors
                    Professional (CHFP), and Certified User Experience Professional (CUXP), Niki brings a
                    multidisciplinary approach to optimizing human performance across physical, digital, and
                    organizational environments.
                  </p>
                  <p>
                    She earned her Master's degree in Biotechnology from the University of California, Davis, where she
                    cultivated a passion for bridging the gap between cutting-edge technologies and real-world user
                    needs. Her expertise spans ergonomic workplace design, cognitive engineering, AI-human interaction,
                    and neurodiversity inclusion strategies, particularly in the evolving landscapes of telework and
                    robotics.
                  </p>
                  <p>
                    Niki partners with organizations to assess, design, and implement HFE solutions that reduce risk,
                    improve usability, and promote wellbeing. Whether guiding AI product teams, advising on inclusive
                    workspaces, or developing interactive training programs, her mission is to help people thrive in
                    complex systems through thoughtful, data-driven design.
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="text-sm">M.S. Biotechnology, UC Davis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-sm">10+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 mx-auto w-full max-w-[400px]">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg">
                {/* Using a regular img tag with a different approach */}
                <img
                  src="https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/nic1-xyqTUKNi0zl7noEfRsmHkGDk65thJ8.jpg"
                  alt="Niki Bosomefemi"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to Cloudinary image if Blob image fails
                    e.currentTarget.src =
                      "https://res.cloudinary.com/dqubyoc1b/image/upload/v1744340591/nic1_dgh0ae.jpg"
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white font-bold text-xl">Niki Bosomefemi</h3>
                  <p className="text-white/90 text-sm">Founder & Principal Consultant</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Credentials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Professional Certifications</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Industry-recognized qualifications that demonstrate expertise and commitment to best practices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-background to-muted/30 border-primary/10">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">{credential.icon}</div>
                    <h3 className="text-2xl font-bold">{credential.title}</h3>
                    <p className="text-muted-foreground">{credential.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={expertiseRef} className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={expertiseInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary">
                Areas of Expertise
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Specialized Knowledge</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                With a multidisciplinary background, Niki brings diverse expertise to complex human factors challenges.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/portfolio">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white">
                    View Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[500px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://unsplash.com/photos/man-in-blue-crew-neck-t-shirt-standing-beside-woman-in-orange-tank-top-H4ClLKv3pqw?height=300&width=300"
                    alt="Ergonomic workplace design"
                    className=""
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://unsplash.com/photos/a-laptop-computer-with-a-robot-on-the-screen-0YEvGZp0bK0?height=300&width=300"
                    alt="AI-human interaction"
                    className=""
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://unsplash.com/photos/three-attractive-young-business-people-in-the-office-working-together-consulting-a-project-qiI8zdHZTeY?height=300&width=300"
                    alt="Neurodiversity inclusion"
                    className=""
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://unsplash.com/photos/a-woman-sitting-at-a-table-with-a-laptop-YzLMmxDTrvI?height=300&width=300"
                    alt="Telework optimization"
                    className=""
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section ref={approachRef} className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={approachInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-accent/10 text-accent">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How We Work</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                A systematic methodology that delivers measurable improvements in human performance and wellbeing.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approach.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={approachInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-background to-muted/30 border-secondary/10">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-secondary/10">{step.icon}</div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Timeline */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                Background
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Education & Experience</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                A journey of continuous learning and professional growth in Human Factors Engineering.
              </p>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-muted"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-10 w-full md:w-1/2 p-4 rounded-lg bg-card shadow-sm">
                  <div className="font-bold text-lg">Master of Science, Biotechnology</div>
                  <div className="text-primary">University of California, Davis</div>
                  <div className="text-sm text-muted-foreground">2010 - 2012</div>
                  <p className="mt-2 text-muted-foreground">
                    Specialized in human-technology integration with a focus on usability and accessibility.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary"></div>
                <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-10 w-full md:w-1/2 p-4 rounded-lg bg-card shadow-sm">
                  <div className="font-bold text-lg">Senior HFE Consultant</div>
                  <div className="text-secondary">TechErgonomics Inc.</div>
                  <div className="text-sm text-muted-foreground">2012 - 2018</div>
                  <p className="mt-2 text-muted-foreground">
                    Led human factors initiatives for Fortune 500 companies, focusing on workplace optimization and
                    digital interface design.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent"></div>
                <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-10 w-full md:w-1/2 p-4 rounded-lg bg-card shadow-sm">
                  <div className="font-bold text-lg">Director of Human Factors</div>
                  <div className="text-accent">InnovateUX</div>
                  <div className="text-sm text-muted-foreground">2018 - 2022</div>
                  <p className="mt-2 text-muted-foreground">
                    Oversaw a team of HFE specialists, developing methodologies for AI-human collaboration and inclusive
                    design.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-10 w-full md:w-1/2 p-4 rounded-lg bg-card shadow-sm">
                  <div className="font-bold text-lg">Founder & Principal Consultant</div>
                  <div className="text-primary">FlowFactor</div>
                  <div className="text-sm text-muted-foreground">2022 - Present</div>
                  <p className="mt-2 text-muted-foreground">
                    Founded FlowFactor to provide specialized HFE consulting services with a focus on emerging
                    technologies and inclusive design.
                  </p>
                </div>
              </motion.div>
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
                Ready to Transform Your Workplace?
              </h2>
              <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                Schedule a consultation to discuss how our human factors expertise can help your organization thrive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-primary hover:bg-white/90">Schedule a Consultation</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
