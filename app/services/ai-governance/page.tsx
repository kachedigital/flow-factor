import { Shield } from "lucide-react"
import { ServiceDetailLayout } from "@/components/service-detail-layout"

export default function AIGovernancePage() {
  return (
    <ServiceDetailLayout
      pillar="Stability Pillar"
      title="AI Governance & Risk Management"
      icon={Shield}
      color="text-kd-magenta"
      bgColor="bg-kd-magenta/10"
      description='Creating frameworks for ethical AI use, data privacy, and internal auditing. The "Invisible Shield" applied to organizational policy.'
      angle='The "Invisible Shield" applied to policy. Organizations are afraid of the "Wild West" of AI -- unvetted tools, data leaks, compliance gaps. We build governance frameworks that let you innovate confidently, knowing every AI interaction is auditable, ethical, and compliant.'
      whatWeDo={[
        "Develop comprehensive AI use policies tailored to your industry and regulatory environment",
        "Create data privacy frameworks that align with GDPR, CCPA, and emerging AI regulations",
        "Design internal auditing processes for AI-generated outputs and decision-making",
        "Build risk assessment matrices specific to your AI tool stack and use cases",
        "Establish vendor evaluation criteria for third-party AI services",
      ]}
      deliverables={[
        "AI Use Policy Document",
        "Risk Mitigation Roadmap",
        "Internal AI Audit Framework",
        "Data Privacy Compliance Checklist",
        "Vendor Evaluation Scorecard",
      ]}
    />
  )
}
