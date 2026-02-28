import type React from "react"
import "./globals.css"
import { Montserrat, Open_Sans, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClientWrapper from "@/components/client-wrapper"
import { ErrorBoundary } from "@/components/error-boundary"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "KacheDigital - Digital Agency, Consulting & Tech Studio",
  description:
    "KacheDigital builds digital fortresses through AI collaboration, neuroinclusive design, web accessibility, AI governance, and strategic change management.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0CC0DF",
  width: "device-width",
  initialScale: 1,
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
      <body
        className={`${montserrat.variable} ${openSans.variable} ${poppins.variable} font-sans`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClientWrapper>{children}</ClientWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
