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
            icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-kache-teal" />,
            color: "from-kache-teal/20 to-kache-teal/5",
            description:
                "The 'Invisible Shield' applied to policy. We create robust frameworks for ethical AI use, data privacy, and internal auditing to mitigate risks.",
            methodology: "Policy | Audit | Invisible Shield",
        },
        {
            title: "AI + Human Collaboration",
            icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-kache-fuchsia" />,
            color: "from-kache-fuchsia/20 to-kache-fuchsia/5",
            description:
                "Designing 'Human-in-the-loop' systems where AI handles the heavy lifting, but human judgment remains the final QA. Augmented Intelligence over replacement.",
            methodology: "Human-in-the-loop | Workflow Design",
        },
        {
            title: "Neuroinclusive & Accessible UX",
            icon: <BrainCog className="w-8 h-8 md:w-10 md:h-10 text-kache-orange" />,
            color: "from-kache-orange/20 to-kache-orange/5",
            description:
                "Digital environments designed for all brains. We conduct WCAG 2.2 remediation and build UI/UX patterns that reduce cognitive load and recall pressure.",
            methodology: "WCAG 2.2 | Inclusivity | Less Cognitive Load",
        },
        {
            title: "Strategic Change Management",
            icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-kache-teal" />,
            color: "from-kache-teal/20 to-kache-teal/5",
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
        <section id="services" className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-midnight">
            {/* Teal & Orange circle glows — 600px, 20% opacity */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src="/accent-cyan.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-[-15%] right-[-10%] w-[600px] h-auto opacity-20"
                    style={{ mixBlendMode: 'screen' }}
                />
                <img
                    src="/accent-orange.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-[-15%] left-[-10%] w-[600px] h-auto opacity-20"
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
                        <div className="font-meta text-kache-teal">
                            Our Refined Service Suite
                        </div>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-heading text-white pb-2">
                            Merging core values with market-leading skills.
                        </h2>
                        <p className="text-gray-400 md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
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
                            className="card-glass rounded-3xl"
                            tabIndex={0}
                            aria-label={service.title}
                        >
                            {/* Hover gradient overlay */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative p-8 md:p-10 flex flex-col h-full z-10 group">
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold font-heading mb-3 text-white">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 font-body leading-relaxed flex-grow mb-6">
                                    {service.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <span className="font-meta text-gray-500">
                                        Methodology
                                    </span>
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
