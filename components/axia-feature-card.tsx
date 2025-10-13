"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Accessibility } from "lucide-react"

export function AxiaFeatureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-2 border-primary/20 flex flex-col h-full">
        <div className="h-2 bg-primary" />
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Accessibility className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Axia</CardTitle>
              <CardDescription>Complete Accessibility Suite</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <p>Comprehensive accessibility testing for both web content and PDF documents in one unified platform.</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">PDF Analysis</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">Web Compliance</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">WCAG Guidelines</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">Remediation Tips</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/tools/axia" className="w-full">
            <Button className="w-full group">
              Try Axia
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
