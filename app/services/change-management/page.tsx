import { ArrowUpRight } from "lucide-react"
import { ServiceDetailLayout } from "@/components/service-detail-layout"

export default function ChangeManagementPage() {
  return (
    <ServiceDetailLayout
      pillar="Transformation Pillar"
      title="Strategic Change Management"
      icon={ArrowUpRight}
      color="text-kd-coral"
      bgColor="bg-kd-coral/10"
      description='Managing the psychological and procedural shift when an organization adopts AI. Solving the "Identity Crisis" of a workforce facing technological transformation.'
      angle='People do not resist change -- they resist feeling replaced. We manage the human side of AI adoption by mapping how roles evolve, so your workforce feels upgraded rather than obsolete. Our blueprints turn the "AI threat" narrative into an "AI empowerment" story.'
      whatWeDo={[
        "Assess organizational readiness for AI adoption and digital transformation",
        "Map how existing roles evolve with AI integration, showing growth paths instead of dead ends",
        "Design communication strategies that address workforce anxiety proactively",
        "Create phased rollout plans that give teams time to adapt and build confidence",
        "Build internal champion networks to drive adoption from within",
      ]}
      deliverables={[
        "Workforce Transition Blueprint",
        "Role Evolution Mapping Document",
        "Change Communication Strategy",
        "Phased Rollout Implementation Plan",
        "Internal Champion Training Kit",
      ]}
    />
  )
}
