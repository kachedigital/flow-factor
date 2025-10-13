import WebAccessibilityClient from "./web-accessibility-client"

export const metadata = {
  title: "Web Accessibility Checker | Flow Factor",
  description: "Analyze websites for accessibility compliance and get detailed recommendations.",
}

export default function WebAccessibilityPage() {
  return <WebAccessibilityClient />
}
