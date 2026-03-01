'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#FAFAFA]"
        >
            {/* THE PARALLAX LAYER — Massive scale, bleeds into Capabilities */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute right-0 top-[-20%] z-0 w-[150vw] md:w-[80vw] h-[250%] opacity-70 pointer-events-none"
            >
                <div
                    className="w-full h-full bg-no-repeat bg-contain bg-right-top"
                    style={{ backgroundImage: "url('/pbg15-transparent.png')" }}
                />
            </motion.div>

            {/* FOREGROUND CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">

                {/* Typography */}
                <div className="flex-1 space-y-6">
                    <p className="uppercase tracking-widest text-xs font-bold text-[#df00c1]">
                        Digital Consulting Agency
                    </p>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.15]">
                        <span className="text-[#525252]">Architect systems for</span> <br />
                        <span className="bg-gradient-to-r from-[#FF8D55] via-[#df00c1] to-[#7e22ce] bg-clip-text text-transparent inline-block pb-1">
                            Human & AI
                        </span>
                        <br />
                        <span className="text-[#290747]">Collaboration</span>
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

                {/* Glass Container */}
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#df00c1]/10 shadow-2xl bg-white/60 backdrop-blur-2xl flex items-center justify-center">
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
