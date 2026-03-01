'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Smooth, elegant parallax (30% speed ratio)
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#FAFAFA]"
        >
            {/* THE HERO ASSET: pbg15 (Transparent PNG) */}
            <motion.div
                style={{ y: backgroundY }}
                // Container made much wider, taller, and pushed off the right edge
                className="absolute right-[-10%] md:right-[-15%] top-[-20%] z-0 w-[150%] md:w-[80vw] h-[150%] opacity-20 md:opacity-85 pointer-events-none"
            >
                <div
                    // Swapped bg-contain for bg-cover, anchored right, added scale
                    className="w-full h-full bg-no-repeat bg-cover bg-right-center transform md:scale-110 origin-right"
                    style={{ backgroundImage: "url('/pbg15-transparent.png')" }}
                />
            </motion.div>

            {/* FOREGROUND CONTENT */}
            {/* Container is full width, but content is constrained to the left */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center">

                {/* Typography Block */}
                <div className="max-w-2xl space-y-8 text-center md:text-left mx-auto md:mx-0">
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

                    <p className="text-lg text-[#525252] font-medium leading-relaxed">
                        We empower organizations through ethical AI governance, neuroinclusive design, and seamless strategic change management.
                    </p>

                    <div className="pt-4 flex justify-center md:justify-start">
                        <button className="bg-[#df00c1] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_8px_25px_rgba(223,0,193,0.35)] hover:-translate-y-1 focus:ring-4 focus:ring-[#df00c1]/50 focus:outline-none">
                            Explore Services →
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
