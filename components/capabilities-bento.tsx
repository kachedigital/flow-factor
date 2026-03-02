"use client"

export default function CapabilitiesBento() {
    const capabilities = [
        {
            title: "AI Governance & Policy Development",
            description: "We provide the counsel needed to develop robust policies and procedures.",
            icon: "⚖️"
        },
        {
            title: "Digital Compliance & The 2027 Deadline",
            description: "The grace period for updated global accessibility standards ends in 2027. We turn this requirement into your competitive advantage.",
            icon: "⏱️"
        },
        {
            title: "Workflow & Human-in-the-Loop Automation",
            description: "We identify repetitive tasks that slow you down and replace them with intelligent workflows.",
            icon: "🔄"
        },
        {
            title: "Change Management Strategy",
            description: "Successful innovation requires a human touch. We consult on the \"people side\" of technology.",
            icon: "👥"
        }
    ];

    return (
        // Transparent background — Hero wave shows through
        <section className="w-full py-24 relative z-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center md:text-left mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#290747] tracking-tight mb-4">
                        Expert Counsel. Targeted Solutions.
                    </h2>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
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
