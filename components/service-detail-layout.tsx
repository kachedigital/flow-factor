"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

interface ServiceDetailProps {
  pillar: string
  title: string
  angle: string
  description: string
  whatWeDo: string[]
  deliverables: string[]
  icon: LucideIcon
  color: string
  bgColor: string
}

export function ServiceDetailLayout({
  pillar,
  title,
  angle,
  description,
  whatWeDo,
  deliverables,
  icon: Icon,
  color,
  bgColor,
}: ServiceDetailProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--kd-cyan)/0.06),_transparent_50%)]" />
        <div className="container mx-auto px-6 py-20 md:py-28 relative">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <Link
                href="/services"
                className="text-sm text-muted-foreground hover:text-kd-cyan transition-colors"
              >
                Services
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground font-medium">{title}</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}
              >
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <Badge variant="outline" className="font-accent text-xs uppercase tracking-wider">
                {pillar}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              {title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Angle */}
      <section className="py-16 md:py-24 bg-muted/30">
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
              The Angle
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-heading font-bold mb-4 text-balance"
            >
              Our Strategic Approach
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              {angle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Do + Deliverables */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="font-accent text-sm uppercase tracking-widest text-kd-cyan mb-3"
              >
                What We Do
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-2xl font-heading font-bold mb-6"
              >
                How We Help
              </motion.h2>
              <div className="space-y-4">
                {whatWeDo.map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-kd-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-3"
              >
                Deliverables
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-2xl font-heading font-bold mb-6"
              >
                What You Get
              </motion.h2>
              <div className="space-y-3">
                {deliverables.map((item) => (
                  <motion.div key={item} variants={fadeUp}>
                    <Card className="border border-border/60 bg-background">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${bgColor.replace("/10", "")}`} />
                        <p className="text-sm font-medium">{item}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-heading font-bold mb-4 text-balance"
            >
              Interested in {title}?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Let us discuss how we can help your organization. Schedule a free
              discovery call or send us a message.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-heading font-semibold"
              >
                <Link href="/services">All Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
