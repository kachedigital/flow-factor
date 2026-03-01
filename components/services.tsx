"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, Users, BrainCog, TrendingUp } from "lucide-react"

export default function Services() {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const services = [
        {
            title: "AI & Risk Management",
            icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
            color: "from-primary/20 to-primary/5",
            borderColor: "border-primary/20",
            description:
                "The 'Invisible Shield' applied to policy. We create robust frameworks for ethical AI use, data privacy, and internal auditing to mitigate risks.",
            methodology: "Policy | Audit | Invisible Shield",
        },
        {
            title: "AI + Human Collaboration",
            icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-secondary" />,
            color: "from-secondary/20 to-secondary/5",
            borderColor: "border-secondary/20",
            description:
                "Designing 'Human-in-the-loop' systems where AI handles the heavy lifting, but human judgment remains the final QA. Augmented Intelligence over replacement.",
            methodology: "Human-in-the-loop | Workflow Design",
        },
        {
            title: "Neuroinclusive & Accessible UX",
            icon: <BrainCog className="w-8 h-8 md:w-10 md:h-10 text-accent" />,
            color: "from-accent/20 to-accent/5",
            borderColor: "border-accent/20",
            description:
                "Digital environments designed for all brains. We conduct WCAG 2.2 remediation and build UI/UX patterns that reduce cognitive load and recall pressure.",
            methodology: "WCAG 2.2 | Inclusivity | Less Cognitive Load",
        },
        {
            title: "Strategic Change Management",
            icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />,
            color: "from-blue-500/20 to-blue-500/5",
            borderColor: "border-blue-500/20",
            description:
                "Solving the Identity Crisis of a workforce facing AI. We map how roles evolve so your people feel upgraded, not replaced, during organizational shifts.",
            methodology: "Workforce Transition | AI Adoption",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    }

    return (
        <section id="services" className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1035 0%, #2a1652 50%, #1e1845 100%)' }}>
            {/* Visual accent images for premium feel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src="/accent-orange.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-[-15%] right-[-10%] w-[50%] h-auto opacity-40"
                    style={{ mixBlendMode: 'screen' }}
                />
                <img
                    src="/accent-purple.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-[-15%] left-[-10%] w-[50%] h-auto opacity-40"
                    style={{ mixBlendMode: 'screen' }}
                />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 max-w-3xl"
                    >
                        <div className="inline-flex items-center rounded-full border border-brand-orange/40 px-3 py-1 text-sm font-semibold text-brand-orange bg-brand-orange/10 font-heading tracking-wide uppercase">
                            Our Refined Service Suite
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-heading text-white pb-2">
                            Merging core values with market-leading skills.
                        </h2>
                        <p className="text-gray-300 md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
                            We provide a focused menu of digital consulting services designed to elevate your business through ethical AI, accessibility, and human-first integration.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative group rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-brand-orange/30 transition-all duration-500 ease-out`}
                            style={{ background: 'rgba(20, 5, 40, 0.6)' }}
                            tabIndex={0}
                            aria-label={service.title}
                        >
                            {/* Subtle background gradient that appears on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative p-8 md:p-10 flex flex-col h-full z-10">
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 shadow-sm border border-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold font-heading mb-3 text-white">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 font-body leading-relaxed flex-grow mb-6">
                                    {service.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase font-accent">
                                            Methodology
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm font-medium text-gray-300">
                                        {service.methodology}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
