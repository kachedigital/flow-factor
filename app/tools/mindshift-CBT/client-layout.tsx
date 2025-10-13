"use client"

import MindshiftHeader from "@/components/mindshift-header"
import MindshiftNavigation from "@/components/mindshift-navigation"
import { ScrollToTop } from "@/components/scroll-to-top"
import PageTransition from "@/components/page-transition"
import type { ReactNode } from "react"

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ScrollToTop />
      <MindshiftHeader />
      <main className="flex-1 overflow-auto">
        <PageTransition>{children}</PageTransition>
      </main>
      <MindshiftNavigation />
    </>
  )
}
