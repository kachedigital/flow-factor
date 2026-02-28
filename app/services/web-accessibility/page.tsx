import { Scale } from "lucide-react"
import { ServiceDetailLayout } from "@/components/service-detail-layout"

export default function WebAccessibilityPage() {
  return (
    <ServiceDetailLayout
      pillar="Legal Pillar"
      title="Web Accessibility Compliance"
      icon={Scale}
      color="text-kd-teal"
      bgColor="bg-kd-teal/10"
      description="Ensuring your digital fortress is open to everyone -- and legally compliant. WCAG 2.2 remediation, Section 508 compliance, and accessible AI-generated content."
      angle="Accessibility is not just a legal checkbox -- it is the front door of your digital fortress. If that door is closed to anyone, the fortress fails. We make sure AI-generated content, chatbots, and interactive tools are fully accessible, not just your static pages."
      whatWeDo={[
        "Perform comprehensive WCAG 2.2 Level AA and AAA compliance audits",
        "Remediate Section 508 compliance gaps across web properties and documents",
        "Audit AI-generated content and chatbot interfaces for accessibility barriers",
        "Test with assistive technologies including screen readers, voice navigation, and switch access",
        "Leverage our custom accessibility tools (Axia) to certify sites and generate reports",
      ]}
      deliverables={[
        "WCAG 2.2 Compliance Audit Report",
        "Section 508 Remediation Plan",
        "AI Content Accessibility Assessment",
        "Assistive Technology Test Results",
        "Certified Accessibility Statement",
      ]}
    />
  )
}
