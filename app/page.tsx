"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  Shield,
  Accessibility,
  Scale,
  ArrowUpRight,
  Users,
  Target,
  Lightbulb,
  Layers,
  Wrench,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    title: "AI + Human Collaboration",
    pillar: "Core Integration",
    description:
      "Designing human-in-the-loop systems where AI handles the heavy lifting, but human judgment remains the final QA.",
    icon: Brain,
    href: "/services/ai-collaboration",
    color: "text-kd-cyan",
    bgColor: "bg-kd-cyan/10",
  },
  {
    title: "AI Governance & Risk",
    pillar: "Stability Pillar",
    description:
      "Creating frameworks for ethical AI use, data privacy, and internal auditing. The invisible shield applied to policy.",
    icon: Shield,
    href: "/services/ai-governance",
    color: "text-kd-magenta",
    bgColor: "bg-kd-magenta/10",
  },
  {
    title: "Neuroinclusive Design",
    pillar: "Identity Pillar",
    description:
      "Digital environments designed for all brains. Interfaces that reduce cognitive load and support executive function.",
    icon: Accessibility,
    href: "/services/neuroinclusive-design",
    color: "text-kd-violet",
    bgColor: "bg-kd-violet/10",
  },
  {
    title: "Web Accessibility",
    pillar: "Legal Pillar",
    description:
      "WCAG 2.2 remediation, Section 508 compliance, and ensuring AI-generated content and tools are fully accessible.",
    icon: Scale,
    href: "/services/web-accessibility",
    color: "text-kd-teal",
    bgColor: "bg-kd-teal/10",
  },
  {
    title: "Change Management",
    pillar: "Transformation",
    description:
      "Managing the psychological and procedural shift when an organization adopts AI. People upgraded, not replaced.",
    icon: ArrowUpRight,
    href: "/services/change-management",
    color: "text-kd-coral",
    bgColor: "bg-kd-coral/10",
  },
]

const tools = [
  {
    name: "FlexFlow",
    description: "Visual flexbox playground for rapid CSS layout prototyping.",
    href: "/tools/flexflow",
  },
  {
    name: "Axia",
    description: "Complete accessibility suite for testing web content and PDF documents.",
    href: "/tools/axia",
  },
  {
    name: "FocusFlow",
    description: "Productivity timer designed with neuroinclusive principles.",
    href: "/tools/focusflow",
  },
]

const values = [
  {
    icon: Users,
    title: "Human-Centered",
    description: "Every solution starts with the people who use it.",
  },
  {
    icon: Lightbulb,
    title: "Augmented Intelligence",
    description: "AI that amplifies human capability, not replaces it.",
  },
  {
    icon: Layers,
    title: "Inclusive by Default",
    description: "Accessibility and neuroinclusion baked into every layer.",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "Strategy grounded in research, data, and real-world impact.",
  },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--kd-cyan)/0.08),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_hsl(var(--kd-magenta)/0.06),_transparent_50%)]" />
        <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-cyan mb-4"
            >
              {"Digital Agency \u00B7 Consulting \u00B7 Tech Studio"}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-balance"
            >
              Building{" "}
              <span className="kd-gradient-text">Digital Fortresses</span>{" "}
              That Work for Everyone
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty"
            >
              We design inclusive digital experiences powered by responsible AI,
              human-centered strategy, and evidence-based solutions.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-heading font-semibold border-kd-cyan/30 hover:bg-kd-cyan/5"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-2"
            >
              What We Do
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold text-balance"
            >
              Five Pillars of Your Digital Fortress
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Our services span every stage of digital transformation, from
              strategy and governance to inclusive design and accessibility
              compliance.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Link href={service.href} className="group block h-full">
                  <Card className="h-full border border-border/60 hover:border-kd-cyan/40 transition-all duration-300 hover:shadow-lg bg-background">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div
                        className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}
                      >
                        <service.icon className={`h-6 w-6 ${service.color}`} />
                      </div>
                      <span className="text-xs font-accent uppercase tracking-wider text-muted-foreground mb-1">
                        {service.pillar}
                      </span>
                      <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-kd-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-kd-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-cyan mb-2"
            >
              Our Approach
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold text-balance"
            >
              Where Strategy Meets Innovation
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-kd-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-kd-cyan" />
                </div>
                <h3 className="text-base font-heading font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-2"
            >
              Free Tools
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold text-balance"
            >
              Built for Developers & Designers
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Open-source tools we built to make web development more accessible
              and efficient. More coming soon.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {tools.map((tool) => (
              <motion.div key={tool.name} variants={fadeUp}>
                <Link href={tool.href} className="group block">
                  <Card className="border border-border/60 hover:border-kd-magenta/40 transition-all duration-300 hover:shadow-lg bg-background">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-kd-magenta/10 flex items-center justify-center mb-4">
                        <Wrench className="h-5 w-5 text-kd-magenta" />
                      </div>
                      <h3 className="text-base font-heading font-semibold mb-1 group-hover:text-kd-magenta transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Button
              asChild
              variant="outline"
              className="border-kd-magenta/30 hover:bg-kd-magenta/5 font-heading"
            >
              <Link href="/tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            className="relative max-w-3xl mx-auto text-center rounded-2xl p-10 md:p-16 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="absolute inset-0 kd-gradient-bg opacity-[0.07] rounded-2xl" />
            <div className="absolute inset-0 border border-kd-cyan/20 rounded-2xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-balance">
                Ready to Build Your{" "}
                <span className="kd-gradient-text">Digital Fortress</span>?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Whether you need an AI strategy, accessibility audit, or full
                digital transformation, we are here to help.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
                >
                  <Link href="/contact">Start a Conversation</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-heading font-semibold"
                >
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
