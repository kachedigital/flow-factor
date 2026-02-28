import { Brain } from "lucide-react"
import { ServiceDetailLayout } from "@/components/service-detail-layout"

export default function AICollaborationPage() {
  return (
    <ServiceDetailLayout
      pillar="Core Integration"
      title="AI + Human Collaboration"
      icon={Brain}
      color="text-kd-cyan"
      bgColor="bg-kd-cyan/10"
      description="Designing human-in-the-loop systems where AI handles the heavy lifting, but human judgment remains the final quality assurance layer."
      angle='Moving away from "AI replacement" toward "Augmented Intelligence." We design collaboration workflows that define exactly where the AI ends and the human begins -- ensuring that technology amplifies capability without undermining expertise or autonomy.'
      whatWeDo={[
        "Design custom human-in-the-loop AI workflows tailored to your organization's processes",
        "Map decision points where human judgment is critical vs. where AI can safely automate",
        "Build feedback loops so AI systems continuously learn from human corrections",
        "Create role-specific AI interaction protocols for different teams and skill levels",
        "Establish quality assurance frameworks that leverage both AI speed and human insight",
      ]}
      deliverables={[
        "Custom Collaboration Workflow Documentation",
        "AI-Human Task Allocation Matrix",
        "Feedback Loop Architecture Design",
        "Quality Assurance Protocol",
        "Team Training & Onboarding Guide",
      ]}
    />
  )
}
