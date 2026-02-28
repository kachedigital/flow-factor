"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@kachedigital.com",
    href: "mailto:hello@kachedigital.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote-first, US-based",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri, 9am - 5pm EST",
    href: null,
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--kd-magenta)/0.06),_transparent_50%)]" />
        <div className="container mx-auto px-6 py-20 md:py-28 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-accent text-sm uppercase tracking-widest text-kd-magenta mb-3"
            >
              Contact
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              Let&apos;s Build Something{" "}
              <span className="kd-gradient-text">Together</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Ready to start a conversation about AI strategy, accessibility,
              or digital transformation? We would love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <Card className="border border-border/60 bg-background">
                <CardContent className="p-6 md:p-8">
                  {isSubmitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-kd-cyan/10 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-kd-cyan" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-2">
                        Message Sent
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We will get back to you
                        within 1-2 business days.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div variants={fadeUp}>
                        <h2 className="text-2xl font-heading font-bold mb-1">
                          Send Us a Message
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6">
                          Fill out the form below and we will be in touch soon.
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            placeholder="Your organization"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interest</Label>
                          <Select>
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ai-collaboration">
                                AI + Human Collaboration
                              </SelectItem>
                              <SelectItem value="ai-governance">
                                AI Governance & Risk
                              </SelectItem>
                              <SelectItem value="neuroinclusive">
                                Neuroinclusive Design
                              </SelectItem>
                              <SelectItem value="accessibility">
                                Web Accessibility
                              </SelectItem>
                              <SelectItem value="change-management">
                                Change Management
                              </SelectItem>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp} className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project or question..."
                          rows={5}
                          required
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full sm:w-auto bg-kd-cyan hover:bg-kd-cyan/90 text-white font-heading font-semibold"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-lg font-heading font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-kd-cyan/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-kd-cyan" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-kd-cyan transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card className="border border-kd-cyan/20 bg-kd-cyan/5">
                  <CardContent className="p-6">
                    <h3 className="text-base font-heading font-semibold mb-2">
                      Book a Consultation
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Prefer a direct conversation? Schedule a free 30-minute
                      discovery call to discuss your project needs.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-kd-cyan/30 hover:bg-kd-cyan/10 font-heading font-medium"
                    >
                      Schedule a Call
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
