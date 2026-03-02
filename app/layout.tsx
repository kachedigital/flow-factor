import type { Metadata } from 'next';
import type React from "react"
import "./globals.css"
import { Montserrat, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClientWrapper from "@/components/client-wrapper"
import { ErrorBoundary } from "@/components/error-boundary"
import ComplianceSlideIn from "@/components/compliance-slide-in"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: 'Kache Digital | AI Governance & Digital Change Management',
  description: 'We bridge the gap between complex digital transformation and ethical, accessible execution. Kache Digital guides organizations through AI integration and global compliance.',
  keywords: ['AI Governance', 'Digital Compliance', 'Change Management', 'WCAG 2.1 AA', 'Digital Transformation Consultancy', 'Neuroinclusive Design'],
  openGraph: {
    title: 'Kache Digital | Architect systems for Human & AI Collaboration',
    description: 'Lead your organization through the AI evolution with robust policies, digital compliance, and intelligent workflows.',
    url: 'https://kachedigital.com', // Senior: Update with actual production URL
    siteName: 'Kache Digital',
    images: [
      {
        url: '/og-image.jpg', // Senior: Export the 3D ribbon Hero as a 1200x630 JPG for this
        width: 1200,
        height: 630,
        alt: 'Kache Digital - Architecting systems for Human & AI Collaboration',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kache Digital | Digital Consulting Agency',
    description: 'Ethical AI governance, neuroinclusive design, and seamless strategic change management.',
    images: ['/og-image.jpg'], // Senior: Use the same 1200x630 image here
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
            <ComplianceSlideIn />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
