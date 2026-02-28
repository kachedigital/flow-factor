"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Lightbulb,
  Layers,
  Target,
  Heart,
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

const values = [
  {
    icon: Users,
    title: "Human-Centered Design",
    description:
      "Every solution begins with the people who will use it. We design for real humans with real needs, not theoretical personas.",
    color: "text-kd-cyan",
    bgColor: "bg-kd-cyan/10",
  },
  {
    icon: Lightbulb,
    title: "Augmented Intelligence",
    description:
      "We believe AI should amplify human capability, not replace it. Our frameworks ensure technology serves people.",
    color: "text-kd-magenta",
    bgColor: "bg-kd-magenta/10",
  },
  {
    icon: Layers,
    title: "Inclusive by Default",
    description:
      "Accessibility and neuroinclusion are not afterthoughts. They are embedded in every layer of our process.",
    color: "text-kd-violet",
    bgColor: "bg-kd-violet/10",
  },
  {
    icon: Target,
    title: "Evidence-Based Solutions",
    description:
      "Our strategies are grounded in research, empirical data, and real-world testing -- not trends or guesswork.",
    color: "text-kd-teal",
    bgColor: "bg-kd-teal/10",
  },
  {
    icon: Heart,
    title: "Injury-Informed Insight",
    description:
      "Lived experience with neurodiversity and recovery informs our unique perspective on inclusive, resilient design.",
    color: "text-kd-coral",
    bgColor: "bg-kd-coral/10",
  },
]

export default function AboutPage() {
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
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              Strategy. Inclusion.{" "}
              <span className="kd-gradient-text">Digital Resilience.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty"
            >
              KacheDigital is a digital agency, consulting firm, and tech studio
              that builds digital fortresses -- systems that are inclusive,
              human-centered, and resilient by design.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-3"
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold mb-6 text-balance"
            >
              Born from Expertise, Shaped by Experience
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                KacheDigital was founded on a simple belief: technology should
                work for everyone, not just the majority. With deep roots in
                human factors engineering, accessibility, and AI strategy, we
                bridge the gap between cutting-edge technology and the people it
                serves.
              </p>
              <p>
                Our approach is informed by lived experience with
                neurodiversity, workplace injury, and the realities of digital
                transformation. This gives us a unique perspective -- we
                understand both the strategic imperatives of organizations and
                the human needs that technology must serve.
              </p>
              <p>
                We call our approach{" "}
                <span className="text-foreground font-medium">
                  &ldquo;Building Digital Fortresses&rdquo;
                </span>{" "}
                -- creating systems with an invisible shield of governance,
                compliance, and inclusive design so robust that organizations can
                innovate with confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              What Drives Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold text-balance"
            >
              Our Core Values
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={fadeUp}>
                <Card className="h-full border border-border/60 bg-background">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${value.bgColor} flex items-center justify-center mb-4`}
                    >
                      <value.icon className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <h3 className="text-base font-heading font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-2"
            >
              The Team
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance"
            >
              Meet the People Behind the Fortress
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Our team brings together expertise in human factors engineering,
              AI strategy, accessibility compliance, and inclusive design. Team
              profiles coming soon.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                asChild
                className="bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
              >
                <Link href="/contact">
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
