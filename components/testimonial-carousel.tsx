"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote:
      "FlowFactor's neuroinclusive design approach transformed our workspace. Employee satisfaction increased by 35% and productivity improved significantly.",
    author: "Sarah Johnson",
    title: "Head of Workplace Experience, TechCorp",
    avatar:
      "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/people/black-female-5saw9ztO47M3nW8cCDp68KMEYWC97s.jpg",
  },
  {
    quote:
      "The AI + Human collaboration framework developed by FlowFactor helped us seamlessly integrate new technologies while keeping our team engaged and productive.",
    author: "Michael Chen",
    title: "CTO, InnovateTech",
    avatar:
      "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/people/asian-male-bFQYNCMBHuWbLHJS3ijE2oGP4ZTV9s.jpg",
  },
  {
    quote:
      "Our manufacturing facility saw a 45% reduction in ergonomic injuries after implementing FlowFactor's industrial UX recommendations. The ROI was incredible.",
    author: "Robert Martinez",
    title: "Operations Director, ManufacturePro",
    avatar:
      "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/people/latin-male-8aZtNitHWZUw0sJDgFl1wBXR0RelUf.jpg",
  },
  {
    quote:
      "As we transitioned to hybrid work, FlowFactor's telework optimization strategies were invaluable. They helped us create a cohesive experience for both remote and in-office staff.",
    author: "Emily Wong",
    title: "HR Director, GlobalServices",
    avatar:
      "https://synaz3xz7xc7xzre.public.blob.vercel-storage.com/FlowFactor/people/asian-female-lezq5KqZIaugWNNQiIkIUtForNFdtS.jpg",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur shadow-sm hover:bg-background"
          onClick={() => {
            prev()
            setAutoplay(false)
          }}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/30">
              <CardContent className="pt-10 pb-10 px-8 md:px-12">
                <Quote className="h-12 w-12 text-primary/20 mb-4" />
                <blockquote className="text-xl md:text-2xl font-medium mb-6">
                  "{testimonials[current].quote}"
                </blockquote>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonials[current].avatar || "/placeholder.svg"}
                      alt={testimonials[current].author}
                    />
                    <AvatarFallback>
                      {testimonials[current].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonials[current].author}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[current].title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur shadow-sm hover:bg-background"
          onClick={() => {
            next()
            setAutoplay(false)
          }}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
