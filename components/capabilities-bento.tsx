"use client"

export default function CapabilitiesBento() {
    const capabilities = [
        {
            title: "Growth Strategy",
            description: "Data-driven roadmaps designed to scale your digital presence and align with long-term business objectives.",
            icon: "📈"
        },
        {
            title: "Full-Stack Engineering",
            description: "Robust, scalable, and secure architecture built with modern frameworks to power enterprise-grade applications.",
            icon: "⚙️"
        },
        {
            title: "Product Design (UI/UX)",
            description: "Neuroinclusive, WCAG AA compliant design systems that prioritize seamless customer experiences and high conversion.",
            icon: "✨"
        },
        {
            title: "AI Integration",
            description: "Ethical AI governance and implementation to automate workflows and enhance human collaboration.",
            icon: "🤖"
        },
        {
            title: "Change Management",
            description: "Strategic consulting to ensure your team adapts to new digital systems smoothly and efficiently.",
            icon: "🔄"
        },
        {
            title: "Performance Optimization",
            description: "Deep-dive audits and refactoring to ensure lightning-fast load times and flawless mobile responsiveness.",
            icon: "⚡"
        }
    ];

    return (
        // Transparent background — Hero wave shows through
        <section className="w-full py-24 relative z-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center md:text-left mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#290747] tracking-tight mb-4">
                        Core Capabilities
                    </h2>
                    <p className="text-lg text-[#525252] max-w-2xl font-medium">
                        We bridge the gap between complex engineering and human-centric design to deliver measurable results.
                    </p>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {capabilities.map((item, index) => (
                        <div
                            key={index}
                            // Frosted glass effect — maintains text contrast against the wave
                            className="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#df00c1] outline-none"
                            tabIndex={0}
                        >
                            {/* Icon Container */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#df00c1]/10 to-[#FF8D55]/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/60">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-[#290747] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-[#525252] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
