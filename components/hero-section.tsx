'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
    const ref = useRef(null);

    // Parallax scroll listener
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Ribbon moves at 40% scroll speed for maximum depth
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
        >
            {/* LAYER 1 (Bottom): Static Light Mesh */}
            <div
                className="absolute inset-0 z-0 opacity-[0.08] bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: "url('/light-mesh.jpg')" }}
            />

            {/* LAYER 2 (Middle): Parallax Rainbow Ribbon */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-10 w-full h-[130%] opacity-20 pointer-events-none mix-blend-multiply"
            >
                <div
                    className="w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: "url('/wideribbon_rainbow.jpg')" }}
                />
            </motion.div>

            {/* LAYER 3 (Top): Foreground Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">

                {/* Left: Typography */}
                <div className="flex-1 space-y-6">
                    <p className="uppercase tracking-widest text-xs font-bold text-[#df00c1]">
                        Digital Consulting Agency
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#525252] leading-[1.15]">
                        Architect systems for <br />
                        {/* The Agency Gradient Text */}
                        <span className="bg-gradient-to-r from-[#df00c1] via-[#9F36BD] to-[#FF8D55] bg-clip-text text-transparent pb-2 inline-block">
                            Human & AI Collaboration
                        </span>
                    </h1>

                    <p className="text-lg text-[#525252] max-w-xl font-medium leading-relaxed">
                        We empower organizations through ethical AI governance, neuroinclusive design, and seamless strategic change management.
                    </p>

                    <div className="pt-6 flex justify-center lg:justify-start">
                        <button className="bg-[#df00c1] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_8px_25px_rgba(223,0,193,0.35)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
                            Explore Services →
                        </button>
                    </div>
                </div>

                {/* Right: Clean Glass Placeholder */}
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#df00c1]/10 shadow-2xl bg-white/40 backdrop-blur-xl flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#df00c1]/5 to-[#FF8D55]/5" />
                        <p className="text-[#525252]/40 font-semibold text-sm tracking-widest uppercase">
                            [ Visual Asset Pending ]
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
