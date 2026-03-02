"use client"

export default function CapabilitiesBento() {
    const capabilities = [
        {
            title: "Keep You Legal",
            description: "We heavily focus on the impending 2026 WCAG deadlines, updating and auditing your digital storefronts to ensure total global compliance.",
            link: "→ Run a Free Risk Scan",
            href: "#",
            icon: "⚖️"
        },
        {
            title: "Make AI Simple",
            description: "We identify repetitive tasks that slow you down and replace them with intelligent, human-in-the-loop workflows and internal automations.",
            icon: "🤖"
        },
        {
            title: "Guide the Transition",
            description: "Successful innovation requires strategic governance. We consult on the 'people side' of technology, providing complete team training.",
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
                <div id="services" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
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
                            <p className="text-[#161616] leading-relaxed mb-4">
                                {item.description}
                            </p>
                            {/* @ts-ignore - Some cards have links, some don't */}
                            {item.link && (
                                <a href={item.href} className="text-[#df00c1] font-bold text-sm tracking-wide hover:underline focus:outline-none focus:underline">
                                    {item.link}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
