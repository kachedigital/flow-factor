"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const articles = [
  {
    title: "Why Human-in-the-Loop AI Is the Future of Enterprise Automation",
    excerpt:
      "The most effective AI systems are not fully autonomous -- they are collaborative. Here is why keeping humans in the loop is a strategic advantage, not a limitation.",
    category: "AI Strategy",
    date: "Coming Soon",
    color: "bg-kd-cyan/10",
  },
  {
    title: "Designing for All Brains: A Practical Guide to Neuroinclusive UX",
    excerpt:
      "Standard accessibility guidelines miss an entire spectrum of cognitive diversity. Learn how to design interfaces that support executive function and reduce cognitive overload.",
    category: "Inclusive Design",
    date: "Coming Soon",
    color: "bg-kd-magenta/10",
  },
  {
    title: "The Hidden Compliance Risk in AI-Generated Content",
    excerpt:
      "Your chatbot might be violating WCAG. Most organizations overlook accessibility in AI-generated content. Here is what to audit and why it matters legally.",
    category: "Accessibility",
    date: "Coming Soon",
    color: "bg-kd-teal/10",
  },
  {
    title: "Change Management in the Age of AI: From Threat to Empowerment",
    excerpt:
      "Workforce anxiety about AI is real -- but manageable. A framework for turning the AI adoption conversation from fear to opportunity.",
    category: "Change Management",
    date: "Coming Soon",
    color: "bg-kd-violet/10",
  },
]

export default function BlogPage() {
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
              Blog
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance"
            >
              Insights & <span className="kd-gradient-text">Articles</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Thought leadership on AI strategy, inclusive design, accessibility
              compliance, and the human side of digital transformation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {articles.map((article) => (
              <motion.div key={article.title} variants={fadeUp}>
                <Card className="h-full border border-border/60 bg-background hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div
                      className={`w-full h-28 rounded-lg ${article.color} mb-4 flex items-center justify-center`}
                    >
                      <Badge
                        variant="secondary"
                        className="font-accent text-xs"
                      >
                        {article.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {article.date}
                    </p>
                    <h3 className="text-base font-heading font-semibold mb-2 leading-snug text-balance">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-14 max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Full articles are on the way. Subscribe to our newsletter to be
              notified when we publish.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-kd-magenta/30 hover:bg-kd-magenta/5 font-heading"
            >
              <Link href="/contact">
                Get Notified
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
