import type React from "react"
import "./globals.css"
import { Montserrat, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClientWrapper from "@/components/client-wrapper"
import { ErrorBoundary } from "@/components/error-boundary"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "KacheDigital - Digital Consulting Agency",
  description:
    "KacheDigital provides expert digital consulting services, specializing in AI Governance, AI + Human Collaboration, Neuroinclusive Design, and Strategic Change Management.",
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
              const originalError = console.error;
              console.error = function(...args) {
                const message = args[0];
                if (typeof message === 'string') {
                  if (message.includes('chrome-extension://') || 
                      message.includes('Resources must be listed in the web_accessible_resources')) {
                    return;
                  }
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
      <body className={`${montserrat.variable} ${poppins.variable} font-sans`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientWrapper>{children}</ClientWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
