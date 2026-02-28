import { Accessibility } from "lucide-react"
import { ServiceDetailLayout } from "@/components/service-detail-layout"

export default function NeuroinclusivenessPage() {
  return (
    <ServiceDetailLayout
      pillar="Identity Pillar"
      title="Neuroinclusive Design"
      icon={Accessibility}
      color="text-kd-violet"
      bgColor="bg-kd-violet/10"
      description="Digital environments designed for all brains. Interfaces that reduce cognitive load, minimize recall pressure, and support executive function."
      angle="Beyond standard UX -- we design for the full spectrum of how people think. Informed by personal experience with neurodiversity and injury recovery, our approach goes deeper than compliance checklists. We create digital spaces where all brains can thrive."
      whatWeDo={[
        "Conduct neuro-accessibility audits of existing digital products and interfaces",
        "Design UI/UX patterns that reduce cognitive load and minimize working memory demands",
        "Create information architectures that support executive function and reduce decision fatigue",
        "Build progressive disclosure systems that let users control complexity",
        "Develop sensory-aware design systems that avoid overwhelming stimuli",
      ]}
      deliverables={[
        "Neuro-Accessibility Audit Report",
        "Inclusive UI/UX Pattern Library",
        "Cognitive Load Reduction Guidelines",
        "Progressive Disclosure Architecture",
        "Sensory-Aware Design System Tokens",
      ]}
    />
  )
}
