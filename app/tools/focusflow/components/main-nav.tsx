"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/tools/focusflow"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Overview
      </Link>
      <Link
        href="/tools/focusflow/tasks"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow/tasks" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Tasks
      </Link>
      <Link
        href="/tools/focusflow/projects"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow/projects" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Projects
      </Link>
      <Link
        href="/tools/focusflow/calendar"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow/calendar" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Calendar
      </Link>
      <Link
        href="/tools/focusflow/analytics"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow/analytics" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Analytics
      </Link>
      <Link
        href="/tools/focusflow/focus-timer"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/tools/focusflow/focus-timer" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Focus Timer
      </Link>
    </nav>
  )
}
