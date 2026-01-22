import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClientWrapper from "@/components/client-wrapper"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "FlowFactor - Human Factors Engineering Consultant",
  description:
    "FlowFactor provides expert Human Factors Engineering consulting services, specializing in AI + Human Collaboration, Neuroinclusive Design, Telework, and Industrial UX.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress extension injection errors and React minified errors
              const originalError = console.error;
              console.error = function(...args) {
                const message = args[0];
                if (typeof message === 'string') {
                  // Suppress extension-related errors
                  if (message.includes('chrome-extension://') || 
                      message.includes('Resources must be listed in the web_accessible_resources')) {
                    return;
                  }
                  // Suppress React minified errors in production (but log them in development)
                  if (message.includes('Minified React error') && process.env.NODE_ENV === 'production') {
                    return;
                  }
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientWrapper>{children}</ClientWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
