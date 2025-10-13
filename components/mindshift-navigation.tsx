"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart, BookOpen, Brain, Lightbulb, Settings } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { href: "/tools/mindshift-CBT", icon: Home, label: "Home" },
  { href: "/tools/mindshift-CBT/mood-tracker", icon: BarChart, label: "Mood" },
  { href: "/tools/mindshift-CBT/journal", icon: BookOpen, label: "Journal" },
  { href: "/tools/mindshift-CBT/thought-diary", icon: Brain, label: "Thoughts" },
  { href: "/tools/mindshift-CBT/techniques", icon: Lightbulb, label: "Techniques" },
  { href: "/tools/mindshift-CBT/settings", icon: Settings, label: "Settings" },
]

export default function MindshiftNavigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-t border-border safe-bottom glass-effect">
      <div className="flex justify-around">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex flex-col items-center p-2 relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 25, duration: 0.15 }}
              className={`p-2 rounded-full ${pathname === href ? "bg-flowfactor-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <span className="text-xs mt-1">{label}</span>
            {pathname === href && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-flowfactor-600"
                layoutId="navigation-underline"
                transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}
