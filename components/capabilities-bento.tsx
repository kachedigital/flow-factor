"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { TrendingUp, Code2, Palette, BarChart3, Search, Lightbulb } from "lucide-react"

const capabilities = [
    {
        title: "Growth Strategy",
        description:
            "We architect data-driven growth frameworks that align your AI investments with measurable business outcomes. From market analysis to adoption roadmaps.",
        icon: TrendingUp,
    },
    {
        title: "Full-Stack Engineering",
        description:
            "End-to-end development of AI-augmented platforms, APIs, and automation pipelines. Clean code, scalable architecture, human-first integration.",
        icon: Code2,
    },
    {
        title: "Product Design",
        description:
            "Neuroinclusive UX/UI that reduces cognitive load and passes WCAG 2.2 AA. Designed for all brains, tested with real users.",
        icon: Palette,
    },
    {
        title: "Performance Marketing",
        description:
            "Conversion-optimized campaigns powered by ethical AI insights. We build funnels that respect user attention and deliver measurable ROI.",
        icon: BarChart3,
    },
    {
        title: "SEO & Content",
        description:
            "Strategic content that ranks and resonates. AI-assisted research paired with human editorial judgment for authentic thought leadership.",
        icon: Search,
    },
    {
        title: "AI Governance",
        description:
            "The 'Invisible Shield' applied to policy. Ethical AI use frameworks, data privacy audits, and risk mitigation roadmaps for confident adoption.",
        icon: Lightbulb,
    },
]

export default function CapabilitiesBento() {
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef(null)
    const isInView = useInView(gridRef, { once: true, margin: "-100px" })

    // Parallax: ribbon moves at 30% slower speed
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })
    const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 18,
            },
        },
    }

    return (
        <section
            ref={sectionRef}
            id="capabilities"
            className="w-full py-20 md:py-32 relative overflow-hidden bg-white"
        >
            {/* Parallax ribbon background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: ribbonY }}
            >
                <img
                    src="/ribbon-parallax.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none h-auto opacity-[0.08] blur-sm"
                    style={{ mixBlendMode: "multiply" }}
                />
            </motion.div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="font-meta text-kache-orange">
                        What We Do
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-3 mb-4">
                        Capabilities
                    </h2>
                    <p className="text-body-grey text-lg leading-relaxed">
                        A focused suite of agency services designed to elevate your business through ethical AI, accessible design, and strategic growth.
                    </p>
                </div>

                {/* Bento grid */}
                <motion.div
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {capabilities.map((cap, index) => {
                        const Icon = cap.icon
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="card-editorial p-8 flex flex-col group"
                                tabIndex={0}
                                aria-label={cap.title}
                            >
                                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-kache-orange/10 group-hover:bg-kache-orange/15 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-kache-orange" strokeWidth={1.8} />
                                </div>

                                <h3 className="text-xl font-bold font-heading mb-2 text-deep-purple">
                                    {cap.title}
                                </h3>

                                <p className="text-body-grey leading-relaxed text-[15px] flex-grow">
                                    {cap.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
