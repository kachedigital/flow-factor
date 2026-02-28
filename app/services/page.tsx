"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  Shield,
  Accessibility,
  Scale,
  ArrowUpRight,
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
    tagline: 'Moving away from "AI replacement" toward Augmented Intelligence.',
    description:
      "We design human-in-the-loop systems where AI handles the heavy lifting, but human judgment remains the final QA. Custom collaboration workflows that define exactly where the AI ends and the human begins.",
    icon: Brain,
    href: "/services/ai-collaboration",
    color: "text-kd-cyan",
    bgColor: "bg-kd-cyan/10",
  },
  {
    title: "AI Governance & Risk Management",
    pillar: "Stability Pillar",
    tagline: 'The "Invisible Shield" applied to policy.',
    description:
      "Creating frameworks for ethical AI use, data privacy, and internal auditing. AI Use Policies and Risk Mitigation Roadmaps for organizations navigating the complexities of AI adoption.",
    icon: Shield,
    href: "/services/ai-governance",
    color: "text-kd-magenta",
    bgColor: "bg-kd-magenta/10",
  },
  {
    title: "Neuroinclusive Design",
    pillar: "Identity Pillar",
    tagline: "Digital environments designed for all brains.",
    description:
      "Beyond standard UX: interfaces that reduce cognitive load, minimize recall pressure, and support executive function. Neuro-Accessibility Audits and UI/UX patterns that do not overwhelm the user.",
    icon: Accessibility,
    href: "/services/neuroinclusive-design",
    color: "text-kd-violet",
    bgColor: "bg-kd-violet/10",
  },
  {
    title: "Web Accessibility Compliance",
    pillar: "Legal Pillar",
    tagline: "Ensuring the digital fortress is open to everyone.",
    description:
      "WCAG 2.2 remediation, Section 508 compliance, and making sure AI-generated content and tools are actually accessible. Remediation Reports backed by custom accessibility tooling.",
    icon: Scale,
    href: "/services/web-accessibility",
    color: "text-kd-teal",
    bgColor: "bg-kd-teal/10",
  },
  {
    title: "Strategic Change Management",
    pillar: "Transformation Pillar",
    tagline: 'Solving the "Identity Crisis" of a workforce facing AI.',
    description:
      "Managing the psychological and procedural shift when an organization adopts AI. Workforce Transition Blueprints that map how roles evolve so people feel upgraded, not replaced.",
    icon: ArrowUpRight,
    href: "/services/change-management",
    color: "text-kd-coral",
    bgColor: "bg-kd-coral/10",
  },
]

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--kd-cyan)/0.08),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_hsl(var(--kd-magenta)/0.06),_transparent_50%)]" />
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
              Our Services
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              Five Pillars of Your{" "}
              <span className="kd-gradient-text">Digital Fortress</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              From AI strategy and governance to inclusive design and workforce
              transformation, our services cover every pillar of a resilient
              digital organization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="space-y-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Link href={service.href} className="group block">
                  <Card className="border border-border/60 hover:border-kd-cyan/40 transition-all duration-300 hover:shadow-lg bg-background">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div
                          className={`w-14 h-14 rounded-lg ${service.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <service.icon
                            className={`h-7 w-7 ${service.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-accent uppercase tracking-wider text-muted-foreground">
                            {service.pillar}
                          </span>
                          <h2 className="text-xl font-heading font-bold mt-1 mb-2 group-hover:text-kd-cyan transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-sm font-medium text-foreground/80 mb-2 italic">
                            {service.tagline}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                          <div className="mt-4 flex items-center text-sm font-medium text-kd-cyan">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
