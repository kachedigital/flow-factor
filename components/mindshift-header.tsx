"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function MindshiftHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === "/tools/mindshift-CBT"

  const getPageTitle = () => {
    switch (pathname) {
      case "/tools/mindshift-CBT":
        return null
      case "/tools/mindshift-CBT/mood-tracker":
        return "Mood Tracker"
      case "/tools/mindshift-CBT/journal":
        return "Guided Journal"
      case "/tools/mindshift-CBT/thought-diary":
        return "Thought Diary"
      case "/tools/mindshift-CBT/techniques":
        return "CBT Techniques"
      case "/tools/mindshift-CBT/exercises":
        return "CBT Exercises"
      case "/tools/mindshift-CBT/settings":
        return "Settings"
      default:
        return null
    }
  }

  const pageTitle = getPageTitle()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
          <div className="flex-shrink-0 mr-4 sm:mr-6 lg:mr-8">
            <Link href="/tools/mindshift-CBT" className="flex items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-flowfactor-600">MindShift</span>
            </Link>
          </div>
        </div>
        {pageTitle && (
          <motion.h1
            className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2 hidden sm:block text-flowfactor-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.2 }}
          >
            {pageTitle}
          </motion.h1>
        )}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tools">Back to Tools</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
